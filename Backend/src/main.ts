import express from "express";
import { connectToDatabase } from "./api/infrastructure/db/database";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from "./api/routes/userRoutes";
import authRoutes from "./api/routes/authRoutes"
import postRoutes from "./api/routes/postRoutes"
import adminRoutes from "./api/routes/adminRoutes"
import ownerRoutes from "./api/routes/ownerRoutes";
import operatorRoutes from "./api/routes/operatorRoutes"
import cookieParser from "cookie-parser";
// import logger from './logger';

import morgan from 'morgan';

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL, // Frontend URL (React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,
  };

  // app.use(
  //   morgan('combined', {
  //     stream: {
  //       write: (message: string) => {
  //         logger.info(message.trim());
  //       },
  //     },
  //   })
  // );

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser());

app.use('/', authRoutes);
app.use("/admin",adminRoutes)
app.use("/owner",ownerRoutes)
app.use('/user',userRoutes);
app.use("/operator",operatorRoutes)
app.use("/media",postRoutes)

// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   logger.error('Unhandled error', { error: err.message, stack: err.stack, path: req.path });
//   res.status(500).json({ error: 'Internal Server Error' });
// });

connectToDatabase();

app.listen(process.env.PORT, () => {
    console.log('\x1b[35m%s\x1b[0m',`Server running on http://localhost:${process.env.PORT}`);
    // logger.info(`Server running on http://localhost:${process.env.PORT}`);
});
