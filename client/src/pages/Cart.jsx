import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/UserProvider';
import { ShoppingCart, LogIn } from 'lucide-react';
function Cart() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      {user ? (
        <p className='text-2xl font-bold'>Welcome, {user.name}!</p>
      ) : (
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="mb-6">
            <ShoppingCart className="h-16 w-16 text-brand mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-brand mb-2">
              Your Cart
            </h1>
            <p className="text-xl text-brand mb-6">
              Please login to view your cart
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-brand hover:bg-brand text-white font-medium px-8 py-3"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Cart;

