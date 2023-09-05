import postgres from 'postgres';
import config from './config.js';
//Connect to managed Postgres database
const connectionString = config.DATABASE_URL;
const sql = postgres(connectionString);
export default sql;
