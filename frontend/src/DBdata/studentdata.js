import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import CheckTokenValidity from '../protection/tokenvalidity';
<<<<<<< HEAD
import '../styles/singleentity.css';
import user from '../images/user.webp';
import axios from 'axios';

function StudentDetails() {
    const { studentId } = useParams(); 
=======
import axios from 'axios';

function StudentDetails() {
    const { studentId } = useParams(); // Retrieve teacherId from URL params
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
    const [resource, setResources] = useState([]); 
    const navigate = useNavigate();
    console.log("studentId:",studentId);
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
                const resourceData =await axios.get(`http://localhost:3001/Studentdata`, {
=======
                const resourceData =await axios.get(`https://elearningbackend-ten.vercel.app/Studentdata`, {
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                    params: {
                        studentId: studentId,
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
    }, [studentId]); 

    const removeStudent = async (studentId) => {
        try {
            await axios.post('http://localhost:3001/stddelete', { studentId }, {
=======
    }, [studentId]); // Dependency on teacherId to re-fetch if it changes

    const removeStudent = async (studentId) => {
        try {
            await axios.post('https://elearningbackend-ten.vercel.app/stddelete', { studentId }, {
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
            <h1>Student Resources</h1>
            </div>
            <div className='entity_wrapper' >
                <img src={user} alt='user_image' style={{height:"100px",width:"100px"}}/>
            <div className='students'>
            <List >
                    <ListItem key={resource._id} >
                        <ListItemText primary={resource.name}/>
                        <button onClick={()=>{removeStudent(resource._id)}}>Remove Student</button>
                    </ListItem>
            </List>
            </div>
            </div>
=======
        <div>
            <h1>Student Resources</h1>
            <List>
                
                    <ListItem key={resource._id}>
                        <ListItemText primary={resource.name} />
                        <button onClick={()=>{removeStudent(resource._id)}}>Remove Student</button>
                    </ListItem>
            
            </List>
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
        </div>
    );
}

export default StudentDetails;
