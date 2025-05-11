import { Handler } from 'express';
import multer from 'multer';
import * as E from 'fp-ts/Either';
import { CreateSongType, zCreateSongSchema } from './types';
import { CreateSongService } from '@fullstack-challenge/core';

const storage = multer.diskStorage({
    destination: 'uploads/images/',
    filename: function (req, file, cb) {
        const parsedBody = parseBody(req.body);

        if (E.isLeft(parsedBody)) {
            return cb(new Error(parsedBody.left.message), '');
        }

        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Invalid image format'), '');
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

const upload = multer({ storage: storage }).single('image');

export function createSongHandler(createSongService: CreateSongService): Handler {
    return async (req, res) => {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                res.status(500).json({ error: err.message });
                return;
            } else if (err) {
                res.status(400).json({ error: err.message });
                return;
            }

            if (!req.file) {
                res.status(400).json({ error: 'Image is required' });
                return;
            }

            const parsedBody = parseBody(req.body);

            if (E.isLeft(parsedBody)) {
                res.status(400).json({ error: parsedBody.left.message });
                return;
            }

            const { name, artist } = parsedBody.right;

            const newSong = await createSongService.execute({
                name,
                artist,
                imageUrl: req.file.filename
            });

            res.json({
                id: newSong.id.value,
                name: newSong.name.name,
                artist: newSong.artist.name,
                imageUrl: req.file.path
            });
        });
    };
}

const parseBody = (body: unknown): E.Either<Error, CreateSongType> => {
    const { data, success, error } = zCreateSongSchema.safeParse(body);

    if (!success) {
        return E.left(new Error(error.message));
    }

    return E.right(data);
};
