import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../services/api';
import { Users, Package, AlertCircle, Shield, Trash2, Ban, CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await API.get('/admin/stats');
      const usersRes = await API.get('/admin/users');
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await API.put(`/admin/users/${id}/status`, { status: newStatus });
      toast.success(`User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      toast.success('User deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of users and donations system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-blue-50 rounded-xl mr-4">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-dark">{stats?.users.total || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-green-50 rounded-xl mr-4">
            <Package className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Donations</p>
            <p className="text-2xl font-bold text-dark">{stats?.donations.total || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-yellow-50 rounded-xl mr-4">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="text-2xl font-bold text-dark">{stats?.donations.pending || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-purple-50 rounded-xl mr-4">
            <Shield className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active NGOs</p>
            <p className="text-2xl font-bold text-dark">{stats?.users.ngos || 0}</p>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-dark">User Management</h2>
          <Button onClick={fetchData} variant="outline" className="py-1 px-4 text-sm">Refresh</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : u.role === 'ngo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`flex items-center gap-1 font-semibold ${u.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {u.status === 'active' ? <CheckCircle className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleToggleStatus(u._id, u.status)}
                        className={`p-2 rounded-lg transition-colors ${u.status === 'active' ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
                        title={u.status === 'active' ? 'Block User' : 'Activate User'}
                      >
                        {u.status === 'active' ? <Ban className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
