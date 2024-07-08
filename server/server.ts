import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import {router as currencyRoutes} from './routes/graphRoutes';
import {router as arbitrageRoutes} from './routes/arbitrageRoutes';
import { currencyController } from './controllers/graphController';
dotenv.config();


const app= express();
app.use(cors());
app.use(express.json());
// console.log(`${process.env.MONGODB_URI}`);

// Connect to MongoDB
await mongoose.connect(`${process.env.MONGODB_URI}`);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

app.use('/', currencyRoutes);
app.use('/', arbitrageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

