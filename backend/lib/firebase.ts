// src/lib/firebase.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import * as serviceAccount from '../serviceAccountKey.json'

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  })
}

export const adminAuth = getAuth()