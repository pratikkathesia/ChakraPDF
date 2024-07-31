import React from 'react';
import { Typography, Container } from '@mui/material';
import FeatureLinks from '../components/FeatureLinks.js';

const Home = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '60px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the PDF Converter
      </Typography>
      <Typography variant="body1">
        Use the navigation bar to select the conversion type.
      </Typography>
      <FeatureLinks />
    </Container>
  );
};

export default Home;
