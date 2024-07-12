import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import CheckTokenValidity from "../protection/tokenvalidity";
import IconButton from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import PersonOffSharpIcon from '@mui/icons-material/PersonOffSharp';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ReactPlayer from 'react-player';
import PdfViewer from "../Pdfviewer";
import tbg from '../images/tdb.jpg';
import Profile from "./Profile";
import '../styles/teacherdashboard.css';
import { DNA } from "react-loader-spinner";
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherDashboard() {
    const [files, setFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]); 
    const [pdfFiles, setPdfFiles] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [link, setLink] = useState('');
    const [profile, setProfile] = useState(null);
    const [isProfileBarOpen, setIsProfileBarOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const teacherId = localStorage.getItem("teacherId");

    const isVideoFile = (filename) => {
        if (!filename) return false; 
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    useEffect(() => {
        if (!token || !teacherId) {
            console.error('No auth token or teacher ID found');
            navigate("/");
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3001/Teacherdata", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        teacherId: teacherId,
                    },
                });
                console.log("Profile data:", response.data);
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
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/teacher/files', {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setFiles(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching files:', err);
            }
        };

        fetchProfile();
        fetchFiles();
    }, [refresh, teacherId, token, navigate]);

    
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

    
    const handleUpload = async (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            if (isVideoFile(file.name)) {
                formData.append('vedio', file);
            } else {
                formData.append('file', file);
            }
        });

        try {
            const uploadRoute = isVideoFile(acceptedFiles[0].name)
                ? "http://localhost:3001/teacher/upload/video"
                : "http://localhost:3001/teacher/upload";
            setLoading(true);
            await axios.post(uploadRoute, formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    const handleDelete = async (fileId) => {
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

    const handleToken = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    useEffect(() => {
        const isTokenValid = CheckTokenValidity();
        if (!isTokenValid) {
            navigate("/");
        }
    }, [refresh, navigate]);

    const fetchSignedUrl = async (filename) => {
        try {
            const response = await axios.get(`http://localhost:3001/generate-signed-url/${filename}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const { signedUrl } = response.data;
            console.log("signedurl", signedUrl);
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

    const toggleProfileBar = () => {
        setIsProfileBarOpen(!isProfileBarOpen);
        console.log("Profile data:", profile);
    };

    return (
        <div className="twrapper">
            <IconButton aria-label="profile" onClick={toggleProfileBar} color="primary" style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1000 }}>
                {isProfileBarOpen ? <PersonOffSharpIcon className="large-icon" /> : <PersonOutlineSharpIcon className="large-icon" />}
            </IconButton>
            <div className="Tmain_heading">
            <h1 className="TTh">Teacher Dashboard</h1>
            </div>
            <div className="drop_zone">
            <Dropzone onDrop={handleUpload} accept={{ 'video/*': ['.mp4', '.webm', '.ogg'], 'application/pdf': ['.pdf'] }}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        style={{
                            border: '1px dashed gray',
                            padding: '10px',
                            cursor: 'pointer',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <input {...getInputProps()} />
                        <p style={{color: "black"}}>Drag & drop files here, or click to select files.</p>
                    </div>
                )}
            </Dropzone>
            </div>
            <div className="tpdfs_div">
                {profile && isProfileBarOpen && <Profile profile={profile} />} {/* Display the profile data */}
                <h2>Uploaded Pdfs</h2>
                <ul>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            />
                        </div>
                    ) : (
                        pdfFiles && pdfFiles.length>0 ? (pdfFiles.map((file) => (
                                <Stack direction="row" spacing={4} key={file._id} className="contents_list">
                                    {file.filename}

                                    <IconButton aria-label="delete" onClick={() => handleDelete(file._id)}>
                                        <DeleteIcon style={{ color: 'red' }} />
                                    </IconButton>

                                    <IconButton onClick={() => handleOpen(file._id, file.filename)} aria-label="visibility" className="icon_button">
                                        {selectedFileId === file._id ? 
                                            <VisibilityOffOutlinedIcon /> : 
                                            <VisibilityOutlinedIcon />
                                        }
                                    </IconButton>

                                    {selectedFileId === file._id && (
                                        <PdfViewer
                                            link={link}
                                            headers={{ Authorization: `Bearer ${token}` }}
                                        />
                                    )}
                                </Stack>
                        ))
                    ):(<h5>No pdfs Have Been Uploaded Yet</h5>))}
                </ul>
            </div>
            <div className="tved_div">
                <h2>Uploaded Videos</h2>
                <ul>
                    {loading ?( <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                                />
                        </div>
                        ):(
                        videoFiles && videoFiles.length>0 ?(videoFiles.map((file) => (
                            <Stack direction="row" spacing={4} key={file._id} className="contents_list">
                                {file.filename}

                                <IconButton aria-label="delete" onClick={() => handleDelete(file._id)}>
                                    <DeleteIcon style={{ color: 'red' }} />
                                </IconButton>

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
                    )
                    )
                    ):(<h5>No videos Have Been Uploaded Yet</h5>))}
                </ul>
            </div>
       
            <IconButton aria-label="log out" onClick={handleToken} color="error" style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
                <h5>Log out</h5>
                <LogoutOutlinedIcon />
            </IconButton>
        </div>
    );
}

export default TeacherDashboard;
