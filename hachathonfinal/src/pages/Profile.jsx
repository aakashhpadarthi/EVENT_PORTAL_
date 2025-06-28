import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setUser(JSON.parse(userData));
        // Fetch user's bookings
        const response = await fetch('http://localhost:5000/api/bookings/user', {
          credentials: 'include'
        });
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          >
            <div className="bg-blue-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Statistics</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">Total Events Booked</p>
                <p className="text-3xl font-bold text-blue-900">{bookings.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 mb-1">Upcoming Events</p>
                <p className="text-3xl font-bold text-green-900">
                  {bookings.filter(booking => new Date(booking.event.date) > new Date()).length}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Booked Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No events booked yet
                </div>
              ) : (
                bookings.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {booking.event.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(booking.event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Tickets: {booking.quantity}
                          </span>
                          <span className="text-sm text-gray-500">
                            Total: ${(booking.quantity * booking.event.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {new Date(booking.event.date) > new Date() ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Upcoming
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            Past
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 