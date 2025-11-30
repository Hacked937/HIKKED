import React, { useState } from 'react'

const Login = ({ onClose, onLogin, onSwitchToSignup }) => {
  const [loginMethod, setLoginMethod] = useState('password') // 'password' or 'otp'
  const [otpStep, setOtpStep] = useState('input') // 'input' or 'verify'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  })
  const [generatedOtp, setGeneratedOtp] = useState('')

  const handlePasswordLogin = (e) => {
    e.preventDefault()
    const userData = {
      name: 'John Doe',
      email: formData.email,
      profilePicture: null
    }
    onLogin(userData)
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(otp)
    setOtpStep('verify')
    // In real app, send OTP via email/SMS
    alert(`OTP sent: ${otp}`) // For demo purposes
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (formData.otp === generatedOtp) {
      const userData = {
        name: 'John Doe',
        email: formData.email || formData.phone,
        profilePicture: null
      }
      onLogin(userData)
    } else {
      alert('Invalid OTP')
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-8 rounded-lg w-96 max-w-md'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Login</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>✕</button>
        </div>
        
        {/* Login Method Toggle */}
        <div className='flex mb-4 bg-gray-100 rounded-lg p-1'>
          <button
            type='button'
            onClick={() => setLoginMethod('password')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${loginMethod === 'password' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'}`}
          >
            Password
          </button>
          <button
            type='button'
            onClick={() => setLoginMethod('otp')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${loginMethod === 'otp' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'}`}
          >
            OTP
          </button>
        </div>

        {loginMethod === 'password' ? (
          <form onSubmit={handlePasswordLogin} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input
                type='password'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <button
              type='submit'
              className='w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 font-medium'
            >
              Login
            </button>
          </form>
        ) : (
          otpStep === 'input' ? (
            <form onSubmit={handleSendOtp} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email or Phone</label>
                <input
                  type='text'
                  required
                  placeholder='Enter email or phone number'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.email || formData.phone}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value.includes('@')) {
                      setFormData({...formData, email: value, phone: ''})
                    } else {
                      setFormData({...formData, phone: value, email: ''})
                    }
                  }}
                />
              </div>
              
              <button
                type='submit'
                className='w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 font-medium'
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Enter OTP</label>
                <input
                  type='text'
                  required
                  maxLength='6'
                  placeholder='Enter 6-digit OTP'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg tracking-widest'
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                />
              </div>
              
              <button
                type='submit'
                className='w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 font-medium'
              >
                Verify OTP
              </button>
              
              <button
                type='button'
                onClick={() => setOtpStep('input')}
                className='w-full text-purple-600 hover:text-purple-700 text-sm'
              >
                ← Back to enter email/phone
              </button>
            </form>
          )
        )}
        
        <p className='text-center text-sm text-gray-600 mt-4'>
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className='text-purple-600 hover:text-purple-700 font-medium'>
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login