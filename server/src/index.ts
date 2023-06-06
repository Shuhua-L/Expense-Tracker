import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

const app: Application = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(logger(':method :url :status - :response-time ms'))

app.get('/', (req: Request, res: Response) => {
  res.json("Welcome to MVP! 🤗")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Now running on http://localhost:${PORT}`));