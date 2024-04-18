require('dotenv').config();
import express, { Express, Request, Response } from "express";


const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Streamo-backend ');
});

app.listen(port, () => {
  console.log(`[server]: Server is running http://localhost:${port}`);
});