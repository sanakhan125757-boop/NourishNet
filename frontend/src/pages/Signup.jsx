import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
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
      const { data } = await API.post('/auth/register', formData);
      login(data);
      toast.success('Registration successful!');
      
      // Redirect based on role
      if (data.role === 'ngo') navigate('/ngo-dashboard');
      else navigate('/donor-dashboard');
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-primary bg-opacity-10 rounded-full mb-4">
          <UserPlus className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-dark">Create Account</h2>
        <p className="text-gray-500 mt-2">Join our community to reduce food waste</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
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
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">I am a...</label>
          <div className="flex gap-4">
            <label className={`flex-1 flex flex-col items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.role === 'donor' ? 'border-primary bg-green-50' : 'border-gray-100'}`}>
              <input
                type="radio"
                name="role"
                value="donor"
                checked={formData.role === 'donor'}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-semibold text-dark">Donor</span>
              <span className="text-xs text-gray-500">I have extra food</span>
            </label>
            <label className={`flex-1 flex flex-col items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.role === 'ngo' ? 'border-primary bg-green-50' : 'border-gray-100'}`}>
              <input
                type="radio"
                name="role"
                value="ngo"
                checked={formData.role === 'ngo'}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-semibold text-dark">NGO</span>
              <span className="text-xs text-gray-500">I distribute food</span>
            </label>
          </div>
        </div>
        
        <Button type="submit" className="w-full mt-4" loading={loading}>
          Sign Up
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Login instead
        </Link>
      </p>
    </div>
  );
};

export default Signup;
