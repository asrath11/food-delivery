// src/hooks/useFoodFilter.js
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ITEMS_URL } from '@/constants/config';

function useFoodFilter() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get(`${ITEMS_URL}`);
        const rawItems = res.data.item || [];

        const mapped = rawItems.map((item) => ({
          id: item.id,
          name: item.name || '',
          description: item.desc || '',
          price: item.price || 0,
          image: item.image,
          category: item.category,
          popular: item.is_popular,
          spicy: item.is_spicy,
          vegetarian: item.is_vegetarian,
          rating: 4.5,
          reviews: 100,
        }));

        setFoodItems(mapped);
      } catch (err) {
        console.error('Error fetching food items:', err);
        setFoodItems([]);
      }
    };

    fetchFoodItems();
  }, []);

  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPrice =
        priceRange.length === 0 ||
        priceRange.some((range) => {
          switch (range) {
            case 'under-10':
              return item.price < 10;
            case '10-15':
              return item.price >= 10 && item.price <= 15;
            case '15-20':
              return item.price >= 15 && item.price <= 20;
            case 'over-20':
              return item.price > 20;
            default:
              return true;
          }
        });

      const matchDietary =
        dietaryFilter.length === 0 ||
        dietaryFilter.every((filter) => {
          if (filter === 'vegetarian') return item.vegetarian;
          if (filter === 'spicy') return item.spicy;
          return true;
        });

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      return matchSearch && matchPrice && matchDietary && matchCategory;
    });
  }, [searchTerm, priceRange, dietaryFilter, selectedCategories, foodItems]);

  const sortedAndFilteredItems = useMemo(() => {
    const items = [...filteredItems];
    switch (sortBy) {
      case 'popular':
        return items.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return items.sort((a, b) => a.price - b.price);
      case 'price-high':
        return items.sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  }, [filteredItems, sortBy]);

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleDietaryChange = (filter) => {
    setDietaryFilter((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

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
