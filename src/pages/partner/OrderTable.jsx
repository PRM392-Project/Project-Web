import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../components/partner/Sidebar';
import Header from '../../components/partner/Header';
import { Box, Typography, InputBase, TextField, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderList from '../../components/partner/OrderList';

export default function OrderTable() {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

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

                <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2, overflowY: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2, mt: 2 }}>
                        <Typography variant='h4' sx={{ fontWeight: 500 }}>
                            Orders
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Search box */}
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
                                    placeholder="Mã đơn hàng"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{
                                        flex: 1,
                                        color: 'gray',
                                        fontSize: 16,
                                        '& .MuiInputBase-input': { p: 0 },
                                        '&:focus-within': { outline: 'none' },
                                    }}
                                    disableUnderline
                                />
                            </Box>

                            {/* Status filter */}
                            <Box
                                sx={{
                                    width: 200,
                                    bgcolor: 'white',
                                    borderRadius: '999px',
                                    px: 2,
                                    py: '6px',
                                    boxShadow: '0 0 0 1px #ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    select
                                    variant="standard"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                    sx={{
                                        flex: 1,
                                        '& .MuiSelect-select': { py: 0 },
                                        fontSize: 16,
                                        color: 'gray',
                                    }}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (selected) => {
                                            if (!selected) return "Tất cả";
                                            switch (selected) {
                                                case "Pending":
                                                    return "Chờ xác nhận";
                                                case "Processing":
                                                    return "Đang xử lí";
                                                case "Delivered":
                                                    return "Giao thành công";
                                                case "Refunded":
                                                    return "Hoàn tiền";
                                                case "Cancelled":
                                                    return "Hủy";
                                                default:
                                                    return "";
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="Pending">Chờ xác nhận</MenuItem>
                                    <MenuItem value="Processing">Đang xử lí</MenuItem>
                                    <MenuItem value="Delivered">Giao thành công</MenuItem>
                                    <MenuItem value="Refunded">Hoàn tiền</MenuItem>
                                    <MenuItem value="Cancelled">Hủy</MenuItem>
                                </TextField>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2, overflowY: 'auto' }}>
                        <OrderList searchTerm={searchTerm} statusFilter={statusFilter} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
