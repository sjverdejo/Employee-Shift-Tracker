import express from 'express';
const app = express();
import usersRouter from './routes/users.js';
app.use(express.json());
app.use('/api/users', usersRouter);
export default app;
