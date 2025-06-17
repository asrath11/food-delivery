import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard';
const featuredFoodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    image:
      'https://images.pexels.com/photos/8471703/pexels-photo-8471703.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviews: 324,
    cookTime: '15-20',
    price: 18.99,
    cuisine: 'Italian',
    restaurant: 'Bella Vista',
    featured: true,
    promoted: false,
  },
  {
    id: 2,
    name: 'Chicken Tikka Masala',
    image:
      'https://images.pexels.com/photos/10508207/pexels-photo-10508207.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviews: 198,
    cookTime: '20-25',
    price: 16.99,
    cuisine: 'Indian',
    restaurant: 'Spice Garden',
    featured: true,
    promoted: true,
  },
  {
    id: 3,
    name: 'Classic Burger',
    image:
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviews: 456,
    cookTime: '10-15',
    price: 14.99,
    cuisine: 'American',
    restaurant: 'Burger Kingdom',
    featured: true,
    promoted: false,
  },
  {
    id: 4,
    name: 'California Roll',
    image:
      'https://images.pexels.com/photos/10295770/pexels-photo-10295770.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviews: 267,
    cookTime: '10-15',
    price: 12.99,
    cuisine: 'Japanese',
    restaurant: 'Sakura Sushi',
    featured: true,
    promoted: false,
  },
];
function FeaturedFoodSection() {
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
          {featuredFoodItems.map((item) => (
            <div key={item.id} className='group'>
              <FoodCard item={item}></FoodCard>
            </div>
          ))}
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
