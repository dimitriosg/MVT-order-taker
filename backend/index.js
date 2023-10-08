// index.js

// Set the timezone
process.env.TZ = 'Europe/Athens';  // Setting timezone to GMT+3 (Athens)

import { app, httpServer } from './server.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/allRoutes.js'; // for ALL ROUTES
import { activityLogger } from './middleware/activityLogger.js';
import { authMiddleware } from './middleware/authMiddleware.js';


dotenv.config();
//const app = express();

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.DATABASE_URL;

// USED FOR LOCAL CONNECTION
//const MONGODB_URI = process.env.MONGODB_URI;
// Connect to MongoDB (local)
//mongoose.connect(MONGODB_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//})
//.then(() => console.log('MongoDB connected'))
//.catch(err => console.log(err));

// Connect to MongoDB (Atlas)
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.log(err));


// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for logging incoming requests
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url, req.body);
  next();
});

// Middleware for activity logging
app.use(activityLogger); 

// Middleware for CORS (anywhere)
//app.use(cors());

// Middleware for authentication (if you have one globally)
// app.use(authMiddleware);


// API routes
app.use('/', routes);  // Replace existing individual route uses

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


//test route
app.get('/test', (req, res) => {
  res.send('Test route running');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Start the server
httpServer.listen(PORT, () => {
  console.log("Current Server Time:", new Date());
  console.log("Current Server Time:", new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
  console.log("TZ variable:", process.env.TZ); 
  console.log(`Server running on port ${PORT}`);
});
