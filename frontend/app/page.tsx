"use client"
import React, { useEffect, useState } from "react"
import GoogleLoginButton from "@/components/GoogleLoginButton"

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/session', {  //change this later
      credentials: 'include', 
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn)
      })
      .catch(() => setIsLoggedIn(false))
  }, [])

  if (isLoggedIn === null) return <div>Loading...</div>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {!isLoggedIn && <GoogleLoginButton />}
      {isLoggedIn && <p className="text-white">You are already logged in</p>}
    </div>
  )
}
