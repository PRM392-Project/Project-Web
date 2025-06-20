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
import { getNewProductsAPI } from '../../services/UsersSevices';

const WaitingList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getNewProductsAPI();
      const items = res?.items?.map(item => ({
        ...item,
        name: item?.name ?? '',
        decision: null
      })) || [];

      setProducts(items);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredProducts = products.filter(product => {
    const productName = product?.name ?? '';
    const search = searchTerm?.toLowerCase() ?? '';
    return productName.toLowerCase().includes(search);
  });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#3F5139' }}>
            <TableRow>
              <TableCell sx={{ color: '#f5f5f5' }}>STT</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={item?.primaryImage?.imageSource || 'img'}
                    alt={item.name}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: 'contain',
                      borderRadius: 1,
                      display: 'block',
                    }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price.toLocaleString()}đ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={Math.ceil(filteredProducts.length / pageSize)} page={page} onChange={handleChangePage} />
      </Box>
    </Box>
  );
};

export default WaitingList;
