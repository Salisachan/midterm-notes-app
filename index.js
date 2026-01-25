import express from 'express';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js';

const app = express();

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/notes', notesRouter);

// Database + server
async function startServer() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/notesApp');
        console.log('Connected to MongoDB');

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

startServer();
