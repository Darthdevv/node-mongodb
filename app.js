import express from 'express';
import { dbConnection } from './db/connection.js';
import userRoutes from './routes/user.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
dbConnection();

const PORT = 8000;

app.listen(PORT, () => {
  console.log("app listening on port ", PORT);
});