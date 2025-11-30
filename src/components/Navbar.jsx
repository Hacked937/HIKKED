import React, { useState, useEffect } from 'react'
import Logo from '../assets/Logo.svg'
import Login from './Login'
import Signup from './Signup'
import ProfileDropdown from './ProfileDropdown'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [user, setUser] = useState(null) // null when not logged in

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('hikked_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('hikked_user', JSON.stringify(userData))
    setShowLogin(false)
  }

  const handleSignup = (userData) => {
    setUser(userData)
    localStorage.setItem('hikked_user', JSON.stringify(userData))
    setShowSignup(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('hikked_user')
  }

  return (
    <nav className='bg-gray-900 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div 
            className='flex items-center space-x-2 cursor-pointer'
            onClick={() => window.location.href = '/'}
          >
            <img src={Logo} alt='HIKKED Logo' className='h-8 w-8' />
            <span className='text-xl font-bold bg-gradient-to-r from-[#40ffaa] via-[#4079ff] to-[#40ffaa] bg-clip-text text-transparent' style={{backgroundImage: 'linear-gradient(45deg, #40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa)', animation: 'gradient 3s ease-in-out infinite', backgroundSize: '400% 400%'}}>HIKKED</span>
          </div>
          
          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-6'>
            <div 
              className='text-white hover:text-purple-200 cursor-pointer text-xl'
              onClick={() => window.location.href = '/'}
            >
              Home
            </div>
            <div 
              className='text-white hover:text-purple-200 cursor-pointer text-xl'
              onClick={() => window.location.href = '/jobs'}
            >
              Jobs
            </div>
            <div 
              className='text-white hover:text-purple-200 cursor-pointer text-xl'
              onClick={() => window.location.href = '/resume-builder'}
            >
              Resume Builder
            </div>
            <div 
              className='text-white hover:text-purple-200 cursor-pointer text-xl'
              onClick={() => window.location.href = '/about'}
            >
              About
            </div>
            {user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <>
                <div 
                  className='text-white hover:text-purple-200 cursor-pointer text-xl'
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </div>
                <button 
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                {isOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='md:hidden pb-4'>
            <div className='flex flex-col space-y-2'>
              <div 
                className='text-white hover:text-purple-200 cursor-pointer py-2'
                onClick={() => window.location.href = '/'}
              >
                Home
              </div>
              <div 
                className='text-white hover:text-purple-200 cursor-pointer py-2'
                onClick={() => window.location.href = '/jobs'}
              >
                Jobs
              </div>
              <div 
                className='text-white hover:text-purple-200 cursor-pointer py-2'
                onClick={() => window.location.href = '/resume-builder'}
              >
                Resume Builder
              </div>
              <div className='text-white hover:text-purple-200 cursor-pointer py-2'>Companies</div>
              <div 
                className='text-white hover:text-purple-200 cursor-pointer py-2'
                onClick={() => window.location.href = '/about'}
              >
                About
              </div>
              {user ? (
                <div className='py-2'>
                  <ProfileDropdown user={user} onLogout={handleLogout} />
                </div>
              ) : (
                <>
                  <div 
                    className='text-white hover:text-purple-200 cursor-pointer py-2'
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </div>
                  <button 
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit'
                    onClick={() => setShowSignup(true)}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLogin(false)
            setShowSignup(true)
          }}
        />
      )}
      
      {showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignup(false)
            setShowLogin(true)
          }}
        />
      )}
    </nav>
  )
}

export default Navbar