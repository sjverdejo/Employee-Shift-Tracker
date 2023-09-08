import 'dotenv/config';
const PORT = process.env.PORT;
//if node_env is in production use live database, set database to test if in development
let DATABASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL;
const SECRET = process.env.SECRET;
export default { PORT, DATABASE_URL, SECRET };
