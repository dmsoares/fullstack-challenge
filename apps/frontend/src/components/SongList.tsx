import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import { deleteSong, getSongs } from '../services/songs';

interface Song {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
}

export default function SongList() {
    const { data } = useQuery({ queryKey: ['songs'], queryFn: getSongs });

    return data && data.length > 0 ? (
        <ul className="flex flex-col gap-2 w-full">
            {data.map((song, idx) => (
                <SongItem key={`song-${idx}`} song={song} />
            ))}
        </ul>
    ) : (
        <div>No songs</div>
    );
}

function SongItem({ song }: { song: Song }) {
    const queryClient = useQueryClient();

    const { mutate: handleDelete } = useMutation({
        mutationFn: deleteSong,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] });
        }
    });

    return (
        <li className="flex gap-4 justify-between items-center border-2 border-gray-400 rounded-md">
            <img className="w-20 h-20 rounded-l-sm" src={song.imageUrl} alt={song.name} />
            <div className="flex flex-col pr-4 w-full">
                <div className="text-xl">{song.name}</div>
                <div className="text-sm text-gray-400">{song.artist}</div>
            </div>
            <button onClick={() => handleDelete(song.id)} className="w-6 h-6">
                <FaTrash />
            </button>
        </li>
    );
}
