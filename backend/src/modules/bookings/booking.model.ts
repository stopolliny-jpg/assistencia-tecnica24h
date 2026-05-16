import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  whatsapp: { type: String, required: true },
  deviceModel: { type: String, required: true },
  problemType: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'AvailabilitySlot', required: true },
  quoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  status: { 
    type: String, 
    enum: ['scheduled', 'confirmed', 'cancelled', 'completed', 'no_show'],
    default: 'scheduled' 
  },
  googleCalendarEventId: { type: String },
  googleCalendarHtmlLink: { type: String },
  googleCalendarSynced: { type: Boolean, default: false },
  googleCalendarWarning: { type: String },
}, {
  timestamps: true
});

export const Booking = mongoose.model('Booking', bookingSchema);
