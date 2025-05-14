import { Song, SongArtist, SongIdentifier, SongImageUrl, SongName } from '../../domain';
import { SongRepositoryInterface } from '../../infrastructure';
import { NotFoundError } from '../error';

interface UpdateSongServiceInput {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
}

export class UpdateSongService {
    constructor(private readonly songRepository: SongRepositoryInterface) {}

    async execute({ id, name, artist, imageUrl }: UpdateSongServiceInput): Promise<Song> {
        const song = await this.songRepository.findById(SongIdentifier.create(id));

        if (!song) {
            throw new NotFoundError(`Song with id ${id} not found`);
        }

        const updatedSong = Song.create({
            id: SongIdentifier.create(id),
            name: SongName.create({ name }),
            artist: SongArtist.create({ name: artist }),
            imageUrl: SongImageUrl.create({ url: imageUrl }),
            status: 'active'
        });

        await this.songRepository.save(updatedSong);

        return updatedSong;
    }
}
