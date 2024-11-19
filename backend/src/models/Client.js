import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true
  },
  cedula: {
    type: String,
    required: [true, 'Please provide cedula'],
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false
  }
}, {
  timestamps: true
});

// Hash password before saving
clientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Client = mongoose.model('Client', clientSchema);

export default Client;