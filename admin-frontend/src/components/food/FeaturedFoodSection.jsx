import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchItems } from '@/api/item';
import { API_URL } from '@/constants/config';
import { useCart } from '@/hooks/CartProvider';

function FeaturedFoodSection() {
  const [featuredFoodItems, setFeaturedFoodItems] = useState([]);
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchItems();
      setFeaturedFoodItems(res); // ✅ actually store the fetched data
    };
    fetchData();
  }, []);
  const popularFoodItems = featuredFoodItems.filter(
    (item) => item.is_popular === true
  );
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-12'>
          <div>
            <h2 className='text-3xl font-display font-bold text-gray-900 mb-2'>
              Popular Dishes
            </h2>
            <p className='text-lg text-gray-600'>
              Most loved food items in your area
            </p>
          </div>
          <Link to='/food'>
            <Button
              variant='outline'
              className='hidden sm:flex bg-brand text-white hover:bg-brand hover:text-white'
            >
              View All
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {popularFoodItems.map(
            (item, index) =>
              index < 4 && (
                <div key={item.id} className='group'>
                  <FoodCard
                    item={item}
                    imagePath={`${API_URL}/${item.image}`}
                    onAddToCart={() => {
                      addToCart(item.id);
                    }}
                  ></FoodCard>
                </div>
              )
          )}
        </div>

        <div className='text-center mt-8 sm:hidden'>
          <Link to='/food'>
            <Button variant='outline' className='w-full'>
              View All Food Items
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedFoodSection;
