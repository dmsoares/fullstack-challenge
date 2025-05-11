import z from 'zod';

export const zDeleteSongSchema = z.object({
    id: z.string().uuid()
});
