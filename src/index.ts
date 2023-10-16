import fs from 'fs';
import cors from 'cors';
import https from 'https';
import dotenv from 'dotenv';
import express from 'express';

import { router } from './router';
import { connect, disconnect } from './db';

dotenv.config();

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;
const version = process.env.VERSION;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${version}`, router);

https
	.createServer(
		{
			key: fs.readFileSync('cert/key.pem'),
			cert: fs.readFileSync('cert/cert.pem'),
		},
		app
	)
	.listen({ host, port }, () => {
		console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

		[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
			process.on(eventType, cleanup);
		});
	});

connect();

export const cleanup = () => {
	disconnect();
	process.exit(0);
};
