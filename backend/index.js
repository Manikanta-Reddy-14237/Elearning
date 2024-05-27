import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from 'cors';
import multer from "multer";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from "path";
import bodyParser from "body-parser";
import contact from "./models/Contact.js";
import Admin from "./models/Admin.js";
import Teacher from "./models/Teacher.js";
import Student from "./models/Student.js";
import verifyToken from "./verifyToken.js";
import authorizeRole from './authorizeRole.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://elearningfrontend-gbfblxd2c-manikantas-projects-f78ee616.vercel.app'
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, './public/uploads/');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const JWT_SECRET = 'your_secret_key';

mongoose.connect('mongodb+srv://Manikanta:mongodbpass@elearning.m9pdzdf.mongodb.net/?retryWrites=true&w=majority&appName=Elearning',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MainDB'))
.catch((err) => console.error('Failed to connect to MainDB', err));


// Endpoint to serve uploaded files
app.get("/public/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "public/uploads", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    console.log(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});


app.get('/generate-signed-url/:filename',verifyToken, (req, res) => {
  const { filename } = req.params;
  const token = req.headers.authorization.split(' ')[1];

      const encodedFilename = encodeURIComponent(filename);

      const signedUrl = `http://localhost:3001/public/uploads/${encodedFilename}?token=${token}`;

      res.json({ signedUrl });
  });


app.post('/teacher/delete/:fileId',verifyToken, authorizeRole(['admin', 'teacher']),(req,res)=>{
   const {fileId} =req.params;
   const filePath = path.join(__dirname, 'public/uploads', fileId);
   console.log("came");

   if (fs.existsSync(filePath)) {
    
     fs.unlink(filePath, (err) => {
       if (err) {
         console.error('Error deleting file:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
       console.log("deleted");
       res.status(200).json({ message: 'File deleted successfully' });
     });
   } else {
     res.status(404).json({ error: 'File not found' });
   }
   
});



app.post('/teacher/upload', verifyToken, authorizeRole(['teacher']), upload.array('file'), (req, res) => {
  res.status(200).json({ message: 'Files uploaded successfully!' });
});



app.post('/teacher/upload/video', verifyToken, authorizeRole(['teacher']), upload.single('vedio'), (req, res) => {
  res.status(200).json({ message: 'Video uploaded successfully' });
});


app.use((err, req, res, next) => {
  console.error("Error caught in middleware:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get('/teacher/files', verifyToken, authorizeRole(['admin', 'teacher', 'student']), (req, res) => {
  const uploadsDir = path.join(__dirname, 'public/uploads');

  if (!fs.existsSync(uploadsDir)) {
    return res.status(404).json({ error: 'Uploads directory not found' });
  }

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return the list of files with their names
    res.status(200).json(
      files.map((file) => ({
        _id: file,
        filename: file,
      }))
    );
  });
});

app.post("/teacherdelete", verifyToken, authorizeRole(['admin', 'teacher']), async (req, res) => {
  const { teacherId } = req.body;

  try {
    const deletedteacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedteacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully', teacher: deletedteacher });
  } catch (err) {
    console.error('Error deleting teacher:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/stddelete", verifyToken, authorizeRole(['admin']), async (req, res) => {
  const { studentId } = req.body;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hi..</h1>');
});

app.post('/Adminlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: '1m' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/teachlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });

    if (teacher) {
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (isMatch) {
        const token = jwt.sign({ id: teacher._id, email: teacher.email, role: "teacher" }, JWT_SECRET, { expiresIn: '10m' });
        const teacherId=teacher._id
        res.json({ token, verified: 'True',teacherId });
      } else {
        res.status(401).json({ error: 'Invalid password', verified: 'False' });
      }
    } else {
      res.status(404).json({ error: 'Account not found', verified: 'False' });
    }
  } catch (error) {
    console.error('Error during Teacher login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/teachsignup', async (req, res) => {
  const { email, password, mobno, username } = req.body;
  try {
    const existingteacher = await Teacher.findOne({ email });
    if (existingteacher) {
      return res.status(201).json({ error: 'Email is already in use' });
    }
    const newTeacher = new Teacher({ email, password, name: username, mobileno: mobno });
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    console.error('Error during teacher signup:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/stdlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });

    if (student) {
      const isMatch = await bcrypt.compare(password, student.password);
      if (isMatch) {
        const token = jwt.sign({ id: student._id, email: student.email, role: "student" }, JWT_SECRET, { expiresIn: '1m' });
        const studentId=student._id
        res.json({ token, verified: 'True',studentId });
      } else {
        res.status(401).json({ error: 'Invalid password', verified: 'False' });
      }
    } else {
      res.status(404).json({ error: 'Account not found', verified: 'False' });
    }
  } catch (error) {
    console.error('Error during Student login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/stdsignup', async (req, res) => {
  const { email, password, rollno, username } = req.body;
  try {
    const existingstudent = await Student.findOne({ email });
    if (existingstudent) {
      return res.status(201).json({ error: 'Email is already in use' });
    }
    const newStudent = new Student({ email, password, name: username, Rollno: rollno });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error('Error during student signup:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Studentsdata', verifyToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error('Error retrieving students:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Teachersdata', verifyToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    console.error('Error retrieving students:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Teacherdata', verifyToken, authorizeRole(['admin','teacher']), async (req, res) => {
  try {
    const teacherId = req.query.teacherId || req.params.teacherId;
    console.log(teacherId);
    const teacher = await Teacher.findOne({ _id: teacherId });
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (err) {
    console.error('Error retrieving teacher:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Studentdata', verifyToken, authorizeRole(['admin','student']), async (req, res) => {
  try {
    const studentId = req.query.studentId || req.params.studentId;
    console.log(studentId);
    const student = await Student.findOne({ _id: studentId });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    console.error('Error retrieving teacher:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/contactdetails",async (req,res)=>{

const uname =req.body.name;
const uemail=req.body.email;
const matter = req.body.message;
try{
  const newcontact = contact({name:uname,email:uemail,message:matter});
  await newcontact.save() ;
  res.status(201).json({message:"successfully messaged"});
}catch(err){
console.log("error with save contacter details",err);
}
});


app.listen('3001', () => {
  console.log("server is running on port 3001");
});
