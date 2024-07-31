import React, { useState } from 'react';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploadImage = ({ url, successMessage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  // Update state when a file is selected
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission to upload the file
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Make a POST request to upload the file
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      // Create a download link for the converted file
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Determine the original filename and add "_pdf" suffix
      const originalFileName = selectedFile.name.split('.').slice(0, -1).join('.');
      const fileName = `${originalFileName}_pdf.pdf`;

      // Set the download attribute and trigger the download
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Show success message
      setMessage(successMessage);
    } catch (error) {
      // Show error message if something goes wrong
      setMessage(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: 'center' }}>
        {/* Display the logo */}
        <img 
          src="/chakra-logo.png" 
          alt="Chakra Logo" 
          style={{ height: '250px', width: '250px', margin: '0 auto' }} 
        />
        
        {/* Display the heading */}
        <Typography variant="h5" component="h2" gutterBottom>
          Upload Image and Convert to PDF
        </Typography>
        
        {/* Form to upload file */}
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="contained-button-file"
          />
          <label htmlFor="contained-button-file">
            <Button 
              variant="contained" 
              component="span" 
              startIcon={<CloudUploadIcon />}
            >
              Upload Image File
            </Button>
          </label>

          {/* Display selected file name */}
          <Box marginY={2}>
            {selectedFile && (
              <Typography variant="body1">
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>
          
          {/* Submit button */}
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
          >
            Convert to PDF
          </Button>
        </form>

        {/* Display message */}
        {message && (
          <Typography variant="body1" color="error" marginTop={2}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default FileUploadImage;










