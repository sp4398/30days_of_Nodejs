const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});
const User = mongoose.model('User', userSchema);
async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

mongoose.connect('mongodb://localhost/my_database');

addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
addUserWithValidation({ username: 'saurav', email: 'saurav@gmail.coml' });


