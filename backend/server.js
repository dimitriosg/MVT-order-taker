// backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import multerRoutes from './middleware/multer.js';

const app = express();

// Manual CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update this to match your allowed origins
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://mvt-order-taker-027623a22a27.herokuapp.com/'
  ],  // Allow both your local and deployed frontends
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  allowedHeaders: '*',
};

app.use(cors(corsOptions)); // Set up CORS
//app.use(cors()); // Set up CORS

// Use the multer routes
app.use('/api', multerRoutes);

const httpServer = createServer(app);

// Apply CORS options to Socket.io as well
const io = new Server(httpServer, {
  path: "/socket.io",
  cors: corsOptions
});



io.on('connection', (socket) => {
  console.log('A user connected with socket id:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected with socket id:', socket.id);
  });

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
app.use(express.static(join(__dirname, '../frontend/build')));
console.log("Sending file from:", join(__dirname, '../frontend/build/index.html'));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  // Only use the catchall handler in production
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/build/index.html'));
  });
}

app.get('*', (req, res) => {
  console.log('Catch-all route hit.');
  res.sendFile(join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server Error', message: err.message });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection at: ${promise}`, `Reason: ${reason}`);
  // Close server & exit process
  httpServer.close(() => process.exit(1));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server Error', message: err.message });
});


export { app, httpServer };
