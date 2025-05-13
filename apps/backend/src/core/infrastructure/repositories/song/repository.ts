import { Song, SongIdentifier, SongName, SongArtist, SongImageUrl } from '../../../domain';
import { SongRepositoryInterface } from './repository-interface';

export interface SerializedSong {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
    status: Song['status'];
}

const serializeSong = (song: Song): SerializedSong => ({
    id: song.id.value,
    name: song.name.name,
    artist: song.artist.name,
    imageUrl: song.imageUrl.url,
    status: song.status
});

const deserializeSong = ({ id, name, artist, imageUrl, status }: SerializedSong): Song =>
    Song.create({
        id: SongIdentifier.create(id),
        name: SongName.create({ name }),
        artist: SongArtist.create({ name: artist }),
        imageUrl: SongImageUrl.create({ url: imageUrl }),
        status
    });

export class InMemorySongRepository implements SongRepositoryInterface {
    private songs: Map<string, SerializedSong> = new Map();

    async save(song: Song): Promise<void> {
        this.songs.set(song.id.value, serializeSong(song));
    }

    async delete(id: SongIdentifier): Promise<void> {
        this.songs.delete(id.value);
    }

    async findById(id: SongIdentifier): Promise<Song | null> {
        const serializedSong = this.songs.get(id.value);

        if (!serializedSong) return null;

        return deserializeSong(serializedSong);
    }

    async findAll(): Promise<Song[]> {
        return Array.from(this.songs.values()).map(deserializeSong);
    }
}
