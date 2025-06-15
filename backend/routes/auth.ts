// src/routes/auth.ts
import { Hono } from 'hono'
import { adminAuth } from '../lib/firebase'

const authRoutes = new Hono()

authRoutes.post('/google-login', async (c) => {
  try {
    const body = await c.req.json()
    const idToken = body.idToken

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedToken.uid
    const email = decodedToken.email

    return c.json({ success: true, uid, email })
  } catch (err) {
    console.error('Error verifying token:', err)
    return c.json({ success: false, error: 'Invalid ID token' }, 401)
  }
})

export default authRoutes
