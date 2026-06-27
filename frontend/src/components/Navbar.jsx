import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Utensils } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Utensils className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-dark">FoodCare</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md font-bold transition-colors">Home</Link>
            
            {user ? (
              <>
                {user.role === 'donor' && (
                  <>
                    <Link to="/donor-dashboard" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md font-bold transition-colors">Dashboard</Link>
                    <Link to="/create-donation" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md font-bold transition-colors">Donate Food</Link>
                  </>
                )}
                {user.role === 'ngo' && (
                  <>
                    <Link to="/ngo-dashboard" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md font-bold transition-colors">Dashboard</Link>
                    <Link to="/donations" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md font-bold transition-colors">Available Food</Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin-dashboard" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md font-bold transition-colors">Admin Panel</Link>
                )}
                
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <User className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-bold text-gray-800">{user.name}</span>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-800 ml-2 cursor-pointer transition-colors" title="Logout">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4 flex items-center">
                <Link to="/login" className="text-gray-800 hover:text-primary font-bold transition-colors">Login</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
