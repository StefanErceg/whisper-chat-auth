import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET || '';
const tokenExpiration = +(process.env.TOKEN_EXPIRATION_MINUTES || 120);

export const generateToken = (userId: string): string => {
	return jwt.sign({ userId }, secret, { expiresIn: `${tokenExpiration}m` });
};

export const accessTokenCookieOptions: CookieOptions = {
	expires: new Date(Date.now() + tokenExpiration * 60 * 1000),
	maxAge: +tokenExpiration * 60 * 1000,
	httpOnly: true,
	sameSite: 'lax',
	secure: true,
};
