import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SIGNUP_URL } from '@/constants/config';
import axios from 'axios';
import { useUser } from '@/hooks/UserProvider';

function SignUp() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    try {
      const response = await axios.post(SIGNUP_URL, form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      login(response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error.response?.data || error.message);
    }
  };

  return (
    <section className='flex justify-center items-center w-full h-screen bg-white'>
      <Card className='w-full max-w-md p-8 space-y-6 shadow-lg border border-brand-200'>
        <h1 className='text-2xl font-bold text-center text-black'>Sign Up</h1>

        <form className='space-y-4' onSubmit={handleSignUp}>
          <div className='space-y-1'>
            <Label htmlFor='name' className='text-black'>
              Name
            </Label>
            <Input
              id='name'
              type='text'
              placeholder='Enter your name'
              className='bg-white border border-brand-300 text-black placeholder:text-gray-400'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

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

export default SignUp;
