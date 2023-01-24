import { config } from 'dotenv';
import express from 'express';
import mountRoutes from './routes';

config();

const port = process.env.SERVER_PORT;
const app = express();

mountRoutes(app);

app.use(express.json());

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});