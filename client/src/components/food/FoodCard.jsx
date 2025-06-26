// src/components/FoodCard.jsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, Plus } from 'lucide-react';

export default function FoodCard({ item, imagePath }) {
  return (
    <Card className='food-card group h-full flex flex-col'>
      <div className='relative flex-shrink-0'>
        <img
          src={imagePath || item.image}
          alt={item.name}
          className='w-full h-48 object-cover rounded-t-lg'
        />
        {item.popular && (
          <Badge className='absolute top-3 left-3 bg-brand-500 text-white'>
            Popular
          </Badge>
        )}
        <Button
          variant='ghost'
          size='sm'
          className='absolute top-3 right-3 bg-white/90 hover:bg-white p-2'
        >
          <Heart className='h-4 w-4' />
        </Button>
      </div>

      <CardContent className='p-4 flex flex-col flex-grow'>
        <div className='flex flex-col flex-grow space-y-2'>
          <div className='flex items-center justify-between gap-4 whitespace-nowrap overflow-hidden'>
            <h3 className='font-semibold text-lg text-gray-900 transition-colors'>
              {item.name}
            </h3>
            <div className='flex items-center space-x-1 flex-shrink-0'>
              <Star className='h-4 w-4 text-yellow-400 fill-current' />
              <span className='font-medium'>{item.rating}</span>
            </div>
          </div>

          <p className='text-sm text-gray-600 line-clamp-3 flex-grow'>
            {item.description}
          </p>

          <div className='mt-auto'>
            <div className='flex items-center justify-between text-sm mb-2'>
              <Badge variant='secondary' className='text-xs'>
                {item.category}
              </Badge>
            </div>

            <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
              <div className='text-lg font-semibold text-gray-900'>
                ₹{item.price.toFixed(2)}
              </div>
              <Button
                size='sm'
                className='bg-brand hover:bg-brand hover:text-white'
              >
                <Plus className='h-4 w-4 mr-2' />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
