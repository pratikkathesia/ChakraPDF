import React from 'react';
import FileUpload from '../components/FileUploadImage';

const ImageToPdf = () => {
  return (
    <FileUpload 
      url={`${process.env.REACT_APP_BACKEND_URL}/api/convertimage`} 
      successMessage="Image converted to PDF successfully." 
    />
  );
};

export default ImageToPdf;
