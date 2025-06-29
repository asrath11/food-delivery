import React, { useEffect } from 'react';
import FoodCard from '@/components/food/FoodCard';
import FilterSideBar from '@/components/food/FilterSideBar';
import SortHeader from '@/components/food/SortByHeader';
import useFoodFilter from '@/hooks/useFoodFilter';
import { API_URL } from '@/constants/config';
import { useCart } from '@/hooks/CartProvider';
import { useWishList } from '@/hooks/WishListProvider';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { fetchItemsByName } from '@/api/item';

function Food() {
  const [searchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get('search') || '';

  const {
    foodItems,
    setFoodItems,
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

  useEffect(() => {
    async function fetchData() {
      if (!urlSearchTerm) return;
      try {
        const res = await fetchItemsByName(urlSearchTerm.toLowerCase());
        if (Array.isArray(res)) {
          setFoodItems(res); // ✅ Override with search result
        }
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setFoodItems([]);
      }
    }
    fetchData();
  }, [urlSearchTerm, setFoodItems]);

  const handleAddToCart = async (item_id) => {
    try {
      await addToCart(item_id);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground'>
            Browse Food Items
          </h1>
          <p className='text-lg text-muted-foreground'>
            {foodItems.length} delicious dishes available
          </p>
        </div>

        <div className='grid lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1'>
            <FilterSideBar
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
                  onAddToCart={() => handleAddToCart(item.id)}
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
