import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart, MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import ProfileDropDown from './ProfileDropDown';
import { Toggle } from '../ui/toggle';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  const location = useLocation();
  const cartItemCount = 3; // Replace with actual cart state

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    {
      name: 'Browse Food',
      href: '/food',
      current: location.pathname === '/food',
    },
  ];

  return (
    <nav className='bg-card text-card-foreground shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center bg-primary'>
              <span className='text-white font-bold text-xl'>F</span>
            </div>
            <span className='font-display font-bold text-xl text-card-foreground'>
              FoodieExpress
            </span>
          </Link>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  // Base styles
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

          {/* Search Input (Desktop only) */}
          <div className='hidden lg:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-4 w-4 ' />
              </div>
              <Input
                type='text'
                placeholder='Search for food and dishes...'
                className='pl-10 pr-4 py-2 w-full focus-visible:ring-primary/600'
              />
            </div>
          </div>

          {/* Right-side Actions */}
          <div className='flex items-center space-x-4'>
            <Link to='/wishlist'>
              <Button variant='ghost' size='sm' className='p-2'>
                <Heart className='size-5' />
              </Button>
            </Link>
            <Link to='/cart'>
              <Button variant='ghost' size='sm' className='relative p-2 '>
                <ShoppingCart className='size-5' />
                {cartItemCount > 0 && (
                  <Badge className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary-500 text-primary text-xs'>
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <ProfileDropDown />

            {/* Mobile Menu Toggle */}
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
          <Toggle onClick={handleToggleDarkMode}>
            <MoonIcon />
          </Toggle>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-gray-100 px-4 pb-4'>
          <div className='pt-4 space-y-2'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  item.name === 'Browse Food'
                    ? 'text-foreground hover:text-foreground hover:bg-gray-50'
                    : item.current
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-foreground hover:text-primary-600 hover:bg-gray-50'
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
