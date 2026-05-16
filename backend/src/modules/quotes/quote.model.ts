import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  whatsapp: { type: String, required: true },
  deviceModel: { type: String, required: true },
  problemType: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'scheduled', 'in_progress', 'completed', 'lost'],
    default: 'new' 
  },
  source: { type: String },
  pageUrl: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  preferredDate: { type: String }, // YYYY-MM-DD
  preferredTime: { type: String }, // HH:mm
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
}, {
  timestamps: true
});

export const Quote = mongoose.model('Quote', quoteSchema);
