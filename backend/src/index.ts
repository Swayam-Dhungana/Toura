// src/index.ts
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import authRoutes from '../routes/auth'

const app = new Hono()

app.route('/auth', authRoutes)

app.get('/', (c) => c.text('Hello from Hono + Node.js!'))

serve({ fetch: app.fetch, port: 3000 })

console.log('🔥 Server running on http://localhost:3000')
