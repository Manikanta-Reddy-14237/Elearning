import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    rollnumber:String,
});

studentSchema.pre('save',async function(next){
 if(!this.isModified('password') ) return next();

 try{
    this.password=await bcrypt.hash(this.password,10);
    next();
 }catch(err){
    next(err);
 }
});

const Student = mongoose.model('Student',studentSchema);

export default Student;

