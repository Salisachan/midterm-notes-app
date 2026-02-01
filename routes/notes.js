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
    res.render('notes/new', { form: { title: '', content: '' } });
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

// Show edit form
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) return res.status(404).send('Note not found');

    res.render('notes/edit', { note });
});

// Update note
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
        const note = await Note.findById(id);
        return res.status(400).render('notes/edit', {
            error: 'Title and content are required.',
            note: { ...note.toObject(), title, content }
        });
    }

    await Note.findByIdAndUpdate(
        id,
        { title: title.trim(), content: content.trim() },
        { runValidators: true }
    );

    res.redirect('/notes');
});

// Delete note
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.redirect('/notes');
});

// GET /notes/:id - show one note
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).render('notes/show', {
                note: null,
                error: 'Note not found.',
            });
        }

        res.render('notes/show', { note, error: null });
    } catch (err) {
        // Invalid ObjectId or DB error
        return res.status(400).render('notes/show', {
            note: null,
            error: 'Invalid note ID.',
        });
    }
});


export default router;

