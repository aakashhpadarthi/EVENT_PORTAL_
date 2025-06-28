const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Initialize events
router.post('/init', async (req, res) => {
  const initialEvents = [
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
    // Add all 15 events here from the previous response
  ];

  try {
    await Event.deleteMany({}); // Clear existing events
    const events = await Event.insertMany(initialEvents);
    res.json({ message: 'Events initialized successfully', count: events.length });
  } catch (error) {
    console.error('Error initializing events:', error);
    res.status(500).json({ message: 'Error initializing events' });
  }
});

module.exports = router;