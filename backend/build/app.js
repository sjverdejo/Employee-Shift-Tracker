import express from 'express';
const app = express();
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/', authRouter);
export default app;
