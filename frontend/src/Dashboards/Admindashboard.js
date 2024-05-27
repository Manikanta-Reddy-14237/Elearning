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
import adb from '../images/adb.jpg'
import Stack from '@mui/material/Stack';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import PdfViewer from "../Pdfviewer";

function AdminDashboard() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [link, setLink] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const isVideoFile = (filename) => {
        var videoExtensions = ['.mp4', '.webm', '.ogg'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    // Fetch data for students and teachers
    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const token = localStorage.getItem('authToken');
                const studentData = await axios.get('http://localhost:3001/Studentsdata', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the Authorization header
                    },
                });

                const teacherData = await axios.get('http://localhost:3001/Teachersdata', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the Authorization header
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
    }, [refresh]); // Dependency array is empty, so it runs once when the component mounts

    useEffect(() => {
        // Check token validity after re-rendering
        const isTokenValid = CheckTokenValidity();
        if (!isTokenValid) {
            navigate("/Adminlogin"); // Redirect to login if token is invalid
        }
    }, [refresh, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token
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
                setRefresh(!refresh); // Trigger re-render to fetch updated files list
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
         // Navigate to the teacher details page
    
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
        <div style={{ backgroundImage: `url(${adb})`, backgroundSize: 'contain', minHeight: '100vh' }}>
            <h1>Admin Dashboard</h1>
            <Divider />
            <h2>Students</h2>
            <List>
                {students.map((student) => (
                    <ListItem key={student._id}>
                        <ListItemText primary={student.name} onClick={() => handleStudentclick(student._id) } />
                    </ListItem>
                ))}
            </List>
            <h2>Teachers</h2>
            <List>
                {teachers.map((teacher) => (
                    <ListItem 
                      key={teacher._id}
                      onClick={() => handleTeacherClick(teacher._id)} // Click to see teacher details
                    >
                        <ListItemText primary={teacher.name} />
                    </ListItem>
                ))}
            </List>
            <Container maxWidth="lg">
                <h2>Uploaded Pdfs</h2>
                <ul>
                    {files.map((file) => (
                        !isVideoFile(file.filename)?(
                        <Stack direction="row" spacing={4} key={file._id}>
                            {file.filename}
                            <IconButton onClick={() => handleDelete(file._id)} aria-label="delete">
                                <DeleteIcon  />
                            </IconButton>

                            <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility">
                                {selectedFileId === file._id ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>

                            {selectedFileId === file._id && (
                                isVideoFile(file.filename) ? (
                                    <ReactPlayer
                                        url={link}
                                        width="100%"
                                        height="auto"
                                        controls={true}
                                    />
                                ) : (
                                    <PdfViewer
                                        link={link}
                                        headers={{ Authorization: `Bearer ${token}` }}
                                    />
                                )
                            )}
                        </Stack>):null
                    ))}
                </ul>
            </Container>
            <Container maxWidth="lg">
                <h2>Uploaded Vedios</h2>
                <ul>
                    {files.map((file) => (
                        isVideoFile(file.filename)?(
                        <Stack direction="row" spacing={4} key={file._id}>
                            {file.filename}
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => handleDelete(file._id,file.filename)} />
                            </IconButton>

                            <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility">
                                {selectedFileId === file._id ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>

                            {selectedFileId === file._id && (
                                isVideoFile(file.filename) ? (
                                    <ReactPlayer
                                        url={link}
                                        width="100%"
                                        height="auto"
                                        controls={true}
                                    />
                                ) : (
                                    <PdfViewer
                                        link={link}
                                        headers={{ Authorization: `Bearer ${token}` }}
                                    />
                                )
                            )}
                        </Stack>):null
                    ))}
                </ul>
            </Container>
            <IconButton aria-label="log out" onClick={handleLogout} color="error">
                <h5>Log out</h5>
                <LogoutOutlinedIcon />
            </IconButton>
        </div>
    );
}

export default AdminDashboard;



