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

const defaultTheme = createTheme();

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
      .post(`https://elearningbackend-ten.vercel.app/teachlogin`, payload)
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
      .post('https://elearningbackend-ten.vercel.app/teachsignup', payload)
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signup ? 'Teacher Sign Up' : 'Teacher Sign In'}
            </Typography>
            <Box
              component="form"
              onSubmit={signup ? handleSignup : handleSubmit}
              noValidate
              sx={{ mt: 1 }}
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
