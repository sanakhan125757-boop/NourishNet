import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateDonation from './pages/CreateDonation';
import DonationsListing from './pages/DonationsListing';

const Landing = () => (
  <div className="flex flex-col min-h-screen bg-white">
    {/* Hero Section */}
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Delicious Food" 
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start text-left">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          Share the Meal, <br />
          <span className="text-primary">Minimize the Waste</span>
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl font-medium">
          FoodCare connects restaurants and households with surplus food to NGOs and charities in Bangalore, ensuring no one goes hungry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/signup" className="btn-primary text-lg px-8 py-3 shadow-lg">Get Started Today</a>
          <a href="/donations" className="bg-white text-gray-900 border-2 border-gray-200 hover:border-primary hover:text-primary font-bold py-3 px-8 rounded-lg transition-all text-lg shadow-sm">Browse Available Food</a>
        </div>
      </div>
    </section>

    {/* Bangalore Locations Section */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Serving the Heart of Bangalore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">Connecting donors and NGOs across the city's most vibrant neighborhoods.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Koramangala', desc: 'Connecting tech hubs and restaurants.', img: '/images/bangalore.png' },
            { name: 'Indiranagar', desc: 'Reducing waste in premium dining areas.', img: '/images/donation.png' },
            { name: 'Whitefield', desc: 'Facilitating corporate and community donations.', img: '/images/hero.png' }
          ].map((loc, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img src={loc.img} alt={loc.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{loc.name}</h3>
                <p className="text-gray-600 mb-4">{loc.desc}</p>
                <a href="/donations" className="text-primary font-bold hover:underline">View listings &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Impact Section */}
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Impact in Namma Bengaluru</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-5xl font-extrabold mb-2">5000+</p>
            <p className="text-xl font-medium opacity-90">Meals Shared</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2">120+</p>
            <p className="text-xl font-medium opacity-90">Partner NGOs</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2">200+</p>
            <p className="text-xl font-medium opacity-90">Active Donors</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/donor-dashboard" element={
                <ProtectedRoute roles={['donor']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/ngo-dashboard" element={
                <ProtectedRoute roles={['ngo']}>
                  <NgoDashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin-dashboard" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/create-donation" element={
                <ProtectedRoute roles={['donor']}>
                  <CreateDonation />
                </ProtectedRoute>
              } />

              <Route path="/donations" element={<DonationsListing />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
