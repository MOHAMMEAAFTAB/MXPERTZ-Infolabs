import express from 'express';
router.post('/', auth, permit('patient'), appointmentCreateValidator, async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { doctorId, date, reason } = req.body;


const doctor = await User.findById(doctorId);
if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });


try {
const appt = await Appointment.create({ patient: req.user.id, doctor: doctorId, date, reason });
const populated = await appt.populate('doctor', 'name email');
res.status(201).json(populated);
} catch (e) {
if (e.code === 11000) return res.status(409).json({ message: 'Slot already booked for this doctor & time' });
throw e;
}
});


// Cancel Appointment (Patient who booked OR the Doctor)
router.patch('/:id/cancel', auth, appointmentIdParam, async (req, res) => {
const appt = await Appointment.findById(req.params.id);
if (!appt) return res.status(404).json({ message: 'Appointment not found' });
const isPatient = appt.patient.toString() === req.user.id;
const isDoctor = appt.doctor.toString() === req.user.id;
if (!isPatient && !isDoctor) return res.status(403).json({ message: 'Not allowed' });
if (appt.status === 'cancelled') return res.json(appt);
appt.status = 'cancelled';
await appt.save();
res.json(appt);
});


// Get Appointments (for logged-in user)
router.get('/me', auth, async (req, res) => {
const roleKey = req.user.role === 'doctor' ? 'doctor' : 'patient';
const appts = await Appointment.find({ [roleKey]: req.user.id })
.populate('patient', 'name email')
.populate('doctor', 'name email')
.sort({ date: 1 });
res.json(appts);
});


// Admin-like list (optional): all appointments for a given doctor id (doctors can view their own too)
router.get('/doctor/:id', auth, async (req, res) => {
if (req.user.role !== 'doctor' && req.user.id !== req.params.id) {
// allow patients to view only their own via /me
}
const appts = await Appointment.find({ doctor: req.params.id })
.populate('patient', 'name email')
.populate('doctor', 'name email')
.sort({ date: 1 });
res.json(appts);
});


export default router;