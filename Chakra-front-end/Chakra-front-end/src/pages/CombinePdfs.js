import React from 'react';
import FileUpload from '../components/FileUploadCombine';

const CombinePdfs = () => {
  return (
    <FileUpload 
      url={`${process.env.REACT_APP_BACKEND_URL}/api/combinepdfs`} 
      successMessage="PDFs combined successfully." 
    />
  );
};

export default CombinePdfs;
