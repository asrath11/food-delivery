import React,{useState} from 'react';
import {
  List,
  Trash2,
  Pencil,
  X,
  LogOut,
} from 'lucide-react'; // Import only what you need
import { Button } from '@/components/ui/button';

const menuItems = [
  { id: 'addItems', label: 'Add Items', icon: List },
  { id: 'removeItems', label: 'Remove Items', icon: Trash2 },
  { id: 'logout', label: 'Logout', icon: LogOut },
];
function AdminDashBoard() {
  const [activeTab,setActiveTab]=useState("addItems")
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (Dark, with primary accent) */}
      <div className="w-1/5 h-full p-4 text-black shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-black">Admin Panel</h2> {/* Primary color */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`p-2 rounded flex items-center gap-3 cursor-pointer transition ${
                activeTab === item.id ? 'bg-brand text-white' : ''
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="size-5" /> {/* Primary light */}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content (Light) */}
      <div className="w-4/5 h-full p-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Admin Dashboard</h1>
        <p className="text-[#3A3A3A]/80">Manage your food delivery system here.</p>
        {/* Example button with primary color */}
        <Button className="mt-4 px-4 py-2 rounded bg-brand hover:bg-brand text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default AdminDashBoard;
