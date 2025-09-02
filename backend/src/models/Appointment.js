import mongoose from 'mongoose';


const AppointmentSchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
date: { type: Date, required: true },
reason: { type: String, default: '' },
status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
}, { timestamps: true });


AppointmentSchema.index({ doctor: 1, date: 1 }, { unique: true });


export default mongoose.model('Appointment', AppointmentSchema);