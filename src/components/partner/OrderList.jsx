import React, { useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Pagination, TextField, MenuItem,
} from '@mui/material';
import { getAllOrdersByDesAPI, updateOrderStatusAPI } from '../../services/UsersSevices';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { toast } from 'react-toastify';

const OrderList = ({ searchTerm, statusFilter }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const res = await getAllOrdersByDesAPI(page, pageSize);
            let filteredOrders = res.items || [];

            if (statusFilter) {
                filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
            }

            if (searchTerm) {
                filteredOrders = filteredOrders.filter(order =>
                    order.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setOrders(filteredOrders);
            setTotalPages(res.totalPages || 1);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize, searchTerm, statusFilter]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const allowedTransitions = {
        1: [2, 4],  // Pending → Processing or Cancelled
        2: [3, 4],  // Processing → Delivered or Cancelled
        3: [5],     // Delivered → Refunded
    };

    const statusStringToNumber = {
        Pending: 1,
        Processing: 2,
        Delivered: 3,
        Cancelled: 4,
        Refunded: 5,
    };

    const numberToStatusString = {
        1: 'Pending',
        2: 'Processing',
        3: 'Delivered',
        4: 'Cancelled',
        5: 'Refunded',
    };

    const handleStatusChange = async (orderId, newStatusString) => {
        const currentOrder = orders.find(o => o.id === orderId);
        const currentStatusNum = statusStringToNumber[currentOrder.status];
        const newStatusNum = statusStringToNumber[newStatusString];

        const isValidTransition = allowedTransitions[currentStatusNum]?.includes(newStatusNum);

        if (!isValidTransition) {
            toast.error("Trạng thái phải được cập nhật theo thứ tự");
            return;
        }

        try {
            await updateOrderStatusAPI(orderId, newStatusNum);
            toast.success("Cập nhật trạng thái thành công");
            fetchData();
        } catch (error) {
            toast.error("Cập nhật trạng thái thất bại");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const statusColorMap = {
        Pending: "#9E9E9E",
        Processing: "#FF9800",
        Delivered: "#347433",
        Refunded: "#FF6F3C",
        Cancelled: "#B22222",
    };

    const statusLabelMap = {
        Pending: "Chờ xác nhận",
        Processing: "Đang xử lý",
        Delivered: "Đã giao hàng",
        Refunded: "Hoàn tiền",
        Cancelled: "Đã hủy",
    };

    const statusOptions = [
        { value: 'Pending', label: 'Chờ xác nhận' },
        { value: 'Processing', label: 'Đang xử lý' },
        { value: 'Delivered', label: 'Đã giao hàng' },
        { value: 'Cancelled', label: 'Đã hủy' },
        { value: 'Refunded', label: 'Hoàn tiền' },
    ];

    return (
        <Box>
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#3F5139' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#f5f5f5' }}>STT</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Mã đơn hàng</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Người mua</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Tổng giá</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Ngày tạo</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Trạng thái</TableCell>
                            <TableCell sx={{ color: '#f5f5f5' }}>Cập nhật trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((item, index) => (
                            <TableRow key={item.id} hover sx={{ cursor: 'pointer' }}>
                                <TableCell onClick={() => navigate(`${routes.orderList}/${item.id}`)}>
                                    {(page - 1) * pageSize + index + 1}
                                </TableCell>
                                <TableCell onClick={() => navigate(`${routes.orderList}/${item.id}`)}>
                                    {item.id}
                                </TableCell>
                                <TableCell onClick={() => navigate(`${routes.orderList}/${item.id}`)}>
                                    {item.customer.name}
                                </TableCell>
                                <TableCell onClick={() => navigate(`${routes.orderList}/${item.id}`)}>
                                    {item.orderPrice.toLocaleString()}đ
                                </TableCell>
                                <TableCell onClick={() => navigate(`${routes.orderList}/${item.id}`)}>
                                    {formatDate(item.date)}
                                </TableCell>
                                <TableCell onClick={() => navigate(`${routes.orderList}/${item.id}`)}>
                                    <Box
                                        sx={{
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            color: "#fff",
                                            fontWeight: 500,
                                            display: "inline-block",
                                            bgcolor: statusColorMap[item.status] || "#F5F5F5",
                                        }}
                                    >
                                        {statusLabelMap[item.status] || "Không xác định"}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        select
                                        variant="standard"
                                        value={item.status}
                                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                        sx={{
                                            bgcolor: 'white',
                                            borderRadius: '999px',
                                            px: 2,
                                            py: '6px',
                                            boxShadow: '0 0 0 1px #ccc',
                                            fontSize: 16,
                                            color: 'gray',
                                            width: 150,
                                            '& .MuiSelect-select': { py: 0 },
                                        }}
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
