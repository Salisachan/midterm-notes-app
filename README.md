# Notes App (Midterm Project)

A full-stack **Note-Taking App** built for the **UBC Software Development Bootcamp midterm**.  
The app allows multiple users to securely register, log in, and manage their own notes with full CRUD functionality.

---

## Features

- User authentication (register, login, logout)
- Password hashing with bcrypt (salted)
- Session-based authentication
- Each user can only access their own notes
- Full CRUD for notes (create, read, update, delete)
- Server-side validation with clear error messages
- RESTful routing
- MongoDB + Mongoose database
- EJS templating with shared partials
- Bootstrap styling
- Centralized error handling (Express 5)

---

## Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- EJS
- Bootstrap 5
- bcrypt
- express-session
- method-override

---

## Project Structure

```
midterm/
├── index.js
├── models/
│   ├── note.js
│   └── user.js
├── routes/
│   ├── notes.js
│   └── auth.js
├── utils/
│   └── AppError.js
├── views/
│   ├── auth/
│   ├── notes/
│   ├── partials/
│   └── error.ejs
├── public/
│   └── css/
│       └── styles.css
├── package.json
└── README.md

```
---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start MongoDB

```bash
mongod
```

### 3. Run the application

```bash
npm run dev
```

Open your browser at:

```bash
http://localhost:3000
```
