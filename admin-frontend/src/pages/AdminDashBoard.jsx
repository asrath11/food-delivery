import React, { useState } from 'react';
import { List, Trash2, LogOut } from 'lucide-react';
import AddItems from '@/components/admin-dashboard/AddItems';
import RemoveItems from '@/components/admin-dashboard/RemoveItems';
import { useUser } from '@/hooks/UserProvider';

const menuItems = [
  { id: 'addItems', label: 'Add Items', icon: List, component: <AddItems /> },
  {
    id: 'removeItems',
    label: 'Remove Items',
    icon: Trash2,
    component: <RemoveItems />,
  },
  { id: 'logout', label: 'Logout', icon: LogOut },
];
function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState('addItems');
  const { logout } = useUser();

  const handleMenuClick = (item) => {
    if (item.id === 'logout') {
      logout();
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className='flex h-screen w-full bg-background'>
      {/* Sidebar */}
      <div className='w-1/5 h-full p-4 bg-card text-card-foreground shadow-lg border-r'>
        <h2 className='text-2xl font-bold mb-6 text-foreground'>Admin Panel</h2>
        <ul className='space-y-3'>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition hover:bg-accent hover:text-accent-foreground ${
                activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => handleMenuClick(item)}
            >
              <item.icon className='size-5' />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className='w-4/5 h-full p-6 overflow-y-auto bg-background'>
        {menuItems.map((item) => activeTab === item.id && item.component)}
      </div>
    </div>
  );
}

export default AdminDashBoard;
