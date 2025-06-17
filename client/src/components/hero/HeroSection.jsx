import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ChefHat, Zap, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
const quickStats = [
  {
    icon: <Truck className='h-6 w-6' />,
    title: 'Fast Delivery',
    description: 'Average 25 minutes',
  },
  {
    icon: <ChefHat className='h-6 w-6 text-brand-500' />,
    title: 'Fresh Food',
    description: '1000+ dishes available',
  },
  {
    icon: <Zap className='h-6 w-6 text-brand-500' />,
    title: 'Real-time Tracking',
    description: 'Track your order',
  },
];
function HeroSection() {
  return (
    <section className='relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white overflow-hidden'>
      <div className='absolute inset-0 bg-black/10'></div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <Badge className='bg-white/20 text-white border-white/30 hover:bg-white/30'>
                🎉 Free delivery on orders over $30
              </Badge>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight'>
                Your favorite food,{' '}
                <span className='text-black'>delivered fast</span>
              </h1>
              <p className='text-xl text-white/90 leading-relaxed'>
                Order from the best local restaurants with easy, on-demand
                delivery. Fresh food in under 30 minutes.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link to='/food'>
                <Button
                  size='lg'
                  className='bg-brand text-brand-600 hover:bg-brand/40 font-semibold px-8 py-4 text-lg'
                >
                  Browse Food
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </div>

            <div className='grid grid-cols-3 gap-8 pt-8'>
              {quickStats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='flex justify-center mb-2'>{stat.icon}</div>
                  <div className='font-semibold text-sm'>{stat.title}</div>
                  <div className='text-white/80 text-xs'>{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='relative hidden lg:block'>
            <div className='relative'>
              <img
                src='https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=800'
                alt='Delicious food delivery'
                className='rounded-2xl shadow-2xl'
              />
              <div className='absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                    <Truck className='h-5 w-5 text-green-600' />
                  </div>
                  <div>
                    <div className='text-sm font-semibold text-gray-900'>
                      Order in Transit
                    </div>
                    <div className='text-xs text-gray-500'>
                      Arriving in 12 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
