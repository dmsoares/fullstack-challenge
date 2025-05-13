import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import SongList from './components/SongList';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <main>
                <div className="flex flex-col items-center justify-center w-full px-20 py-10">
                    <SongList />
                </div>
            </main>
        </QueryClientProvider>
    );
}

export default App;
