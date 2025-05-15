# Auditorium-Reservation-System

🔧 Technologies Used
Frontend: React, React Router, Redux Toolkit, Reactstrap, React Hook Form

Backend: Node.js, Express.js, MongoDB

Database: MongoDB Atlas (cloud)

Deployment Platforms:

Frontend: Vercel or Netlify

Backend: Render or Railway

Database: MongoDB Atlas

🌐 1. Setup MongoDB Atlas (Cloud DB)
Go to MongoDB Atlas and create a free cluster.

Create a database named auditoriumDB and add a user with password.

Whitelist your IP (0.0.0.0/0 for public access) under Network Access.

Copy the connection string. Example:
mongodb+srv://<username>:<password>@cluster0.mongodb.net/auditoriumDB?retryWrites=true&w=majority


2. Prepare Backend (Node.js + Express)
✅ a. Update .env File
In your backend root folder, create .env:
PORT=3001
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/auditoriumDB
JWT_SECRET=your_jwt_secret

✅ b. Install dependencies (if not done)
npm install express mongoose cors dotenv jsonwebtoken bcryptjs

✅ c. Test Locally
node index.js
# Or if using nodemon
npx nodemon index.js

☁️ 3. Deploy Backend on Render (Free Tier)
✅ a. Go to https://render.com and log in.
✅ b. Click "New Web Service" → Connect GitHub repo
✅ c. Set:
Build Command: npm install

Start Command: node index.js or npx nodemon index.js

Environment Variables: Add MONGO_URI, JWT_SECRET, and PORT=3001

Render will provide a live backend URL, e.g.:
https://auditorium-api.onrender.com

🌐 4. Prepare Frontend (React + Redux)
✅ a. Update API URLs in your frontend code
Example: In axios.post(...) and axios.get(...):
axios.get("https://auditorium-api.onrender.com/api/reservations")

✅ b. Build the project
npm run build

🚀 5. Deploy Frontend on Vercel or Netlify
✅ Vercel (Recommended)
Go to https://vercel.com

Import your GitHub repo

Set build command as: npm run build

Set output directory as: build

You’ll get a live frontend URL like:
https://auditorium-app.vercel.app

🧪 6. Final Testing
Go to the frontend link.

Register a new user, login, and try to book an auditorium.

Admin users should test the admin dashboard.

Ensure all requests are being sent to your deployed backend.
