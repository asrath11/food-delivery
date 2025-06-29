// src/hooks/useFoodFilter.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { ITEMS_URL } from '@/constants/config';
import { useDebounce } from 'use-debounce';

function useFoodFilter() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get(`${ITEMS_URL}`);
        const rawItems = Array.isArray(res.data?.item) ? res.data.item : [];

        const mapped = rawItems.map((item) => ({
          id: item.id ?? '',
          name: item.name || '',
          description: item.desc || '',
          price: item.price || 0,
          image: item.image || '',
          category: item.category || '',
          popular: Boolean(item.is_popular),
          spicy: Boolean(item.is_spicy),
          vegetarian: Boolean(item.is_vegetarian),
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
    if (!Array.isArray(foodItems)) return [];

    return foodItems.filter((item) => {
      const matchSearch =
        !debouncedSearchTerm ||
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchPrice =
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
  }, [
    debouncedSearchTerm,
    priceRange,
    dietaryFilter,
    selectedCategories,
    foodItems,
  ]);

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

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handlePriceChange = useCallback((range) => {
    setPriceRange((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  }, []);

  const handleDietaryChange = useCallback((filter) => {
    setDietaryFilter((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  }, []);

  const handleSortChange = useCallback((sortKey) => {
    setSortBy(sortKey);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSortBy('popular');
    setPriceRange([]);
    setDietaryFilter([]);
    setSelectedCategories([]);
  }, []);

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
