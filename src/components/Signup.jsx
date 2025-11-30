import React, { useState } from 'react'

const Signup = ({ onClose, onSignup, onSwitchToLogin }) => {
  const [userType, setUserType] = useState('jobseeker')
  const [signupMethod, setSignupMethod] = useState('password') // 'password' or 'otp'
  const [otpStep, setOtpStep] = useState('input') // 'input' or 'verify'
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    otp: '',
    // Job Seeker fields
    skills: '',
    experience: '',
    resume: null,
    // Recruiter fields
    company: '',
    position: '',
    companySize: '',
    // Profile picture
    profilePicture: null
  })

  const handlePasswordSignup = (e) => {
    e.preventDefault()
    completeSignup()
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(otp)
    setOtpStep('verify')
    alert(`OTP sent: ${otp}`) // For demo purposes
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (formData.otp === generatedOtp) {
      completeSignup()
    } else {
      alert('Invalid OTP')
    }
  }

  const completeSignup = () => {
    if (formData.profilePicture) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const userData = {
          name: formData.name,
          email: formData.email,
          userType,
          profilePicture: event.target.result
        }
        onSignup(userData)
      }
      reader.readAsDataURL(formData.profilePicture)
    } else {
      const userData = {
        name: formData.name,
        email: formData.email,
        userType,
        profilePicture: null
      }
      onSignup(userData)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto'>
      <div className='bg-white p-8 rounded-lg w-96 max-w-md my-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Sign Up</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>✕</button>
        </div>
        
        {/* User Type Selection */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>I am a:</label>
          <div className='flex space-x-4'>
            <label className='flex items-center'>
              <input
                type='radio'
                value='jobseeker'
                checked={userType === 'jobseeker'}
                onChange={(e) => setUserType(e.target.value)}
                className='mr-2'
              />
              Job Seeker
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                value='recruiter'
                checked={userType === 'recruiter'}
                onChange={(e) => setUserType(e.target.value)}
                className='mr-2'
              />
              Recruiter
            </label>
          </div>
        </div>
        
        {/* Signup Method Toggle */}
        <div className='flex mb-4 bg-gray-100 rounded-lg p-1'>
          <button
            type='button'
            onClick={() => setSignupMethod('password')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${signupMethod === 'password' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'}`}
          >
            Password
          </button>
          <button
            type='button'
            onClick={() => setSignupMethod('otp')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${signupMethod === 'otp' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'}`}
          >
            OTP
          </button>
        </div>

        <form onSubmit={signupMethod === 'password' ? handlePasswordSignup : (otpStep === 'input' ? handleSendOtp : handleVerifyOtp)} className='space-y-4'>
          {/* Common Fields */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <input
              type='text'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
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
          
          {signupMethod === 'password' && (
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
          )}

          {signupMethod === 'otp' && otpStep === 'verify' && (
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
          )}
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
            <input
              type='tel'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Profile Picture</label>
            <input
              type='file'
              accept='image/*'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              onChange={(e) => setFormData({...formData, profilePicture: e.target.files[0]})}
            />
          </div>
          
          {/* Job Seeker Specific Fields */}
          {userType === 'jobseeker' && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Skills</label>
                <input
                  type='text'
                  placeholder='e.g., JavaScript, React, Node.js'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Experience (years)</label>
                <select
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                >
                  <option value=''>Select experience</option>
                  <option value='0-1'>0-1 years</option>
                  <option value='1-3'>1-3 years</option>
                  <option value='3-5'>3-5 years</option>
                  <option value='5+'>5+ years</option>
                </select>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Resume</label>
                <input
                  type='file'
                  accept='.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      console.log('Resume file selected:', file.name, file.type)
                      setFormData({...formData, resume: file})
                    }
                  }}
                />
                {formData.resume && (
                  <p className='text-sm text-green-600 mt-1'>✓ {formData.resume.name}</p>
                )}
                <p className='text-xs text-gray-500 mt-1'>Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </>
          )}
          
          {/* Recruiter Specific Fields */}
          {userType === 'recruiter' && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Company Name</label>
                <input
                  type='text'
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Your Position</label>
                <input
                  type='text'
                  placeholder='e.g., HR Manager, Talent Acquisition'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Company Size</label>
                <select
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.companySize}
                  onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                >
                  <option value=''>Select company size</option>
                  <option value='1-10'>1-10 employees</option>
                  <option value='11-50'>11-50 employees</option>
                  <option value='51-200'>51-200 employees</option>
                  <option value='200+'>200+ employees</option>
                </select>
              </div>
            </>
          )}
          
          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 font-medium'
          >
            {signupMethod === 'otp' && otpStep === 'input' ? 'Send OTP' : 
             signupMethod === 'otp' && otpStep === 'verify' ? 'Verify & Sign Up' : 
             'Sign Up'}
          </button>
          
          {signupMethod === 'otp' && otpStep === 'verify' && (
            <button
              type='button'
              onClick={() => setOtpStep('input')}
              className='w-full text-purple-600 hover:text-purple-700 text-sm'
            >
              ← Back to form
            </button>
          )}
        </form>
        
        <p className='text-center text-sm text-gray-600 mt-4'>
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className='text-purple-600 hover:text-purple-700 font-medium'>
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signup