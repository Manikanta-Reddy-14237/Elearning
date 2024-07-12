import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import CheckTokenValidity from '../protection/tokenvalidity';
<<<<<<< HEAD
import user from '../images/user.webp';
import axios from 'axios';

function TeacherDetails() {
    const { teacherId } = useParams();
=======
import axios from 'axios';

function TeacherDetails() {
    const { teacherId } = useParams(); // Retrieve teacherId from URL params
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
    const [resource, setResources] = useState([]); 
    const navigate = useNavigate();
    console.log("teacherId:",teacherId);
    var token = localStorage.getItem('authToken');
    useEffect(() => {
        const fetchResources = async () => {
            try {

                const isvalid = CheckTokenValidity();
                if(!isvalid){
                    return navigate("/login");
                }
                var token = localStorage.getItem('authToken');
<<<<<<< HEAD
                const resourceData =await axios.get(`http://localhost:3001/Teacherdata`, {
=======
                const resourceData =await axios.get(`https://elearningbackend-ten.vercel.app/Teacherdata`, {
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                    params: {
                        teacherId: teacherId,
                    },
                });
                setResources(resourceData.data);
                console.log(resource);
            } catch (err) {
                console.error('Error fetching teacher resources:', err);
            }
        };

        fetchResources();
<<<<<<< HEAD
    }, [teacherId]); 

    const removeTeacher = async (teacherId) => {
        try {
            await axios.post('http://localhost:3001/teacherdelete', { teacherId }, {
=======
    }, [teacherId]); // Dependency on teacherId to re-fetch if it changes

    const removeTeacher = async (teacherId) => {
        try {
            await axios.post('https://elearningbackend-ten.vercel.app/teacherdelete', { teacherId }, {
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/Admindashboard");
        } catch (err) {
            console.error('Error deleting student:', err);
        }
    }

    return (
<<<<<<< HEAD
        <div className='Entitymain_div'>
        <div className='Entity_heading'>
        <h1>Teacher Resources</h1>
          </div>
          <div className='entity_wrapper' >
              <img src={user} alt='user_image' style={{height:"100px",width:"100px"}}/>
          <div className='teachers'>
          <List >
                  <ListItem key={resource._id} >
                      <ListItemText primary={resource.name}/>
                      <button onClick={()=>{removeTeacher(resource._id)}}>Remove Teacher</button>
                  </ListItem>
          </List>
          </div>
          </div>
      </div>
=======
        <div>
            <h1>Teacher Resources</h1>
            <List>
                
                    <ListItem key={resource._id}>
                        <ListItemText primary={resource.name} />
                        <button onClick={()=>{removeTeacher(resource._id)}}>Remove Teacher</button>
                    </ListItem>
            
            </List>
        </div>
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
    );
}

export default TeacherDetails;
