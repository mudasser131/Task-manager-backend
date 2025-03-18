const mongoose = require('mongoose');

// Define the User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'], // Makes the field required
    },
    email: {
      type: String,
      required: [true, 'Please add an email'], // Makes the field required
      unique: true, // Ensures email is unique in the database
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ], // Validates email format
    },
    password: {
      type: String,
      required: [true, 'Please add a password'], // Makes the field required
      minlength: [6, 'Password must be at least 6 characters'], // Sets a minimum length for the password
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Export the User Model
module.exports = mongoose.model('User', userSchema);
