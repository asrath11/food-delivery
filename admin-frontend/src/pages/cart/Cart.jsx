import { useUser } from '@/hooks/UserProvider';
import { useCart } from '@/hooks/CartProvider';
import LoginPrompt from '../LoginPrompt';
import CartList from '@/components/cart/CartList';
import CartSummary from './CartSummary';

function Cart() {
  const { user, isLoading: userLoading } = useUser();
  const { cartData } = useCart();

  if (userLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh] px-4'>
        <p className='text-xl md:text-2xl font-bold text-center'>
          Loading user data...
        </p>
      </div>
    );
  }

  if (!user) {
    return <LoginPrompt />;
  }

  // If cart data is undefined or null, show loading state
  if (!cartData || cartData.cart === undefined) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh] px-4'>
        <p className='text-xl md:text-2xl font-bold text-center'>
          Loading cart items...
        </p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10'>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12'>
        {/* Cart List - Takes full width on mobile, 2/3 on desktop */}
        <div className='w-full lg:w-2/3'>
          <CartList cartData={cartData} />
        </div>

        {/* Cart Summary - Takes full width on mobile, 1/3 on desktop */}
        <div className='w-full lg:w-1/3'>
          <div className='lg:sticky lg:top-6'>
            <CartSummary cartData={cartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
