import React from 'react';
import FileUpload from '../components/FileUploadDocx';

const DocxToPdf = () => {
  return (
    <FileUpload 
      url={`${process.env.REACT_APP_BACKEND_URL}/api/convertdocx`} 
      successMessage="File converted to PDF successfully." 
    />
  );
};

export default DocxToPdf;
