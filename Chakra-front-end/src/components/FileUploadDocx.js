import React, { useState } from 'react';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploadDocx = ({ url, successMessage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handles file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handles file upload and conversion
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage("Please select a DOCX file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      // Create a URL for the returned PDF file
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Get the original filename and create a new filename with "_pdf"
      const originalFileName = selectedFile.name.split('.').slice(0, -1).join('.');
      const fileName = `${originalFileName}_pdf.pdf`;

      // Set the download attribute and trigger the download
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Display success message
      setMessage(successMessage);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: 'center' }}>
        {/* Chakra Logo */}
        <img 
          src="/chakra-logo.png" 
          alt="Chakra Logo" 
          style={{ height: '250px', width: '250px', margin: '0 auto' }} 
        />
        
        {/* Title  */}
        <Typography variant="h5" component="h2" gutterBottom>
          Upload DOCX and Convert to PDF
        </Typography>
        
        {/* File Upload Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".docx"
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
              Upload DOCX File
            </Button>
          </label>

          {/* Selected File Information */}
          <Box marginY={2}>
            {selectedFile && (
              <Typography variant="body1">
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>
          
          {/* Submit Button */}
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
          >
            Convert to PDF
          </Button>
        </form>

        {/* Status Message */}
        {message && (
          <Typography variant="body1" color="error" marginTop={2}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default FileUploadDocx;












// import React, { useState } from 'react';
// import { Button, Box, Typography, Container, Paper } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// // Functional component for file upload and conversion
// const FileUpload = () => {
//   // State to store the selected file
//   const [selectedFile, setSelectedFile] = useState(null);
  
//   // State to store the message to be displayed
//   const [message, setMessage] = useState("");

//   // Handle file input change
//   const handleFileChange = (event) => {
//     // Set the selected file
//     setSelectedFile(event.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Check if a file is selected
//     if (!selectedFile) {
//       setMessage("Please select a DOCX file.");
//       return;
//     }

//     // Create a new FormData object and append the file
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       // Send a POST request to the backend API
//       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/convertdocx`, {
//         method: 'POST',
//         body: formData,
//       });

//       // Log the backend URL for debugging
//       console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

//       // Check if the response is not OK
//       if (!response.ok) {
//         throw new Error('File upload failed');
//       }

// /* Convert response to blob and create a download link */

//       // Convert the response to a blob (binary large object)
//       const blob = await response.blob(); 

//       // Create a URL for the blob object
//       const url = window.URL.createObjectURL(new Blob([blob])); 

//       // Extract the original file name and modify it**
//       const originalFileName = selectedFile.name.split('.docx')[0]; // Get the original file name without extension
//       const modifiedFileName = `${originalFileName}_pdf.pdf`; // Add "_pdf" after file name

//       // Create an anchor element to simulate a file download
//       const link = document.createElement('a'); 

//       // Set the href to the blob URL
//       link.href = url; 

//       // Set the download attribute with the desired file name
//       link.setAttribute('download', modifiedFileName); 

//       // Append the anchor element to the DOM
//       document.body.appendChild(link); 

//       // Programmatically click the link to trigger the download
//       link.click(); 

//       // Remove the link from the DOM
//       link.parentNode.removeChild(link); 

//       // Set success message
//       setMessage("File converted successfully.");
//     } catch (error) {
//       // Set error message
//       setMessage(error.message);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: 'center' }}>
//         <img 
//           src="/chakra-logo.png" 
//           alt="Chakra Logo" 
//           style={{ height: '250px', width: '250px', margin: '0 auto' }} 
//         />
//         <Typography variant="h5" component="h2" gutterBottom>
//           Convert Word to PDF
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="file"
//             accept=".docx"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//             id="contained-button-file"
//           />
//           <label htmlFor="contained-button-file">
//             <Button 
//               variant="contained" 
//               component="span" 
//               startIcon={<CloudUploadIcon />}
//             >
//               Upload DOCX File
//             </Button>
//           </label>
//           <Box marginY={2}>
//             {selectedFile && (
//               <Typography variant="body1">
//                 Selected file: {selectedFile.name}
//               </Typography>
//             )}
//           </Box>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             type="submit"
//           >
//             Convert to PDF
//           </Button>
//         </form>
//         {message && (
//           <Typography variant="body1" color="error" marginTop={2}>
//             {message}
//           </Typography>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default FileUpload;
