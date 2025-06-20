import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import fullLogoGreen from '../../assets/image/full_logo_green.png';
import { useState } from 'react';

export default function ForgotPasswordForm({ onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#3F5139',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          backgroundColor: '#f5f5f5',
          color: '#3F5139',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={fullLogoGreen} alt="Logo" style={{ maxWidth: 250, height: 'auto' }} />
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ sx: { color: '#3F5139' } }}
            sx={{
              '& label.Mui-focused': { color: '#3F5139' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                color: '#3F5139',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: '#4e5c47',
              textTransform: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              py: 1.2,
              borderRadius: 2,
              ':hover': { bgcolor: '#3d4a38' },
              boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
            }}
          >
            Quên mật khẩu
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={3} color="#3F5139">
          Đã nhớ mật khẩu?{' '}
          <Button
            component={Link}
            to={routes.login}
            sx={{
              color: '#4e5c47',
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              fontSize: '1rem',
              fontWeight: 'normal',
              transition: 'color 0.3s, font-weight 0.3s',
              '&:hover': {
                color: '#3F5139',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Đăng nhập
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
