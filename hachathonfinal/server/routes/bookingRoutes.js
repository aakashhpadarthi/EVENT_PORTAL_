const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const { isAuthenticated } = require('../middleware/auth');
const mongoose = require('mongoose');

// Create a booking with seat management
router.post('/book', isAuthenticated, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId, numberOfSeats } = req.body;
    const userId = req.user._id;

    // Find event and check seat availability
    const event = await Event.findById(eventId).session(session);
    if (!event) {
      throw new Error('Event not found');
    }

    // Check if enough seats are available
    if (event.availableSeats < numberOfSeats) {
      throw new Error('Not enough seats available');
    }

    // Calculate total amount
    const totalAmount = event.price * numberOfSeats;

    // Generate unique ticket code
    const ticketCode = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create booking
    const booking = new Booking({
      event: eventId,
      user: userId,
      numberOfSeats,
      totalAmount,
      ticketCode
    });

    // Update available seats
    event.availableSeats -= numberOfSeats;
    event.bookings.push(booking._id);

    // Save both documents
    await Promise.all([
      booking.save({ session }),
      event.save({ session })
    ]);

    // Commit transaction
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      booking: {
        ...booking.toObject(),
        event: {
          title: event.title,
          date: event.date,
          location: event.location
        }
      }
    });

  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    res.status(400).json({
      success: false,
      message: error.message
    });
  } finally {
    session.endSession();
  }
});

// Get available seats for an event
router.get('/event/:eventId/seats', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .select('totalSeats availableSeats');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      seats: {
        total: event.totalSeats,
        available: event.availableSeats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Cancel booking and return seats
router.post('/cancel/:bookingId', isAuthenticated, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(req.params.bookingId)
      .session(session);

    if (!booking || booking.user.toString() !== req.user._id.toString()) {
      throw new Error('Booking not found or unauthorized');
    }

    if (booking.status === 'cancelled') {
      throw new Error('Booking is already cancelled');
    }

    const event = await Event.findById(booking.event).session(session);
    if (!event) {
      throw new Error('Event not found');
    }

    // Return seats to available pool
    event.availableSeats += booking.numberOfSeats;
    booking.status = 'cancelled';

    await Promise.all([
      booking.save({ session }),
      event.save({ session })
    ]);

    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({
      success: false,
      message: error.message
    });
  } finally {
    session.endSession();
  }
});

module.exports = router; 