import 'reflect-metadata';
import mongoose from 'mongoose';
import { createLocalServer } from './server';
require('dotenv').config();

const main = async () => {
  if (!process.env.MONGODB_URI) {
    return;
  }

  const server = await createLocalServer();

  const PORT = process.env.PORT || 4000;

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error: '));

  db.on('open', function () {
    console.log('MongoDB Connected');
    server
      .listen({ port: PORT })
      .then((res) => {
        console.log(`🚀 Server is running at ${res.url}`);
      })
      .catch((err) => console.error(err));
  });
};

main();
