import React, { useEffect, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
} from '@mui/material';
import { getAllOrdersByDesAPI } from '../../services/UsersSevices';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllOrdersByDesAPI(page, pageSize);
                console.log('Response:', res);
                setOrders(res.items || []);
                setTotalPages(res.totalPages || 1);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchData();
    }, [page, pageSize]);


    const handleChangePage = (event, value) => {
        setPage(value);
    };

    // Format ngày theo định dạng dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <Box>
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#3F5139' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#f5f5f5' }}>STT</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Người mua</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Tổng giá</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Ngày tạo</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((item, index) => (
                            <TableRow
                                key={item.id}
                                hover
                                onClick={() => navigate(`${routes.orderList}/${item.id}`)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                                <TableCell>{item.customer.name}</TableCell>
                                <TableCell>{item.orderPrice.toLocaleString()}đ</TableCell>
                                <TableCell>{formatDate(item.date)}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            color: '#fff',
                                            fontWeight: 500,
                                            display: 'inline-block',
                                            bgcolor:
                                                item.status === 'Completed'
                                                    ? '#4CAF50'
                                                    : item.status === 'Processing'
                                                        ? '#FF9800'
                                                        : item.status === 'Buy'
                                                            ? '#2196F3'
                                                            : '#9E9E9E',
                                        }}
                                    >
                                        {item.status}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPages} page={page} onChange={handleChangePage} />
            </Box>
        </Box>
    );
};

export default OrderList;
