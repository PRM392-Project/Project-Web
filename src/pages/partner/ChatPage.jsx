import React, { useEffect } from 'react';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Chat from '../../components/partner/Chat';

export default function ChatPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header không scroll */}
        <Box sx={{ flexShrink: 0, minHeight: 64 }}>
          <Header />
        </Box>

        {/* Vùng nội dung cuộn với padding và nền xám */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#f5f5f5',
            padding: 2,
            overflow: 'auto',
            position: 'relative', // 🔑 giúp layout rõ ràng hơn
          }}
        >
          {/* Chat box cố định trong khung và hiển thị đẹp */}
          <Box
            sx={{
              height: 'calc(100% - 0px)', // dùng calc để tránh sai chiều cao
              maxHeight: '100%',
            }}
          >
            <Chat />
          </Box>
        </Box>
      </Box>
    </Box>

  );
}
