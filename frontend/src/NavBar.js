import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import NativeSelect from '@mui/material/NativeSelect';
import './NavBar.css';

function NavBar() {

    const [link, setLink] = React.useState('');
    const navigate = useNavigate();
  
    const handleChange = (event) => {
      const value = event.target.value;
      setLink(value);
      navigate(value);
    };

  return (
    <div className='Navbar'>
      <div className='home_header'>
        <h3 onClick={()=>navigate('/')} >HOME</h3>
      </div>
      <div className='about_header'>
        <h3 onClick={()=>navigate('about')} >ABOUT</h3>
      </div>
      <div>
      <Box sx={{ minWidth: 120 }} className="login_options">
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{color:"whitesmoke"}}>
          Login
        </InputLabel>
        <NativeSelect
          value={link}
          onChange={handleChange}
          inputProps={{
            name: 'login',
            id: 'uncontrolled-native',
          }}
        >
          <option value=""  >Login</option>
          <option value="/adminlogin" >Admin Login</option>
          <option value="/teacherlogin" >Teacher Login</option>
          <option value="/studentlogin" >Student Login</option>
        </NativeSelect>
      </FormControl>
    </Box>
      </div>
    </div>
  )
}

export default NavBar;
