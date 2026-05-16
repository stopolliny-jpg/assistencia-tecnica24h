import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  description: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);
