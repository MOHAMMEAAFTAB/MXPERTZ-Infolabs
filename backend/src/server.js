import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';


dotenv.config();


const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());


app.get('/', (req, res) => res.send('Hospital Appointment API running'));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/appointments', appointmentsRoutes);


const PORT = process.env.PORT
