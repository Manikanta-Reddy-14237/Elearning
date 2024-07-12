import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function NativeSelectDemo() {
  const [link, setLink] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setLink(value);
    navigate(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
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
          <option value="">Login</option>
          <option value="/adminlogin">Admin Login</option>
          <option value="/teacherlogin">Teacher Login</option>
          <option value="/studentlogin">Student Login</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}


function Layout() {
    return (
      <>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <NativeSelectDemo />
        </nav>
        <Outlet />
      </>
    );
  }
  
  export default Layout;
