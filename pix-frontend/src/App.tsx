import { Container } from '@mui/material';
import { useState } from 'react';
import { Navigation } from './features/navigation/Navigation.tsx';
import { PixForm } from './features/transferencias/components/PixForm.tsx';
import { CadastroClienteForm } from "./features/cliente/components/CadastroClienteForm.tsx";
import { LoginForm } from "./features/auth/components/LoginForm.tsx";
import { PrimeiroAcessoForm } from "./features/auth/components/PrimeiroAcessoForm.tsx";

type AppView = 'cadastro' | 'transferencia' | 'login' | 'primeiroAcesso';

function App() {
    const [activeView, setActiveView] = useState<AppView>('login');

    return (
        <>
            <Navigation onMenuSelect={(opt) => {
                // manter compatibilidade com Navigation que só tem cadastro/transferencia
                setActiveView(opt === 'cadastro' ? 'cadastro' : 'transferencia');
            }} activeMenu={activeView === 'cadastro' ? 'cadastro' : 'transferencia'} />

            <Container maxWidth="md">
                {activeView === 'cadastro' && <CadastroClienteForm />}
                {activeView === 'transferencia' && <PixForm />}

                {activeView === 'login' && (
                    <LoginForm
                        onShowPrimeiroAcesso={() => setActiveView('primeiroAcesso')}
                        onShowCadastro={() => setActiveView('cadastro')}
                    />
                )}

                {activeView === 'primeiroAcesso' && (
                    <PrimeiroAcessoForm onSuccess={() => setActiveView('login')} />
                )}
            </Container>
        </>
    );
}

export default App;