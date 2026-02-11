# HRMS Lite

Full-stack Human Resource Management System Lite application.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: None (Public API for "Lite" version)

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas URI

### Backend Setup
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start server: `npm run dev` (development) or `npm start` (production)

### Frontend Setup
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Create `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```
   (Or your deployed backend URL)
4. Start dev server: `npm run dev`

## Deployment

### Backend (Render)
1. Push code to GitHub.
2. Create new Web Service on Render.
3. Connect repository.
4. Set Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add Environment Variable `MONGO_URI`.

### Frontend (Vercel)
1. Push code to GitHub.
2. Import project in Vercel.
3. Set Root Directory to `frontend`.
4. Framework Preset: Vite.
5. Add Environment Variable `VITE_API_URL` (set to your Render Backend URL).

## Features
- **Dashboard**: View total employees and daily attendance stats.
- **Employees**: Add, list, and delete employees.
- **Attendance**: Mark daily attendance and view history.
