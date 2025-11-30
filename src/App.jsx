import React, { Children } from 'react'
import Home from './pages/home';
import Applayout from './app-layout/applayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Joblist from './pages/jobs';
import Onboarding from './pages/Onboarding';
import Myjobs from './pages/myjobs';
import Savedjobs from './pages/savedjobs';
import Postjobs from './pages/Postjobs';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import LoginPage from './pages/LoginPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobSeekerProfile from './pages/JobSeekerProfile';
import RecruiterProfile from './pages/RecruiterProfile';
import ResumeBuilder from './pages/Resumebuilder';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

const router = createBrowserRouter([
  {
    element: <Applayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "Onboarding/",
        element: <Onboarding/>
      },
      {
        path: "jobs/",
        element: <Joblist />
      },
      {
        path: "myjobs/",
        element: <Myjobs/>
      },
      {
        path: "savedjobs/",
        element: <Savedjobs/>
      },
      {
        path: "Postjobs/",
        element: <Postjobs/>
      },
      {
        path: "profile/",
        element: <Profile/>
      },
      {
        path: "edit-profile/",
        element: <EditProfile/>
      },
      {
        path: "login/",
        element: <LoginPage/>
      },
      {
        path: "recruiter-dashboard/",
        element: <RecruiterDashboard/>
      },
      {
        path: "jobseeker-profile/",
        element: <JobSeekerProfile/>
      },
      {
        path: "recruiter-profile/",
        element: <RecruiterProfile/>
      },
      {
        path: "resume-builder/",
        element: <ResumeBuilder/>
      },
      {
        path: "about/",
        element: <About/>
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
