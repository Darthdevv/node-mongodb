import express from 'express';
import customerRoutes from './routes/customer.routes.js'
import carRoutes from './routes/car.routes.js'
import rentalRoutes from './routes/rental.routes.js'
import connectToMongoDB from './db/connection.js';
import { notFound } from './middlewares/error.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/customers', customerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/rentals', rentalRoutes);
app.use(notFound);
app.use(errorHandler);

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB, server not started", error);
  });