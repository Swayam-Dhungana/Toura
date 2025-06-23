// src/index.ts
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import authRoutes from './src/routes/api'
import hotelRoutes from './src/routes/hotel'
import { cors } from 'hono/cors'
import 'dotenv/config'

const app = new Hono()
app.use(
  '*',
  cors({
    origin: process.env.BASEURL as string,
    credentials: true,
  })
)
app.route('/api', authRoutes)
app.route('/api/v1',hotelRoutes)
app.get('/', (c) => c.text('Hello from Hono + Node.js!'))

serve({ fetch: app.fetch, port: 3000 })

console.log('Server running on http://localhost:3000')
