import mongoose from "mongoose";
import bcrypt from "bcrypt";

<<<<<<< HEAD

=======
// Define the Admin schema
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

<<<<<<< HEAD

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10); 
=======
// Pre-save hook to hash the password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash with a salt factor of 10
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
    next();
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD

const Admin = mongoose.model('Admin', adminSchema);


=======
// Create the Admin model from the schema
const Admin = mongoose.model('Admin', adminSchema);

// Export the model to be used in other parts of the application
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
export default Admin;
