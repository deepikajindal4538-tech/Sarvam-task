import { KnowledgeChunk, VERIFIED_KNOWLEDGE_CHUNKS } from './knowledgeChunks.js';

export interface RetrievalResult {
  hasSufficientEvidence: boolean;
  confidenceScore: number;
  topChunk: KnowledgeChunk | null;
  matchedChunks: KnowledgeChunk[];
  unverifiedReason?: string;
}

// Stop words in English and Hindi romanized
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 
  'is', 'are', 'was', 'were', 'be', 'how', 'what', 'when', 'where', 'why', 'who', 
  'can', 'i', 'my', 'you', 'your', 'please', 'tell', 'me', 'karo', 'kaise', 'kya', 'hai', 'mein'
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

  const scoredChunks = VERIFIED_KNOWLEDGE_CHUNKS.map(chunk => {
    let score = 0;
    const chunkTokens = tokenize(`${chunk.title} ${chunk.content} ${chunk.questionKeywords.join(' ')}`);
    const chunkTokenSet = new Set(chunkTokens);

    // 1. Exact phrase matching in title (+6) or content (+3.5)
    if (chunk.title.toLowerCase().includes(cleanQuery)) {
      score += 6.0;
    } else if (chunk.content.toLowerCase().includes(cleanQuery)) {
      score += 3.5;
    }

    // 2. Keyword exact matches (+2.5 each)
    for (const kw of chunk.questionKeywords) {
      const kwLower = kw.toLowerCase();
      if (cleanQuery.includes(kwLower)) {
        score += 3.0;
      }
      for (const qt of queryTokens) {
        if (kwLower.includes(qt) || qt.includes(kwLower)) {
          score += 1.5;
        }
      }
    }

    // 3. Title token overlap (+2.0 each)
    const titleTokens = tokenize(chunk.title);
    for (const qt of queryTokens) {
      if (titleTokens.includes(qt)) {
        score += 2.0;
      }
    }

    // 4. Content token frequency
    for (const qt of queryTokens) {
      if (chunkTokenSet.has(qt)) {
        score += 0.8;
      }
    }

    // Normalize score based on query length
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
  const MIN_SCORE_THRESHOLD = 3.5; // Strict threshold to prevent false matches

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
