import React, { useState, useEffect } from 'react'

const JobSeekerProfile = () => {
  const user = JSON.parse(localStorage.getItem('hikked_user') || '{}')
  const [appliedJobs, setAppliedJobs] = useState([])

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('user_applications') || '[]')
    // Filter applications made by current user based on email (check both email and userEmail fields)
    const userApplications = applications.filter(app => 
      app.email === user.email || app.userEmail === user.email
    )
    setAppliedJobs(userApplications)
  }, [user.email])

  return (
    <div className='min-h-screen bg-gray-900 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-gray-800 rounded-lg shadow-md p-8'>
          <div className='flex items-center space-x-6 mb-8'>
            <div className='w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center overflow-hidden'>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt='Profile' className='w-full h-full object-cover' />
              ) : (
                <span className='text-white text-3xl font-bold'>
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className='text-3xl font-bold text-white'>{user.name}</h1>
              <p className='text-gray-300'>{user.email}</p>
              <span className='inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2'>
                Job Seeker
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-white'>Personal Information</h2>
              <div>
                <label className='block text-sm font-medium text-gray-400'>Full Name</label>
                <p className='text-gray-300'>{user.name || 'Not provided'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-400'>Email</label>
                <p className='text-gray-300'>{user.email || 'Not provided'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-400'>Skills</label>
                <p className='text-gray-300'>{user.skills || 'Not provided'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-400'>Experience</label>
                <p className='text-gray-300'>{user.experience || 'Not provided'}</p>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-white'>Quick Actions</h2>
              <button 
                onClick={() => window.location.href = '/edit-profile'}
                className='w-full bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700'
              >
                Edit Profile
              </button>
              <button 
                onClick={() => window.location.href = '/jobs'}
                className='w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
              >
                Browse Jobs
              </button>
            </div>
          </div>
          
          {/* Job Applications Section */}
          <div>
            <h2 className='text-2xl font-semibold text-white mb-4'>My Job Applications</h2>
            {appliedJobs.length === 0 ? (
              <div className='bg-gray-700 p-6 rounded-lg text-center'>
                <p className='text-gray-300 mb-4'>You haven't applied to any jobs yet.</p>
                <button 
                  onClick={() => window.location.href = '/jobs'}
                  className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                {appliedJobs.map((application) => (
                  <div key={application.id} className='bg-gray-700 border border-gray-600 rounded-lg p-4'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-semibold text-white'>{application.jobTitle}</h3>
                        <p className='text-gray-300 text-sm'>{application.company}</p>
                        <p className='text-gray-400 text-sm'>📍 {application.location}</p>
                      </div>
                      <div className='text-right'>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          application.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                          application.status === 'accepted' ? 'bg-green-600 text-green-100' :
                          'bg-red-600 text-red-100'
                        }`}>
                          {application.status || 'Pending'}
                        </span>
                        <p className='text-gray-400 text-sm mt-1'>Applied: {application.appliedDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSeekerProfile