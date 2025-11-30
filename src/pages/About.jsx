import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About HIKKED</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting talented professionals with amazing opportunities. We're revolutionizing the way people find jobs and companies discover talent.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto">
            At HIKKED, we believe that finding the right job shouldn't be a struggle. Our platform bridges the gap between job seekers and employers, 
            creating meaningful connections that drive career growth and business success. We're committed to making the hiring process transparent, 
            efficient, and accessible for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Job Matching</h3>
            <p className="text-gray-300">
              Our advanced algorithm matches candidates with jobs based on skills, experience, and preferences.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white mb-3">Resume Builder</h3>
            <p className="text-gray-300">
              Create professional resumes with our easy-to-use builder featuring multiple templates and real-time preview.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-white mb-3">Secure Platform</h3>
            <p className="text-gray-300">
              Your data is protected with advanced security measures and OTP-based authentication for safe access.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Fast Applications</h3>
            <p className="text-gray-300">
              Apply to multiple jobs quickly with saved profiles and one-click application submissions.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Application Tracking</h3>
            <p className="text-gray-300">
              Keep track of all your applications with real-time status updates and detailed analytics.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-3">Recruiter Tools</h3>
            <p className="text-gray-300">
              Powerful dashboard for recruiters to post jobs, manage applications, and find the best candidates.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <p className="text-blue-100">Job Seekers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5K+</div>
              <p className="text-blue-100">Jobs Posted</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">2K+</div>
              <p className="text-blue-100">Successful Hires</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose HIKKED?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">For Job Seekers</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Free resume builder with professional templates</li>
                <li>• Advanced job search and filtering options</li>
                <li>• Application status tracking</li>
                <li>• Profile management and skill showcase</li>
                <li>• Direct communication with recruiters</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">For Recruiters</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Easy job posting with detailed requirements</li>
                <li>• Candidate management dashboard</li>
                <li>• Application filtering and sorting</li>
                <li>• Company profile and branding</li>
                <li>• Analytics and hiring insights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6">
            Join thousands of professionals who have found their dream jobs through HIKKED.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.href = '/jobs'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign Up Today
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About