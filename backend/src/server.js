import express from 'express';
import path from 'path';
import {ENV} from './config/env.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js'

import { connectDB } from './config/db.js';

connectDB();

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// middlewares
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);


// make ready for deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "/dist", "/index.html"));
    });
}

app.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));