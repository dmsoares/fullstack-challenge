import { describe, it, expect, beforeEach } from 'vitest';
import { InMemorySongRepository } from './repository';
import { Song, SongIdentifier, SongName, SongArtist, SongImageUrl } from '../../../domain';
import { v4 as uuidv4 } from 'uuid';

describe('InMemorySongRepository', () => {
    let repository: InMemorySongRepository;
    let testSong: Song;

    const createTestSong = (
        id: string = uuidv4(),
        name: string = 'Test Song',
        artist: string = 'Test Artist',
        imageUrl: string = 'http://test-image.jpg'
    ): Song => {
        return Song.create({
            id: SongIdentifier.create(id),
            name: SongName.create({ name }),
            artist: SongArtist.create({ name: artist }),
            imageUrl: SongImageUrl.create({ url: imageUrl }),
            status: 'active'
        });
    };

    beforeEach(() => {
        repository = new InMemorySongRepository();
        testSong = createTestSong();
    });

    describe('save', () => {
        it('should save a song to the repository', async () => {
            await repository.save(testSong);

            const foundSong = await repository.findById(testSong.id);
            expect(foundSong).not.toBeNull();
            expect(foundSong?.id.value).toBe(testSong.id.value);
            expect(foundSong?.name.name).toBe(testSong.name.name);
            expect(foundSong?.artist.name).toBe(testSong.artist.name);
            expect(foundSong?.imageUrl.url).toBe(testSong.imageUrl.url);
            expect(foundSong?.status).toBe(testSong.status);
        });

        it('should update a song if it already exists', async () => {
            // First save
            await repository.save(testSong);

            // Create an updated version of the song
            const updatedSong = Song.create({
                id: testSong.id,
                name: SongName.create({ name: 'Updated Song Name' }),
                artist: testSong.artist,
                imageUrl: testSong.imageUrl,
                status: testSong.status
            });

            // Save the updated song
            await repository.save(updatedSong);

            // Verify the song was updated
            const foundSong = await repository.findById(testSong.id);
            expect(foundSong).not.toBeNull();
            expect(foundSong?.name.name).toBe('Updated Song Name');
        });
    });

    describe('findById', () => {
        it('should return null if song does not exist', async () => {
            const nonExistentId = SongIdentifier.create(uuidv4());
            const foundSong = await repository.findById(nonExistentId);
            expect(foundSong).toBeNull();
        });

        it('should return the song if it exists', async () => {
            // Save a song first
            await repository.save(testSong);

            // Find the song
            const foundSong = await repository.findById(testSong.id);
            expect(foundSong).not.toBeNull();
            expect(foundSong?.id.value).toBe(testSong.id.value);
        });
    });

    describe('delete', () => {
        it('should delete a song from the repository', async () => {
            // Save a song first
            await repository.save(testSong);

            // Verify it exists
            let foundSong = await repository.findById(testSong.id);
            expect(foundSong).not.toBeNull();

            // Delete the song
            await repository.delete(testSong.id);

            // Verify it no longer exists
            foundSong = await repository.findById(testSong.id);
            expect(foundSong).toBeNull();
        });
    });

    describe('findAll', () => {
        it('should return an empty array when no songs exist', async () => {
            const songs = await repository.findAll();
            expect(songs).toEqual([]);
        });

        it('should return all songs in the repository', async () => {
            // Create and save multiple songs
            const song1 = createTestSong(uuidv4(), 'Song 1', 'Artist 1');
            const song2 = createTestSong(uuidv4(), 'Song 2', 'Artist 2');
            const song3 = createTestSong(uuidv4(), 'Song 3', 'Artist 3');

            await repository.save(song1);
            await repository.save(song2);
            await repository.save(song3);

            // Get all songs
            const songs = await repository.findAll();

            // Verify we have the correct number of songs
            expect(songs).toHaveLength(3);

            // Verify each song exists in the result
            const songIds = songs.map(song => song.id.value);
            expect(songIds).toContain(song1.id.value);
            expect(songIds).toContain(song2.id.value);
            expect(songIds).toContain(song3.id.value);
        });
    });
});
