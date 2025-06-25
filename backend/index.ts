import { Hono } from 'hono'
import authRoutes from './src/routes/api'
import hotelRoutes from './src/routes/hotel'

const app = new Hono()

app.use('*', async (c, next) => {
  const origin = 'https://toura-swart.vercel.app'
  c.header('Access-Control-Allow-Origin', origin)
  c.header('Access-Control-Allow-Credentials', 'true')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

  if (c.req.method === 'OPTIONS') {
    return c.text('', 200)
  }

  await next()
})

app.route('/api', authRoutes)
app.route('/api/v1', hotelRoutes)

app.get('/', (c) => {
  return c.text('Hello from Hono + Bun on Railway!')
})

// 🚀 Start the Bun server (THIS is the part Railway needs)
const port = Number(process.env.PORT) || 3000

console.log(`🚀 Server running on http://localhost:${port}`)

Bun.serve({
  port,
  fetch: app.fetch,
})
