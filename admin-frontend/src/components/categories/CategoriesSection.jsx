import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
const categories = [
  {
    name: 'Pizza',
    icon: '🍕',
    color: 'bg-red-50 border-red-100',
  },
  {
    name: 'Burgers',
    icon: '🍔',
    color: 'bg-yellow-50 border-yellow-100',
  },
  {
    name: 'Sushi',
    icon: '🍣',
    color: 'bg-green-50 border-green-100',
  },
  {
    name: 'Chinese',
    icon: '🥡',
  },
  {
    name: 'Italian',
    icon: '🍝',
    color: 'bg-purple-50 border-purple-100',
  },
  {
    name: 'Mexican',
    icon: '🌮',
    color: 'bg-pink-50 border-pink-100',
  },
  {
    name: 'Indian',
    icon: '🍛',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    name: 'Desserts',
    icon: '🍰',
    color: 'bg-indigo-50 border-indigo-100',
  },
];
function CategoriesSection() {
  return (
    <section className='py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-display font-bold mb-4'>
            What are you craving?
          </h2>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
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
                  <div className='font-semibold text-sm mb-1 text-black'>
                    {category.name}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {category.count}
                  </div>
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
