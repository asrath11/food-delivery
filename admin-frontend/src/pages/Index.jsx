import HeroSection from '@/components/hero/HeroSection';
import CategoriesSection from '@/components/categories/CategoriesSection';
import FeaturedFoodSection from '@/components/food/FeaturedFoodSection';
import Footer from '@/components/footer/Footer';

const Index = () => {
  return (
    <div className='min-h-screen'>
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
