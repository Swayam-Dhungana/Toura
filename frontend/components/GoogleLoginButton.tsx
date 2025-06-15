"use client"

import React from 'react'
import { auth, googleProvider } from '../lib/firebaseClient'
import { signInWithPopup } from 'firebase/auth'

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const idToken = await user.getIdToken()

      console.log('User:', user)
      console.log('ID Token:', idToken)

      // TODO: Send this idToken to your backend to verify and create session
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Sign in with Google
    </button>
  )
}

export default GoogleLoginButton
