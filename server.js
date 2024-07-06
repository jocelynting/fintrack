import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// routes
import authRouter from './routers/authRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import billRouter from './routers/billRouter.js';
import userRouter from './routers/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // log all requests to the console
}

app.use(express.json()); // body parser
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', authenticateUser, categoryRouter);
app.use('/api/v1/bills', authenticateUser, billRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
