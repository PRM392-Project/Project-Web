import React from 'react';
import { 
    Box, 
    Typography, 
    useTheme, 
    useMediaQuery 
} from '@mui/material';

import intro_section from '../../assets/image/intro_section.png';
import intro_section2 from '../../assets/image/intro_section2.png';
import intro_section3 from '../../assets/image/intro_section3.png';
import icon_white from '../../assets/image/icon_white.png';
import { motion } from 'framer-motion';


const items = [
    {
        img: intro_section,
        title: 'Chất lượng',
        description: 'Chất lượng của các sản phẩm nội thất được kiểm định nghiêm ngặt, đảm bảo độ bền, thẩm mỹ.',
    },
    {
        img: intro_section2,
        title: 'Bản vẽ',
        description: 'Cung cấp các bản thiết kế phòng chuyên nghiệp, chi tiết giúp bạn dễ dàng hình dung không gian.',
    },
    {
        img: intro_section3,
        title: 'Thiết kế',
        description: 'Các nhà thiết kế sáng tạo mang đến những ý tưởng độc đáo, phù hợp với phong cách của bạn.',
    },
    {
        img: icon_white,
        title: 'Ứng dụng',
        description: 'Ứng dụng di động tiện lợi giúp bạn trải nghiệm và quản lý không gian sống mọi lúc mọi nơi.',
    },
];

const SectionIntro = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            id="section-0"
            sx={{
                py: 4,
                px: 4,
                background: '#f5f5f5',

                color: '#3F5139',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h2"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#3F5139', mb: 2 }}
            >
                Giới thiệu
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 10 }}>
                Nơi sáng tạo không gian sống của bạn bắt đầu. Khám phá ngay và biến không gian sống của bạn thành nơi lý tưởng
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? 4 : 6,
                    maxWidth: 1200,
                    margin: '0 auto',
                }}
            >
                {items.map(({ img, title, description }, index) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                                    transform: 'translateY(-6px)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={img}
                                alt={title}
                                sx={{
                                    width: isMobile ? 100 : 120,
                                    height: isMobile ? 100 : 120,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    mb: 2,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: '600',
                                    mb: 1,
                                    background: 'linear-gradient(45deg, #3F5139, #a3b18a)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    position: 'relative',
                                }}
                            >
                                {title}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: -6,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 40,
                                        height: 3,
                                        bgcolor: '#3F5139',
                                        borderRadius: 1,
                                    }}
                                />
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ maxWidth: 220, color: 'black', opacity: 0.9, mt: 1 }}
                            >
                                {description}
                            </Typography>
                        </Box>
                    </motion.div>
                ))}
            </Box>

        </Box>
    );
};

export default SectionIntro;
