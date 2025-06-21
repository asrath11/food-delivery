import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { categories, priceRanges, dietaryOptions } from '@/constants/filters';
import { useState } from 'react';

// Move FilterContent outside to prevent recreation on every render
const FilterContent = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  handleCategoryChange,
  priceRange,
  handlePriceChange,
  dietaryFilter,
  handleDietaryChange,
  clearAllFilters,
}) => (
  <div className='bg-white rounded-lg border p-6 space-y-6'>
    <div className='flex items-center justify-between'>
      <h3 className='font-semibold text-lg'>Filters</h3>
      <Button variant='ghost' size='sm' onClick={clearAllFilters}>
        Clear all
      </Button>
    </div>

    {/* Search */}
    <div>
      <Label className='text-sm font-medium mb-2 block'>Search dishes</Label>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
        <Input
          type='text'
          placeholder='Enter Dish name'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    <Separator />

    {/* Categories */}
    <div>
      <Label className='text-sm font-medium mb-3 block'>Categories</Label>
      <div className='space-y-3'>
        {categories.map((category) => (
          <div key={category} className='flex items-center space-x-2'>
            <Checkbox
              checked={selectedCategories.includes(category.toLowerCase())}
              onCheckedChange={() => handleCategoryChange(category.toLowerCase())}
            />
            <Label className='text-sm'>{category}</Label>
          </div>
        ))}
      </div>
    </div>

    <Separator />

    {/* Price Range */}
    <div>
      <Label className='text-sm font-medium mb-3 block'>Price Range</Label>
      <div className='space-y-3'>
        {priceRanges.map((price) => (
          <div key={price.value} className='flex items-center space-x-2'>
            <Checkbox
              checked={priceRange.includes(price.value)}
              onCheckedChange={() => handlePriceChange(price.value)}
            />
            <Label className='text-sm'>{price.label}</Label>
          </div>
        ))}
      </div>
    </div>

    <Separator />

    {/* Dietary Options */}
    <div>
      <Label className='text-sm font-medium mb-3 block'>Dietary Options</Label>
      <div className='space-y-3'>
        {dietaryOptions.map((option) => (
          <div key={option.value} className='flex items-center space-x-2'>
            <Checkbox
              checked={dietaryFilter.includes(option.value)}
              onCheckedChange={() => handleDietaryChange(option.value)}
            />
            <Label className='text-sm'>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FilterSidebar = (props) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className='lg:hidden flex justify-between items-center rounded-lg border p-3 my-3 bg-white'>
        <div className='flex space-x-3 items-center'>
          <SlidersHorizontal className='text-brand' />
          <h1 className='text-lg font-semibold'>Filters</h1>
        </div>
        <div
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className='cursor-pointer'
        >
          {showMobileFilters ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>

      {/* Mobile Filters (Collapsible) */}
      {showMobileFilters && (
        <div className='lg:hidden'>
          <FilterContent {...props} />
        </div>
      )}

      {/* Desktop Filters (Always Visible) */}
      <div className='hidden lg:block'>
        <FilterContent {...props} />
      </div>
    </>
  );
};

export default FilterSidebar;
