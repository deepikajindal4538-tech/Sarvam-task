import { KnowledgeChunk, VERIFIED_KNOWLEDGE_CHUNKS } from './knowledgeChunks.js';

export interface RetrievalResult {
  hasSufficientEvidence: boolean;
  confidenceScore: number;
  topChunk: KnowledgeChunk | null;
  matchedChunks: KnowledgeChunk[];
  unverifiedReason?: string;
}

// Stop words & generic conversational filler
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 
  'is', 'are', 'was', 'were', 'be', 'how', 'what', 'when', 'where', 'why', 'who', 
  'can', 'i', 'my', 'you', 'your', 'please', 'tell', 'me', 'karo', 'kaise', 'kya', 'hai', 'mein',
  'do', 'does', 'did', 'want', 'need', 'give', 'any', 'some', 'about'
]);

// Generic non-discriminating terms in public services
const GENERIC_GOV_TERMS = new Set([
  'government', 'official', 'portal', 'online', 'service', 'services', 'scheme', 'yojana',
  'india', 'indian', 'apply', 'application', 'status', 'process', 'procedure', 'check',
  'information', 'details', 'rule', 'rules', 'state', 'department', 'desk', 'centre', 'center'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097F\s-]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

export function retrieveRelevantKnowledge(query: string): RetrievalResult {
  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = tokenize(cleanQuery);

  if (queryTokens.length === 0) {
    return {
      hasSufficientEvidence: false,
      confidenceScore: 0,
      topChunk: null,
      matchedChunks: [],
      unverifiedReason: 'Query was empty or contained no meaningful search terms.',
    };
  }

  // Filter out purely generic query tokens for domain checks
  const distinctiveTokens = queryTokens.filter(t => !GENERIC_GOV_TERMS.has(t));

  const scoredChunks = VERIFIED_KNOWLEDGE_CHUNKS.map(chunk => {
    let score = 0;

    // Check if the query has ANY specific domain keyword match with this chunk
    const hasDomainKeywordMatch = chunk.questionKeywords.some(kw => {
      const kwLower = kw.toLowerCase();
      // Exact substring match (e.g. "aadhaar", "pm kisan", "ayushman", "voter id", "passport")
      if (cleanQuery.includes(kwLower)) return true;
      // Word-level token match with distinctive query tokens
      return distinctiveTokens.some(qt => qt.length >= 3 && (kwLower.includes(qt) || qt.includes(kwLower)));
    });

    const titleTokens = tokenize(chunk.title).filter(t => !GENERIC_GOV_TERMS.has(t));
    const hasTitleMatch = distinctiveTokens.some(qt => titleTokens.includes(qt));

    // If query has NO domain keyword match AND NO title match, it is out of scope for this chunk!
    if (!hasDomainKeywordMatch && !hasTitleMatch) {
      return {
        chunk,
        score: 0,
        normalizedScore: 0,
      };
    }

    // 1. Exact phrase matching in title (+6) or content (+3.5)
    if (chunk.title.toLowerCase().includes(cleanQuery)) {
      score += 6.0;
    } else if (chunk.content.toLowerCase().includes(cleanQuery)) {
      score += 3.5;
    }

    // 2. Keyword exact matches (+3.0 for exact, +1.5 for token match)
    for (const kw of chunk.questionKeywords) {
      const kwLower = kw.toLowerCase();
      if (cleanQuery.includes(kwLower)) {
        score += 3.5;
      }
      for (const qt of distinctiveTokens) {
        if (kwLower === qt) {
          score += 2.0;
        } else if (kwLower.includes(qt) || qt.includes(kwLower)) {
          score += 1.0;
        }
      }
    }

    // 3. Title token overlap
    for (const qt of distinctiveTokens) {
      if (titleTokens.includes(qt)) {
        score += 2.5;
      }
    }

    // 4. Content token frequency
    const chunkTokens = tokenize(chunk.content);
    const chunkTokenSet = new Set(chunkTokens);
    for (const qt of distinctiveTokens) {
      if (chunkTokenSet.has(qt)) {
        score += 0.8;
      }
    }

    const normalizedScore = Math.min(1.0, score / Math.max(5.0, queryTokens.length * 2.5));

    return {
      chunk,
      score,
      normalizedScore,
    };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  const best = scoredChunks[0];
  const MIN_SCORE_THRESHOLD = 3.0;

  if (!best || best.score < MIN_SCORE_THRESHOLD) {
    return {
      hasSufficientEvidence: false,
      confidenceScore: best ? Number(best.normalizedScore.toFixed(2)) : 0,
      topChunk: null,
      matchedChunks: [],
      unverifiedReason: 'No verified official documentation found matching this exact query.',
    };
  }

  // Filter chunks with positive relevance
  const relevantChunks = scoredChunks
    .filter(sc => sc.score >= MIN_SCORE_THRESHOLD * 0.7)
    .slice(0, 3)
    .map(sc => sc.chunk);

  return {
    hasSufficientEvidence: true,
    confidenceScore: Number(best.normalizedScore.toFixed(2)),
    topChunk: best.chunk,
    matchedChunks: relevantChunks,
  };
}
