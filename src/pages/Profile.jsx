import React, { useEffect } from 'react'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('hikked_user') || '{}')

  useEffect(() => {
    // Redirect to appropriate profile based on user type
    if (user.userType === 'recruiter') {
      window.location.href = '/recruiter-profile'
    } else {
      window.location.href = '/jobseeker-profile'
    }
  }, [])

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
        <p className='text-white'>Redirecting to your profile...</p>
      </div>
    </div>
  )
}

export default Profile