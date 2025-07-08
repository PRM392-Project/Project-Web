import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import fullLogoGreen from '../../assets/image/full_logo_green.png';

export default function LoginForm({ values, onChange, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        height: '100vh',
        maxHeight: '100vh',
        bgcolor: '#3F5139',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
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
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <img
            src={fullLogoGreen}
            alt="Logo"
            style={{ maxWidth: 250, height: 'auto' }}
          />
        </Box>



        <Box component="form" onSubmit={onSubmit} mt={2}>
          <TextField
            label="Email"
            type="email"
            value={values.email}
            onChange={onChange('email')}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ sx: { color: '#3F5139' } }}
            sx={{
              '& label.Mui-focused': { color: '#3F5139' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                color: '#3F5139',
              },
              '& label > .MuiInputLabel-asterisk': {
                display: 'none',
              },
            }}
          />

          <TextField
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={onChange('password')}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: '#3F5139' }}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { color: '#3F5139' },
            }}
            InputLabelProps={{ sx: { color: '#3F5139' } }}
            sx={{
              '& label.Mui-focused': { color: '#3F5139' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#3F5139' },
                color: '#3F5139',
              },
              '& label > .MuiInputLabel-asterisk': {
                display: 'none',
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 1,
              mb: 2,
            }}
          >
            <Typography
              component={Link}
              to={routes.forgotPassword}
              variant="body2"
              sx={{
                cursor: 'pointer',
                color: '#4e5c47',
                fontWeight: 500,
                transition: 'color 0.3s',
                textDecoration: 'none',
                '&:hover': {
                  color: '#3F5139',
                  textDecoration: 'underline',
                },
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              bgcolor: '#4e5c47',
              textTransform: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              paddingY: 1.2,
              borderRadius: 2,
              ':hover': { bgcolor: '#3d4a38' },
              boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
            }}
          >
            Đăng nhập
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={3} color="#3F5139">
          Chưa có tài khoản?{' '}
          <Button
            component={Link}
            to={routes.register}
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
            Đăng ký
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
