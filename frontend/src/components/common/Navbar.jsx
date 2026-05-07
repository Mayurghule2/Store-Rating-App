import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Store, 
  User, 
  LogOut,
  Star
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleIcon = () => {
    switch(user?.role) {
      case 'admin': return '👑';
      case 'store_owner': return '🏪';
      default: return '👤';
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-primary-600" fill="#22c55e" />
              <span className="text-xl font-bold text-gray-800">StoreRating</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user?.role === 'admin' && (
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}
            
            <Link to="/stores" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Store className="h-5 w-5" />
              <span>Stores</span>
            </Link>
            
            <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{getRoleIcon()}</span>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;