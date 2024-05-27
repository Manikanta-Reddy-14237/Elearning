import React from 'react';
import './styles/styles2.css';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>EduSphere</h1>
          <p>Unlock Your Potential with Learning Everyday</p>
          <Link to="/studentlogin" className="btn-primary">Start Learning</Link>
        </div>
        {/* Add image or video background here */}
      </section>


      <section className="how-it-works-section">
  <h2>How It Works</h2>
  <p>Welcome to EduSphere Our platform is designed to provide a seamless learning experience for students. Here’s how you can get started:</p>
  
  <ol>
    <li>
      <strong>Sign Up or Log In:</strong>
      <p>If you already have an account, simply log in with your credentials. If you're new to our platform, click on the 'Sign Up' button to create a new account. Fill in the required details, and you'll be ready to start your learning journey in no time.</p>
    </li>
    
    <li>
      <strong>Access Your Learning Materials:</strong>
      <p>Once logged in, you will have access to all the educational resources provided by your teachers. Navigate to the 'PDFs' section to find all the documents, notes, and study materials uploaded by your instructors. You can either view these PDFs directly on the website or download them for offline use.</p>
    </li>
    
    <li>
      <strong>Watch Lecture Videos:</strong>
      <p>In the 'Videos' section, you will find all the lecture videos uploaded by your teachers. These videos are available for you to watch at any time, ensuring you can learn at your own pace. Just like the PDFs, you have the option to either stream the videos online or download them to watch later.</p>
    </li>
  </ol>
  
  <p>Our platform aims to provide you with all the tools you need to succeed in your studies. If you have any questions or need further assistance, feel free to reach out to our support team. Happy learning!</p>
</section>


      <footer className="footer-section">
       <ContactForm />
      </footer>
    </div>
  );
}

export default HomePage;
