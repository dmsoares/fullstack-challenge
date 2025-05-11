import { Entity } from '../entity';
import { SongArtist, SongIdentifier, SongName, SongImageUrl } from '../value-objects';

interface SongProps {
    id: SongIdentifier;
    name: SongName;
    artist: SongArtist;
    imageUrl: SongImageUrl;
    status: 'active' | 'inactive';
}

export class Song implements Entity<Song> {
    private constructor(
        readonly id: SongIdentifier,
        readonly name: SongName,
        readonly artist: SongArtist,
        readonly imageUrl: SongImageUrl,
        readonly status: 'active' | 'inactive'
    ) {}

    static create({ id, name, artist, imageUrl, status }: SongProps): Song {
        return new Song(id, name, artist, imageUrl, status);
    }
}
