const express = require('express');
const dotenv = require('dotenv').config();
const colors = require ('colors')
const connectDB = require ('./config/db')
const errorHandler = require ("./middleware/errorMiddleware")
const port = process.env.PORT || 5000;

connectDB();
const app = express();
const cors = require('cors');


app.use(express.json())
app.use(express.urlencoded({ extended : false })) 
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL (Vite Default Port)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If using cookies or authentication
}));



app.use('/api/goals',  require('./routes/goalRoutes'));
app.use('/api/users',  require('./routes/userRoutes'));



app.use(errorHandler)

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
