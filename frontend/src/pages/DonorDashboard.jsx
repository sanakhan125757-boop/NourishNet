import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/api';
import { Clock, MapPin, Package, PlusCircle } from 'lucide-react';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const { data } = await API.get('/donations/mydonations');
        setDonations(data);
      } catch (error) {
        toast.error('Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };
    fetchMyDonations();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">My Donations</h1>
          <p className="text-gray-500">Track and manage your contributions</p>
        </div>
        <Link to="/create-donation" className="btn-primary flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          New Donation
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : donations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No donations yet</h3>
          <p className="text-gray-500 mt-2">Start your journey by donating surplus food.</p>
          <Link to="/create-donation" className="text-primary font-bold mt-4 inline-block hover:underline">
            Make your first donation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-dark truncate pr-2">{donation.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(donation.status)}`}>
                    {donation.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 h-10">
                  {donation.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="h-4 w-4 mr-2 text-primary" />
                    <span>Quantity: {donation.quantity}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span className="truncate">{donation.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Expires: {new Date(donation.expiryTime).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>Posted on {new Date(donation.createdAt).toLocaleDateString()}</span>
                {donation.status === 'accepted' && <span className="text-primary font-medium">NGO Assigned</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
