import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useUser } from '@/hooks/UserProvider';
function ProfileDropDown() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='p-2'>
          <User className='size-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => navigate('/login')}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/signup')}>
              Signup
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDown;
