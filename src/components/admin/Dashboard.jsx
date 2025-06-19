import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography, Avatar, Stack, MenuItem, Select, FormControl } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getAllAccountsAPI, getNewProductsAPI } from '../../services/UsersSevices';
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
  AreaChart,  
  Area
} from 'recharts';
// import { Tooltip as MuiTooltip } from '@mui/material';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [totalDesigners, setTotalDesigners] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

  const mockRevenueData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 5000000) + 1000000, // random 1tr-5tr
  }));

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Sau này khi có API fetch data ở đây theo tháng
  };

  useEffect(() => {
    fetchAccounts();
    fetchData();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await getAllAccountsAPI();
      const items = response.items || [];
      const designerCount = items.filter(user => user.role === 1).length;
      setTotalDesigners(designerCount);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getNewProductsAPI();
      const total = res?.items?.length || 0;
      setTotalProducts(total);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Top nhà thiết kế bán chạy
  const designerData = [
    { name: 'Lin Dũ', revenue: 12000000, image: 'https://via.placeholder.com/50' },
    { name: 'Lê Tris', revenue: 11000000, image: 'https://via.placeholder.com/50' },
    { name: 'Nhu', revenue: 9500000, image: 'https://via.placeholder.com/50' },
    // { name: 'Designer D', revenue: 8200000, image: 'https://via.placeholder.com/50' },
    // { name: 'Designer E', revenue: 7800000, image: 'https://via.placeholder.com/50' },
  ];

  // Trạng thái sản phẩm
  const statusData = [
    { name: 'Đã duyệt', value: 22 },
    { name: 'Chưa duyệt', value: 3 },
  ];

  const orderSystemData = [
    { name: 'Tháng 1', completed: 120, pending: 30 },
    { name: 'Tháng 2', completed: 150, pending: 20 },
    { name: 'Tháng 3', completed: 100, pending: 40 },
    { name: 'Tháng 4', completed: 180, pending: 15 },
    { name: 'Tháng 5', completed: 140, pending: 25 },
  ];

  // Mock user growth data
  const userGrowthData = [
    { month: 'Tháng 1', users: 120 },
    { month: 'Tháng 2', users: 150 },
    { month: 'Tháng 3', users: 200 },
    { month: 'Tháng 4', users: 250 },
    { month: 'Tháng 5', users: 300 },
    { month: 'Tháng 6', users: 350 },
  ];


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
              Tổng nhà thiết kế
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalDesigners}</Typography>

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
                <AccessTimeIcon sx={{ color: '#F59E0B', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Nhà thiết kế chờ duyệt
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>0</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingDownIcon sx={{ color: 'red', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'red', fontWeight: 500 }}>0.3%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

        {/* Total Pending */}
        <Grid item xs={12} sm={6} md={3} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, height: '70%', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Avatar sx={{ bgcolor: '#FFEFE3', width: 56, height: 56 }}>
                <InventoryIcon sx={{ color: '#F97316', fontSize: 30 }} />
              </Avatar>
            </Box>

            <Typography variant="body2" color="textSecondary" fontWeight={500} marginBottom={2}>
              Sản phẩm chờ duyệt
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{totalProducts}</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingUpIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>1.8%</Typography>
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
            <Typography variant="h4" fontWeight="bold" mt={1}>48.2M VNĐ</Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} mt={2}>
              <TrendingDownIcon sx={{ color: 'red', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'red', fontWeight: 500 }}>4.3%</Typography>
              <Typography variant="body2" color="textSecondary">So với hôm qua</Typography>
            </Stack>
          </Card>
        </Grid>

      </Grid>

      {/* Line Chart */}
      <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h6" fontWeight="bold">Doanh thu theo ngày trong tháng</Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={selectedMonth} onChange={handleMonthChange}>
              {[...Array(12).keys()].map(i => (
                <MenuItem key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRevenueData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => `${value.toLocaleString()} VNĐ`} />
              <Line type="monotone" dataKey="revenue" stroke="#89B9AD" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Phần biểu đồ ngang gồm 2 biểu đồ BarChart và Donut Chart */}
      <Grid container spacing={2} mt={4}>
        {/* Bar chart top 5 sản phẩm */}
        {/* Bar chart top 5 nhà thiết kế doanh thu cao */}
        <Grid item xs={12} md={6} sx={{ flex: 1 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Top 5 nhà thiết kế doanh thu cao</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={designerData} layout="vertical" margin={{ top: 20, right: 20, left: 18, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" height={20} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => `${value.toLocaleString()} VNĐ`} />
                <Bar dataKey="revenue" fill="#4DA8DA" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Donut chart trạng thái đơn hàng */}
        <Grid item xs={12} md={6} sx={{ flex: 0.5 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Trạng thái đơn hàng</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  startAngle={90}
                  endAngle={-270}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Stacked Bar chart đơn hàng toàn hệ thống */}
      <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Đơn hàng toàn hệ thống</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderSystemData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" stackId="a" fill="#84AE92" name="Hoàn thành" />
            <Bar dataKey="pending" stackId="a" fill="#FFD586" name="Chưa hoàn thành" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Tăng trưởng người dùng theo tháng</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userGrowthData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#8884d8" fillOpacity={1} fill="url(#colorUsers)" name="Người dùng" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

    </Box>
  );
};

export default Dashboard;
