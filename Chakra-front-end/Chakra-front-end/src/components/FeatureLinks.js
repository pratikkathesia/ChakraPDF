import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const FeatureLinks = () => {
  const features = [
    { path: '/docx-to-pdf', icon: <DescriptionIcon style={{ fontSize: '50px' }} />, title: 'DOCX to PDF', description: 'Convert DOCX documents to PDF format.' },
    { path: '/image-to-pdf', icon: <ImageIcon style={{ fontSize: '50px' }} />, title: 'Image to PDF', description: 'Convert images to PDF format.' },
    { path: '/combine-pdfs', icon: <FileCopyIcon style={{ fontSize: '50px' }} />, title: 'Combine PDFs', description: 'Merge multiple PDFs into one document.' },
  ];

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Link to={feature.path} style={{ textDecoration: 'none' }}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', height: '100%' }}>
              <Box>{feature.icon}</Box>
              <Typography variant="h6" component="h2" gutterBottom>{feature.title}</Typography>
              <Typography variant="body1">{feature.description}</Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureLinks;
