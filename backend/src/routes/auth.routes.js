import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { registerValidator, loginValidator } from '../utils/validators.js';


const router = express.Router();


router.post('/register', registerValidator, async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { name, email, password, role } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already registered' });
const user = await User.create({ name, email, password, role });
return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
});


router.post('/login', loginValidator, async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await user.comparePassword(password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});


export default router;