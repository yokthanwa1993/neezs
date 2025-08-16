"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./firebase");
const auth_1 = __importDefault(require("./routes/auth"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const seekers_1 = __importDefault(require("./routes/seekers"));
const uploads_1 = __importDefault(require("./routes/uploads"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
const defaultAllowedOrigins = [
    'http://localhost:32100',
    'http://localhost:3000',
    'capacitor://localhost',
    'http://localhost',
    'https://localhost',
    'https://neeiz-app.lslly.com',
    'https://neeiz-web.lslly.com',
    'https://neeiz-01.web.app',
    'https://neeiz-01.firebaseapp.com',
];
const allowedOrigins = (process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
    : defaultAllowedOrigins);
app.use((0, cors_1.default)({
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/.test(origin);
        if (allowedOrigins.includes(origin) || isLocalhost)
            return callback(null, true);
        return callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
}));
// Apply JSON parser only for non-multipart requests so it won't consume multipart bodies
app.use((req, res, next) => {
    const contentType = (req.headers['content-type'] || '').toLowerCase();
    if (contentType.startsWith('multipart/form-data')) {
        return next();
    }
    return express_1.default.json()(req, res, next);
});
// Routers
app.use('/api/auth', auth_1.default);
app.use('/api/jobs', jobs_1.default);
app.use('/api/seekers', seekers_1.default);
app.use('/api/uploads', uploads_1.default);
app.use('/api/images', images_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Neeiz API is running!' });
});
exports.default = app;
//# sourceMappingURL=app.js.map