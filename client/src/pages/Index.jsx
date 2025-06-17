import { Link } from 'react-router-dom';
import { Star, Clock, Heart, ArrowRight, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/hero/HeroSection';
import CategoriesSection from '@/components/categories/CategoriesSection';
import FeaturedFoodSection from '@/components/food/FeaturedFoodSection';
import Footer from '@/components/footer/Footer';

const Index = () => {
  return (
    <div className='min-h-screen bg-brand'>
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Section */}
      <CategoriesSection />
      {/* Featured Food Items */}
      <FeaturedFoodSection />
      {/* CTA Section */}
      <Footer />
    </div>
  );
};

export default Index;
