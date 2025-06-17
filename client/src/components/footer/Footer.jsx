import React from 'react';
import { Button } from '../ui/button';
function Footer() {
  return (
    <section className='py-16 bg-brand-600 text-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-3xl md:text-4xl font-display font-bold mb-4'>
          Download our app for a better experience
        </h2>
        <p className='text-xl text-brand-100 mb-8 max-w-2xl mx-auto'>
          Get exclusive deals, faster ordering, and real-time delivery tracking
          with our mobile app.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            size='lg'
            className='bg-black text-white hover:bg-gray-800 px-8 py-4'
          >
            📱 Download for iOS
          </Button>
          <Button
            size='lg'
            className='bg-black text-white hover:bg-gray-800 px-8 py-4'
          >
            📱 Download for Android
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Footer;
