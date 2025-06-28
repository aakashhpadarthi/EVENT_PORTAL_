import { useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const TicketPrint = ({ ticketData }) => {
  const ticketRef = useRef();

  const handleDownload = async () => {
    try {
      const ticketElement = ticketRef.current;
      const canvas = await html2canvas(ticketElement, {
        backgroundColor: '#1a1a1a',
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `Event-Ticket-${ticketData?.ticketCode || 'TICKET'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="w-full">
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg font-bold text-lg mb-4"
      >
        Download Ticket
      </button>

      {/* Ticket Container */}
      <div 
        ref={ticketRef} 
        className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl w-full"
      >
        {/* Top Section */}
        <div className="bg-[#222] p-6 border-b-2 border-[#333]">
          <h1 className="text-[#ff6b6b] text-2xl font-bold text-center mb-2">
            EVENT TICKET
          </h1>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-500">★</span>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6 border-b-2 border-dashed border-[#333]">
          <h2 className="text-white text-xl font-bold mb-6 text-center">
            {ticketData?.eventName || 'Event Name'}
          </h2>

          <div className="space-y-4">
            <div className="bg-[#222] rounded-lg p-4">
              <p className="text-[#ff6b6b] text-sm font-semibold mb-1">EVENT DATE & TIME</p>
              <p className="text-white font-medium">
                {ticketData?.date ? new Date(ticketData.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Date TBA'}
              </p>
              <p className="text-white font-medium">
                {ticketData?.date ? new Date(ticketData.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }) : 'Time TBA'}
              </p>
            </div>

            <div className="bg-[#222] rounded-lg p-4">
              <p className="text-[#ff6b6b] text-sm font-semibold mb-1">VENUE</p>
              <p className="text-white font-medium">{ticketData?.location || 'Venue TBA'}</p>
            </div>

            <div className="bg-[#222] rounded-lg p-4">
              <p className="text-[#ff6b6b] text-sm font-semibold mb-1">TICKET INFO</p>
              <p className="text-white font-medium">
                Type: {ticketData?.type || 'General Admission'}
              </p>
              <p className="text-white font-medium">
                Quantity: {ticketData?.quantity || '1'} Guest(s)
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="p-6 bg-[#222] text-center">
          <QRCode 
            value={ticketData?.ticketCode || 'DEMO-TICKET'}
            size={200}
            level="H"
            className="mx-auto mb-4"
            fgColor="#000000"
            bgColor="#ffffff"
          />
          <p className="text-white text-xl font-bold mb-1">ADMIT ONE</p>
          <p className="text-[#888] text-sm mb-4">Scan for verification</p>
          <div className="text-[#888] text-xs">
            <p>Ticket ID: {ticketData?.ticketCode || 'DEMO-TICKET'}</p>
            <p>Issued: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPrint; 