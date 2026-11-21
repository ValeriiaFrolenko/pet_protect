import { createRoot } from 'react-dom/client'
import './styles/index.scss';
import App from './App.tsx'
import {queryClient} from "./lib/queryClient.ts";
import {QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./features/auth/AuthProvider";

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
)