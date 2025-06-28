import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccessMessage('Registration successful! Redirecting...');
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Wait for 1.5 seconds before redirecting
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#F4F7FF] to-white pt-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-[#111827]">
                Create Account
              </h2>
              <p className="mt-2 text-[#4B5563]">
                Join our community today
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block mb-2 font-medium text-[#111827]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block mb-2 font-medium text-[#111827]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block mb-2 font-medium text-[#111827]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                    placeholder="Create a password"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block mb-2 font-medium text-[#111827]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.p
                  className="text-red-600 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              {/* Success Message */}
              {successMessage && (
                <motion.p
                  className="text-green-600 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {successMessage}
                </motion.p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </form>

            {/* Sign In Link */}
            <motion.p
              className="text-center mt-6 text-[#4B5563]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-[#4F46E5] hover:text-[#4338CA]"
              >
                Sign In
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp; 