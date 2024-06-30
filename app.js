import express from 'express';
import customerRoutes from './routes/customer.routes.js'
import carRoutes from './routes/car.routes.js'
import rentalRoutes from './routes/rental.routes.js'
import connectToMongoDB from './db/connection.js';
import { notFound } from './middlewares/error.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/customers', customerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/rentals', rentalRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("app listening on port ", PORT);
});