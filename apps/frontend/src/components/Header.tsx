import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSongUploadModal, type UploadData } from './SongUploadModal';
import { addSong } from '../services/songs';

export default function Header() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addSong,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] });
        }
    });

    const onSubmit = ({ name, artist, image }: UploadData, next?: () => void) => {
        if (image) {
            mutate({ name, artist, image }, { onSuccess: next });
        }
    };

    const { openModal, Modal: SongUploadModal } = useSongUploadModal();

    return (
        <header>
            <div className="flex justify-between py-4 px-4 w-full">
                <div className="flex items-center">
                    <h1 className="text-[#74c7ec] text-2xl font-bold">Song Library</h1>
                </div>
                <button
                    className="max-w-52 bg-[#74c7ec] hover:bg-[#89dceb] text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={openModal}
                >
                    Add Song
                </button>
            </div>
            <SongUploadModal onSubmit={onSubmit} buttonLabel="Create" />
        </header>
    );
}
