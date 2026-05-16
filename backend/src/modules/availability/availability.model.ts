import mongoose from 'mongoose';

const availabilitySlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm
  endTime: { type: String, required: true }, // HH:mm
  durationMinutes: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  isBooked: { type: Boolean, default: false },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  googleCalendarEventId: { type: String },
  notes: { type: String }
}, {
  timestamps: true
});

availabilitySlotSchema.index({ date: 1, startTime: 1, endTime: 1 }, { unique: true });

export const AvailabilitySlot = mongoose.model('AvailabilitySlot', availabilitySlotSchema);
