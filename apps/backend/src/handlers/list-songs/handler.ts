import { Handler } from 'express';
import { ListActiveSongsService } from '@fullstack-challenge/core';
import { withErrorHandling } from '../../error';

interface Dependencies {
    imagesDirectory: string;
    listActiveSongsService: ListActiveSongsService;
}

export function listActiveSongsHandler({
    imagesDirectory,
    listActiveSongsService
}: Dependencies): Handler {
    return withErrorHandling(async (_req, res) => {
        const songs = await listActiveSongsService.execute();

        res.json(
            songs.map(song => ({
                id: song.id.value,
                name: song.name.name,
                artist: song.artist.name,
                imageUrl: `${imagesDirectory}/${song.imageUrl.url}`
            }))
        );

        res.json(songs);
    });
}
