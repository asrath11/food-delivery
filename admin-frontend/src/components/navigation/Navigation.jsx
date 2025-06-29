import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart, MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Toggle } from '../ui/toggle';
import ProfileDropDown from './ProfileDropDown';
import { useTheme } from '@/hooks/ThemeProvider';
import { fetchItemsNames } from '@/api/item';
// import { useDebounce } from 'use-debounce'; // Optional: for performance

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsNames, setItemsNames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchItemsNames();
        setItemsNames(data);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    }
    fetchData();
  }, []);

  // Optional: Debounce searchQuery to avoid excessive filtering
  // const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const matchedItems = useMemo(() => {
    return itemsNames.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, itemsNames]);

  const handleDropdown = (item) => {
    setSearchQuery(item);
    setShowDropdown(false);
    navigate(`/food?search=${encodeURIComponent(item.toLowerCase())}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/food?search=${encodeURIComponent(searchQuery.toLowerCase())}`);
      setShowDropdown(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const navigation = useMemo(
    () => [
      { name: 'Home', href: '/', current: location.pathname === '/' },
      {
        name: 'Browse Food',
        href: '/food',
        current: location.pathname === '/food',
      },
    ],
    [location.pathname]
  );

  return (
    <nav className='bg-card text-card-foreground shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-xl'>F</span>
            </div>
            <span className='font-display font-bold text-xl'>FoodieExpress</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-md font-semibold transition-all duration-200',
                  'hover:text-primary',
                  item.current
                    ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600 after:animate-underline'
                    : 'text-card-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Input */}
          <div className='hidden lg:flex flex-1 max-w-md mx-8 relative'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-4 w-4' />
              </div>
              <Input
                id='search'
                ref={inputRef}
                type='text'
                placeholder='Search for food and dishes...'
                className='pl-10 pr-4 py-2 w-full focus-visible:ring-primary/600'
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
                aria-controls='search-dropdown'
                aria-haspopup='listbox'
                aria-expanded={showDropdown}
              />
              {matchedItems.length > 0 && searchQuery && showDropdown && (
                <ul
                  id='search-dropdown'
                  ref={dropdownRef}
                  role='listbox'
                  className='absolute z-50 top-full left-0 right-0 mt-2 bg-card shadow-lg rounded-md max-h-60 overflow-auto'
                >
                  {matchedItems.map((item) => (
                    <li
                      key={item}
                      role='option'
                      className='px-4 py-2 hover:bg-muted cursor-pointer'
                      onClick={() => handleDropdown(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center space-x-4'>
            <Link to='/wishlist'>
              <Button variant='ghost' size='sm' className='p-2'>
                <Heart className='size-5' />
              </Button>
            </Link>
            <Link to='/cart'>
              <Button variant='ghost' size='sm' className='relative p-2'>
                <ShoppingCart className='size-5' />
              </Button>
            </Link>
            <ProfileDropDown />
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden p-2'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>

          <Toggle onClick={toggleTheme} aria-label='Toggle Theme'>
            <MoonIcon />
          </Toggle>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-border px-4 pb-4 bg-background'>
          <div className='pt-4 space-y-2'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  item.current
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-foreground hover:text-primary hover:bg-card'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
