import { InMemorySongRepository, SongRepositoryInterface } from '../../infrastructure';

export class ListActiveSongsService {
    constructor(private readonly songRepository: SongRepositoryInterface) {}

    static build() {
        return new ListActiveSongsService(new InMemorySongRepository());
    }

    async execute() {
        const songs = await this.songRepository.findAll();
        return songs.filter(song => song.status === 'active');
    }
}
