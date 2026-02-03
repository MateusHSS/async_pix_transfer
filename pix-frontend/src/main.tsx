import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Configuração do Cliente de Query (Cache e Estado Assíncrono)
const queryClient = new QueryClient()

// 2. Tema Básico (Pode personalizar cores aqui)
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FF7F00', // Laranja estilo Inter/Banco
        },
        background: {
            default: '#f5f5f5',
        }
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)