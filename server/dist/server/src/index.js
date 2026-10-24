"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const servicesData_js_1 = require("../../shared/servicesData.js");
const queryResolver_js_1 = require("../../shared/queryResolver.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Health Check
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        app: 'BoloSaathi API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});
// Supported Languages
app.get('/api/languages', (_req, res) => {
    res.json(servicesData_js_1.SUPPORTED_LANGUAGES);
});
// All Public Services
app.get('/api/services', (_req, res) => {
    res.json(servicesData_js_1.MOCK_SERVICES);
});
// Get Service by ID
app.get('/api/services/:id', (req, res) => {
    const service = servicesData_js_1.MOCK_SERVICES.find(s => s.id === req.params.id);
    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
});
// Query / Voice Query Resolution
app.post('/api/query', (req, res) => {
    const { query, language = 'en', isVoice = false } = req.body;
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query string is required' });
    }
    const result = (0, queryResolver_js_1.resolveServiceQuery)(query, language);
    res.json({
        ...result,
        isVoice,
        resolvedAt: new Date().toISOString(),
    });
});
// Trending / Quick citizen queries
app.get('/api/trending', (req, res) => {
    const lang = req.query.lang || 'hi';
    const trending = servicesData_js_1.MOCK_SERVICES.slice(0, 5).map(s => ({
        id: s.id,
        category: s.category,
        title: s.title[lang] || s.title['en'],
        shortDescription: s.shortDescription[lang] || s.shortDescription['en'],
        sampleQuery: (s.suggestedQuestions[lang] || s.suggestedQuestions['en'] || [])[0] || s.title[lang],
    }));
    res.json(trending);
});
// Serve frontend build in production
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const staticPath = path_1.default.resolve(__dirname, '../../dist');
app.use(express_1.default.static(staticPath));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(staticPath, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`🚀 BoloSaathi API Server running on http://localhost:${PORT}`);
});
