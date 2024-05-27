import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import CheckTokenValidity from '../protection/tokenvalidity';
import axios from 'axios';

function TeacherDetails() {
    const { teacherId } = useParams(); // Retrieve teacherId from URL params
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
                const resourceData =await axios.get(`https://elearningbackend-manikantas-projects-f78ee616.vercel.app/Teacherdata`, {
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
    }, [teacherId]); // Dependency on teacherId to re-fetch if it changes

    const removeTeacher = async (teacherId) => {
        try {
            await axios.post('https://elearningbackend-manikantas-projects-f78ee616.vercel.app/teacherdelete', { teacherId }, {
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
        <div>
            <h1>Teacher Resources</h1>
            <List>
                
                    <ListItem key={resource._id}>
                        <ListItemText primary={resource.name} />
                        <button onClick={()=>{removeTeacher(resource._id)}}>Remove Teacher</button>
                    </ListItem>
            
            </List>
        </div>
    );
}

export default TeacherDetails;
