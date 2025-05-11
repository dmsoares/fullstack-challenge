import { Handler } from 'express';
import { ListActiveSongsService } from '@fullstack-challenge/core';

export function listActiveSongsHandler(listActiveSongsService: ListActiveSongsService): Handler {
    return async (_req, res) => {
        const songs = await listActiveSongsService.execute();
        res.json(songs);
    };
}
