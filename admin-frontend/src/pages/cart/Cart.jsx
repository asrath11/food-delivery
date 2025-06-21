import { useUser } from '@/hooks/UserProvider';
import { useCart } from '@/hooks/CartProvider';
import LoginPrompt from '../LoginPrompt';
import CartItem from '@/components/cart/CartItem';
import CartSummary from './CartSummary';

function Cart() {
  const { user, isLoading: userLoading } = useUser();
  const { cartData } = useCart();

  if (userLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-[90vh]'>
        <p className='text-2xl font-bold'>Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPrompt />;
  }

  // If cart data is undefined or null, show loading state
  if (!cartData || cartData.cart === undefined) {
    return (
      <div className='flex flex-col items-center justify-center h-[90vh]'>
        <p className='text-2xl font-bold'>Loading cart items...</p>
      </div>
    );
  }

  return (
    <div className='flex ml-10 my-10 p-10 w-full gap-x-16'>
      <CartItem cartData={cartData} />
      <CartSummary cartData={cartData} />
    </div>
  );
}

export default Cart;
