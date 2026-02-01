import express from 'express';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');

// Static files (this is correct)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

// Start server (unchanged)
async function startServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();


