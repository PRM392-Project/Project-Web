import React from 'react';
import { 
    Box, 
    Typography, 
    useTheme, 
    useMediaQuery 
} from '@mui/material';
import { motion } from 'framer-motion';

import des_section from '../../assets/image/des_section.png';
import des_section2 from '../../assets/image/des_section2.png';
import des_section3 from '../../assets/image/des_section3.png';
import des_section4 from '../../assets/image/des_section4.png';

const images = [des_section, des_section2, des_section3, des_section4];

const SectionDesigner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            id="section-2"
            sx={{
                py: 6,
                px: 4,
                background: '#f5f5f5',
                color: '#3F5139',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
            }}
        >
            {/* Left: Images */}
            <Box
                sx={{
                    width: { xs: '100%', md: '50%' },
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
                    gap: 2,
                }}
            >
                {images.map((img, idx) => (
                    <motion.img
                        key={idx}
                        src={img}
                        alt={`designer-${idx}`}
                        loading="lazy"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        style={{
                            width: '100%',
                            borderRadius: 12,
                            objectFit: 'cover',
                            aspectRatio: '4 / 3',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            filter: 'grayscale(20%)',
                            transition: 'filter 0.3s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                        onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(20%)'}
                    />
                ))}
            </Box>

            {/* Right: Text */}
            <Box
                sx={{
                    width: { xs: '100%', md: '45%' },
                    textAlign: { xs: 'center', md: 'right' },
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant={isMobile ? 'h3' : 'h2'}
                        sx={{ fontWeight: 'bold', mb: 1, letterSpacing: 1 }}
                    >
                        Nhà thiết kế
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 3, fontWeight: 500, color: '#5a6b47', letterSpacing: 0.8 }}
                    >
                        Đưa ý tưởng của bạn thành hiện thực cùng những chuyên gia thiết kế hàng đầu.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            lineHeight: 1.6,
                            fontWeight: 400,
                            color: '#3F5139',
                        }}
                    >
                        Những nhà thiết kế của chúng tôi không chỉ đơn thuần tạo ra sản phẩm – họ kiến tạo trải nghiệm sống độc đáo, mang đậm phong cách và cá tính riêng. Khám phá bộ sưu tập thiết kế đa dạng, hiện đại và tinh tế, giúp biến mỗi góc nhỏ trong tổ ấm của bạn thành nguồn cảm hứng bất tận.
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
};

export default SectionDesigner;
