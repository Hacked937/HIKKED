import React, { useState, useEffect } from 'react'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplication, setShowApplication] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    experience: ''
  })
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  })

  useEffect(() => {
    // Load jobs from localStorage
    const postedJobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]')
    setJobs(postedJobs)
    setFilteredJobs(postedJobs)
    
    // Pre-fill application form with user data if logged in
    const currentUser = JSON.parse(localStorage.getItem('hikked_user') || '{}')
    if (currentUser.email) {
      setApplicationData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || ''
      }))
    }
  }, [])

  useEffect(() => {
    // Filter jobs based on search criteria
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.skills.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesLocation = !filters.location || 
                             job.location.toLowerCase().includes(filters.location.toLowerCase())
      
      const matchesType = !filters.type || job.type === filters.type
      
      const matchesExperience = !filters.experience || job.experience === filters.experience
      
      return matchesSearch && matchesLocation && matchesType && matchesExperience
    })
    
    setFilteredJobs(filtered)
  }, [jobs, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      experience: ''
    })
  }

  const handleApply = (job) => {
    setSelectedJob(job)
    setShowApplication(true)
  }

  const handleSubmitApplication = (e) => {
    e.preventDefault()
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('hikked_user') || '{}')
    
    // Get current jobs
    const currentJobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]')
    
    // Find the job and add application
    const updatedJobs = currentJobs.map(job => {
      if (job.id === selectedJob.id) {
        return {
          ...job,
          applications: [...(job.applications || []), {
            id: Date.now(),
            ...applicationData,
            userEmail: currentUser.email || applicationData.email,
            appliedDate: new Date().toISOString().split('T')[0]
          }]
        }
      }
      return job
    })
    
    // Update jobs localStorage
    localStorage.setItem('posted_jobs', JSON.stringify(updatedJobs))
    
    // Track user applications
    const userApplications = JSON.parse(localStorage.getItem('user_applications') || '[]')
    const newApplication = {
      id: Date.now(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      location: selectedJob.location,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      userEmail: currentUser.email || applicationData.email,
      ...applicationData
    }
    
    userApplications.push(newApplication)
    localStorage.setItem('user_applications', JSON.stringify(userApplications))
    
    alert('Application submitted successfully!')
    setShowApplication(false)
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Available Jobs</h1>
        
        {/* Filter Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Jobs</label>
              <input
                type="text"
                placeholder="Job title, company, skills..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-300">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <button
              onClick={clearFilters}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {jobs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No jobs posted yet.</p>
            <p>Check back later for new opportunities!</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No jobs match your search criteria.</p>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{job.title}</h2>
                    <p className="text-blue-400 font-semibold">{job.company}</p>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-300"><span className="text-gray-400">📍</span> {job.location}</p>
                  <p className="text-gray-300"><span className="text-gray-400">💰</span> {job.salary}</p>
                  <p className="text-gray-300"><span className="text-gray-400">📈</span> {job.experience}</p>
                  <p className="text-gray-300"><span className="text-gray-400">📅</span> Deadline: {job.deadline}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-white font-semibold mb-2">Skills Required:</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.split(',').map((skill, index) => (
                      <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-sm text-gray-400">
                    <span>Posted: {job.postedDate}</span>
                    <span className="text-blue-400 font-medium">
                      {job.applications?.length || 0} applicants
                    </span>
                  </div>
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Application Modal */}
        {showApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Apply for {selectedJob?.title}</h2>
                <button
                  onClick={() => setShowApplication(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={applicationData.name}
                    onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cover Letter</label>
                  <textarea
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                    placeholder="Tell us why you're perfect for this role..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Resume</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setApplicationData({...applicationData, resume: e.target.files[0]})}
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplication(false)}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs