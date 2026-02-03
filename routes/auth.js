import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

// Register form
router.get('/register', (req, res) => {
    res.render('auth/register', { error: null, form: { username: '' } });
});

// Register
router.post('/register', async (req, res) => {
    try {
        const username = (req.body.username || '').trim();
        const password = (req.body.password || '').trim();

        if (!username || !password) {
            return res.status(400).render('auth/register', {
                error: 'Username and password are required.',
                form: { username }
            });
        }

        if (username.length < 5) {
            return res.status(400).render('auth/register', {
                error: 'Username must be at least 5 characters.',
                form: { username }
            });
        }

        if (password.length < 6) {
            return res.status(400).render('auth/register', {
                error: 'Password must be at least 6 characters.',
                form: { username }
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, passwordHash });

        req.session.userId = user._id;
        res.redirect('/notes');
    } catch (err) {
        if (err && err.code === 11000) {
            return res.status(400).render('auth/register', {
                error: 'Username already taken.',
                form: { username: (req.body.username || '').trim() }
            });
        }

        res.status(500).render('auth/register', {
            error: 'Failed to register.',
            form: { username: (req.body.username || '').trim() }
        });
    }
});

// Login form
router.get('/login', (req, res) => {
    res.render('auth/login', { error: null, form: { username: '' } });
});

// Login
router.post('/login', async (req, res) => {
    try {
        const username = (req.body.username || '').trim();
        const password = (req.body.password || '').trim();

        if (!username || !password) {
            return res.status(400).render('auth/login', {
                error: 'Username and password are required.',
                form: { username }
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).render('auth/login', {
                error: 'Invalid username or password.',
                form: { username }
            });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(400).render('auth/login', {
                error: 'Invalid username or password.',
                form: { username }
            });
        }

        req.session.userId = user._id;
        res.redirect('/notes');
    } catch (err) {
        res.status(500).render('auth/login', {
            error: 'Failed to login.',
            form: { username: (req.body.username || '').trim() }
        });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

export default router;
