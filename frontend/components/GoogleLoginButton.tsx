"use client"


import React from 'react'
import { auth, googleProvider } from '../lib/firebaseClient'
import { signInWithPopup } from 'firebase/auth'

const GoogleLoginButton = () => {
  const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Get the Firebase ID token
      const idToken = await user.getIdToken()

      // Send the ID token to your backend
      const response = await fetch(`${baseUrl}/api/setcookie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important to send/receive cookies
        body: JSON.stringify({ idToken }),
      })

      const data = await response.json()
      console.log('Backend response:', data)

      if (data.success) {
        console.log('Cookie set successfully')
      } else {
        console.error('Failed to set cookie:', data.error)
      }
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-700 transition"
    >
      Sign in
    </button>
  )
}

export default GoogleLoginButton
