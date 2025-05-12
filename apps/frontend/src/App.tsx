import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import SongList from './components/SongList';
import { useSongUploadModal } from './components/SongUploadModal';

const queryClient = new QueryClient();

function App() {
    const { openModal, Modal: SongUploadModal } = useSongUploadModal();

    return (
        <QueryClientProvider client={queryClient}>
            <SongList />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={openModal}
            >
                Upload Song
            </button>
            <SongUploadModal />
        </QueryClientProvider>
    );
}

export default App;
