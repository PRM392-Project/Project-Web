import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  Stack,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  getAllOrdersByDesAPI,
  getNewProductsAPI,
  getDesignerRevenueByDayAPI,
  getTopProductsAPI,
  getTopProductsWithReviewsAPI
} from '../../services/UsersSevices';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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

const DashboardDesigner = () => {
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topReviewedProducts, setTopReviewedProducts] = useState([]);


  const [orderTotalRevenue, setOrderTotalRevenue] = useState(0);
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrdersByDesAPI();
      const items = response.items || [];

      // Tổng đơn
      setTotalOrders(response.totalItems || 0);

      // Tổng khách hàng
      const uniqueCustomers = [...new Set(items.map(order => order.customer?.name))];
      setTotalCustomers(uniqueCustomers.length);

      // Đếm theo trạng thái
      const statusCount = items.reduce((acc, order) => {
        const status = order.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      // Convert sang mảng cho PieChart
      const formattedStatusData = Object.entries(statusCount).map(([status, value]) => ({
        name: statusLabelMap[status] || status,
        value,
        rawStatus: status,
      }));
      setOrderStatusData(formattedStatusData);

    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchRevenueData = async (month, year) => {
    try {
      const res = await getDesignerRevenueByDayAPI(month, year);

      const rawData = res || [];

      const cleanData = rawData.map(item => ({
        day: Number(item.day),
        revenue: Number(item.revenue),
      }));

      setRevenueData(cleanData);
    } catch (err) {
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const fetchTopProducts = async () => {
    try {
      const res = await getTopProductsAPI();
      const products = res || [];

      const chartData = products.map(p => ({
        name: p.productName,
        sales: p.quantitySold,
      }));

      setTopProducts(chartData);
    } catch (err) {
    }
  };

  const fetchTotalRevenueFromOrders = async () => {
    try {
      const res = await getAllOrdersByDesAPI();
      const orders = res?.items || [];
      const total = orders.reduce((sum, order) => sum + (order.orderPrice || 0), 0);
      setOrderTotalRevenue(total);
    } catch (err) {
    }
  };

  const fetchTopReviewedProducts = async () => {
    try {
      const result = await getTopProductsWithReviewsAPI();

      if (Array.isArray(result)) {
        console.log("Valid data, setting state...");
        setTopReviewedProducts(result);
      } else {
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchTopProducts();
    fetchOrders();
    fetchWaiting();
    fetchTotalRevenueFromOrders();
    fetchTopReviewedProducts();
  }, []);

  useEffect(() => {
    console.log("topReviewedProducts state changed:", topReviewedProducts);
  }, [topReviewedProducts]);


  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchRevenueData(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  const fetchWaiting = async () => {
    try {
      const res = await getNewProductsAPI();
      const total = res?.totalItems ?? 0;
      console.log("Total items:", total);
      setTotalItems(total);
    } catch (err) {
      console.error('Error fetching total items:', err);
    }
  };

  return (
    <Box >
      <Grid container spacing={2} sx={{ mt: 0 }}>
        {/* Total User */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            {/* Icon góc phải */}
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#E9E5FB', width: 56, height: 56 }}>
                <GroupsIcon sx={{ color: '#5B50E5', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng người mua
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalCustomers}</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>8.5%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Order */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#FDEBD3', width: 56, height: 56 }}>
                <InventoryIcon sx={{ color: '#F59E0B', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng đơn hàng
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalOrders}</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>1.3%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Sales */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#DDF5EC', width: 56, height: 56 }}>
                <ShoppingCartIcon sx={{ color: '#22C55E', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Tổng doanh thu
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {(orderTotalRevenue % 1000000 === 0
                ? (orderTotalRevenue / 1000000).toFixed(0)
                : (orderTotalRevenue / 1000000).toFixed(2)
              ) + "M VNĐ"
              }
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingDownIcon sx={{ color: 'red', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'red', fontWeight: 500 }}>4.3%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Pending */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#FFEFE3', width: 56, height: 56 }}>
                <AccessTimeIcon sx={{ color: '#F97316', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Sản phẩm chờ
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalItems}</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>1.8%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Line Chart */}
      <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h6" fontWeight="bold">Doanh thu theo ngày trong tháng</Typography>
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select value={selectedMonth} onChange={handleMonthChange}>
                {[...Array(12).keys()].map(i => (
                  <MenuItem key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select value={selectedYear} onChange={handleYearChange}>
                {[currentYear - 2, currentYear - 1, currentYear].map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} VNĐ`, 'Doanh thu']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#89B9AD" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Phần biểu đồ ngang gồm 2 biểu đồ BarChart và Donut Chart */}
      <Grid container spacing={2} mt={4}>
        {/* Bar chart top 5 sản phẩm */}
        <Grid item xs={12} md={6} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Top sản phẩm bán chạy</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" height={20} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="sales" fill="#4DA8DA" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Donut chart trạng thái đơn hàng */}
        <Grid item xs={12} md={6} sx={{ flex: 0.8 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Trạng thái đơn hàng</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={statusColorMap[entry.rawStatus] || "#ccc"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

      </Grid>

      {/* Danh sách feedback chia theo sản phẩm */}
      <Grid container spacing={2} mt={4}>
        {Array.isArray(topReviewedProducts) && topReviewedProducts.map(product => (
          <Grid item xs={12} md={4} key={product.productId} sx={{ flex: 1 }}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>{product.productName}</Typography>
              <Box
                sx={{
                  maxHeight: 200,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                    display: 'none',
                  },
                  '&:hover::-webkit-scrollbar': {
                    display: 'block',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ccc',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Khách: {review.customer?.name || 'Ẩn danh'}
                        </Typography>
                        <Typography variant="body2">
                          {review.comment || 'Không có bình luận'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {review.date || 'Không rõ ngày'}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Chưa có đánh giá
                  </Typography>
                )}

              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default DashboardDesigner;
