
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import QualityProducts from '@/components/QualityProducts';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <QualityProducts />
    </div>
  );
};

export default Index;
