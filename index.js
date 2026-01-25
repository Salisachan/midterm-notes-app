import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import notesRouter from './routes/notes.js';

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('./notes', notesRouter)

mongoose.connect('mongodb://localhost:27017/notesApp')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

async function startServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();