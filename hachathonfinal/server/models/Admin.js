const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: 'admin.hackathon@gmail.com'
  },
  password: {
    type: String,
    required: true,
    default: async function() {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash('admin123', salt);
    }
  },
  role: {
    type: String,
    default: 'admin'
  }
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin; 