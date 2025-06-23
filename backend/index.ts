// src/index.ts
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import authRoutes from './src/routes/api'
import hotelRoutes from './src/routes/hotel'

const app = new Hono()
app.use('*', async (c, next) => {
  const origin = process.env.BASEURL as string
  c.header('Access-Control-Allow-Origin', origin)
  c.header('Access-Control-Allow-Credentials', 'true')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

  if (c.req.method === 'OPTIONS') {
    return c.text('', 400) // Respond immediately for preflight
  }

  await next()
})

app.route('/api', authRoutes)
app.route('/api/v1',hotelRoutes)
app.get('/', (c) => c.text('Hello from Hono + Node.js!'))

serve({ fetch: app.fetch, port: 3000 })

