import express from 'express';
import Note from '../models/note.js';

const router = express.Router();

// Show all notes
router.get('/', async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.render('notes/index', { notes });
});

// Show form to create a new note
router.get('/new', (req, res) => {
    res.render('notes/new');
});

// Create a new note
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    // Check that title and content are not empty
    if (!title?.trim() || !content?.trim()) {
        return res.status(400).render('notes/new', {
            error: 'Title and content are required.',
            form: { title, content }
        });
    }

    await Note.create({
        title: title.trim(),
        content: content.trim()
    });

    res.redirect('/notes');
});

export default router;

