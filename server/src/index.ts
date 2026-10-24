import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { SUPPORTED_LANGUAGES, MOCK_SERVICES } from '../../shared/servicesData.js';
import { LanguageCode } from '../../shared/types.js';
import { retrieveRelevantKnowledge } from './retrievalEngine.js';
import { generateGroundedAnswer, getSarvamApiKey } from './sarvamClient.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Log API status on initialization
const apiKey = getSarvamApiKey();
console.log(`[BoloSaathi Backend] Starting server...`);
console.log(`[Sarvam API Integration] API Key Detected: ${Boolean(apiKey)}`);

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'BoloSaathi API',
    sarvamConfigured: Boolean(getSarvamApiKey()),
    version: '1.2.0',
    timestamp: new Date().toISOString(),
  });
});

// Supported Languages
app.get('/api/languages', (_req: Request, res: Response) => {
  res.json(SUPPORTED_LANGUAGES);
});

// All Public Services
app.get('/api/services', (_req: Request, res: Response) => {
  res.json(MOCK_SERVICES);
});

// Get Service by ID
app.get('/api/services/:id', (req: Request, res: Response) => {
  const service = MOCK_SERVICES.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  res.json(service);
});

// Grounded Query Resolution with Sarvam API
app.post('/api/query', async (req: Request, res: Response) => {
  const { query, language = 'en', isVoice = false } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query string is required' });
  }

  const sanitizedQuery = query.trim().substring(0, 500); // Prevent overflow
  const startTimestamp = Date.now();

  try {
    // 1. Chunk-level retrieval
    const retrieval = retrieveRelevantKnowledge(sanitizedQuery);

    // 2. Grounded generation via Sarvam AI
    const result = await generateGroundedAnswer({
      query: sanitizedQuery,
      language: language as LanguageCode,
      matchedChunks: retrieval.matchedChunks,
      hasSufficientEvidence: retrieval.hasSufficientEvidence,
      unverifiedReason: retrieval.unverifiedReason,
      confidenceScore: retrieval.confidenceScore,
    });

    const elapsed = Date.now() - startTimestamp;
    console.log(`[Pipeline Completed] "${sanitizedQuery}" in ${elapsed}ms | Verified: ${retrieval.hasSufficientEvidence}`);

    res.json({
      ...result,
      isVoice,
      resolvedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error(`[Pipeline Error] Failed processing "${sanitizedQuery}": ${error.message || error}`);
    res.status(500).json({
      error: 'Failed to process citizen query.',
      message: 'Service error occurred while retrieving official records.',
    });
  }
});

// Trending / Quick citizen queries
app.get('/api/trending', (req: Request, res: Response) => {
  const lang = (req.query.lang as LanguageCode) || 'en';
  const trending = MOCK_SERVICES.slice(0, 5).map(s => ({
    id: s.id,
    category: s.category,
    title: s.title[lang] || s.title['en'],
    shortDescription: s.shortDescription[lang] || s.shortDescription['en'],
    sampleQuery: (s.suggestedQuestions[lang] || s.suggestedQuestions['en'] || [])[0] || s.title[lang],
  }));

  res.json(trending);
});

// Serve frontend build in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.resolve(__dirname, '../../dist');

app.use(express.static(staticPath));
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 BoloSaathi API Server running on http://localhost:${PORT}`);
});
