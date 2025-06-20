import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Paper 
} from '@mui/material';
import fullLogoGreen from '../../assets/image/full_logo_green.png';

export default function ResetPasswordForm({ onSubmit }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        setError('');
        onSubmit(newPassword);
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
                        label="Mật khẩu mới"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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

                    <TextField
                        label="Xác nhận lại mật khẩu"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        error={!!error}
                        helperText={error}
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
                        Đặt lại mật khẩu
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
