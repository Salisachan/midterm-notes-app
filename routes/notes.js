import express from 'express';
import mongoose from 'mongoose';
import Note from '../models/note.js';
import AppError from '../utils/AppError.js';

const router = express.Router();

// Show all notes (only this user's notes)
router.get('/', async (req, res) => {
    const notes = await Note.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.render('notes/index', { notes });
});

// Show form to create a new note
router.get('/new', (req, res) => {
    res.render('notes/new', { form: { title: '', content: '' } });
});

// Create a new note (save userId)
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
        return res.status(400).render('notes/new', {
            error: 'Title and content are required.',
            form: { title, content }
        });
    }

    await Note.create({
        title: title.trim(),
        content: content.trim(),
        userId: req.session.userId
    });

    res.redirect('/notes');
});

// Show edit form (only if note belongs to user)
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid note ID.', 400);
    }

    const note = await Note.findOne({ _id: id, userId: req.session.userId });
    if (!note) {
        throw new AppError('Note not found.', 404);
    }

    res.render('notes/edit', { note });
});

// Update note (only if note belongs to user)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid note ID.', 400);
    }

    if (!title?.trim() || !content?.trim()) {
        const note = await Note.findOne({ _id: id, userId: req.session.userId });
        if (!note) {
            throw new AppError('Note not found.', 404);
        }

        return res.status(400).render('notes/edit', {
            error: 'Title and content are required.',
            note: { ...note.toObject(), title, content }
        });
    }

    const updated = await Note.findOneAndUpdate(
        { _id: id, userId: req.session.userId },
        { title: title.trim(), content: content.trim() },
        { runValidators: true, new: true }
    );

    if (!updated) {
        throw new AppError('Note not found.', 404);
    }

    res.redirect('/notes');
});

// Delete note (only if note belongs to user)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid note ID.', 400);
    }

    const deleted = await Note.findOneAndDelete({ _id: id, userId: req.session.userId });
    if (!deleted) {
        throw new AppError('Note not found.', 404);
    }

    res.redirect('/notes');
});

// Show one note (only if note belongs to user) - keep last
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid note ID.', 400);
    }

    const note = await Note.findOne({ _id: id, userId: req.session.userId });
    if (!note) {
        throw new AppError('Note not found.', 404);
    }

    res.render('notes/show', { note, error: null });
});

export default router;
