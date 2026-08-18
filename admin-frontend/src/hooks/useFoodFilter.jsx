// src/hooks/useFoodFilter.js
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ITEMS_URL } from '@/constants/config';
import { useDebounce } from 'use-debounce';
import { fetchItemsByName } from '@/api/item';

// Helper function to map API data to consistent format
const mapFoodItem = (item) => ({
  id: item.id ?? '',
  name: item.name || '',
  description: item.desc || '',
  price: item.price || 0,
  image: item.image || '',
  category: item.category || '',
  is_popular: Boolean(item.is_popular),
  is_spicy: Boolean(item.is_spicy),
  is_vegetarian: Boolean(item.is_vegetarian),
  rating: 4.5,
  reviews: 100,
});

// Helper functions for filter matching
const matchSearchTerm = (item, searchTerm) =>
  !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());

const matchPriceRange = (item, priceRange) =>
  priceRange.length === 0 ||
  priceRange.some((range) => {
    switch (range) {
      case 'under-100':
        return item.price < 100;
      case '100-150':
        return item.price >= 100 && item.price <= 150;
      case '150-200':
        return item.price >= 150 && item.price <= 200;
      case 'over-200':
        return item.price > 200;
      default:
        return true;
    }
  });

const matchDietaryFilter = (item, dietaryFilter) =>
  dietaryFilter.length === 0 ||
  dietaryFilter.every((filter) => {
    if (filter === 'vegetarian') return item.is_vegetarian;
    if (filter === 'spicy') return item.is_spicy;
    return true;
  });

const matchCategory = (item, selectedCategories) =>
  selectedCategories.length === 0 || selectedCategories.includes(item.category);

// Helper function for sorting
const sortItems = (items, sortBy) => {
  const sortedItems = [...items];
  switch (sortBy) {
    case 'popular':
      return sortedItems.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
    case 'rating':
      return sortedItems.sort((a, b) => b.rating - a.rating);
    case 'price-low':
      return sortedItems.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedItems.sort((a, b) => b.price - a.price);
    default:
      return sortedItems;
  }
};

// Generic toggle handler for array state
const createToggleHandler = (setter) => (value) =>
  setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

function useFoodFilter(urlSearchTerm = '') {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      // If URL search term exists, use search API
      if (urlSearchTerm) {
        try {
          const res = await fetchItemsByName(urlSearchTerm.toLowerCase());
          if (Array.isArray(res)) {
            setFoodItems(res.map(mapFoodItem));
          }
        } catch (err) {
          console.error('Failed to fetch search results:', err);
          setFoodItems([]);
        }
        return;
      }

      // Otherwise, fetch all items
      try {
        const res = await axios.get(`${ITEMS_URL}`);
        const rawItems = Array.isArray(res.data?.item) ? res.data.item : [];
        setFoodItems(rawItems.map(mapFoodItem));
      } catch (err) {
        console.error('Error fetching food items:', err);
        setFoodItems([]);
      }
    };

    fetchFoodItems();
  }, [urlSearchTerm]);

  const filteredItems = useMemo(() => {
    if (!Array.isArray(foodItems)) return [];

    return foodItems.filter((item) =>
      matchSearchTerm(item, debouncedSearchTerm) &&
      matchPriceRange(item, priceRange) &&
      matchDietaryFilter(item, dietaryFilter) &&
      matchCategory(item, selectedCategories)
    );
  }, [
    debouncedSearchTerm,
    priceRange,
    dietaryFilter,
    selectedCategories,
    foodItems,
  ]);

  const sortedAndFilteredItems = useMemo(() => {
    return sortItems(filteredItems, sortBy);
  }, [filteredItems, sortBy]);

  const handleCategoryChange = createToggleHandler(setSelectedCategories);
  const handlePriceChange = createToggleHandler(setPriceRange);
  const handleDietaryChange = createToggleHandler(setDietaryFilter);

  const handleSortChange = (sortKey) => {
    setSortBy(sortKey);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSortBy('popular');
    setPriceRange([]);
    setDietaryFilter([]);
    setSelectedCategories([]);
  };

  return {
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
    sortBy,
    handleSortChange,
    clearAllFilters,
  };
}

export default useFoodFilter;
