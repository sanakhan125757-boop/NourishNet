import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Search, MapPin, Clock, Package, Filter } from 'lucide-react';
import Button from '../components/Button';

const DonationsListing = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('pending');
  
  const { user } = useAuth();

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/donations?status=${filter}`);
      setDonations(data);
    } catch (error) {
      toast.error('Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [filter]);

  const handleAccept = async (id) => {
    if (!user) {
      toast.warning('Please login to accept donations');
      return;
    }
    if (user.role !== 'ngo') {
      toast.warning('Only NGOs can accept donations');
      return;
    }

    try {
      await API.put(`/donations/${id}/status`, { status: 'accepted' });
      toast.success('Donation accepted successfully!');
      fetchDonations();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept donation');
    }
  };

  const filteredDonations = donations.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Available Food Donations</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Browse available food items near you and help minimize waste by distributing them to those in need.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by food, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-xl">
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'pending' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('accepted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'accepted' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Accepted
          </button>
          <button 
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === '' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No donations found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter to find more items.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-dark line-clamp-1">{donation.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {donation.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 h-15">
                  {donation.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="h-4 w-4 mr-2 text-primary" />
                    <span>Qty: <span className="text-dark font-medium">{donation.quantity}</span></span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span className="truncate">{donation.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Expires: <span className="text-red-500 font-medium">{new Date(donation.expiryTime).toLocaleString()}</span></span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <div className="border-t border-gray-100 pt-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                      {donation.donorId?.name?.charAt(0)}
                    </div>
                    <div className="ml-2 text-xs">
                      <p className="text-gray-400">Donated by</p>
                      <p className="text-dark font-medium">{donation.donorId?.name}</p>
                    </div>
                  </div>
                </div>
                
                {donation.status === 'pending' ? (
                  <Button 
                    onClick={() => handleAccept(donation._id)} 
                    className="w-full" 
                    variant={user?.role === 'ngo' ? 'primary' : 'outline'}
                    disabled={user && user.role !== 'ngo'}
                  >
                    {user?.role === 'ngo' ? 'Accept Donation' : 'NGOs Only'}
                  </Button>
                ) : (
                  <Button className="w-full cursor-not-allowed" variant="secondary" disabled>
                    Already Accepted
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationsListing;
