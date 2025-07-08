import React, { useEffect } from 'react';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateFurniture from '../../components/partner/CreateFurniture';

export default function NewFurniture() {
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
        <Box sx={{ flexShrink: 0, minHeight: 64 }}>
          <Header />
        </Box>

        <Box sx={{ lexGrow: 1,
              bgcolor: '#f5f5f5',
              p: 2,
              overflowY: 'auto', }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2, mt:2}}>
         
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: '#f5f5f5',
              p: 2,
              overflowY: 'auto',
            }}
          >
            <CreateFurniture/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
