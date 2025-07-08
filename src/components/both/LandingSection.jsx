import React from 'react';
import { Box } from '@mui/material';
import SectionIntro from './SectionIntro';
import SectionFurniture from './SectionFurniture';
import SectionDesigner from './SectionDesigner';
import ContactSection from './ContactSection';

const LandingSection = () => {
  
  return (
    <Box>
      <SectionIntro />
      <SectionFurniture />
      <SectionDesigner />
      <ContactSection />
    </Box>
  );
};

export default LandingSection;
