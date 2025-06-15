import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import dotenv from 'dotenv'

dotenv.config()

const app = new Hono()

app.get('/', (c) => c.text('Toura backend running with Hono + Node.js'))

const port = Number(process.env.PORT) || 3000

serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running at http://localhost:${port}`)
})
