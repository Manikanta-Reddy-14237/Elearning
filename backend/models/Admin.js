import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});


adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10); 
    next();
  } catch (err) {
    next(err);
  }
});


const Admin = mongoose.model('Admin', adminSchema);


export default Admin;
