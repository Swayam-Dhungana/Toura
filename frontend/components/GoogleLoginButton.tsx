import React, { useState } from 'react'
import { auth, googleProvider } from '../lib/firebaseClient'
import { signInWithPopup } from 'firebase/auth'

const GoogleLoginButton = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    if (loading) return // prevent multiple clicks
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const idToken = await user.getIdToken()

      const response = await fetch(`${baseUrl}/api/setcookie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      })

      const data = await response.json()
      console.log('Backend response:', data)

      if (!data.success) {
        console.error('Failed to set cookie:', data.error)
      }
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.warn('Popup cancelled or multiple popups opened.')
      } else if (error.code === 'auth/unauthorized-domain') {
        alert(
          'Unauthorized domain. Please add your domain to Firebase console authorized domains.'
        )
      } else {
        console.error('Google login error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`px-4 py-2 rounded text-white transition ${
        loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {loading ? 'Signing in...' : 'Sign in'}
    </button>
  )
}

export default GoogleLoginButton
