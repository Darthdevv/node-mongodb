import express from 'express';
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connection.js';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);


dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("app listening on port ", PORT);
});