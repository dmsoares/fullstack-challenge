import { SongIdentifier, Song } from '../../domain';
import { SongRepositoryInterface } from '../../infrastructure';
import { NotFoundError } from '../error';

interface InactivateSongServiceInput {
    id: string;
}

export class InactivateSongService {
    constructor(private readonly songRepository: SongRepositoryInterface) {}

    async execute({ id }: InactivateSongServiceInput): Promise<void> {
        const song = await this.songRepository.findById(SongIdentifier.create(id));

        if (!song) {
            throw new NotFoundError(`Song with id ${id} not found`);
        }

        const updatedSong = Song.create({
            id: song.id,
            name: song.name,
            artist: song.artist,
            imageUrl: song.imageUrl,
            status: 'inactive'
        });

        await this.songRepository.save(updatedSong);
    }
}
