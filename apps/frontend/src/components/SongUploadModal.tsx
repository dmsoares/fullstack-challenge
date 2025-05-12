import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { addSong } from '../services/songs';

export function useSongUploadModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    function SongUploadModal() {
        const modalWrapperRef = useRef(null);

        const [name, setName] = useState('');
        const [artist, setArtist] = useState('');
        const [image, setImage] = useState<File | null>(null);

        const queryClient = useQueryClient();

        const mutation = useMutation({
            mutationFn: addSong,
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['songs'] });
                closeModal();
            }
        });

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                setImage(e.target.files[0]);
            }
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!name || !artist || !image) {
                return alert('Please fill in all fields');
            }

            mutation.mutate({ name, artist, image });
        };

        return (
            isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    ref={modalWrapperRef}
                    onClick={e => {
                        if (modalWrapperRef.current === e.target) {
                            closeModal();
                        }
                    }}
                >
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Upload Song</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="border-2 border-gray-400 rounded-md p-2"
                            />
                            <input
                                type="text"
                                value={artist}
                                onChange={e => setArtist(e.target.value)}
                                className="border-2 border-gray-400 rounded-md p-2"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="border-2 border-gray-400 rounded-md p-2"
                                onChange={handleImageChange}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            )
        );
    }

    return { isOpen, openModal, closeModal, Modal: SongUploadModal };
}
