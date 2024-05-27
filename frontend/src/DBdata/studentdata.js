import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import CheckTokenValidity from '../protection/tokenvalidity';
import axios from 'axios';

function StudentDetails() {
    const { studentId } = useParams(); // Retrieve teacherId from URL params
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
                const resourceData =await axios.get(`http://elearning-khaki.vercel.app/Studentdata`, {
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
    }, [studentId]); // Dependency on teacherId to re-fetch if it changes

    const removeStudent = async (studentId) => {
        try {
            await axios.post('http://elearning-khaki.vercel.app/stddelete', { studentId }, {
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
            <h1>Student Resources</h1>
            <List>
                
                    <ListItem key={resource._id}>
                        <ListItemText primary={resource.name} />
                        <button onClick={()=>{removeStudent(resource._id)}}>Remove Student</button>
                    </ListItem>
            
            </List>
        </div>
    );
}

export default StudentDetails;
