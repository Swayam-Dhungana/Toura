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
  return c.text('Hello from Hono + Node.js!')
})

export default app.fetch