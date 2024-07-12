import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import CheckTokenValidity from '../protection/tokenvalidity';
import user from '../images/user.webp';
import axios from 'axios';

function TeacherDetails() {
    const { teacherId } = useParams();
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
                const resourceData =await axios.get(`http://localhost:3001/Teacherdata`, {
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
    }, [teacherId]); 

    const removeTeacher = async (teacherId) => {
        try {
            await axios.post('http://localhost:3001/teacherdelete', { teacherId }, {
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
    );
}

export default TeacherDetails;
