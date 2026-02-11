# HRMS Lite - Full Stack Implementation Requirements

## Objective
Build a production-ready HRMS Lite application with employee management and attendance tracking.

The application must include:
- RESTful backend
- MongoDB persistence
- Professional frontend UI
- Proper validation and error handling
- Deployment-ready configuration

--------------------------------------

## Tech Stack

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- cors

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router

Deployment:
- Backend → Render
- Frontend → Vercel

--------------------------------------

## Backend Requirements

### Folder Structure

backend/
  config/
  controllers/
  models/
  routes/
  middleware/
  server.js
  .env

--------------------------------------

## Database Models

### Employee Model

Fields:
- employeeId (String, required, unique)
- fullName (String, required)
- email (String, required, unique)
- department (String, required)
- createdAt (Date, default now)

Validate email format.

--------------------------------------

### Attendance Model

Fields:
- employee (ObjectId reference to Employee)
- date (Date, required)
- status (String enum: "Present", "Absent")

Prevent duplicate attendance for same employee on same date.

--------------------------------------

## API Endpoints

Base URL: /api

### Employee

POST /api/employees
- Create employee
- Validate required fields
- Validate email
- Prevent duplicates
- Return 201

GET /api/employees
- Return list

DELETE /api/employees/:id
- Delete employee
- Return 200
- Return 404 if not found

--------------------------------------

### Attendance

POST /api/attendance
- Body:
  employeeId
  date
  status
- Validate employee exists
- Prevent duplicate entry
- Return 201

GET /api/attendance/:employeeId
- Return all attendance for employee

--------------------------------------

## Error Handling

- Centralized error middleware
- Proper HTTP codes:
  400 - Bad Request
  404 - Not Found
  409 - Conflict
  500 - Server Error

Return consistent JSON:

{
  success: false,
  message: "Error message here"
}

--------------------------------------

## Frontend Requirements

### Pages

1. Dashboard
- Total employees
- Total present today
- Total absent today

2. Employees
- Add employee form
- Employee table
- Delete button
- Loading, Empty, Error states

3. Attendance
- Employee dropdown
- Date picker
- Status dropdown
- Attendance table

--------------------------------------

## UI Guidelines

- Clean and professional
- Max-width container
- Consistent spacing
- Reusable components
- Proper typography
- Clear button states
- Show loading state
- Show empty state
- Show error messages

--------------------------------------

## Validation Rules

- Required fields must be validated server-side
- Valid email format
- No duplicate employeeId
- No duplicate email
- No duplicate attendance entry for same employee and date

--------------------------------------

## Deployment Requirements

Backend:
- Must be deployed (Render)
- Must connect to MongoDB Atlas
- Must not crash

Frontend:
- Must be deployed (Vercel)
- Must connect to live backend

--------------------------------------

## Deliverables

1. Live Frontend URL
2. Hosted Backend API URL
3. GitHub Repository (frontend + backend)
4. README.md including:
   - Project overview
   - Tech stack
   - Setup steps
   - Assumptions

--------------------------------------

## Bonus (Optional)

- Filter attendance by date
- Total present days per employee
- Dashboard summary cards
- Confirmation modal before delete

--------------------------------------

Important:
Core functionality must work perfectly before implementing bonus features.
