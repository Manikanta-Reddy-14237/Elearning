import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from './protection/Protected.js';
import AdminDashboard from './Dashboards/Admindashboard.js';
import TeacherDashboard from './Dashboards/Teacherdashboard';
import StudentDashboard from './Dashboards/Studentdashboard';
import TeacherDetails from './DBdata/teacherdata';
import StudentDetails from './DBdata/studentdata';
import {Admlog, Tealog, Stdlog} from "./loginfiles/logincomp.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.js';
import HomePage from './Homepage.js';


function About() {
  return (
    <div className="container">
      <div class="features">
      <div class="feature">
        <h3>Easy Access</h3>
        <p>Log in with your credentials or sign up to create a new account in just a few steps.</p>
      </div>
      
      <div class="feature">
        <h3>Comprehensive Resources</h3>
        <p>Access PDFs, lecture notes, and videos uploaded by your teachers. View them directly on the website or download them for offline use.</p>
      </div>
      
      <div class="feature">
        <h3>User-Friendly Interface</h3>
        <p>Navigate through the platform effortlessly and find all your study materials organized in one place.</p>
      </div>
      
      <div class="feature">
        <h3>Support</h3>
        <p>Reach out to our support team for any assistance or queries. We're here to help!</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Start your learning journey with EduLearn and unlock a world of educational resources right at your fingertips.</p>
    </div>
  </div>
  );
}

function App() {
  return (
    <>
      <Router>
      <NavBar />
        <Routes>
          
            <Route path='/' element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="Admindashboard" element={<Protected element={<AdminDashboard />} allowedRoles={['admin']} />} />
            <Route path="Teacherdashboard" element={<Protected element={<TeacherDashboard />} allowedRoles={['teacher']} />} />
            <Route path="Studentdashboard" element={<Protected element={<StudentDashboard />} allowedRoles={['admin', 'student']} />} />
            <Route path="teacherdata/:teacherId" element={<Protected element={<TeacherDetails />} allowedRoles={['admin']} />} />
            <Route path="studentdata/:studentId" element={<Protected element={<StudentDetails />} allowedRoles={['admin']} />} />
            <Route path="adminlogin" element={<Admlog />} />
            <Route path="studentlogin" element={<Stdlog />} />
            <Route path="teacherlogin" element={<Tealog />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
