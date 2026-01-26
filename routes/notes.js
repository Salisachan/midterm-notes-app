import express from 'express';
import Note from '../models/note.js';

const router = express.Router();

// TEST ROUTE
router.get('/', (req, res) => {
    res.send('Notes route is working');
});

export default router;
