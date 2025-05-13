import { useRef, useState } from 'react';

export interface UploadData {
    name: string;
    artist: string;
    image: File | null;
}

interface Props {
    onSubmit: ({ name, artist, image }: UploadData, onSettled?: () => void) => void;
    buttonLabel: string;
}

export function useSongUploadModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    function SongUploadModal({ onSubmit, buttonLabel }: Props) {
        const modalWrapperRef = useRef(null);

        const [name, setName] = useState('');
        const [artist, setArtist] = useState('');
        const [image, setImage] = useState<File | null>(null);

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

            onSubmit({ name, artist, image }, closeModal);
        };

        return (
            isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-[#181825] bg-opacity-50"
                    ref={modalWrapperRef}
                    onClick={e => {
                        if (modalWrapperRef.current === e.target) {
                            closeModal();
                        }
                    }}
                >
                    <div className="bg-[#585b70] p-8 rounded-md shadow-md">
                        <h2 className="text-2xl text-[#cdd6f4] font-bold mb-4">Add Song</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <label htmlFor="name" className="text-[#a6adc8]">
                                Song Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Music For 18 Musicians"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="border-2 border-gray-400 rounded-md p-2 text-[#11111b] bg-[#6c7086]"
                            />
                            <label htmlFor="artist" className="text-[#a6adc8]">
                                Artist Name
                            </label>
                            <input
                                name="artist"
                                type="text"
                                placeholder="Steve Reich"
                                value={artist}
                                onChange={e => setArtist(e.target.value)}
                                className="border-2 border-gray-400 rounded-md p-2 text-[#11111b] bg-[#6c7086]"
                            />
                            <label htmlFor="files" className="text-[#a6adc8]">
                                Select Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="border-2 border-gray-400 rounded-md p-2 text-[#11111b] bg-[#6c7086]"
                                title="foo"
                                onChange={handleImageChange}
                            />
                            <button
                                type="submit"
                                className="cursor-pointer bg-[#89b4fa] text-white px-4 py-2 mt-8 rounded-md"
                            >
                                {buttonLabel}
                            </button>
                        </form>
                    </div>
                </div>
            )
        );
    }

    return { isOpen, openModal, closeModal, Modal: SongUploadModal };
}
