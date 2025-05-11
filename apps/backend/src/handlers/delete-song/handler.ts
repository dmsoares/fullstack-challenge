import { Handler } from 'express';
import { InactivateSongService } from '@fullstack-challenge/core';
import { zDeleteSongSchema } from './types';

export function deleteSongHandler(inactivateSongService: InactivateSongService): Handler {
    return async (req, res) => {
        const { data, success, error } = zDeleteSongSchema.safeParse(req.params);

        if (!success) {
            res.status(400).json({ error });
            return;
        }

        await inactivateSongService.execute({ id: data.id });

        res.status(204).send();
    };
}
