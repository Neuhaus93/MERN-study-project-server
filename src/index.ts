import mongoose from 'mongoose';

import config from './config';
import { createLocalServer } from './server';

const server = createLocalServer();
const { MONGODB } = config;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
