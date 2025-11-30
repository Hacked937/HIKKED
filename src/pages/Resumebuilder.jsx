import React, { useState, useRef, useCallback } from 'react';
import {
  User, Mail, Phone, MapPin, Link, Briefcase, GraduationCap, Code, PlusCircle, X, Download, LayoutTemplate,
} from 'lucide-react';

// --- Data Structures ---

const getDefaultResumeData = () => ({
  template: 'modern',
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
});

// --- Components for Resume Preview ---

const ContactItem = ({ icon: Icon, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-center text-sm md:text-base text-gray-700 space-x-2">
      <Icon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
      <span className="truncate">{value}</span>
    </div>
  );
};

const SectionTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold uppercase tracking-wider text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-2 ${className}`}>
    {children}
  </h2>
);

const ExperienceBlock = ({ exp }) => {
  if (!exp.title && !exp.company) return null;
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{exp.title || 'Job Title'}</h3>
        <span className="text-sm font-medium text-gray-500 flex-shrink-0 ml-4">
          {exp.startDate || 'Start'} - {exp.endDate || 'End'}
        </span>
      </div>
      <p className="italic text-indigo-600 mb-1">{exp.company || 'Company Name'}</p>
      <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description || 'Job description...'}</p>
    </div>
  );
};

const EducationBlock = ({ edu }) => {
  if (!edu.degree && !edu.institution) return null;
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
        <span className="text-sm font-medium text-gray-500 flex-shrink-0 ml-4">{edu.graduationYear || 'Year'}</span>
      </div>
      <p className="italic text-indigo-600 mb-1">
        {edu.institution || 'Institution'}{edu.city ? `, ${edu.city}` : ''}
      </p>
    </div>
  );
};

// --- Resume Templates ---

// 1. Modern Template
const ModernResume = ({ data }) => (
  <div className="p-8 space-y-6 bg-white shadow-xl min-h-[1122px] print:min-h-0">
    <header className="pb-4 border-b-4 border-indigo-600">
      <h1 className="text-4xl font-extrabold text-gray-900">{data.personal.name || 'Your Name'}</h1>
      <h2 className="text-xl font-medium text-indigo-600 mt-1">{data.personal.title || 'Professional Title'}</h2>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <ContactItem icon={Mail} value={data.personal.email || 'email@example.com'} />
        <ContactItem icon={Phone} value={data.personal.phone || '(555) 123-4567'} />
        <ContactItem icon={Link} value={data.personal.linkedin || 'linkedin.com/in/yourname'} />
      </div>
    </header>

    <section>
      <SectionTitle>Summary</SectionTitle>
      <p className="text-base text-gray-800 whitespace-pre-line">
        {data.personal.summary || 'Write a brief professional summary highlighting your key skills and experience...'}
      </p>
    </section>

    <section>
      <SectionTitle>Experience</SectionTitle>
      {data.experience.map((exp) => (
        <ExperienceBlock key={exp.id} exp={exp} />
      ))}
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="md:col-span-2">
        <SectionTitle>Education</SectionTitle>
        {data.education.map((edu) => (
          <EducationBlock key={edu.id} edu={edu} />
        ))}
      </section>

      <section className="md:col-span-1">
        <SectionTitle>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// 2. Classic Template
const ClassicResume = ({ data }) => (
  <div className="p-8 space-y-6 bg-white shadow-xl min-h-[1122px] print:min-h-0 font-serif">
    <header className="text-center pb-3 border-b border-gray-400">
      <h1 className="text-3xl font-bold text-gray-800 uppercase">{data.personal.name}</h1>
      <h2 className="text-lg text-gray-600 mt-1">{data.personal.title}</h2>
      <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
        <span>{data.personal.email}</span>
        {data.personal.phone && <span>|</span>}
        <span>{data.personal.phone}</span>
        {data.personal.linkedin && <span>|</span>}
        <span>{data.personal.linkedin}</span>
      </div>
    </header>

    <section>
      <SectionTitle className="!text-gray-800 !border-gray-400">Profile Summary</SectionTitle>
      <p className="text-base text-gray-700 whitespace-pre-line">{data.personal.summary}</p>
    </section>

    <section>
      <SectionTitle className="!text-gray-800 !border-gray-400">Professional Experience</SectionTitle>
      {data.experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between font-semibold">
            <span>{exp.title}, {exp.company}</span>
            <span className="text-sm font-normal">{exp.startDate} - {exp.endDate}</span>
          </div>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mt-1">
            {exp.description.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <section>
      <SectionTitle className="!text-gray-800 !border-gray-400">Education</SectionTitle>
      {data.education.map((edu) => (
        <div key={edu.id} className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
          <span className="text-sm font-normal text-gray-600">{edu.institution}, {edu.city} ({edu.graduationYear})</span>
        </div>
      ))}
    </section>

    <section>
      <SectionTitle className="!text-gray-800 !border-gray-400">Key Skills</SectionTitle>
      <p className="text-sm text-gray-700">{data.skills.join(' • ')}</p>
    </section>
  </div>
);

const ResumePreview = ({ data }) => {
  const ResumeComponent = data.template === 'modern' ? ModernResume : ClassicResume;
  return (
    <div id="resume-content">
      <ResumeComponent data={data} />
    </div>
  );
};

// --- Input Form Components ---

const InputField = ({ label, id, value, onChange, type = 'text', rows = 1, placeholder }) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {rows > 1 ? (
      <textarea
        id={id}
        rows={rows}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border resize-none"
      />
    ) : (
      <input
        type={type}
        id={id}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
      />
    )}
  </div>
);

const SectionContainer = ({ title, children, icon: Icon, onAdd }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-indigo-100 mb-6">
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <h3 className="text-lg font-bold text-indigo-700 flex items-center">
        <Icon className="w-5 h-5 mr-2" />
        {title}
      </h3>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-full transition duration-150 shadow-md"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> Add
        </button>
      )}
    </div>
    {children}
  </div>
);

const ExperienceForm = ({ exp, index, handleChange, handleRemove }) => (
  <div className={`p-4 border rounded-md mb-4 bg-indigo-50 ${index > 0 ? 'mt-4' : ''}`}>
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold text-indigo-700">Experience #{index + 1}</h4>
      <button onClick={() => handleRemove(exp.id)} className="text-gray-500 hover:text-red-600">
        <X className="w-5 h-5" />
      </button>
    </div>
    <InputField
      label="Job Title *"
      id={`exp-${exp.id}-title`}
      value={exp.title}
      onChange={(e) => handleChange(exp.id, 'title', e.target.value)}
      placeholder="e.g., Software Engineer"
    />
    <InputField
      label="Company *"
      id={`exp-${exp.id}-company`}
      value={exp.company}
      onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
      placeholder="e.g., Google Inc."
    />
    <div className="grid grid-cols-2 gap-4">
      <InputField
        label="Start Date"
        id={`exp-${exp.id}-start`}
        value={exp.startDate}
        onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
        placeholder="Jan 2020"
      />
      <InputField
        label="End Date"
        id={`exp-${exp.id}-end`}
        value={exp.endDate}
        onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
        placeholder="Dec 2022 or Present"
      />
    </div>
    <InputField
      label="Job Description"
      id={`exp-${exp.id}-description`}
      value={exp.description}
      onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
      rows={4}
      placeholder="• Developed web applications using React and Node.js&#10;• Led a team of 5 developers&#10;• Improved system performance by 30%"
    />
    <p className="text-xs text-gray-500 mt-1">Tip: Start each line with • for bullet points</p>
  </div>
);

const EducationForm = ({ edu, index, handleChange, handleRemove }) => (
  <div className={`p-4 border rounded-md mb-4 bg-indigo-50 ${index > 0 ? 'mt-4' : ''}`}>
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold text-indigo-700">Education #{index + 1}</h4>
      <button onClick={() => handleRemove(edu.id)} className="text-gray-500 hover:text-red-600">
        <X className="w-5 h-5" />
      </button>
    </div>
    <InputField
      label="Degree/Certification *"
      id={`edu-${edu.id}-degree`}
      value={edu.degree}
      onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
      placeholder="e.g., Bachelor of Science in Computer Science"
    />
    <InputField
      label="Institution *"
      id={`edu-${edu.id}-institution`}
      value={edu.institution}
      onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
      placeholder="e.g., Stanford University"
    />
    <div className="grid grid-cols-2 gap-4">
      <InputField
        label="Location"
        id={`edu-${edu.id}-city`}
        value={edu.city}
        onChange={(e) => handleChange(edu.id, 'city', e.target.value)}
        placeholder="Stanford, CA"
      />
      <InputField
        label="Graduation Year"
        id={`edu-${edu.id}-year`}
        value={edu.graduationYear}
        onChange={(e) => handleChange(edu.id, 'graduationYear', e.target.value)}
        placeholder="2020"
      />
    </div>
  </div>
);


// --- Main Application Component ---

const App = () => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resume_data');
    return saved ? JSON.parse(saved) : getDefaultResumeData();
  });
  const [activeTab, setActiveTab] = useState('personal');
  const resumeRef = useRef(null);

  // Save to localStorage only when component unmounts or on manual save
  const saveToStorage = React.useCallback(() => {
    localStorage.setItem('resume_data', JSON.stringify(resumeData));
  }, [resumeData]);

  React.useEffect(() => {
    return () => saveToStorage();
  }, [saveToStorage]);

  const updatePersonal = useCallback((key, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [key]: value },
    }));
  }, []);

  const updateArray = useCallback((section, id, key, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  }, []);

  const addArrayItem = useCallback((section, defaults) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now(), ...defaults }],
    }));
  }, []);

  const removeArrayItem = useCallback((section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id),
    }));
  }, []);

  const [skillsText, setSkillsText] = useState('');

  React.useEffect(() => {
    setSkillsText(resumeData.skills.join(' '));
  }, [resumeData.skills]);

  const handleSkillChange = useCallback((e) => {
    const value = e.target.value;
    setSkillsText(value);
    const skillsArray = value.split(' ').map(s => s.trim()).filter(s => s.length > 0);
    setResumeData(prev => ({
      ...prev,
      skills: skillsArray,
    }));
  }, []);

  const handleDownload = () => {
    // This is a simple simulation using the browser's print-to-PDF functionality
    window.print();
  };

  const handleTemplateChange = (template) => {
    setResumeData(prev => ({ ...prev, template }));
  };

  const renderInputForm = () => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-h-screen overflow-y-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Resume Details</h2>

      {/* Template Selector */}
      <SectionContainer title="Template Selection" icon={LayoutTemplate}>
        <div className="flex space-x-4">
          <button
            onClick={() => handleTemplateChange('modern')}
            className={`flex-1 p-3 text-center rounded-lg font-medium transition duration-150 ${
              resumeData.template === 'modern'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Modern Template
          </button>
          <button
            onClick={() => handleTemplateChange('classic')}
            className={`flex-1 p-3 text-center rounded-lg font-medium transition duration-150 ${
              resumeData.template === 'classic'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Classic Template
          </button>
        </div>
      </SectionContainer>


      {/* Navigation Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg sticky top-0 z-10 shadow-sm">
        {['personal', 'experience', 'education', 'skills'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 capitalize rounded-md text-sm font-semibold transition duration-200 ${
              activeTab === tab
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>


      {/* Personal Details */}
      {activeTab === 'personal' && (
        <SectionContainer title="Personal Details & Summary" icon={User}>
          <InputField
            label="Full Name"
            id="name"
            value={resumeData.personal.name}
            onChange={(e) => updatePersonal('name', e.target.value)}
            placeholder="e.g., John Smith"
          />
          <InputField
            label="Professional Title"
            id="title"
            value={resumeData.personal.title}
            onChange={(e) => updatePersonal('title', e.target.value)}
            placeholder="e.g., Software Engineer"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Email"
              id="email"
              type="email"
              value={resumeData.personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
              placeholder="john@example.com"
            />
            <InputField
              label="Phone"
              id="phone"
              value={resumeData.personal.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          <InputField
            label="LinkedIn URL"
            id="linkedin"
            value={resumeData.personal.linkedin}
            onChange={(e) => updatePersonal('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johnsmith"
          />
          <InputField
            label="Professional Summary"
            id="summary"
            value={resumeData.personal.summary}
            onChange={(e) => updatePersonal('summary', e.target.value)}
            rows={5}
            placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          />
        </SectionContainer>
      )}

      {/* Experience */}
      {activeTab === 'experience' && (
        <SectionContainer
          title="Work Experience"
          icon={Briefcase}
          onAdd={() => addArrayItem('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}
        >
          {resumeData.experience.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No work experience added yet.</p>
              <p className="text-sm">Click "Add" to add your first job.</p>
            </div>
          ) : (
            resumeData.experience.map((exp, index) => (
              <ExperienceForm
                key={exp.id}
                exp={exp}
                index={index}
                handleChange={(id, key, value) => updateArray('experience', id, key, value)}
                handleRemove={(id) => removeArrayItem('experience', id)}
              />
            ))
          )}
        </SectionContainer>
      )}

      {/* Education */}
      {activeTab === 'education' && (
        <SectionContainer
          title="Education"
          icon={GraduationCap}
          onAdd={() => addArrayItem('education', { degree: '', institution: '', city: '', graduationYear: '' })}
        >
          {resumeData.education.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No education added yet.</p>
              <p className="text-sm">Click "Add" to add your education.</p>
            </div>
          ) : (
            resumeData.education.map((edu, index) => (
              <EducationForm
                key={edu.id}
                edu={edu}
                index={index}
                handleChange={(id, key, value) => updateArray('education', id, key, value)}
                handleRemove={(id) => removeArrayItem('education', id)}
              />
            ))
          )}
        </SectionContainer>
      )}

      {/* Skills */}
      {activeTab === 'skills' && (
        <SectionContainer title="Skills" icon={Code}>
          <p className="text-sm text-gray-600 mb-2">Enter skills separated by spaces. Examples: JavaScript React Python ProjectManagement</p>
          <div className="mb-3">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
              Skills (space-separated)
            </label>
            <textarea
              id="skills"
              rows={4}
              value={skillsText}
              onChange={handleSkillChange}
              placeholder="JavaScript React NodeJS Python SQL Git Agile ProjectManagement"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border resize-none"
            />
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">Preview: {resumeData.skills.length} skills added</p>
          </div>
        </SectionContainer>
      )}

      {/* Action Buttons */}
      <div className="p-4 sticky bottom-0 bg-white border-t rounded-t-lg shadow-lg print:hidden space-y-2">
        <button
          onClick={() => {
            saveToStorage();
          }}
          className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          💾 Save Progress
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('resume_data');
            setResumeData(getDefaultResumeData());
            setActiveTab('personal');
          }}
          className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-150"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Data
        </button>
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 transition duration-150"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF
        </button>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Container for the whole app */}
      <div className="lg:grid lg:grid-cols-3 xl:grid-cols-2 min-h-screen">

        {/* Left Side: Input Form (Scrollable) */}
        <div className="lg:col-span-1 xl:col-span-1 border-r border-gray-200 lg:max-h-screen lg:overflow-y-auto print:hidden">
          {renderInputForm()}
        </div>

        {/* Right Side: Live Preview (Centered and styled for print) */}
        <div className="lg:col-span-2 xl:col-span-1 p-4 lg:p-8 bg-gray-100 flex justify-center items-center lg:items-start pt-10 print:p-0 print:pt-0 print:block">
          <div
            ref={resumeRef}
            className="w-full max-w-2xl bg-white shadow-2xl transition-all duration-300 transform scale-95 lg:scale-100"
            // Aspect ratio for a typical A4 page (210mm x 297mm)
            style={{ aspectRatio: '210 / 297' }}
          >
            <ResumePreview data={resumeData} />
          </div>
        </div>

      </div>

      {/* Custom CSS for Print to PDF */}
      <style>{`
        @media print {
          body > * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            transform: scale(1);
          }
          .print\\:min-h-0 {
            min-height: 0 !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:pt-0 {
            padding-top: 0 !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;