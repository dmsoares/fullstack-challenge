import { Song, SongIdentifier } from "../../../domain";

export interface SongRepositoryInterface {
    save(song: Song): Promise<void>;
    delete(id: SongIdentifier): Promise<void>;
    findById(id: SongIdentifier): Promise<Song | null>;
    findAll(): Promise<Song[]>;
}
