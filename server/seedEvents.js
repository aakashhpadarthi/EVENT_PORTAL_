const mongoose = require('mongoose');
const Event = require('./models/Event');

const events = [
  {
    title: 'Summer Music Festival',
    description: 'Experience the ultimate summer music festival with live performances from top artists.',
    date: '2024-07-15',
    location: 'Central Park, NY',
    price: 99.99,
    availableTickets: 1000,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'
  },
  {
    title: 'Tech Conference 2024',
    description: 'Join industry leaders for the biggest tech conference of the year.',
    date: '2024-08-20',
    location: 'Convention Center, SF',
    price: 299.99,
    availableTickets: 500,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
  },
  {
    title: 'Food & Wine Festival',
    description: 'Taste exquisite dishes and wines from around the world.',
    date: '2024-09-10',
    location: 'Downtown Food Court',
    price: 75.00,
    availableTickets: 750,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'
  }
];

mongoose.connect('mongodb://localhost:27017/eventflow')
  .then(async () => {
    console.log('Connected to MongoDB');
    await Event.deleteMany({}); // Clear existing events
    await Event.insertMany(events);
    console.log('Events seeded successfully');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error seeding events:', error);
    mongoose.connection.close();
  }); 