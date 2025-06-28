const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eventflow');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin.hackathon@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = new User({
      name: 'Admin',
      email: 'admin.hackathon@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin(); 