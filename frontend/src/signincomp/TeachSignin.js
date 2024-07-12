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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import stl from '../images/stl.jpg';
import '../styles/teacherSignIn.css';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function TSignIn() {
  const [signup, setSignup] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    cnfPassword: '',
    username: '',
    mobno: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit =async (event) => {
    event.preventDefault();

    const { email, password } = formValues;

    if (!email || !password) {
      toast.error('All fields must be filled');
      return;
    }

    const payload = {
      email,
      password,
    };

    await axios
      .post(`http://localhost:3001/teachlogin`, payload)
      .then((response) => {
        const { token, teacherId } = response.data; 
        localStorage.setItem('authToken', token);
        localStorage.setItem('teacherId', teacherId);
        setFormValues({
          email: '',
          password: '',
          cnfPassword: '',
          username: '',
          mobno: '',
        });
        toast.success('Successfully Logged In');
        navigate(`/Teacherdashboard`);
      })
      .catch((error) => {
        toast.error(error.response.data.error || 'Error on Server Side');
        console.error('Error fetching data:', error);
      });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const { email, password, cnfPassword, username, mobno } = formValues;

    if (!email || !password || !cnfPassword || !username || !mobno) {
      toast.error('All fields must be filled');
      return;
    }

    if (password !== cnfPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const payload = {
      email,
      password,
      mobno,
      username,
    };

    await axios
      .post('http://localhost:3001/teachsignup', payload)
      .then((response) => {
        const data = response.data;
        if (data.message === 'Teacher registered successfully') {
          toast.success('Successfully Signed Up');
          setFormValues({
            email: '',
            password: '',
            cnfPassword: '',
            username: '',
            mobno: '',
          });
          setSignup(false);
          navigate('/');
        } else if (data.error === 'Email is already in use') {
          toast.error('Email is already in use');
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className='main_div'> 

        <div className='form_image'>
        <img src={stl} alt='form_image' style={{height:'500px',width:'600px'}}/>
        </div>

          <div className='form'>
            <Avatar sx={{  bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signup ? 'Teacher Sign Up' : 'Teacher Sign In'}
            </Typography>
            <form
              onSubmit={signup ? handleSignup : handleSubmit}
              noValidate
              
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formValues.email}
                onChange={handleInputChange}
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
                value={formValues.password}
                onChange={handleInputChange}
              />
              {signup && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cnfPassword"
                    label="Confirm Password"
                    type="password"
                    id="cnfpassword"
                    autoComplete="cnfpassword"
                    value={formValues.cnfPassword}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    autoComplete="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="mobno"
                    label="Mobile Number"
                    type="number"
                    id="mbno"
                    autoComplete="MobileNo"
                    value={formValues.mobno}
                    onChange={handleInputChange}
                  />
                </>
              )}
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
                {signup ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    onClick={() => setSignup(!signup)}
                    variant="body2"
                    sx={{ cursor: 'pointer' }}
                  >
                    {signup
                      ? 'Already have an account? Sign In'
                      : "Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            </div>
          
       
      
      <ToastContainer />
      </div>
  );
}
