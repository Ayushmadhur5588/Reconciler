const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let id = 1;

const authenticateAdmin = (req, res, next) => {
  const { username, password } = req.headers;
  const adminExist = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (adminExist) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const authenticateUser = (req, res, next) => {
  const { username, password } = req.headers;
  const userExist = USERS.find(
    (a) => a.username === username && a.password === password
  );
  if (userExist) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Admin routes
app.post("/admin/signup", (req, res) => {
  const { username, password } = req.headers;
  const existingAdmin = ADMINS.find((a) => a.username === username);
  if (existingAdmin) {
    res.status(409).json({ message: "Admin already exists" });
  } else {
    ADMINS.push({ username, password });
    res.status(201).json({ message: "Admin created successfully" });
  }
});

app.post("/admin/login", authenticateAdmin, (req, res) => {
  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", authenticateAdmin, (req, res) => {
  const { title, description, price, imageLink } = req.body;

  const course = {
    id: ++id,
    title,
    description,
    price,
    imageLink,
    published: false,
  };

  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: id });
});

app.put("/admin/courses/:courseId", authenticateAdmin, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course doesn't exist" });
  }
});

app.get("/admin/courses", authenticateAdmin, (req, res) => {
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  const {username , password} = req.headers;
  const existingUser = USERS.find((u) => u.username === username);
  if(existingUser){
    res.status(409).json({message : "User already exists"});
  }else{
    USERS.push({username, password});
    res.json({ message: 'User created successfully' });
  }
});

app.post("/users/login", authenticateUser, (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.get("/users/courses", authenticateUser, (req, res) => {
  res.json({courses : COURSES});
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
