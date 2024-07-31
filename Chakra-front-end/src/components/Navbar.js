import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <img 
          src="/chakra-logo.png" 
          alt="Chakra Logo" 
          style={{ height: '60px', width: '60px', marginRight: '20px' }}  
        />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          PDF Converter
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/docx-to-pdf">DOCX to PDF</Button>
        <Button color="inherit" component={Link} to="/image-to-pdf">Image to PDF</Button>
        <Button color="inherit" component={Link} to="/combine-pdfs">Combine PDFs</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
