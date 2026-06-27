import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', formData);
      login(data);
      toast.success('Welcome back!');
      
      // Redirect based on role
      if (data.role === 'admin') navigate('/admin-dashboard');
      else if (data.role === 'ngo') navigate('/ngo-dashboard');
      else navigate('/donor-dashboard');
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-primary bg-opacity-10 rounded-full mb-4">
          <LogIn className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-dark">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Login to manage your food donations</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
        
        <Button type="submit" className="w-full mt-4" loading={loading}>
          Login
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary font-semibold hover:underline">
          Sign up now
        </Link>
      </p>
    </div>
  );
};

export default Login;
