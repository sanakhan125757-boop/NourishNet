import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { UtensilsCrossed } from 'lucide-react';

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    location: '',
    expiryTime: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/donations', formData);
      toast.success('Food donation posted successfully!');
      navigate('/donor-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-primary bg-opacity-10 rounded-full mb-4">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-dark">Donate Surplus Food</h2>
        <p className="text-gray-500 mt-2">Provide details about the food you want to donate</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Food Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Freshly cooked rice and curry"
          required
        />
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the items, ingredients, or any special instructions..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 20 plates / 5 kg"
            required
          />
          <Input
            label="Expiry Time"
            type="datetime-local"
            name="expiryTime"
            value={formData.expiryTime}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Pickup Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Full address for pickup"
          required
        />
        
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate('/donor-dashboard')}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" loading={loading}>
            Post Donation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
