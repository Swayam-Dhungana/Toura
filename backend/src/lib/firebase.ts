import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json' //Connect a service account firebase


//This is required for user Validation in the backend
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}

export const adminAuth = admin.auth()
export const adminFirestore = admin.firestore()