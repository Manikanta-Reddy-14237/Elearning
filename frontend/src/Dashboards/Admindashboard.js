import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import axios from 'axios';
import CheckTokenValidity from '../protection/tokenvalidity';
import IconButton from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ReactPlayer from 'react-player';
import '../styles/admindashboard.css'
import PdfViewer from "../Pdfviewer";

function AdminDashboard() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [link, setLink] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [videoFiles, setVideoFiles] = useState([]); 
    const [pdfFiles, setPdfFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const isVideoFile = (filename) => {
        if (!filename) return false; 
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };


    useEffect(() => {
        const filteredVideoFiles = files
            .filter((file) => isVideoFile(file.filename))
            .map((file) => ({ filename: file.filename, _id: file._id }));

        const filteredPdfFiles = files
            .filter((file) => file.filename && !isVideoFile(file.filename))
            .map((file) => ({ filename: file.filename, _id: file._id }));

        setVideoFiles(filteredVideoFiles);
        setPdfFiles(filteredPdfFiles);
        console.log("files", files);
        console.log("videoFiles", filteredVideoFiles);
        console.log("pdfFiles", filteredPdfFiles);
    }, [files]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const token = localStorage.getItem('authToken');
                const studentData = await axios.get('http://localhost:3001/Studentsdata', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const teacherData = await axios.get('http://localhost:3001/Teachersdata', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const response = await axios.get('http://localhost:3001/teacher/files', {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setFiles(response.data);
                setStudents(studentData.data);
                setTeachers(teacherData.data);
            } catch (err) {
                console.error('Error fetching student/teacher data:', err);
            }
        };

        fetchData();
    }, [refresh]); 

    useEffect(() => {
        
        const isTokenValid = CheckTokenValidity();
        if (!isTokenValid) {
            navigate("/Adminlogin");
        }
    }, [refresh, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        setRefresh(!refresh);
    };

    const handleDelete = async (fileId, filename) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this file?");
        if (confirmDelete) {
            try {
                await axios.post(
                    `http://localhost:3001/teacher/delete/${fileId}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setRefresh(!refresh); 
            } catch (err) {
                console.error("Error deleting file:", err);
            }
        }
    };

    const handleStudentclick = (studentId) => {
        console.log("studentId:",studentId);
        navigate(`/studentdata/${studentId}`); 
    };
  
    const handleTeacherClick = (teacherId) => {
        console.log("teacherId:",teacherId);
        navigate(`/teacherdata/${teacherId}`); 
    };
         
    
         const fetchSignedUrl = async (filename) => {
            try {
                const response = await axios.get(`http://localhost:3001/generate-signed-url/${filename}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                const { signedUrl } = response.data;
                setLink(signedUrl);
            } catch (err) {
                console.error('Error fetching signed URL:', err);
            }
        };
    
        const handleOpen = (fileId, filename) => {
            if (selectedFileId === fileId) {
                setSelectedFileId(null);
                setLink('');
            } else {
                setSelectedFileId(fileId);
                if (isVideoFile(filename)) {
                    fetchSignedUrl(filename);
                } else {
                    setLink(`http://localhost:3001/public/uploads/${filename}`);
                }
            }
        };
     
    return (
        <div className='Amain_div'>
        <div className='Awrapper_div' >
        <div className='Admin_heading'>
            <h1>Admin Dashboard</h1>
         </div>
        
            <div className='control_entities_div'>
            <div className='students_div'>
            <h2>Students</h2>
            <List>
                {students.map((student) => (
                    <ListItem key={student._id} className='list_names'>
                        <ListItemText primary={student.name} onClick={() => handleStudentclick(student._id) }  />
                    </ListItem>
                ))}
            </List>
            </div>
            <div className='teachers_div'>
            <h2>Teachers</h2>
            <List>
                {teachers.map((teacher) => (
                    <ListItem 
                      key={teacher._id}
                      onClick={() => handleTeacherClick(teacher._id)} 
                      className='list_names'
                    >
                        <ListItemText primary={teacher.name} />
                    </ListItem>
                ))}
            </List>
            </div>
            </div>
            
            <div className='Apdfs_div'>
                <h2>Uploaded Pdfs</h2>
                <ul>
                    {pdfFiles  && pdfFiles.length>0 ? (pdfFiles.map((file) => (
                        <Stack direction="row" spacing={4} key={file._id}>
                            {file.filename}
                            <IconButton onClick={() => handleDelete(file._id)} aria-label="delete">
                                <DeleteIcon  />
                            </IconButton>

                            <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility">
                                {selectedFileId === file._id ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>

                            {selectedFileId === file._id &&  (
                                    <PdfViewer
                                        link={link}
                                        headers={{ Authorization: `Bearer ${token}` }}
                                    />
                                )
                            }
                        </Stack>))):(
                            <h5>No Pdfs have been Uploaded yet</h5>
                            )
                    }
                </ul>
            </div>
            <div className='Avedios_div'>
                <h2>Uploaded Vedios</h2>
                <ul>
                    {videoFiles && videoFiles.length > 0 ? (videoFiles.map((file) => (
                        <Stack direction="row" spacing={4} key={file._id}>
                            {file.filename}
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => handleDelete(file._id,file.filename)} />
                            </IconButton>

                            <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility">
                                {selectedFileId === file._id ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>

                            {selectedFileId === file._id && (
                                    <ReactPlayer
                                        url={link}
                                        width="100%"
                                        height="auto"
                                        controls={true}
                                    />
                                ) }
                        </Stack>))):(
                            <h5>No Vedios Have Been Uploaded Yet</h5>
                        )
                    }
                </ul>
            </div>
            </div>
        
        <div className='wayout_div'>  
             <IconButton aria-label="log out" onClick={handleLogout} color="error">
                <h5>Log out</h5>
                <LogoutOutlinedIcon />
            </IconButton>
        </div>

        </div>
    );
}

export default AdminDashboard;



