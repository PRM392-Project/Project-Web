import React from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Divider 
} from '@mui/material';
import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <Box
            id="section-3"
            sx={{
                py: 8,
                px: { xs: 3, md: 10 },
                 background: 'linear-gradient(135deg,rgb(146, 161, 141) 0%,rgb(108, 123, 89) 100%)',
                color: '#fff',
            }}
        >
            <Grid container spacing={6} alignItems="center">
                {/* LEFT SIDE: Contact Form */}
                <Grid item xs={12} md={6}>
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Liên hệ với chúng tôi
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4 }}>
                            Gửi cho chúng tôi thắc mắc hoặc yêu cầu, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                        </Typography>

                        <Box component="form" noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                label="Họ và tên"
                                variant="outlined"
                                margin="normal"
                                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Nội dung"
                                multiline
                                rows={4}
                                variant="outlined"
                                margin="normal"
                                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                            />

                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    backgroundColor: '#ffffff',
                                    color: '#3F5139',
                                    fontWeight: 'bold',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                Gửi liên hệ
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* RIGHT SIDE: Contact Info */}
                <Grid item xs={12} md={6}>
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        sx={{
                            px: { xs: 0, md: 4 },
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Thông tin liên hệ
                        </Typography>
                        <Divider sx={{ borderColor: '#fff', opacity: 0.3, mb: 2 }} />
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            📍 Địa chỉ: 123 Đường Thiết Kế, Quận Sáng Tạo, TP. HCM
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            📧 Email: contact@dreamstars.vn
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            ☎️ Hotline: 0909 123 456
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactSection;
