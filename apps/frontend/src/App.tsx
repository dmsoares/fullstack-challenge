import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import SongList from './components/SongList';
import { useSongUploadModal } from './components/SongUploadModal';

const queryClient = new QueryClient();

function App() {
    const { openModal, Modal: SongUploadModal } = useSongUploadModal();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex justify-between py-4 px-4 w-full">
                <div className="flex items-center">
                    <h1 className="text-[#74c7ec] text-2xl font-bold">Song Library</h1>
                </div>
                <button
                    className="max-w-52 bg-[#74c7ec] hover:bg-[#89dceb] text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={openModal}
                >
                    Upload Song
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full px-20 py-10">
                <SongList />
            </div>
            <SongUploadModal />
        </QueryClientProvider>
    );
}

export default App;
