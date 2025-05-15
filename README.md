# 🎓 Auditorium Reservation System

A full-stack web application that allows authenticated users to **reserve auditoriums**, and allows **admin users** to manage all reservations in a secure and organized way. Built using the **MERN stack** (MongoDB, Express, React, Node.js) with Redux Toolkit and JWT authentication.

---

## 🚀 Live Demo

- 🔗 **Frontend:** [https://auditorium-app.vercel.app](https://auditorium-app.vercel.app)  
- 🔗 **Backend API:** [https://auditorium-api.onrender.com](https://auditorium-api.onrender.com)

> Replace the above links with your actual deployment URLs if different.

---

## 📸 Screenshots

> *(Add screenshots of your login page, dashboard, reservation form, admin panel, etc. here)*  
> Example:
- Login Page  
- User Dashboard  
- Reservation History  
- Admin View of All Reservations

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Redux Toolkit
- Reactstrap
- React Hook Form
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Bcrypt (Password Hashing)
- Dotenv

---

## 📦 Features

| User Features                        | Admin Features                         |
|-------------------------------------|----------------------------------------|
| ✅ Register/Login                   | ✅ View all user reservations          |
| ✅ JWT-based secure auth            | ✅ View user name, email, purpose      |
| ✅ Reserve auditorium               |                                        |
| ✅ Edit/Delete own reservations     |                                        |
| ✅ View reservation history         |                                        |
| ✅ Location detection via IP        |                                        |

---

## 🧪 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Auditorium-Reservation-System.git
cd Auditorium-Reservation-System

2. Setup Backend
cd backend
npm install

Create a .env file:
PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/auditoriumDB
JWT_SECRET=your_jwt_secret

Then start the server:
node index.js

3. Setup Frontend
cd ../frontend
npm install
npm start

🌍 Deployment Guide
✅ MongoDB Atlas
Create a free cluster on MongoDB Atlas

Add a DB user, whitelist your IP (0.0.0.0/0)

Use your connection string in the backend .env file

✅ Deploy Backend (Render)
Go to Render, create a new Web Service

Connect your backend GitHub repo

Add Environment Variables: MONGO_URI, JWT_SECRET, PORT=3001

Set Build Command: npm install

Set Start Command: node index.js

✅ Deploy Frontend (Vercel)
Go to Vercel

Import your frontend GitHub repo

Build Command: npm run build

Output Directory: build

Make sure your API base URLs point to the Render backend

📂 Folder Structure

Auditorium-Reservation-System/
│
├── frontend/           # React App (Client)
│   ├── pages/
│   ├── redux/
│   └── App.js
│
├── backend/            # Node + Express Server
│   ├── routes/
│   ├── models/
│   └── index.js
│
├── .env                # Environment Variables (not committed)
└── README.md

📜 License
This project is licensed for educational use under the MIT License.


---

### ✅ To Finalize:

1. Open `README.md` in VS Code  
2. Replace everything with the above content  
3. Save the file  
4. Then run:
```bash
git add README.md
git commit -m "Added complete README with deployment and features"
git push
