import { useUser } from '@/hooks/UserProvider';
import { useCart } from '@/hooks/CartProvider';
import CartLoginPrompt from './CartLoginPrompt';
import CartItem from '@/components/cart/CartItem';

function Cart() {
  const { user, isLoading } = useUser();
  const { cart } = useCart();
  console.log(cart);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <CartLoginPrompt />
      </div>
    );
  }

  return (
    <CartItem cart={cart} />
  );
}

export default Cart;

