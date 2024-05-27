import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const teacherSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    mobileno:Number
});

teacherSchema.pre('save',async function (next) {
    if (!this.isModified('password')) return next(); 
    try {
        this.password = await bcrypt.hash(this.password, 10); // Hash with a salt factor of 10
        next();
      } catch (err) {
        next(err);
      }
});

const Teacher = mongoose.model('Teacher',teacherSchema);

export default Teacher;