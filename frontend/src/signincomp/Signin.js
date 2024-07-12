import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import stl from '../images/stl.jpg';
import  '../styles/adminSignIn.css';



export default function SignIn(props) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const payload = {
      email,
      password,
    };
    axios.post(`http://localhost:3001/Adminlogin`, payload)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        toast.success('Successfully Logged In');
        navigate(`/Admindashboard`);
      })
      .catch((error) => {
        toast.error(error.response.data['error']);
        console.error('Error fetching data:', error); 
      });
  };

  return (
      <div className='signIn_div'>
            <div className='form_image'>
              <img  src={stl} alt='form_image' style={{height:'400px',width:'500px'}}/>
            </div>

            <div className='form'>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Signin
              </Typography>
              <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
            </div>
        <ToastContainer />
    </div>
    
  );
}
