import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../services/api';
import { CheckCircle, Clock, MapPin, Package, RefreshCw } from 'lucide-react';
import Button from '../components/Button';

const NgoDashboard = () => {
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAcceptedDonations = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/donations/myaccepted');
      setAcceptedDonations(data);
    } catch (error) {
      toast.error('Failed to fetch accepted donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAcceptedDonations();
  }, []);

  const handleComplete = async (id) => {
    try {
      await API.put(`/donations/${id}/status`, { status: 'completed' });
      toast.success('Donation marked as completed!');
      fetchMyAcceptedDonations();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Assigned Pickups</h1>
          <p className="text-gray-500">Manage your active food collections</p>
        </div>
        <button onClick={fetchMyAcceptedDonations} className="p-2 text-primary hover:bg-green-50 rounded-full transition-colors">
          <RefreshCw className={`h-6 w-6 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && acceptedDonations.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : acceptedDonations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No active pickups</h3>
          <p className="text-gray-500 mt-2">Go to "Available Food" to accept new donations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {acceptedDonations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-dark">{donation.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {donation.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="h-4 w-4 mr-2 text-primary" />
                      <span>Qty: {donation.quantity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>Expires: {new Date(donation.expiryTime).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500 font-medium">
                      <span className="bg-gray-100 p-1 rounded mr-2 uppercase text-[10px]">Donor</span>
                      <span>{donation.donorId?.name}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary shrink-0" />
                      <span>{donation.location}</span>
                    </div>
                  </div>
                </div>

                {donation.status === 'accepted' && (
                  <Button onClick={() => handleComplete(donation._id)} className="w-full" variant="primary">
                    Mark as Collected
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

export default NgoDashboard;
