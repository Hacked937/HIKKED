import React, { useState } from 'react'

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 text-white hover:text-purple-200'
      >
        <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden'>
          {user.profilePicture ? (
            <img src={user.profilePicture} alt='Profile' className='w-full h-full object-cover' />
          ) : (
            <span className='text-purple-600 font-semibold text-sm'>
              {user.name?.charAt(0)?.toUpperCase()}
            </span>
          )}
        </div>
        <span className='hidden md:block'>{user.name}</span>
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
          <button
            onClick={() => window.location.href = '/profile'}
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            View Profile
          </button>
          <button
            onClick={() => window.location.href = '/edit-profile'}
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Edit Profile
          </button>
          {user.userType === 'recruiter' && (
            <button
              onClick={() => window.location.href = '/recruiter-dashboard'}
              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              My Jobs & Applications
            </button>
          )}
          <button
            onClick={() => window.location.href = '/settings'}
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Settings
          </button>
          <hr className='my-1' />
          <button
            onClick={onLogout}
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown