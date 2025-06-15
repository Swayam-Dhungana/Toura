// src/routes/auth.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors' // Import CORS middleware
import { adminAuth } from '../lib/firebase'

const authRoutes = new Hono()

// Use CORS middleware with options
authRoutes.use(
  '*',
  cors({
    origin: 'http://localhost:3001',  // Change this to your frontend origin!
    credentials: true,
  })
)

authRoutes.post('/setcookie', async (c) => {
  try {
    const body = await c.req.json()
    const idToken = body.idToken

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedToken.uid
    const email = decodedToken.email

    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    c.header(
      'Set-Cookie',
      `session=${sessionCookie}; HttpOnly; Path=/; Max-Age=${expiresIn / 1000}; ${
        process.env.NODE_ENV === 'production' ? 'Secure; SameSite=Strict' : ''
      }`
    )

    return c.json({ success: true, uid, email })
  } catch (err) {
    console.error('Error verifying token:', err)
    return c.json({ success: false, error: 'Invalid ID token' }, 401)
  }
})


authRoutes.get('/session', async (c) => {
  try {
    const cookie = c.req.header('cookie')
    if (!cookie) throw new Error('No cookie')

    // Extract the session cookie value from cookie header (parse cookie string)
    const match = cookie.match(/session=([^;]+)/)
    if (!match) throw new Error('No session cookie')

    const sessionCookie = match[1]

    // Verify session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    // session valid
    return c.json({ loggedIn: true, uid: decodedClaims.uid, email: decodedClaims.email })
  } catch (err) {
    // session invalid or no cookie
    return c.json({ loggedIn: false })
  }
})


export default authRoutes
