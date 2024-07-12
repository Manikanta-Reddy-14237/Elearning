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
<<<<<<< HEAD
        this.password = await bcrypt.hash(this.password, 10); 
=======
        this.password = await bcrypt.hash(this.password, 10); // Hash with a salt factor of 10
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
        next();
      } catch (err) {
        next(err);
      }
});

const Teacher = mongoose.model('Teacher',teacherSchema);

export default Teacher;