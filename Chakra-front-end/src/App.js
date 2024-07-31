import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThreeDStart from './components/ThreeDStart';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DocxToPdf from './pages/DocxToPdf';
import ImageToPdf from './pages/ImageToPdf';
import CombinePdfs from './pages/CombinePdfs';
import NotFound from './pages/NotFound';

const App = () => {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    // Set a timer for the duration of the 3D animation.
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showHome ? (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docx-to-pdf" element={<DocxToPdf />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/combine-pdfs" element={<CombinePdfs />} />
            <Route path="*" element={<NotFound />} /> {/* For handling 404 errors */}
          </Routes>
        </Router>
      ) : (
        <ThreeDStart />
      )}
    </div>
  );
};

export default App;