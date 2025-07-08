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
  IconButton,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { routes } from '../../routes';
import { getAllFursByDesAPI } from '../../services/UsersSevices';
import { useNavigate } from 'react-router-dom';

const FurList = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [allFurnitures, setAllFurnitures] = useState([]);
  const [filteredFurnitures, setFilteredFurnitures] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllFursByDesAPI();
        const items = res.data.items || [];
        setAllFurnitures(items);
        setFilteredFurnitures(items);
      } catch (err) {
        console.error('Error fetching furnitures:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allFurnitures.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFurnitures(filtered);
    setPage(1); // Reset về trang 1 khi search
  }, [searchTerm, allFurnitures]);

  const totalPages = Math.ceil(filteredFurnitures.length / pageSize);
  const paginatedFurnitures = filteredFurnitures.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#3F5139' }}>
            <TableRow>
              <TableCell sx={{ color: '#f5f5f5' }}>STT</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Tên</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Giá</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Danh mục</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }} align="center">Quản lí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFurnitures.map((item, index) => (
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
                <TableCell>
                  <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {[
                      item.style?.name,
                      ...(item.categories?.map((cat) => cat.name) || []),
                    ]
                      .filter(Boolean)
                      .map((name) => name.toLowerCase())
                      .join(', ')}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" size="small" onClick={() => navigate(routes.furnitureDetail.replace(":id", item.id))}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
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

export default FurList;
