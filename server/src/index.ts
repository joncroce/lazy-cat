import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import CatsRouter from './cats/router';

config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/cats', CatsRouter);

app.listen(port, () => {
	console.log(`API server listening on port ${port}`);
});