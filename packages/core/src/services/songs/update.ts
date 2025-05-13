import { Song, SongArtist, SongIdentifier, SongImageUrl, SongName } from '../../domain';
import { SongRepositoryInterface } from '../../infrastructure';

interface UpdateSongServiceInput {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
}

export class UpdateSongService {
    constructor(private readonly songRepository: SongRepositoryInterface) {}

    async execute({ id, name, artist, imageUrl }: UpdateSongServiceInput): Promise<Song> {
        const song = Song.create({
            id: SongIdentifier.create(id),
            name: SongName.create({ name }),
            artist: SongArtist.create({ name: artist }),
            imageUrl: SongImageUrl.create({ url: imageUrl }),
            status: 'active'
        });

        await this.songRepository.save(song);

        return song;
    }
}
