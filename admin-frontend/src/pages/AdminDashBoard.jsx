import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { List, Trash2, LogOut } from 'lucide-react'; // Import only what you need
import { Button } from '@/components/ui/button';
import AddItems from '@/components/admin-dashboard/AddItems';

const menuItems = [
  { id: 'addItems', label: 'Add Items', icon: List, component: <AddItems /> },
  {
    id: 'removeItems',
    label: 'Remove Items',
    icon: Trash2,
    // component: <RemoveItems />,
  },
  { id: 'logout', label: 'Logout', icon: LogOut },
];
function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState('addItems');
  return (
    <div className='flex h-screen w-full'>
      {/* Sidebar (Dark, with primary accent) */}
      <div className='w-1/5 h-full p-4 text-black shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-black'>Admin Panel</h2>{' '}
        {/* Primary color */}
        <ul className='space-y-3'>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`p-2 rounded flex items-center gap-3 cursor-pointer transition ${
                activeTab === item.id ? 'bg-primary text-white' : ''
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className='size-5' /> {/* Primary light */}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content (Light) */}
      <div className='w-4/5 h-full p-6 overflow-y-auto'>
        {menuItems.map((item) => activeTab === item.id && item.component)}
      </div>
    </div>
  );
}

export default AdminDashBoard;
