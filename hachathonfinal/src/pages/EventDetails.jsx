import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { events } from '../data/events';
import QRCode from 'qrcode.react';
import TicketPrint from '../components/TicketPrint';
import { CalendarIcon, MapPinIcon, TicketIcon, UserGroupIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [selectedSection, setSelectedSection] = useState('details'); // 'details', 'venue', 'tickets'
  const event = events.find(e => e.id === parseInt(id));
  const [showTicket, setShowTicket] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl text-gray-600">Event not found</h2>
        </div>
      </Layout>
    );
  }

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      const ticketCode = `EVT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const newTicketData = {
        eventName: event.title,
        date: event.date,
        location: event.venue,
        quantity: ticketQuantity,
        type: 'General Admission',
        ticketCode: ticketCode
      };
      
      setTicketData(newTicketData);
      setBookingComplete(true);
      setShowTicket(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const priceNumber = parseFloat(event.price.replace('$', ''));
  const totalPrice = priceNumber * ticketQuantity;

  return (
    <Layout>
      {/* Hero Section with Enhanced Contrast */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-4xl"
          >
            <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm mb-4">
              {event.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white shadow-text">
              {event.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <span className="flex items-center">
                <CalendarIcon className="h-6 w-6 mr-2" />
                {event.date}
              </span>
              <span className="flex items-center">
                <MapPinIcon className="h-6 w-6 mr-2" />
                {event.location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Event Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-blue-800">
                      <CalendarIcon className="h-6 w-6 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-blue-700">{event.date}</p>
                      </div>
                    </li>
                    <li className="flex items-center text-blue-800">
                      <MapPinIcon className="h-6 w-6 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-blue-700">{event.location}</p>
                      </div>
                    </li>
                    <li className="flex items-center text-blue-800">
                      <UserGroupIcon className="h-6 w-6 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p className="text-blue-700">Limited Seats Available</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-900">Highlights</h3>
                  <ul className="space-y-3">
                    {event.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-purple-800">
                        <StarIcon className="h-5 w-5 mr-3 text-purple-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What to Expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">Schedule</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <ClockIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Doors open: 2 hours before event</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <ClockIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Main event: {event.date}</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">Important Info</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <TicketIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Valid ID required for entry</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <TicketIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>No refunds available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:col-span-1">
            {!bookingComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Book Tickets</h3>
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-900 font-semibold">Price per ticket</p>
                    <p className="text-3xl font-bold text-blue-600">{event.price}</p>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Number of Tickets
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                        className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center text-xl font-bold"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center p-2 border-2 border-blue-200 rounded-lg text-lg"
                      />
                      <button
                        onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                        className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-100 pt-4">
                    <div className="flex justify-between text-lg mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg mb-4">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold">$5.00</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">${(totalPrice + 5).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className={`w-full ${
                      isBooking ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-4 rounded-lg transition-colors font-bold text-lg shadow-lg`}
                  >
                    {isBooking ? 'Processing...' : 'Book Now'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By booking, you agree to our Terms & Conditions
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="w-full max-w-3xl mx-auto">
                  <TicketPrint ticketData={ticketData} />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;