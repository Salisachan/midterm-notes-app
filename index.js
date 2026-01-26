import express from 'express';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js';

const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // replaces body-parser

// Routes
app.use('/notes', notesRouter);

// DB connect
mongoose.connect('mongodb://localhost:27017/notesApp')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Start server
async function startServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
