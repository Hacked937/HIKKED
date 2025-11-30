import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false)

  const handleLogin = (userData) => {
    localStorage.setItem('hikked_user', JSON.stringify(userData))
    window.location.href = '/'
  }

  const handleSignup = (userData) => {
    localStorage.setItem('hikked_user', JSON.stringify(userData))
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {showSignup ? (
        <Signup 
          onClose={() => window.location.href = '/'}
          onSignup={handleSignup}
          onSwitchToLogin={() => setShowSignup(false)}
        />
      ) : (
        <Login 
          onClose={() => window.location.href = '/'}
          onLogin={handleLogin}
          onSwitchToSignup={() => setShowSignup(true)}
        />
      )}
    </div>
  )
}

export default LoginPage