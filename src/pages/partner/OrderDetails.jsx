import React, { useEffect } from 'react';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderDetail from '../../components/partner/OrderDetail';

export default function OrderDetails() {
  const location = useLocation();
  const { orderId } = useParams();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>

        <Box sx={{ flexShrink: 0, minHeight: 64 }}>
          <Header />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#f5f5f5',
            p: 2,
            overflowY: 'auto',
          }}
        >
          <OrderDetail orderId={orderId} />
        </Box>
        
      </Box>
    </Box>
  );
}
