const VITE_SONGS_API_URL = import.meta.env.VITE_SONGS_API_URL;

interface Song {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
}

export const getSongs = async (): Promise<Song[]> => {
    const response = await fetch(`${VITE_SONGS_API_URL}/songs`);

    const data = (await response.json()) as Song[];

    return data.map(({ id, name, artist, imageUrl }) => ({
        id,
        name,
        artist,
        imageUrl: `${VITE_SONGS_API_URL}/${imageUrl}`
    }));
};

interface CreateSongInput {
    name: string;
    artist: string;
    image: File;
}

interface CreateSongResponse {
    id: string;
}

export const addSong = async (song: CreateSongInput): Promise<CreateSongResponse> => {
    const formData = new FormData();
    formData.append('name', song.name);
    formData.append('artist', song.artist);
    formData.append('image', song.image);

    const response = await fetch(`${VITE_SONGS_API_URL}/songs`, {
        method: 'POST',
        body: formData
    });

    return response.json();
};

export const deleteSong = async (songId: string): Promise<void> => {
    const response = await fetch(`${VITE_SONGS_API_URL}/songs/${songId}`, {
        method: 'DELETE'
    });

    return response.json();
};
