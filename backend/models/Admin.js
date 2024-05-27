import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Pre-save hook to hash the password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash with a salt factor of 10
    next();
  } catch (err) {
    next(err);
  }
});

// Create the Admin model from the schema
const Admin = mongoose.model('Admin', adminSchema);

// Export the model to be used in other parts of the application
export default Admin;
