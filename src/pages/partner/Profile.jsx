import React, { useEffect } from 'react';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileComponent from '../../components/partner/ProfileComponent';

export default function Profile() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (

    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box
            sx={{
              flexGrow: 1,
              bgcolor: '#f5f5f5',
              p: 2,
              overflowY: 'auto',
            }}
          >
            <ProfileComponent />
        </Box>
      </Box>
    </Box>
  );
}
