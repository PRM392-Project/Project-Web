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
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllDesignsByDesAPI, getProductByIdAPI } from '../../services/UsersSevices';
import { useNavigate } from 'react-router-dom';
import FurniturePopup from './FurniturePopup';
import { routes } from '../../routes';

const DesignList = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [allDesigns, setAllDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [popupData, setPopupData] = useState({
    open: false,
    furnitures: [],
  });

  const handleViewFurnitures = async (designId) => {
    try {
      console.log('🔍 Getting product by ID:', designId);
      const res = await getProductByIdAPI(designId);
      console.log('Product detail:', res);

      const furnitures = res?.furnitures || [];
      if (furnitures.length === 0) {
        console.warn('No furnitures found in product.');
      } else {
        console.log('Furnitures:', furnitures);
      }

      setPopupData({ open: true, furnitures });
    } catch (err) {
      console.error('Error loading furniture list:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllDesignsByDesAPI();
        const items = res.data.items || [];
        setAllDesigns(items);
        setFilteredDesigns(items);
        console.log('Designs fetched:', items);
      } catch (err) {
        console.error('Error fetching designs:', err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allDesigns.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDesigns(filtered);
    setPage(1);
  }, [searchTerm, allDesigns]);

  const totalPages = Math.ceil(filteredDesigns.length / pageSize);
  const paginatedDesigns = filteredDesigns.slice(
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
              <TableCell sx={{ color: '#f5f5f5' }}>Tên</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Giá</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }}>Danh mục</TableCell>
              <TableCell sx={{ color: '#f5f5f5' }} align="center">Quản lí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDesigns.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={item?.primaryImage?.imageSource || 'img'}
                    alt={item.name}
                    sx={{
                      width: 130,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 1,
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
                  <IconButton color="primary" size="small" onClick={() => navigate(routes.designDetail.replace(":id", item.id))}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    size="small"
                    onClick={() => navigate(`/furniture/create?designId=${item.id}`)}
                  >
                    <AddBoxIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    size="small"
                    onClick={() => handleViewFurnitures(item.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={totalPages} page={page} onChange={(e, val) => setPage(val)} />
      </Box>

      <FurniturePopup
        open={popupData.open}
        onClose={() => setPopupData({ open: false, furnitures: [] })}
        furnitures={popupData.furnitures}
      />
    </Box>
  );
};

export default DesignList;
