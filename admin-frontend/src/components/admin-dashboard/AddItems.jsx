import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createItem } from '@/api/item';

function AddItems() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('desc', formData.description);
    form.append('category', formData.category);
    form.append('image', formData.image);
    await createItem(form);
  };

  return (
    <form
      className='flex flex-col gap-5 justify-center mx-auto w-1/2 h-[60vh]'
      onSubmit={handleSubmit}
    >
      <h2 className='text-2xl font-bold'>Add New Item</h2>

      <Input
        placeholder='Enter Item Name'
        name='name'
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        placeholder='Enter Item Category'
        name='category'
        value={formData.category}
        onChange={handleChange}
      />
      <Input
        placeholder='Enter Item Price'
        name='price'
        type='number'
        value={formData.price}
        onChange={handleChange}
      />
      <Input
        placeholder='Enter Item Description'
        name='description'
        value={formData.description}
        onChange={handleChange}
      />
      <Input type='file' name='image' onChange={handleChange} />

      <Button className='bg-primary text-white'>Add Item</Button>
    </form>
  );
}

export default AddItems;
