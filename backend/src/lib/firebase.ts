import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}

export const adminAuth = admin.auth()
export const adminFirestore = admin.firestore()

export async function saveTripPromptToFirestore(
  userId: string,
  prompt: string,
  responseJson: any
) {
  try {
    const docRef = adminFirestore.collection('tripPrompts').doc()
    await docRef.set({
      userId,
      prompt,
      response: responseJson,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    console.log('Saved trip prompt to Firestore')
  } catch (error) {
    console.error('Error saving trip prompt:', error)
  }
}
