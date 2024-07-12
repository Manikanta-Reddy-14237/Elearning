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
<<<<<<< HEAD
import Stack from '@mui/material/Stack';
import ReactPlayer from 'react-player';
import PdfViewer from "../Pdfviewer";
import Profile from "./Profile";
import '../styles/studentdashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

=======
import Container from '@mui/material/Container';
import sbg from '../images/sdb.jpg';
import Stack from '@mui/material/Stack';
import ReactPlayer from 'react-player';
import PdfViewer from "../Pdfviewer";
import Profile from "./Profile"; // Import the Profile component
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
function StudentDashboard() {
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [link, setLink] = useState('');
<<<<<<< HEAD
    const [profile, setProfile] = useState(null);
    const [isProfileBarOpen, setIsProfileBarOpen] = useState(false); 
    const [videoFiles, setVideoFiles] = useState([]); 
    const [pdfFiles, setPdfFiles] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const studentId = localStorage.getItem("studentId"); 

    const handleToken = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("studentId"); 
        navigate("/studentlogin");
    };

  
    const checkTokenAndFetchData = async () => {
        const isTokenValid = CheckTokenValidity();
        if (!isTokenValid) {
            navigate("/");
            return;
        }
        try {
            const response = await axios.get("http://localhost:3001/studentdata", {
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
                handleToken();
            }
        }
    };

    // Fetch files
    const fetchFiles = async () => {
        if (!token) {
            console.error('No auth token found');
            navigate("/");
            return;
        }
        try {
            const response = await axios.get('http://localhost:3001/teacher/files', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFiles(response.data);
        } catch (err) {
            console.error('Error fetching files:', err);
            if (err.response && err.response.status === 401) {
                handleToken();
            }
        }
    };

    useEffect(() => {
    
        checkTokenAndFetchData();
        fetchFiles();
    }, [token, studentId, navigate,]);


    const isVideoFile = (filename) => {
        if (!filename) return false; 
=======
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
                const response = await axios.get("https://elearningbackend-ten.vercel.app/studentdata", {
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
                const response = await axios.get('https://elearningbackend-ten.vercel.app/teacher/files', {
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
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

<<<<<<< HEAD
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



    const fetchSignedUrl = async (filename) => {
        try {
            const response = await axios.get(`http://localhost:3001/generate-signed-url/${filename}`, {
=======

    useEffect(() => {
        const isTokenValid = CheckTokenValidity();
        if (!isTokenValid) {
            navigate("/");
        }
    }, [refresh, navigate]);

    const fetchSignedUrl = async (filename) => {
        try {
            const response = await axios.get(`https://elearningbackend-ten.vercel.app/generate-signed-url/${filename}`, {
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
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
<<<<<<< HEAD
                setLink(`http://localhost:3001/public/uploads/${filename}`);
=======
                setLink(`https://elearningbackend-ten.vercel.app/public/uploads/${filename}`);
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
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
<<<<<<< HEAD
        <div className="wrapper_div">
            <IconButton aria-label="profile" onClick={toggleProfileBar} color="primary" style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1000 }}>
                {isProfileBarOpen ? <PersonOffSharpIcon className="large-icon"/> : <PersonOutlineSharpIcon className="large-icon"/>}
            </IconButton>
            <div className="Th">
                <h1 style={{color:'#fff'}}>Student Dashboard</h1>
            </div>
            <div className="studentDashmain_div">
                <div className="profile_div">
                    {profile && isProfileBarOpen && <Profile profile={profile} />}
                </div> 
                <div className="pdfs_div">
                    <h2>Uploaded Pdfs</h2>
                    <ul>
                        {pdfFiles && pdfFiles.length > 0 ? (pdfFiles.map((file, index) => (
                            <Stack direction="row" spacing={4} key={index} className="contents_list">
                                {file.filename}
                                <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility" className="icon_button">
                                    {selectedFileId === file._id ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </IconButton>
                                {selectedFileId === file._id && (
                                    <PdfViewer
                                        link={link}
                                        headers={{ Authorization: `Bearer ${token}` }}
                                    />
                                )}
                            </Stack>
                        ))):(
                            <h6>No Pdfs Have Been Uploaded yet</h6>
                        )}
                    </ul>
                </div>
                <div className="vedios_div">
                    <h2>Uploaded Videos</h2>
                    <ul>
                        {videoFiles && videoFiles.length>0? (videoFiles.map((file, index) => (
                            <Stack direction="row" spacing={4} key={index} className="contents_list">
                                {file.filename}
                                <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility" className="icon_button">
                                    {selectedFileId === file._id ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </IconButton>
                                {selectedFileId === file._id && (
                                    <ReactPlayer
                                        url={link}
                                        width="100%"
                                        height="auto"
                                        controls={true}
                                    />
                                )}
                            </Stack>
                        ))):(
                            <h6>No Videos Have Been Uploaded yet</h6> 
                        )}
                    </ul>
                </div>
                <IconButton aria-label="log out" onClick={handleToken} color="error" style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
                    <h5>Log out</h5>
                    <LogoutOutlinedIcon />
                </IconButton>
            </div>
=======
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
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
        </div>
    );
}

export default StudentDashboard;
