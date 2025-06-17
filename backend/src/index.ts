// src/index.ts
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import authRoutes from './routes/api'
import hotelRoutes from './routes/hotel'
import { cors } from 'hono/cors'
const app = new Hono()
app.use(
  '*',
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
)
app.route('/api', authRoutes)
app.route('/api/v1',hotelRoutes)
app.get('/', (c) => c.text('Hello from Hono + Node.js!'))

serve({ fetch: app.fetch, port: 3000 })

console.log('Server running on http://localhost:3000')
