# ✅ Task Management System 

A Backend task management application built using **MongoDB, Express, React, and Node.js (MERN)**.  
It includes:

-  User Authentication (Register + Login + JWT)
-  CRUD Operations for Tasks
-  Pending & 🟢 Completed Tasks
-  Fully Connected Frontend UI (React + Vite)
-  API Documentation (Swagger/Postman)
-  Backend Hosted on GitHub

---run Command-
    backend - npm run dev/npm start
    backend - npm run dev

--.env file
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret


## Features
**Authentication**
- Register user
- Login user
- JWT-Based Authentication Middleware

 **Task CRUD**
- Create Task
- Update Task
- Delete Task
- Get All Pending Tasks
- Get Completed Tasks
- Mark Task Completed

 **Frontend**
- React UI
- Context API for Auth & Task management
- Axios communication with backend
- UI for Add Task / Update / Delete / Complete
 **API Documentation**
- Postman collection included

---

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/user/register | Register user |
| POST   | /api/v1/user/login    | Login user    |

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| POST   | /api/v1/task/             | Create task           |
| GET    | /api/v1/task/             | Get all pending tasks |
| GET    | /api/v1/task/completed    | Get completed tasks   |
| PUT    | /api/v1/task/:id          | Update task           |
| DELETE | /api/v1/task/:id          | Delete task           |
| PUT    | /api/v1/task/complete/:id | Mark task complete    |


