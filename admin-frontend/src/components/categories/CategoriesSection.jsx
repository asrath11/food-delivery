import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
const categories = [
  {
    name: 'Pizza',
    icon: '🍕',
    count: '150+ places',
    color: 'bg-red-50 border-red-100',
  },
  {
    name: 'Burgers',
    icon: '🍔',
    count: '120+ places',
    color: 'bg-yellow-50 border-yellow-100',
  },
  {
    name: 'Sushi',
    icon: '🍣',
    count: '80+ places',
    color: 'bg-green-50 border-green-100',
  },
  {
    name: 'Chinese',
    icon: '🥡',
    count: '200+ places',
    color: 'bg-orange-50 border-orange-100',
  },
  {
    name: 'Italian',
    icon: '🍝',
    count: '90+ places',
    color: 'bg-purple-50 border-purple-100',
  },
  {
    name: 'Mexican',
    icon: '🌮',
    count: '110+ places',
    color: 'bg-pink-50 border-pink-100',
  },
  {
    name: 'Indian',
    icon: '🍛',
    count: '75+ places',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    name: 'Desserts',
    icon: '🍰',
    count: '60+ places',
    color: 'bg-indigo-50 border-indigo-100',
  },
];
function CategoriesSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-display font-bold text-gray-900 mb-4'>
            What are you craving?
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Explore cuisines from around the world, delivered right to your door
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/food?cuisine=${category.name.toLowerCase()}`}
              className='group'
            >
              <Card
                className={`${category.color} border-2 hover:shadow-md transition-all duration-200 group-hover:scale-105`}
              >
                <CardContent className='p-4 text-center'>
                  <div className='text-3xl mb-2'>{category.icon}</div>
                  <div className='font-semibold text-sm text-gray-900 mb-1'>
                    {category.name}
                  </div>
                  <div className='text-xs text-gray-600'>{category.count}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
