import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { fetchItems, deleteItem } from '@/api/item';
import { API_URL } from '@/constants/config';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

function RemoveItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetchItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load items:', error);
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      toast.success('Item deleted successfully');
      loadItems(); // Reload items after deletion
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Failed to delete item');
    }
  };

  if (loading) {
    return <div className='text-center text-muted-foreground'>Loading items...</div>;
  }

  if (items.length === 0) {
    return <div className='text-center text-muted-foreground'>No items available</div>;
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold text-foreground'>Remove Items</h2>
      <div className='grid gap-4'>
        {items.map((item) => (
          <Card key={item.id} className='bg-card'>
            <CardContent className='p-4 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <img
                  src={`${API_URL}/${item.image}`}
                  alt={item.name}
                  className='w-16 h-16 object-cover rounded'
                />
                <div>
                  <h3 className='font-semibold text-foreground'>{item.name}</h3>
                  <p className='text-sm text-muted-foreground'>{item.category}</p>
                  <p className='text-sm font-medium text-foreground'>₹{item.price}</p>
                </div>
              </div>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => handleDelete(item.id)}
                className='cursor-pointer'
              >
                <Trash2 className='h-4 w-4 mr-2' />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RemoveItems;
