"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const api_1 = __importDefault(require("./src/routes/api"));
const hotel_1 = __importDefault(require("./src/routes/hotel"));
const app = new hono_1.Hono();
app.use('*', async (c, next) => {
    const origin = process.env.BASEURL || 'https://toura-swart.vercel.app';
    c.header('Access-Control-Allow-Origin', origin);
    c.header('Access-Control-Allow-Credentials', 'true');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (c.req.method === 'OPTIONS') {
        return c.text('', 200);
    }
    await next();
});
app.route('/api', api_1.default);
app.route('/api/v1', hotel_1.default);
app.get('/', (c) => c.text('Hello from Hono + Node.js!'));
exports.default = app.fetch;
