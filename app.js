import express from 'express';
import customerRoutes from './routes/customer.routes.js'
import carRoutes from './routes/car.routes.js'
import rentalRoutes from './routes/rental.routes.js'
import connectToMongoDB from './db/connection.js';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/customers', customerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/rentals', rentalRoutes);

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("app listening on port ", PORT);
});