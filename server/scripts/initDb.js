const mongoose = require('mongoose');
const Event = require('../models/Event');

const events = [
  {
    title: 'Summer Music Festival',
    date: 'July 15, 2024',
    location: 'Central Park, NY',
    price: 99,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    category: 'Music',
    description: 'Experience the ultimate summer music festival with top artists from around the world.',
    features: ['Live performances', 'Food vendors', 'Camping available'],
    availableTickets: 5000
  },
  {
    title: 'Tech Innovation Summit',
    date: 'August 20, 2024',
    location: 'Silicon Valley Convention Center',
    price: 299,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    category: 'Technology',
    description: 'Join industry leaders for the latest in tech innovation and networking.',
    features: ['Keynote speakers', 'Workshops', 'Networking events'],
    availableTickets: 2000
  },
  // Add more events here...
];

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/eventflow', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert new events
    const insertedEvents = await Event.insertMany(events);
    console.log(`Inserted ${insertedEvents.length} events`);

    // Verify data integrity
    const count = await Event.countDocuments();
    console.log(`Total events in database: ${count}`);

    const verifyEvent = await Event.findOne({ title: 'Summer Music Festival' });
    console.log('Verification sample:', verifyEvent ? 'Success' : 'Failed');

    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  } finally {
    await mongoose.disconnect();
  }
};

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { initializeDatabase }; 