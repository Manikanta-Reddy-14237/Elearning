import React from 'react';
import mainImage from './images/sdb.jpg';
import ml from './images/ml.jpg';
import web from './images/web.png';
import cc from './images/cc.png';
import dm from './images/dm.jpg';
import hiw from './images/hiw.jpg';
import './styles/homepage.css';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home_page">
     
      <div className="firstSection">

          <div className="firstSection_content">
              <h1>EduSphere</h1>
              <p>Unlock Your Potential with Learning Everyday</p>
              <Link to="/studentlogin" className="btn-primary" style={{marginTop:"6px",backgroundColor:"rgb(228, 130, 146)"}}>Start Learning</Link>
          </div>
       
        <div className='firstSection_image'>
            <img src={mainImage}/>
        </div>

      </div>
      
      <div className='carousel_grid'>
            <h3 className='carousel_heading'>Explore Various Technologies</h3>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
              <div className='carousel_prevButton'>
                <button className="carousel_prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
              </div>
              
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="3000">

                    <img src={ml}   className="d-block w-100" alt="..." style={{height:"400px"}} />
                  </div>
                  <div className="carousel-item" data-bs-interval="3000">
                    <img src={web}  className="d-block w-100" alt="..." style={{height:"400px"}}/>
                  </div>
                  <div className="carousel-item" data-bs-interval="3000">
                    <img src={cc}  className="d-block w-100" alt="..." style={{height:"400px"}}/>
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src={dm}  className="d-block w-100" alt="..." style={{height:"400px"}}/>
                </div>
                </div>

                <div className='carousel_nextButton'>
                <button className="carousel_next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
                </div>
          </div>
    </div>
     

     <div className='works_section_grid'>

        <div className='works_section_image'>
            <img src={hiw} alt='how it works image' style={{width:"500px",height:"400px"}} />
        </div>


        <div className="works_section">   
            <div className='works_section_sub'>
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
            </div>
      </div>
    </div>

    <hr className='divider'/>

      <footer className="footer-section">
       <ContactForm />
      </footer>
    </div>
  );
}

export default HomePage;
