import { Handler } from 'express';
import multer from 'multer';
import * as E from 'fp-ts/Either';
import { CreateSongType, zCreateSongSchema } from './types';
import { CreateSongService } from '@fullstack-challenge/core';
import { MalformedRequestError, withErrorHandling } from '../../error';

interface Dependencies {
    imagesDirectory: string;
    createSongService: CreateSongService;
}

export function createSongHandler({ imagesDirectory, createSongService }: Dependencies): Handler {
    return withErrorHandling(async (req, res) => {
        if (!req.file) throw new MalformedRequestError('Image is required');

        const parsedBody = parseBody(req.body);

        if (E.isLeft(parsedBody)) {
            throw parsedBody.left;
        }

        const { name, artist } = parsedBody.right;

        const newSong = await createSongService.execute({
            name,
            artist,
            imageUrl: req.file.filename
        });

        res.status(201).json({
            id: newSong.id.value,
            name: newSong.name.name,
            artist: newSong.artist.name,
            imageUrl: `${imagesDirectory}/${req.file.filename}`
        });
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

const parseBody = (body: unknown): E.Either<Error, CreateSongType> => {
    const { data, success, error } = zCreateSongSchema.safeParse(body);

    if (!success) {
        return E.left(new MalformedRequestError(error.message));
    }

    return E.right(data);
};
