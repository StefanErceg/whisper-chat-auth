import bcrypt from 'bcrypt';
import { Router } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';

import { query } from './db';

import { accessTokenCookieOptions, generateToken } from './utils';

export const router = Router();

router.post('/login', (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(BAD_REQUEST).send('Email and password are required fields!');
		}
		const template = `
		SELECT * 
		FROM ?? 
		WHERE ?? = ? 
		LIMIT 1`;
		const table = 'user';
		const column = 'email';
		const values = [table, column, email];

		query(template, values, async (error, results) => {
			if (error) return res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error');

			if (results.length === 0) return res.status(BAD_REQUEST).send('Invalid email or password');

			const { id, name, password: hashed, banned } = results[0];
			const match = await bcrypt.compare(password, hashed);

			if (banned && match) return res.status(BAD_REQUEST).send('User permanently banned!');

			if (!match) return res.status(BAD_REQUEST).send('Invalid email or password');

			const accessToken = generateToken(id);
			res.cookie('access_token', accessToken, accessTokenCookieOptions);

			res.status(OK).json({ id, name, email });
		});
	} catch (error) {
		console.error(error);
		next();
	}
});

router.post('/logout', (_, res) => {
	res.cookie('access_token', '', { maxAge: 1 });
	res.cookie('refresh_token', '', { maxAge: 1 });

	res.status(OK).send('User logged out successfully');
});

router.post('/signup', async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) return res.status(BAD_REQUEST).send('Name, email and password are required fields!');

		const hash = await bcrypt.hash(password, 10);

		const template = `
		INSERT INTO ?? SET ?`;
		const table = 'user';
		const values = [table, { name, email, password: hash }];

		query(template, values, (error) => {
			if (error) {
				console.error(error);
				return res.status(INTERNAL_SERVER_ERROR).send('Internal server error');
			}

			res.status(201).send('User successfully created!');
		});
	} catch (error) {
		console.error(error);
		next();
	}
});

export default router;
