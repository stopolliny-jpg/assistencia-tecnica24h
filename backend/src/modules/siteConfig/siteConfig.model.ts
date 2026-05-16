import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  whatsapp: { type: String, required: true },
  displayWhatsapp: { type: String, required: true },
  instagram: { type: String, required: true },
  location: { type: String, required: true },
  workingHours: { type: String, required: true },
  warranty: { type: String, required: true },
}, {
  timestamps: true
});

export const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
