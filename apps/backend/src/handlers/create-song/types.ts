import z from 'zod';

export const zCreateSongSchema = z.object({
    name: z.string().min(2).max(100),
    artist: z.string().min(2).max(100)
});

export type CreateSongType = z.infer<typeof zCreateSongSchema>;
