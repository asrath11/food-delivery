// src/hooks/useFoodFilter.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { ITEMS_URL } from '@/constants/config';
import { useDebounce } from 'use-debounce'; // Import useDebounce

function useFoodFilter() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Use useDebounce hook directly for the search term that affects filtering
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce for 300ms

  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Effect to fetch all food items once when the component mounts
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
          rating: 4.5, // Hardcoded, consider fetching actual ratings
          reviews: 100, // Hardcoded, consider fetching actual reviews
        }));

        setFoodItems(mapped);
      } catch (err) {
        console.error('Error fetching food items:', err);
        setFoodItems([]); // Set to empty array on error
      }
    };

    fetchFoodItems();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Memoized filtered items based on debounced search term and other filters
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      // 1. Match Search Term (using debounced term)
      const matchSearch =
        !debouncedSearchTerm ||
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());

      // 2. Match Price Range
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
              return true; // Should not happen if priceRanges are well-defined
          }
        });

      // 3. Match Dietary Options
      const matchDietary =
        dietaryFilter.length === 0 ||
        dietaryFilter.every((filter) => {
          // 'every' ensures ALL selected filters match
          if (filter === 'vegetarian') return item.vegetarian;
          if (filter === 'spicy') return item.spicy;
          // Add more dietary checks here if needed (e.g., if (filter === 'vegan') return item.is_vegan;)
          return true; // If filter is not one of the specific checks
        });

      // 4. Match Categories
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category); // Assuming item.category is already lowercase

      return matchSearch && matchPrice && matchDietary && matchCategory;
    });
  }, [
    debouncedSearchTerm,
    priceRange,
    dietaryFilter,
    selectedCategories,
    foodItems,
  ]);

  // Memoized sorted and filtered items
  const sortedAndFilteredItems = useMemo(() => {
    const items = [...filteredItems]; // Create a shallow copy to avoid mutating original array
    switch (sortBy) {
      case 'popular':
        // Sorts popular items first, then others (stable sort not guaranteed by default sort)
        return items.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating); // High to Low
      case 'price-low':
        return items.sort((a, b) => a.price - b.price); // Low to High
      case 'price-high':
        return items.sort((a, b) => b.price - a.price); // High to Low
      default:
        return items;
    }
  }, [filteredItems, sortBy]); // Recalculate if filteredItems or sortBy changes

  // Handlers for state updates, wrapped in useCallback for referential stability
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []); // Empty dependency array means this function reference won't change

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
    foodItems, // All fetched items
    sortedAndFilteredItems, // Items ready for display
    searchTerm, // Immediate search term for input value
    setSearchTerm, // Setter for immediate search term
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
