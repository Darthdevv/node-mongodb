import express from 'express';
import { dbConnection } from './db/connection.js';

const app = express();

app.use(express.json());

dbConnection();

const PORT = 8000;

app.listen(PORT, () => {
  console.log("app listening on port ", PORT);
});