import { Handler } from 'express';
import { InactivateSongService } from '@fullstack-challenge/core';
import { zDeleteSongSchema } from './types';
import { MalformedRequestError, withErrorHandling } from '../../error';

interface Dependencies {
    inactivateSongService: InactivateSongService;
}

export function deleteSongHandler({ inactivateSongService }: Dependencies): Handler {
    return withErrorHandling(async (req, res) => {
        const { data, success, error } = zDeleteSongSchema.safeParse(req.params);

        if (!success) {
            throw new MalformedRequestError(error.message);
        }

        await inactivateSongService.execute({ id: data.id });

        res.status(204).send();
    });
}
