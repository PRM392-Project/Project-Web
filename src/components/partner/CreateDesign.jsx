import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, FormControl, InputLabel, Select,
  MenuItem, Typography, IconButton, Paper
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { createDesignAPI, getAllCategoriesAPI } from '../../services/UsersSevices';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

const CreateDesign = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const [categoriesStyle1, setCategoriesStyle1] = useState([]);
  const [categoriesStyle0, setCategoriesStyle0] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(['']);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [images, setImages] = useState([]);

  const mainColor = '#3F5139';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const style1Data = await getAllCategoriesAPI(true);
        const style0Data = await getAllCategoriesAPI(false);
        setCategoriesStyle1(style1Data);
        setCategoriesStyle0(style0Data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Price', price);
      formData.append('Description', description);
      formData.append('Active', active);
      formData.append('StyleId', selectedStyleId);
      selectedCategoryIds.filter(id => id).forEach(id => {
        formData.append('CategoryIds', id);
      });
      if (primaryImage) {
        formData.append('PrimaryImage', primaryImage);
      }
      images.forEach(image => {
        formData.append('Images', image);
      });

      await createDesignAPI(formData);
      alert('Thêm nội thất thành công');
      navigate(routes.designList);
    } catch (error) {
      console.error('Error creating design:', error);
      alert('Lỗi khi thêm: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAddCategoryDropdown = () => {
    setSelectedCategoryIds(prev => [...prev, '']);
  };

  const handleRemoveCategoryDropdown = (index) => {
    const newSelected = [...selectedCategoryIds];
    newSelected.splice(index, 1);
    setSelectedCategoryIds(newSelected);
  };

  const handleCategoryChange = (index, value) => {
    const newSelected = [...selectedCategoryIds];
    newSelected[index] = value;
    setSelectedCategoryIds(newSelected);
  };

  const textFieldStyles = {
    '& label.Mui-focused': { color: mainColor },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': { borderColor: mainColor },
    },
  };

  const selectStyles = {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: mainColor,
    },
    '& label.Mui-focused': { color: mainColor },
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ bgcolor: mainColor, p: 2, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <Typography variant="h5" color="#fff" align="center" fontWeight={600}>
          Thêm bản thiết
        </Typography>
      </Box>

      <Box component="form" noValidate autoComplete="off" sx={{ p: 4 }}>
        {/* Dòng 1: Tên, Giá và Tình trạng */}
        <Box display="flex" gap={3} alignItems="center">
          <TextField
            fullWidth label="Tên bản thiết kế" value={name}
            onChange={(e) => setName(e.target.value)} margin="normal" sx={textFieldStyles}
          />
          <TextField
            fullWidth label="Giá" value={price}
            onChange={(e) => setPrice(e.target.value)} margin="normal" sx={textFieldStyles}
          />

          <FormControl fullWidth margin="normal" sx={selectStyles}>
            <InputLabel shrink>Tình trạng</InputLabel>
            <Select
              label="Tình trạng"
              value={active ? '1' : '0'}
              onChange={(e) => setActive(e.target.value === '1')}
              notched
              displayEmpty
            >
              <MenuItem value="1">Còn hàng</MenuItem>
              <MenuItem value="0">Hết hàng</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Dòng 2: Mô tả */}
        <TextField
          fullWidth label="Mô tả" multiline rows={3} value={description}
          onChange={(e) => setDescription(e.target.value)} margin="normal" sx={textFieldStyles}
        />

        {/* Dòng 3:Phong cách */}
        <Box display="flex" gap={3} alignItems="center" mt={2}>
          <FormControl fullWidth margin="normal" sx={selectStyles}>
            <InputLabel shrink>Phong cách</InputLabel>
            <Select
              label="Phong cách"
              value={selectedStyleId}
              onChange={(e) => setSelectedStyleId(e.target.value)}
              notched
              displayEmpty
            >
              {categoriesStyle1.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Danh mục */}
        <Box mt={2}>
          {selectedCategoryIds.map((selectedId, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
              <FormControl fullWidth sx={selectStyles}>
                <InputLabel shrink>Danh mục {index + 1}</InputLabel>
                <Select
                  label={`Danh mục ${index + 1}`}
                  value={selectedId}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  notched
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 5 + 8, // 5 dòng
                      },
                    },
                  }}
                >
                  {categoriesStyle0.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedCategoryIds.length > 1 && (
                <IconButton sx={{ color: 'red' }} onClick={() => handleRemoveCategoryDropdown(index)}>
                  <RemoveCircleIcon />
                </IconButton>
              )}
            </Box>

          ))}

          {/* Nút thêm danh mục nằm dưới */}
          <Box display="flex" alignItems="center" mt={1}>
            <IconButton sx={{ color: mainColor }} onClick={handleAddCategoryDropdown}>
              <AddCircleIcon />
            </IconButton>
            <Typography>Thêm danh mục</Typography>
          </Box>
        </Box>

        {/* Ảnh chính */}
        <Box mt={3}>
          <Typography>Ảnh chính</Typography>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            setPrimaryImage(file);
          }} />
          {primaryImage && (
            <Box mt={1}>
              <img
                src={URL.createObjectURL(primaryImage)}
                alt="Primary Preview"
                style={{ width: 250, height: 'auto', borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>

        {/* Ảnh phụ */}
        <Box mt={3}>
          <Typography>Ảnh phụ</Typography>
          <input type="file" accept="image/*" multiple onChange={(e) => {
            const files = Array.from(e.target.files);
            setImages(files);
          }} />
          <Box mt={1} display="flex" flexWrap="wrap" gap={2}>
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt={""}
                style={{ width: 150, height: 'auto', borderRadius: 8 }}
              />
            ))}
          </Box>
        </Box>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            sx={{ borderColor: mainColor, color: mainColor, '&:hover': { backgroundColor: '#f0f0f0', borderColor: mainColor } }}
            onClick={() => navigate(routes.designList)}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            sx={{ bgcolor: mainColor, color: '#fff', '&:hover': { bgcolor: '#33432e' } }}
            onClick={handleSubmit}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateDesign;
