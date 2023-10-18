import express from 'express';
import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import helmet from 'helmet';
// import cors from "cors"; // for CORS setup, usage: app.use(cors());

import dotenv from 'dotenv';
dotenv.config(); // load variables from .env file

const port = process.env.PORT || 3030; // default port to listen

const app = express();
app.use(express.json()); // parse json payload
app.use(helmet());

app.get('/api', (req: Request, res: Response) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `/api/item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:itemId', (req: Request, res: Response) => {
  const { itemId } = req.params;
  if (itemId.length <= 1) {
    res.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }
  res.json({ itemId });
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;
