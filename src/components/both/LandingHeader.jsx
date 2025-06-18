import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Slide,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import fullLogoWhite from '../../assets/image/full_logo_white.png';
import logoWhite from '../../assets/image/logo_white.png';
import landingBanner from '../../assets/image/landing_banner.png';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const menuItems = [
  { label: 'Giới thiệu', target: 'section-0' },
  { label: 'Nội thất', target: 'section-1' },
  { label: 'Nhà thiết kế', target: 'section-2' },
  { label: 'Liên Hệ', target: 'section-3' },
];

const LandingHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <Slide in={showHeader} direction="down" timeout={{ enter: 500, exit: 300 }}>
        <AppBar
          position="sticky"
          sx={{
            background: '#3F5139',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ height: 64, display: 'flex', alignItems: 'center' }}>
              <motion.img
                src={logoWhite}
                alt="SnapRoom Logo"
                style={{ height: 90, width: 'auto' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            </Box>

            {isMobile ? (
              <>
                <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                      <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => handleScrollTo(item.target)}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 5 }}>
                {menuItems.map((item) => (
                  <Typography
                    key={item.label}
                    onClick={() => handleScrollTo(item.target)}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        textDecoration: 'none',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${landingBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1,
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ maxWidth: 600, textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                marginBottom: 3,
              }}
            >
              <motion.img
                src={fullLogoWhite}
                alt="SnapRoom Logo"
                style={{ maxWidth: '100%', height: 'auto' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.1 }}  
              />

            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  minWidth: "15vh",
                  backgroundColor: '#FFFFFF',
                  color: '#3F5139',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#3F5139',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                Tải app
              </Button>
              <Link to={routes.login} style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "15vh",
                    backgroundColor: '#FFFFFF',
                    color: '#3F5139',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#3F5139',
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default LandingHeader;
