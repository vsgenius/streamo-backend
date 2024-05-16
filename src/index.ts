import dotenv from 'dotenv';

import express from 'express';

import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Streamo-backend');
});

app.listen(port, () => {
  return (`[server]: Server is running http://localhost:${port}`);
});
