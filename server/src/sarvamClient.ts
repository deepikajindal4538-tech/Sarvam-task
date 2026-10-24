import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KnowledgeChunk } from './knowledgeChunks.js';
import { QueryResult, LanguageCode } from '../../shared/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to resolve SARVAM_API_KEY from environment or .env file
export function getSarvamApiKey(): string | null {
  if (process.env.SARVAM_API_KEY && process.env.SARVAM_API_KEY.trim()) {
    return process.env.SARVAM_API_KEY.trim();
  }

  // Attempt reading .env from root
  try {
    const envPath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('SARVAM_API_KEY=') && !trimmed.startsWith('#')) {
          const val = trimmed.split('=', 2)[1]?.trim().replace(/^['"]|['"]$/g, '');
          if (val) {
            process.env.SARVAM_API_KEY = val;
            return val;
          }
        }
      }
    }
  } catch {
    // Ignore error
  }

  return null;
}

const SARVAM_BASE_URL = 'https://api.sarvam.ai/v1/chat/completions';
const SARVAM_MODEL = 'sarvam-105b-conversations';

interface GenerateOptions {
  query: string;
  language: LanguageCode;
  matchedChunks: KnowledgeChunk[];
  hasSufficientEvidence: boolean;
  unverifiedReason?: string;
  confidenceScore: number;
}

export async function generateGroundedAnswer(opts: GenerateOptions): Promise<QueryResult> {
  const { query, language, matchedChunks, hasSufficientEvidence, unverifiedReason, confidenceScore } = opts;

  // 1. CASE: No sufficient evidence in verified records (Out of Scope / Fabricated query)
  if (!hasSufficientEvidence || matchedChunks.length === 0) {
    console.log(`[Retrieval] Insufficient evidence for query: "${query}" (Confidence: ${confidenceScore}). Reason: ${unverifiedReason}`);

    return {
      serviceId: 'unverified-query',
      category: 'advisory',
      title: 'Information Could Not Be Verified',
      summary: 
        `We could not verify official government information for "${query}" in our verified public service directory. ` +
        `BoloSaathi strictly avoids fabricating fees, deadlines, or rules. Please refer directly to the National Portal of India (india.gov.in) or call National Citizen Helpline 1947.`,
      spokenText: 
        `This information could not be verified in official public service records. Please check the National Portal of India at india.gov.in.`,
      department: 'National Citizen Advisory (Unverified Query)',
      officialLinks: [
        {
          name: 'National Portal of India',
          url: 'https://india.gov.in',
          badge: 'Official Portal (gov.in)',
          isOfficial: true,
        },
      ],
      helplines: [
        {
          number: '1947',
          description: 'National Citizen Toll-Free Helpline',
          tollFree: true,
        },
      ],
      eligibility: ['Information could not be verified in official records.'],
      fee: 'Information not verified (No fee can be cited without official record)',
      turnaroundTime: 'Unknown / Not verified',
      steps: [
        {
          stepNumber: 1,
          title: 'Consult Official National Portal',
          description: 'Visit the National Portal of India at https://india.gov.in to search the central and state schemes directory.',
        },
        {
          stepNumber: 2,
          title: 'Call Citizen Grievance Helpline',
          description: 'Dial 1947 or visit your local Common Service Centre (CSC) for official guidance.',
        },
      ],
      checklist: [
        {
          id: 'verify_notice',
          name: 'Official notification or government circular',
          mandatory: true,
          tip: 'Always confirm with .gov.in sources before paying any fees',
        },
      ],
      suggestedQuestions: [
        'How to update address in Aadhaar card online?',
        'How to apply for Ayushman Bharat 5 lakh health card?',
        'How to check PM-KISAN installment status?',
      ],
      matchScore: confidenceScore,
    };
  }

  // 2. CASE: Sufficient evidence found -> Build Grounded Context
  const primaryChunk = matchedChunks[0];
  const contextText = matchedChunks
    .map(c => `[DOCUMENT: ${c.title}]\nCategory: ${c.category}\nContent: ${c.content}\nFee: ${c.officialFee}\nProcessing Time: ${c.processingTime}\nOfficial Portal: ${c.officialUrl}\nSteps: ${c.actionableSteps.join(' -> ')}`)
    .join('\n\n---\n\n');

  console.log(`[Retrieval] Found ${matchedChunks.length} chunks for "${query}" | Primary: "${primaryChunk.title}" (Score: ${confidenceScore})`);

  const apiKey = getSarvamApiKey();
  let synthesizedSummary: string | null = null;
  let synthesizedSpoken: string | null = null;

  if (apiKey) {
    const systemPrompt = 
      `You are BoloSaathi, an official Indian public-services assistant.\n` +
      `Your task is to answer the citizen's exact question accurately and reassuringly in simple language.\n` +
      `STRICT RULES:\n` +
      `1. Ground your answer ONLY in the provided VERIFIED GOVERNMENT CONTEXT below. Never fabricate fees, deadlines, documents, or rules.\n` +
      `2. Answer the exact question directly in 2-3 concise, actionable sentences.\n` +
      `3. Always cite the official government portal URL provided in the context.\n` +
      `4. If the context does not contain the answer, say that the specific detail could not be verified in official records.\n` +
      `5. Do not include markdown code fences or conversational filler.`;

    const userPrompt = 
      `VERIFIED GOVERNMENT CONTEXT:\n${contextText}\n\n` +
      `CITIZEN QUESTION: ${query}\n` +
      `PREFERRED LANGUAGE: ${language}\n\n` +
      `Provide a direct, helpful, grounded answer for the citizen:`;

    const startTime = Date.now();

    try {
      const response = await fetch(SARVAM_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': apiKey,
        },
        body: JSON.stringify({
          model: SARVAM_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.2, // Low temperature for factual consistency
          max_tokens: 300,
        }),
      });

      const latency = Date.now() - startTime;

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content?.trim();
        if (content) {
          synthesizedSummary = content;
          synthesizedSpoken = content;
          console.log(`[Sarvam API] Success | Model: ${SARVAM_MODEL} | Status: ${response.status} | Latency: ${latency}ms | Usage: ${data.usage?.total_tokens || 0} tokens`);
        }
      } else {
        const errorBody = await response.text();
        console.error(`[Sarvam API Error] Status: ${response.status} | Latency: ${latency}ms | Message: ${errorBody.substring(0, 150)}`);
      }
    } catch (err: any) {
      console.error(`[Sarvam API Network Error]: ${err.message || err}`);
    }
  } else {
    console.warn('[Sarvam API] No SARVAM_API_KEY detected in environment or .env. Using verified chunk synthesis.');
  }

  // 3. Assemble Grounded QueryResult
  const finalSummary = synthesizedSummary || primaryChunk.content;
  const finalSpoken = synthesizedSpoken || primaryChunk.content;

  const steps = primaryChunk.actionableSteps.map((stepText, idx) => ({
    stepNumber: idx + 1,
    title: stepText.split(' at ')[0].split(' -> ')[0].split('.')[0] || `Step ${idx + 1}`,
    description: stepText,
  }));

  const checklist = primaryChunk.requiredDocuments.map((doc, idx) => ({
    id: `doc_${primaryChunk.id}_${idx}`,
    name: doc.name,
    mandatory: doc.mandatory,
    tip: doc.tip,
  }));

  return {
    serviceId: primaryChunk.serviceId,
    category: primaryChunk.category,
    title: primaryChunk.title,
    summary: finalSummary,
    spokenText: finalSpoken,
    department: `${primaryChunk.officialPortalName}`,
    officialLinks: [
      {
        name: primaryChunk.officialPortalName,
        url: primaryChunk.officialUrl,
        badge: 'Official Portal (gov.in)',
        isOfficial: true,
      },
    ],
    helplines: primaryChunk.helplines,
    eligibility: primaryChunk.eligibility,
    fee: primaryChunk.officialFee,
    turnaroundTime: primaryChunk.processingTime,
    steps,
    checklist,
    suggestedQuestions: primaryChunk.relatedQuestions,
    matchScore: confidenceScore,
  };
}
