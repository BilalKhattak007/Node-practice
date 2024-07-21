// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandle = require('./middleware/errorHandle');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require("./routes/userRoutes")
// Configure environment variables
dotenv.config(); 

// Create an Express application
const app = express();

// Use JSON middleware
app.use(express.json());

// Database connection:
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

// Define port and host from environment variables or defaults
const Port = process.env.PORT || 3000;
const Host = process.env.HOST || 'localhost';

// Use the contact router for API routes
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);

// Use the error handling middleware
app.use(errorHandle);

// Start the server
const server = app.listen(Port, Host, () => {
    console.log(`App running on http://${Host}:${Port}`);
});
