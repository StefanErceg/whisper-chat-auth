import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { router } from './router';
import { connect, disconnect } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT;
const version = process.env.VERSION;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${version}`, router);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

	[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
		process.on(eventType, cleanup);
	});
});

connect();

export const cleanup = () => {
	disconnect();
	process.exit(0);
};
