// src/utils/auth.ts
import { adminAuth } from '../lib/firebase'
import { Context } from 'hono'

export async function getUserIdFromCookie(c: Context): Promise<string | null> {
  try {
    const cookie = c.req.header('cookie')
    if (!cookie) return null

    const match = cookie.match(/session=([^;]+)/)
    if (!match) return null

    const sessionCookie = match[1]
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    return decodedClaims.uid || null
  } catch (err) {
    return null
  }
}
