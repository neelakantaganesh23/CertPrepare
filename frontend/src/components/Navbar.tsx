import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="font-bold text-primary-600">CP</span>
          </div>
          <h1 className="text-2xl font-bold">CertPrepare</h1>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.first_name || user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary-700 hover:bg-primary-800 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 hover:bg-primary-700 rounded-lg transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
