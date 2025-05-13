import z from 'zod';

export const zUpdateSongSchema = z.object({
    name: z.string().min(2).max(100),
    artist: z.string().min(2).max(100)
});

export type UpdateSongType = z.infer<typeof zUpdateSongSchema>;
