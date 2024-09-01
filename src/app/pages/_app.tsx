import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import HomeDashboard from '.';

function MyApp() {
    // Create a QueryClient instance
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider attribute="class">
            <QueryClientProvider client={queryClient}>
                <HomeDashboard />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default MyApp;
