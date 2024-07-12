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
<<<<<<< HEAD
import  '../styles/adminSignIn.css';


=======

const defaultTheme = createTheme();
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4

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
<<<<<<< HEAD
    axios.post(`http://localhost:3001/Adminlogin`, payload)
=======
    axios.post(`https://elearningbackend-ten.vercel.app/Adminlogin`, payload)
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        toast.success('Successfully Logged In');
        navigate(`/Admindashboard`);
      })
      .catch((error) => {
        toast.error(error.response.data['error']);
<<<<<<< HEAD
        console.error('Error fetching data:', error); 
=======
        console.error('Error fetching data:', error); // Error handling
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
      });
  };

  return (
<<<<<<< HEAD
      <div className='signIn_div'>
            <div className='form_image'>
              <img  src={stl} alt='form_image' style={{height:'400px',width:'500px'}}/>
            </div>

            <div className='form'>
=======
    <div style={{ backgroundImage: `url(${stl})`, backgroundSize: 'cover', borderRadius: '10px', overflow: 'hidden', minHeight: '100vh' }}>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${stl})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust background color and opacity
                padding: '2rem', // Adjust padding
                borderRadius: '10px', // Adjust border radius
              }}
            >
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Signin
              </Typography>
<<<<<<< HEAD
              <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
=======
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
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
<<<<<<< HEAD
              </form>
            </div>
        <ToastContainer />
    </div>
    
=======
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </ThemeProvider>
    </div>
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
  );
}
