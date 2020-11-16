import mongoose from 'mongoose';
require('dotenv').config();

import { createLocalServer } from './server';

const server = createLocalServer();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.on('open', function() {
  console.log('MongoDB Connected');
  server
    .listen({ port: PORT })
    .then((res) => {
      console.log(`🚀 Server is running at ${res.url}`);
    })
    .catch((err) => console.error(err));
});
