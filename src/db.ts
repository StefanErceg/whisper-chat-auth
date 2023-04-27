import mysql, { Pool } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

let pool: Pool | null = null;

export const connect = () => {
	pool = mysql.createPool({
		host,
		user,
		password,
		database,
	});
	console.log('Connected to MySQL database!');
	pool.on('error', (error) => {
		console.error('MySQL Pool Error:', error);
	});
};

export const disconnect = () => {
	pool?.end((error) => {
		if (error) {
			console.error('Error closing pool connections:', error);
			return;
		}
		console.log('All connections in the pool have been closed!');
	});
};

export const query = (options: string | mysql.QueryOptions, values: any, callback?: mysql.queryCallback | undefined) => {
	if (!pool) {
		const error = 'MySQL Pool not connected to database!';
		console.error(error);
		throw new Error(error);
	}
	return pool?.getConnection((error, connection) => {
		if (error) {
			console.error('Error getting pool connection:', error);
			return;
		}
		connection?.query(options, values, (error, results, fields) => {
			connection.release();
			callback?.(error, results, fields);
		});
	});
};
