import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';

const TicketPreview = ({ ticketData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">{ticketData.eventName}</h3>
        <p className="text-gray-500">E-Ticket</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Date</p>
          <p className="font-semibold">{new Date(ticketData.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Location</p>
          <p className="font-semibold">{ticketData.location}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Attendee</p>
          <p className="font-semibold">{ticketData.attendee}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Quantity</p>
          <p className="font-semibold">{ticketData.quantity}</p>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <QRCode value={ticketData.qrCode} size={150} level="H" />
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">Ticket Code</p>
        <p className="font-mono font-bold">{ticketData.ticketCode}</p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => window.print()}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Print Ticket
        </button>
        <button
          onClick={() => window.location.href = '/events'}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Browse More Events
        </button>
      </div>
    </motion.div>
  );
};

export default TicketPreview; 