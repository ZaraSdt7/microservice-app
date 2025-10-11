import * as dotenv from 'dotenv';
dotenv.config();

export const configuration = () => ({
  app: {
    name: process.env.APP_NAME || 'TodoService',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'todo_db',
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
});
