import React from 'react';
import FoodCard from '@/components/food/FoodCard';
import FilterSidebar from '@/components/food/FilterSidebar';
import SortHeader from '@/components/food/SortByHeader';
import useFoodFilter from '@/hooks/useFoodFilter';
import axios from 'axios';
import { API_URL } from '@/constants/config';
import { useCart } from '@/hooks/CartProvider';
import { useWishList } from '@/hooks/WishListProvider';

function Food() {
  const {
    foodItems,
    sortedAndFilteredItems,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryChange,
    priceRange,
    handlePriceChange,
    dietaryFilter,
    handleDietaryChange,
    clearAllFilters,
    sortBy,
    handleSortChange,
  } = useFoodFilter();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishList();

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold'>Browse Food Items</h1>
          <p className='text-lg text-gray-600'>
            {foodItems.length} delicious dishes available
          </p>
        </div>

        <div className='grid lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1'>
            <FilterSidebar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              handlePriceChange={handlePriceChange}
              dietaryFilter={dietaryFilter}
              handleDietaryChange={handleDietaryChange}
              clearAllFilters={clearAllFilters}
            />
          </div>

          <div className='lg:col-span-3'>
            <SortHeader
              sortBy={sortBy}
              handleSortChange={handleSortChange}
              total={foodItems.length}
              filtered={sortedAndFilteredItems.length}
            />
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {sortedAndFilteredItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  imagePath={`${API_URL}/${item.image}`}
                  onAddToCart={() => addToCart(item)}
                  onAddToWishlist={() => addToWishlist(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
