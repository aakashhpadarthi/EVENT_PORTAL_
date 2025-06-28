const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { isAdmin } = require('../middleware/auth');

// Admin dashboard data
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const events = await Event.find().populate('bookings');
    const analytics = {
      totalEvents: events.length,
      totalBookings: events.reduce((acc, event) => acc + (event.bookings?.length || 0), 0),
      totalRevenue: events.reduce((acc, event) => acc + (event.price * (event.bookings?.length || 0)), 0),
      activeEvents: events.filter(event => new Date(event.date) >= new Date()).length
    };

    res.json({ events, analytics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

// Add more admin routes for CRUD operations on events

module.exports = router; 