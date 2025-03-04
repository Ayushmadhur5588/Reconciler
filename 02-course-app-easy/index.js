const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let id = 1;

const authenticateAdmin = (req, res, next) => {
const {username, password} = req.headers;
const adminExist = ADMINS.find((a) => a.username === username && a.password ===  password);
if(adminExist){
  next();
}else{
  res.status(401).json({message : "Admin does Exists"});
}
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const {username, password} = req.headers;
  const existingAdmin = ADMINS.find((a) => a.username === username);
  if(existingAdmin){
    res.status(409).json({message : "Admin already exists"});
  }else{
    ADMINS.push({username, password});
    res.status(201).json({ message: 'Admin created successfully'});
  }
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
  const { title, desc, price, imagelink } = req.body;

  const course = {
    id: ++id, 
    title,
    desc,
    price,
    imagelink
  };

  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: id });
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
