import express from 'express';
import cors from 'cors';
import multer from 'multer';

import {
    CreateSongService,
    InactivateSongService,
    InMemorySongRepository,
    ListActiveSongsService
} from '@fullstack-challenge/core';

import { configDiskStorage, createSongHandler } from './handlers/create-song/handler';
import { listActiveSongsHandler } from './handlers/list-songs/handler';
import { deleteSongHandler } from './handlers/delete-song/handler';

const app = express();
const PORT = process.env.PORT || 5000;

const staticDirectory = 'uploads';
const imagesDirectory = 'images';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(staticDirectory));

const songRepository = new InMemorySongRepository();
const listActiveSongsService = new ListActiveSongsService(songRepository);
const createSongService = new CreateSongService(songRepository);
const inactivateSongService = new InactivateSongService(songRepository);

const storage = configDiskStorage(`${staticDirectory}/${imagesDirectory}`);
const upload = multer({ storage: storage }).single('image');

// Routes
app.get('/api/songs', listActiveSongsHandler({ imagesDirectory, listActiveSongsService }));
app.post('/api/songs', upload, createSongHandler({ imagesDirectory, createSongService }));
app.delete('/api/songs/:id', deleteSongHandler(inactivateSongService));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
