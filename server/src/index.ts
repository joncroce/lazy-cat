import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mountRoutes from './routes';

config();

const port = process.env.SERVER_PORT;
const app = express();
app.use(morgan('tiny'));

mountRoutes(app);

app.use(express.json());

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});