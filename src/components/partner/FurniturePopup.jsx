import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
  Typography
} from '@mui/material';

const FurniturePopup = ({ open, onClose, furnitures }) => {
  useEffect(() => {
    console.log('🪑 FurniturePopup received furnitures:', furnitures);
  }, [furnitures]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Danh sách nội thất</DialogTitle>
      <DialogContent>
        {furnitures.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#3F5139' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>STT</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Hình ảnh</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Tên</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {furnitures.map((furniture, index) => (
                  <TableRow key={furniture.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box
                        component="img"
                        src={furniture.primaryImage?.imageSource || ''}
                        alt={furniture.name}
                        sx={{
                          width: 100,
                          height: 60,
                          objectFit: 'contain',
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>
                    <TableCell>{furniture.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Không có nội thất nào.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FurniturePopup;
