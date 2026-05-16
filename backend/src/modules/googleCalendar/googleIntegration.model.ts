import mongoose from 'mongoose';

const googleIntegrationSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true },
  googleEmail: { type: String },
  accessTokenEncrypted: { type: String, required: true },
  refreshTokenEncrypted: { type: String, required: true },
  expiryDate: { type: Number, required: true },
  calendarId: { type: String, default: 'primary' },
  isConnected: { type: Boolean, default: false },
}, {
  timestamps: true
});

export const GoogleIntegration = mongoose.model('GoogleIntegration', googleIntegrationSchema);
