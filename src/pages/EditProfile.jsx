import React, { useState } from 'react'

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('hikked_user') || '{}')
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    skills: user.skills || '',
    experience: user.experience || '',
    company: user.company || '',
    position: user.position || '',
    companySize: user.companySize || '',
    profilePicture: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Handle profile picture update
    if (formData.profilePicture) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const updatedUser = {
          ...user,
          ...formData,
          profilePicture: event.target.result
        }
        localStorage.setItem('hikked_user', JSON.stringify(updatedUser))
        alert('Profile updated successfully!')
        window.location.href = '/profile'
      }
      reader.readAsDataURL(formData.profilePicture)
    } else {
      const updatedUser = {
        ...user,
        ...formData
      }
      localStorage.setItem('hikked_user', JSON.stringify(updatedUser))
      alert('Profile updated successfully!')
      window.location.href = '/profile'
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6'>Edit Profile</h1>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex items-center space-x-6 mb-6'>
              <div className='w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center overflow-hidden'>
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt='Profile' className='w-full h-full object-cover' />
                ) : (
                  <span className='text-white text-2xl font-bold'>
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Change Profile Picture</label>
                <input
                  type='file'
                  accept='image/*'
                  className='text-sm text-gray-500'
                  onChange={(e) => setFormData({...formData, profilePicture: e.target.files[0]})}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input
                  type='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                <input
                  type='tel'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {user.userType === 'jobseeker' && (
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
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Experience</label>
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
                </>
              )}

              {user.userType === 'recruiter' && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Company</label>
                    <input
                      type='text'
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Position</label>
                    <input
                      type='text'
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
            </div>

            <div className='flex space-x-4'>
              <button
                type='submit'
                className='bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700'
              >
                Save Changes
              </button>
              <button
                type='button'
                onClick={() => window.location.href = '/profile'}
                className='bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile