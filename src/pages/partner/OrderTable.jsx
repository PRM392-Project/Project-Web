import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box, Typography, InputBase } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderList from '../../components/partner/OrderList';

export default function OrderTable() {
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

                <Box sx={{
                    lexGrow: 1,
                    bgcolor: '#f5f5f5',
                    p: 2,
                    overflowY: 'auto',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2, mt: 2 }}>
                        <Typography variant='h4' sx={{ fontWeight: 500 }}>
                            Orders
                        </Typography>

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
                                placeholder="Search order code"
                                variant="standard" // thêm dòng này
                                sx={{
                                    flex: 1,
                                    color: 'gray',
                                    fontSize: 16,
                                    '& .MuiInputBase-input': {
                                        p: 0,
                                    },
                                    '&:focus-within': {
                                        outline: 'none',
                                    },
                                }}
                            />
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
                        <OrderList />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
