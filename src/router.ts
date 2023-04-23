import bcrypt from 'bcrypt';
import { Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status';

import { accessTokenCookieOptions, generateToken } from './utils';

export const router = Router();

router.post('/login', (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(BAD_REQUEST).send('Email and password are required fields!');
		}

		if (email !== 'test@example.com' || password !== 'password') {
			return res.status(BAD_REQUEST); //TEMP
		}

		const accessToken = generateToken('userID123');
		res.cookie('access_token', accessToken, accessTokenCookieOptions);

		res.status(OK);
	} catch (err) {
		console.error(err);
		next();
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) return res.status(BAD_REQUEST).send('Email and password are required fields!');

		const hash = await bcrypt.hash(password, 10);

		//STORE THE DATA

		const token = generateToken('userID123');
		res.json(token);
	} catch (err) {
		next();
	}
});

export default router;
