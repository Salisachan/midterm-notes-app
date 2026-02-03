import express from 'express';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import authRouter from './routes/auth.js';
import AppError from './utils/AppError.js';

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

app.use(session({
    secret: 'change-this-to-a-long-random-string',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.currentUserId = req.session.userId;
    next();
});

app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/notes');
    }
    res.redirect('/login');
});

// Routes
app.use('/', authRouter);

function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

app.use('/notes', requireLogin, notesRouter);


// 404 handler for unknown routes 
app.use((req, res, next) => {
    next(new AppError('Page not found.', 404));
});

// Centralized error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong.';
    res.status(statusCode).render('error', { message });
});

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


