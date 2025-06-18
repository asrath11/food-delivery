import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // add this
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOGIN_URL } from '@/constants/config';
import axios from 'axios';
import { useUser } from '@/hooks/UserProvider';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);

    try {
      const response = await axios.post(LOGIN_URL, form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      login(response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
    }
  };

  return (
    <section className='flex justify-center items-center w-full h-screen bg-white'>
      <Card className='w-full max-w-md p-8 space-y-6 shadow-lg border border-brand-200'>
        <h1 className='text-2xl font-bold text-center text-black'>Login</h1>

        <form className='space-y-4' onSubmit={handleLogin}>
          <div className='space-y-1'>
            <Label htmlFor='email' className='text-black'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='bg-white border border-brand-300 text-black placeholder:text-gray-400'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='password' className='text-black'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='Enter your password'
              className='bg-white border border-brand-300 text-black placeholder:text-gray-400'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-brand text-white hover:bg-brand-600 cursor-pointer'
          >
            Submit
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default Login;
