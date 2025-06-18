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

export default function RegisterForm({ onRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        portfolio: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password confirm
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        setError(null);
        // Gọi callback onRegister từ cha, truyền dữ liệu form
        onRegister({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            applicattionUrl: formData.portfolio,
        });
    };

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
                    maxWidth: 500,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                    backgroundColor: '#f5f5f5',
                    color: '#3F5139',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    boxSizing: 'border-box',
                }}
            >
                {/* Logo */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img
                        src={fullLogoGreen}
                        alt="Logo"
                        style={{ maxWidth: 250, height: 'auto' }}
                    />
                </Box>

                {/* Form */}
                <Box component="form" mt={2} onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        label="Họ và tên"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
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
                        label="Portfolio link"
                        name="portfolio"
                        type="text"
                        value={formData.portfolio}
                        onChange={handleChange}
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
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
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
                    <TextField
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
                    {error && (
                        <Typography color="error" variant="body2" mt={1}>
                            {error}
                        </Typography>
                    )}
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
                        Đăng ký
                    </Button>
                </Box>

                <Typography variant="body2" align="center" mt={3} color="#3F5139">
                    Đã có tài khoản?{' '}
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
