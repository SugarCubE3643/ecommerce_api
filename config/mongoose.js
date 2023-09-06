const mongoose = require('mongoose');

// Connect to the database
const dbURL = process.env.MONGODB_URL;
mongoose.connect(dbURL, {
    useUnifiedTopology: true // Enable the new connection management engine
});;

// Storing the connection for logging purpose of it's status
const db = mongoose.connection;

// Check the connection status
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Export mongoose
module.exports = mongoose;
