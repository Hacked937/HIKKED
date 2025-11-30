import React, { useState, useEffect } from 'react'

const RecruiterProfile = () => {
  const user = JSON.parse(localStorage.getItem('hikked_user') || '{}')
  const [postedJobs, setPostedJobs] = useState([])

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]')
    // Filter jobs posted by current user based on company name
    const userJobs = jobs.filter(job => job.company === user.company)
    setPostedJobs(userJobs)
  }, [user.company])

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
              <span className='inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mt-2'>
                Recruiter
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
                <label className='block text-sm font-medium text-gray-400'>Company</label>
                <p className='text-gray-300'>{user.company || 'Not provided'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-400'>Position</label>
                <p className='text-gray-300'>{user.position || 'Not provided'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-400'>Company Size</label>
                <p className='text-gray-300'>{user.companySize || 'Not provided'}</p>
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
                onClick={() => window.location.href = '/Postjobs'}
                className='w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
              >
                Post New Job
              </button>
              <button 
                onClick={() => window.location.href = '/recruiter-dashboard'}
                className='w-full bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700'
              >
                View Applications
              </button>
            </div>
          </div>
          
          {/* Posted Jobs Section */}
          <div>
            <h2 className='text-2xl font-semibold text-white mb-4'>My Posted Jobs</h2>
            {postedJobs.length === 0 ? (
              <div className='bg-gray-700 p-6 rounded-lg text-center'>
                <p className='text-gray-300 mb-4'>You haven't posted any jobs yet.</p>
                <button 
                  onClick={() => window.location.href = '/Postjobs'}
                  className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
                >
                  Post Your First Job
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {postedJobs.map((job) => (
                  <div key={job.id} className='bg-gray-700 border border-gray-600 rounded-lg p-4'>
                    <h3 className='font-semibold text-white'>{job.title}</h3>
                    <p className='text-gray-300 text-sm'>{job.company}</p>
                    <p className='text-gray-400 text-sm'>📍 {job.location}</p>
                    <div className='flex justify-between items-center mt-3'>
                      <span className='text-sm text-gray-400'>Posted: {job.postedDate}</span>
                      <span className='bg-blue-600 text-blue-100 px-2 py-1 rounded text-sm'>
                        {job.applications?.length || 0} Applications
                      </span>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/recruiter-dashboard'}
                      className='mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 text-sm'
                    >
                      View Applications
                    </button>
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

export default RecruiterProfile