

declare const process: { env: { [key: string]: string | undefined } };

export const Config = () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  database: {
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '5432', 10),
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	name: process.env.DB_NAME,
  },
  jwt: {
	secret: process.env.JWT_SECRET,
	expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
});