import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { SUPPORTED_LANGUAGES, MOCK_SERVICES } from '../../shared/servicesData.js';
import { resolveServiceQuery } from '../../shared/queryResolver.js';
import { LanguageCode } from '../../shared/types.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'BoloSaathi API',
    version: '1.0.0',
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

// Query / Voice Query Resolution
app.post('/api/query', (req: Request, res: Response) => {
  const { query, language = 'en', isVoice = false } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query string is required' });
  }

  const result = resolveServiceQuery(query, language as LanguageCode);

  res.json({
    ...result,
    isVoice,
    resolvedAt: new Date().toISOString(),
  });
});

// Trending / Quick citizen queries
app.get('/api/trending', (req: Request, res: Response) => {
  const lang = (req.query.lang as LanguageCode) || 'hi';
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
