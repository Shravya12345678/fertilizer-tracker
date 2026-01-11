



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl sm:text-2xl font-bold text-green-600 flex-shrink-0">
              🌾 Fertilizer Tracker
            </Link>

            {/* Changed from lg:flex to md:flex */}
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
              <Link to="/crops" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Crops</Link>
              <Link to="/thermal/new" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Add Thermal</Link>
              <Link to="/analytics" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Analytics</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 hidden xl:inline">Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Logout</button>

            {/* Changed from lg:hidden to md:hidden */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Changed from lg:hidden to md:hidden */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block p-3 text-gray-700">Dashboard</Link>
            <Link to="/crops" onClick={() => setIsOpen(false)} className="block p-3 text-gray-700">Crops</Link>
            <Link to="/thermal/new" onClick={() => setIsOpen(false)} className="block p-3 text-gray-700">Add Thermal</Link>
            <Link to="/analytics" onClick={() => setIsOpen(false)} className="block p-3 text-gray-700">Analytics</Link>
            <button onClick={handleLogout} className="w-full text-left p-3 text-red-600 bg-red-50">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;