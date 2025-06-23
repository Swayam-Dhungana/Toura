"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const api_1 = __importDefault(require("./src/routes/api"));
const hotel_1 = __importDefault(require("./src/routes/hotel"));
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
app.use('*', (0, cors_1.cors)({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.route('/api', api_1.default);
app.route('/api/v1', hotel_1.default);
app.get('/', (c) => c.text('Hello from Hono + Node.js!'));
(0, node_server_1.serve)({ fetch: app.fetch, port: 3000 });
console.log('Server running on http://localhost:3000');
