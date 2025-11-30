import React, { useState } from "react";
import Avatar from '../assets/3D avatar.png';

const HomePage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  
  const handleButtonClick = (route) => {
    window.location.href = route
  };
  
  const uniqueFeatures = [
    {
      title: "AI-Powered Matching",
      content: "Our advanced AI algorithm matches candidates with jobs based on skills, experience, and cultural fit, ensuring perfect matches every time."
    },
    {
      title: "Real-Time Communication",
      content: "Connect instantly with recruiters and candidates through our built-in messaging system, video calls, and interview scheduling tools."
    },
    {
      title: "Comprehensive Analytics",
      content: "Get detailed insights into your job applications, hiring metrics, and market trends to make data-driven career decisions."
    },
    {
      title: "Global Opportunities",
      content: "Access job opportunities from companies worldwide with remote work options and international placement support."
    },
    {
      title: "AI Based Resume Builder",
      content: "You can create professional resumes quickly using our AI-powered resume builder that tailors your resume to specific job descriptions."
    }
  ];
  
  const techLogos = [
    { name: 'Google', logo: '🔍' },
    { name: 'Microsoft', logo: '🪟' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Meta', logo: '👥' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Tesla', logo: '⚡' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Uber', logo: '🚗' },
    { name: 'Airbnb', logo: '🏠' }
  ];

  return (
    <div>
      <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* Left-side Avatar - Full Height */}
      <div className="w-1/2 h-screen relative">
        <img
          src={Avatar}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900"></div>
      </div>

      {/* Right-side Content */}
      <div className="w-1/2 flex flex-col justify-center items-center p-16 relative -ml-1">
        <div className="text-center space-y-8">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
            I am here to
          </h1>
          
          <p className="text-gray-300 text-xl mb-12 max-w-lg leading-relaxed">
            Connect talented professionals with amazing opportunities. Your dream job or perfect candidate is just one click away.
          </p>
          
          <div className="flex flex-col space-y-6 items-center">
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleButtonClick('/jobs')}
            >
              🔍 Search Job
            </button>
            
            <button 
              className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleButtonClick('/Postjobs')}
            >
              📝 Post Job
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl"></div>
      </div>
      
      </div>
      
      {/* Tech Companies Carousel */}
      <div className="bg-gray-800 py-8 overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-300">Trusted by Top Companies</h2>
        </div>
        <div className="flex animate-scroll space-x-12">
          {[...techLogos, ...techLogos].map((company, index) => (
            <div key={index} className="flex items-center space-x-3 bg-gray-700 px-6 py-3 rounded-lg min-w-fit">
              <span className="text-2xl">{company.logo}</span>
              <span className="text-white font-medium whitespace-nowrap">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* What Makes Us Unique Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Makes Us Unique</h2>
            <p className="text-gray-300 text-lg">Discover the features that set HIKKED apart from other job portals</p>
          </div>
          
          <div className="space-y-4">
            {uniqueFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-white">{feature.title}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      openAccordion === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{feature.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;