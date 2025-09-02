import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();


// Get all patients
router.get('/patients', auth, async (req, res) => {
const users = await User.find({ role: 'patient' }).select('-password');
res.json(users);
});


// Get all doctors
router.get('/doctors', auth, async (req, res) => {
const users = await User.find({ role: 'doctor' }).select('-password');
res.json(users);
});


export default router;