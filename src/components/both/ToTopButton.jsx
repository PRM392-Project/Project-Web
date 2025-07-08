// ToTopButton.jsx
import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#3F5139',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2d3b29',
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.2s ease-in-out',
          zIndex: 999,
        }}
        aria-label="Scroll to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ToTopButton;
