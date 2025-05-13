import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { deleteSong, getSongs, updateSong } from '../services/songs';
import { useSongUploadModal, type UploadData } from './SongUploadModal';

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
        <div className="flex flex-col gap-2 pt-20">
            <div className="text-2xl text-[#b4befe]">...</div>
            <div className="text-md text-[#94e2d5]">Start adding some music!</div>
        </div>
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

    const { mutate: handleUpdate } = useMutation({
        mutationFn: updateSong,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] });
        }
    });

    const onSubmit = ({ name, artist, image }: UploadData, next?: () => void) => {
        if (image) {
            handleUpdate({ id: song.id, name, artist, image }, { onSettled: next });
        }
    };

    const { openModal, Modal: SongUploadModal } = useSongUploadModal();

    return (
        <li className="flex gap-4 justify-between items-center border-2 border-[#6c7086] rounded-md pr-4 bg-[#313244]">
            <img className="w-20 h-20 rounded-l-sm" src={song.imageUrl} alt={song.name} />
            <div className="flex flex-col pr-4 w-full">
                <div className="text-2xl text-[#cdd6f4] text-left">{song.name}</div>
                <div className="text-sm text-[#a6adc8] text-left">{song.artist}</div>
            </div>
            <button onClick={openModal} className="w-10 h-10">
                <FaPencilAlt className="cursor-pointer text-[#94e2d5] hover:text-[#74c7ec] w-6 h-6" />
            </button>
            <button onClick={() => handleDelete(song.id)} className="w-10 h-10">
                <FaTrash className="cursor-pointer text-[#f38ba8] hover:text-[#eba0ac] w-6 h-6" />
            </button>
            <SongUploadModal onSubmit={onSubmit} buttonLabel="Update" />
        </li>
    );
}
