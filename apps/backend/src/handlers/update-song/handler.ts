import { Handler } from 'express';
import multer from 'multer';
import * as E from 'fp-ts/Either';
import { UpdateSongType, zUpdateSongSchema } from './types';
import { MalformedRequestError, withErrorHandling } from '../../error';
import { UpdateSongService } from '@fullstack-challenge/core';

interface Dependencies {
    updateSongService: UpdateSongService;
}

export function updateSongHandler({ updateSongService }: Dependencies): Handler {
    return withErrorHandling(async (req, res) => {
        if (!req.file) throw new MalformedRequestError('Image is required');

        const parsedBody = parseBody(req.body);

        if (E.isLeft(parsedBody)) {
            throw parsedBody.left;
        }

        const { name, artist } = parsedBody.right;

        await updateSongService.execute({
            id: req.params.id || '',
            name,
            artist,
            imageUrl: req.file.filename
        });

        res.status(204).json();
    });
}

export const configDiskStorage = (destination: string) =>
    multer.diskStorage({
        destination,
        filename: function (req, file, cb) {
            const parsedBody = parseBody(req.body);

            if (E.isLeft(parsedBody)) {
                return cb(parsedBody.left, '');
            }

            if (!file.mimetype.startsWith('image/')) {
                return cb(new MalformedRequestError('Invalid image format'), '');
            }

            const { name, artist } = parsedBody.right;
            const filetype = file.mimetype.split('/')[1];

            const filename = `song-${name}-${artist}-${new Date().getTime()}.${filetype}`.replace(
                /\s+/g,
                '_'
            );

            cb(null, filename);
        }
    });

const parseBody = (body: unknown): E.Either<Error, UpdateSongType> => {
    const { data, success, error } = zUpdateSongSchema.safeParse(body);

    if (!success) {
        return E.left(new MalformedRequestError(error.message));
    }

    return E.right(data);
};
