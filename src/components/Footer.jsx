import React from 'react'
import Logo from '../assets/Logo.svg'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <img src={Logo} alt='HIKKED Logo' className='h-8 w-8' />
              <span className='text-xl font-bold'>HIKKED</span>
            </div>
            <p className='text-gray-400'>Your gateway to dream careers and top talent.</p>
          </div>
          
          {/* For Job Seekers */}
          <div>
            <h3 className='font-semibold mb-4'>For Job Seekers</h3>
            <ul className='space-y-2 text-gray-400'>
              <li><a href='/jobs' className='hover:text-white'>Browse Jobs</a></li>
              <li><a href='/companies' className='hover:text-white'>Companies</a></li>
              <li><a href='/career-advice' className='hover:text-white'>Career Advice</a></li>
              <li><a href='/resume-builder' className='hover:text-white'>Resume Builder</a></li>
            </ul>
          </div>
          
          {/* For Employers */}
          <div>
            <h3 className='font-semibold mb-4'>For Employers</h3>
            <ul className='space-y-2 text-gray-400'>
              <li><a href='/post-job' className='hover:text-white'>Post a Job</a></li>
              <li><a href='/browse-resumes' className='hover:text-white'>Browse Resumes</a></li>
              <li><a href='/pricing' className='hover:text-white'>Pricing</a></li>
              <li><a href='/employer-resources' className='hover:text-white'>Resources</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className='font-semibold mb-4'>Company</h3>
            <ul className='space-y-2 text-gray-400'>
              <li><a href='/about' className='hover:text-white'>About Us</a></li>
              <li><a href='/contact' className='hover:text-white'>Contact</a></li>
              <li><a href='/privacy' className='hover:text-white'>Privacy Policy</a></li>
              <li><a href='/terms' className='hover:text-white'>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2024 HIKKED. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer