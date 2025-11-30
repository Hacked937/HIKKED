import React, { useState, useEffect } from 'react'

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('hikked_user') || '{}')
    const postedJobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]')
    // Filter jobs posted by current user based on company name
    const userJobs = postedJobs.filter(job => job.company === user.company)
    setJobs(userJobs)
  }, [])

  const viewApplicants = (job) => {
    setSelectedJob(job)
    setSelectedApplicant(null)
  }

  const viewApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Recruiter Dashboard</h1>
        
        {!selectedJob ? (
          // Jobs Overview
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Posted Jobs</h2>
            {jobs.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl">No jobs posted yet.</p>
                <button 
                  onClick={() => window.location.href = '/Postjobs'}
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Post Your First Job
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-blue-400 mb-2">{job.company}</p>
                    <p className="text-gray-300 mb-4">📍 {job.location}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Posted: {job.postedDate}</span>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {job.applications?.length || 0} Applications
                      </span>
                    </div>
                    
                    <button
                      onClick={() => viewApplicants(job)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300"
                    >
                      View Applications
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : !selectedApplicant ? (
          // Applicants List
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedJob(null)}
                className="text-blue-400 hover:text-blue-300 mr-4"
              >
                ← Back to Jobs
              </button>
              <h2 className="text-2xl font-semibold text-white">
                Applications for {selectedJob.title}
              </h2>
            </div>
            
            {selectedJob.applications?.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl">No applications yet.</p>
                <p>Share your job posting to get more applicants!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedJob.applications?.map((applicant) => (
                  <div key={applicant.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{applicant.name}</h3>
                        <p className="text-blue-400">{applicant.email}</p>
                        <p className="text-gray-300">{applicant.phone}</p>
                      </div>
                      <span className="text-gray-400 text-sm">
                        Applied: {applicant.appliedDate}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Cover Letter Preview:</h4>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {applicant.coverLetter}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => viewApplicantDetails(applicant)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    >
                      View Full Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Applicant Details
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-blue-400 hover:text-blue-300 mr-4"
              >
                ← Back to Applications
              </button>
              <h2 className="text-2xl font-semibold text-white">
                {selectedApplicant.name}'s Profile
              </h2>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300"><span className="text-gray-400">Name:</span> {selectedApplicant.name}</p>
                    <p className="text-gray-300"><span className="text-gray-400">Email:</span> {selectedApplicant.email}</p>
                    <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {selectedApplicant.phone}</p>
                    <p className="text-gray-300"><span className="text-gray-400">Applied:</span> {selectedApplicant.appliedDate}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Application Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300"><span className="text-gray-400">Position:</span> {selectedJob.title}</p>
                    <p className="text-gray-300"><span className="text-gray-400">Company:</span> {selectedJob.company}</p>
                    {selectedApplicant.resume && (
                      <p className="text-gray-300"><span className="text-gray-400">Resume:</span> {selectedApplicant.resume.name}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Cover Letter</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedApplicant.coverLetter}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300">
                  Accept Application
                </button>
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300">
                  Reject Application
                </button>
                <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecruiterDashboard