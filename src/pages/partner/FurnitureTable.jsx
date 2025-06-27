import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import { useLocation, useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import FurList from '../../components/partner/FurList';
import { routes } from '../../routes';

export default function FurnitureTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
            <Typography variant='h4' sx={{ fontWeight: 500 }}>
              Nội thất
            </Typography>

            {/* Phần search + nút thêm */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 300,
                  bgcolor: 'white',
                  borderRadius: '999px',
                  px: 2,
                  py: '6px',
                  boxShadow: '0 0 0 1px #ccc',
                }}
              >
                <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                <InputBase
                  placeholder="Tên nội thất..."
                  variant="standard"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    flex: 1,
                    color: 'gray',
                    fontSize: 16,
                    '& .MuiInputBase-input': { p: 0 },
                    '&:focus-within': { outline: 'none' },
                  }}
                />
              </Box>

              <IconButton
                onClick={() => navigate(routes.newFurniture)}
                sx={{
                  backgroundColor: '#3F5139',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#33432e' },
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: '#f5f5f5',
              p: 2,
              overflowY: 'auto',
            }}
          >
            <FurList searchTerm={searchTerm}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
