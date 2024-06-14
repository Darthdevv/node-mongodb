import express from 'express';

const app = express();

app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
  console.log("app listening on port ", PORT);
});