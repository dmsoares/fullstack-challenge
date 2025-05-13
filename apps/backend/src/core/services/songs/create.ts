import { Song, SongIdentifier, SongName, SongArtist, SongImageUrl } from '../../domain';
import { SongRepositoryInterface } from '../../infrastructure';

interface CreateSongServiceInput {
    name: string;
    artist: string;
    imageUrl: string;
}

export class CreateSongService {
    constructor(private readonly songRepository: SongRepositoryInterface) {}

    async execute({ name, artist, imageUrl }: CreateSongServiceInput): Promise<Song> {
        const id = SongIdentifier.generate();

        const song = Song.create({
            id,
            name: SongName.create({ name }),
            artist: SongArtist.create({ name: artist }),
            imageUrl: SongImageUrl.create({ url: imageUrl }),
            status: 'active'
        });

        await this.songRepository.save(song);

        return song;
    }
}
