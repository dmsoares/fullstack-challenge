import express from 'express';
import cors from 'cors';
import multer from 'multer';

import {
    CreateSongService,
    InactivateSongService,
    InMemorySongRepository,
    ListActiveSongsService,
    UpdateSongService
} from '@fullstack-challenge/core';

import { configDiskStorage, createSongHandler } from './handlers/create-song/handler';
import { listActiveSongsHandler } from './handlers/list-songs/handler';
import { deleteSongHandler } from './handlers/delete-song/handler';
import { updateSongHandler } from './handlers/update-song/handler';

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
const updateSongService = new UpdateSongService(songRepository);

const storage = configDiskStorage(`${staticDirectory}/${imagesDirectory}`);
const upload = multer({ storage: storage }).single('image');

// Routes
app.get('/songs', listActiveSongsHandler({ imagesDirectory, listActiveSongsService }));
app.post('/songs', upload, createSongHandler({ createSongService }));
app.put('/songs/:id', upload, updateSongHandler({ updateSongService }));
app.delete('/songs/:id', deleteSongHandler({ inactivateSongService }));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
