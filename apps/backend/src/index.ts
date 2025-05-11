import express from 'express';
import cors from 'cors';

import {
    CreateSongService,
    InactivateSongService,
    InMemorySongRepository,
    ListActiveSongsService
} from '@fullstack-challenge/core';

import { createSongHandler } from './handlers/create-song/handler';
import { listActiveSongsHandler } from './handlers/list-songs/handler';
import { deleteSongHandler } from './handlers/delete-song/handler';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const songRepository = new InMemorySongRepository();
const listActiveSongsService = new ListActiveSongsService(songRepository);
const createSongService = new CreateSongService(songRepository);
const inactivateSongService = new InactivateSongService(songRepository);

// Routes
app.get('/api/songs', listActiveSongsHandler(listActiveSongsService));
app.post('/api/songs', createSongHandler(createSongService));
app.delete('/api/songs/:id', deleteSongHandler(inactivateSongService));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
