import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, {
  timestamps: true
});

adminUserSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

export const AdminUser = mongoose.model('AdminUser', adminUserSchema);
