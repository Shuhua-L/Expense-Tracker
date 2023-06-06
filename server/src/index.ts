import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import * as controllers from './controllers'

const app: Application = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(logger(':method :url :status - :response-time ms'))

app.get('/', controllers.homePage);
app.get('/expenses', controllers.getRecords);
app.post('/expenses', controllers.postRecords);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Now running on http://localhost:${PORT}`));