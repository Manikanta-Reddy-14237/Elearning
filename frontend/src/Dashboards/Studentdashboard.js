import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckTokenValidity from "../protection/tokenvalidity";
import IconButton from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import PersonOffSharpIcon from '@mui/icons-material/PersonOffSharp';
import Container from '@mui/material/Container';
import sbg from '../images/sdb.jpg';
import Stack from '@mui/material/Stack';
import ReactPlayer from 'react-player';
import PdfViewer from "../Pdfviewer";
import Profile from "./Profile"; // Import the Profile component
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function StudentDashboard() {
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [link, setLink] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [profile, setProfile] = useState(null); // State to store profile data
    const [isProfileBarOpen, setIsProfileBarOpen] = useState(false); // State for sidebar visibility
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const studentId = localStorage.getItem("studentId"); // Retrieve the student ID


    const handleToken = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("studentId"); // Remove student ID
        navigate("/studentlogin");
    };


    useEffect(() => {
        const fetchProfile = async () => {
            if (!token || !studentId) {
                console.error('No auth token or student ID found');
                navigate("/");
                return;
            }
            try {
                const response = await axios.get("http://elearning-khaki.vercel.app/studentdata", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        studentId: studentId,
                    },
                });
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                if (err.response && err.response.status === 401) {
                    console.error('Unauthorized - logging out');
                    handleToken();
                }
            }
        };

        const fetchFiles = async () => {
            if (!token) {
                console.error('No auth token found');
                navigate("/");
                return;
            }
            try {
                const response = await axios.get('http://elearning-khaki.vercel.app/teacher/files', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFiles(response.data);
            } catch (err) {
                console.error('Error fetching files:', err);
                if (err.response && err.response.status === 401) {
                    console.error('Unauthorized - logging out');
                    handleToken();
                }
            }
        };

        fetchProfile();
        fetchFiles();
    }, [token, studentId, navigate]);

    const isVideoFile = (filename) => {
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };


    useEffect(() => {
        const isTokenValid = CheckTokenValidity();
        if (!isTokenValid) {
            navigate("/");
        }
    }, [refresh, navigate]);

    const fetchSignedUrl = async (filename) => {
        try {
            const response = await axios.get(`http://elearning-khaki.vercel.app/generate-signed-url/${filename}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
                setLink(`http://elearning-khaki.vercel.app/public/uploads/${filename}`);
            }
        }
    };

    useEffect(() => {
        if (link) {
            console.log(link);
        }
    }, [link]);

    const toggleProfileBar = () => {
        setIsProfileBarOpen(!isProfileBarOpen);
    };

    return (
        <div style={{ backgroundImage: `url(${sbg})`, backgroundSize: 'contain', minHeight: '100vh', transition: 'margin-left 0.3s', padding: '20px' }}>
            <IconButton aria-label="profile" onClick={toggleProfileBar} color="primary" style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1000 }}>
                {isProfileBarOpen ? <PersonOffSharpIcon className="large-icon"/> : <PersonOutlineSharpIcon className="large-icon"/>}
            </IconButton>
            <h1 className="Th" style={{color:'#000000'}}>Student Dashboard</h1>
            <Container maxWidth="lg">
                {profile && isProfileBarOpen && <Profile profile={profile} />} {/* Display the profile data */}
                <h2>Uploaded Pdfs</h2>
                <ul>
                    {files.map((file) => (
                        !isVideoFile(file.filename) ? (
                            <Stack direction="row" spacing={4} key={file._id}>
                                {file.filename}

                                <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility">
                                    {selectedFileId === file._id ? 
                                        <VisibilityOffOutlinedIcon  /> : 
                                        <VisibilityOutlinedIcon  />
                                    }
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
                            </Stack>
                        ) : null
                    ))}
                </ul>
            </Container>
            <Container maxWidth="lg">
                <h2>Uploaded Videos</h2>
                <ul>
                    {files.map((file) => (
                        isVideoFile(file.filename) ? (
                            <Stack direction="row" spacing={4} key={file._id}>
                                {file.filename}

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
                            </Stack>
                        ) : null
                    ))}
                </ul>
            </Container>
            <IconButton aria-label="log out" onClick={handleToken} color="error" style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
                <h5>Log out</h5>
                <LogoutOutlinedIcon />
            </IconButton>
        </div>
    );
}

export default StudentDashboard;
