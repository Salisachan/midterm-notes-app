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

## Authentication Flow

- Users can register and log in using a username and password
- Passwords are securely hashed using bcrypt with salt
- A session stores the logged-in user’s ID
- Unauthenticated users are redirected to the login page
- Each user can only view, create, edit, and delete their own notes
- Logging out destroys the session and returns the user to the login page

---

## Notes Routes (RESTful)

| Method | Route | Description |
|------|------|------------|
| GET | /notes | View all notes for the logged-in user |
| GET | /notes/new | Display the form to create a new note |
| POST | /notes | Create a new note |
| GET | /notes/:id | View a single note |
| GET | /notes/:id/edit | Display the edit note form |
| PUT | /notes/:id | Update an existing note |
| DELETE | /notes/:id | Delete a note |

---

## Error Handling

- Server-side validation errors are displayed clearly on the page
- Invalid note IDs and missing resources show appropriate error messages
- Unknown routes return a 404 error page
- Application errors are handled using centralized error handling in Express

---

## What I Learned

- How to implement session-based authentication in Express
- How to securely hash and salt passwords using bcrypt
- How to structure an Express application using routers and middleware
- How to work with MongoDB and Mongoose models
- How to enforce per-user access to data
- How to handle errors cleanly in Express 5
- How to build a full CRUD application using EJS templates

---

## Future Improvements

- Search notes by title or content
- Show notes in smaller groups instead of loading all notes at once
- OAuth authentication (Google login)
- Password reset functionality
- Additional UI/UX enhancements

---
## Reflection

The most challenging part of this project was implementing authentication and ensuring each user could only access their own notes. I learned how session-based authentication works and how to securely store passwords using bcrypt.

Another challenge was error handling and validation. I learned that small issues like invalid IDs, missing form data, or route order can easily break an app if not handled carefully. Adding consistent validation and centralized error handling made the app more reliable and easier to debug.

Through this project, I gained confidence building a complete full-stack app using Express, MongoDB/Mongoose, and EJS. If I had more time, I would improve the user experience further and add features like searching notes and displaying notes in smaller groups when the list becomes long.

---
## Author

Salisa Chanchokpong  
UBC Software Development Bootcamp


