import { Container, Box } from '@mui/material';
import { useState } from 'react';
import { Navigation } from './features/navigation/Navigation.tsx';
import { PixForm } from './features/transferencias/components/PixForm.tsx';
import { CadastroClienteForm } from "./features/cliente/components/CadastroClienteForm.tsx";

type MenuOption = 'cadastro' | 'transferencia';

function App() {
    const [activeMenu, setActiveMenu] = useState<MenuOption>('cadastro');

    return (
        <>
            <Navigation onMenuSelect={setActiveMenu} activeMenu={activeMenu} />
            <Container maxWidth="md">
                <Box sx={{ py: 4 }}>
                    {activeMenu === 'cadastro' && <CadastroClienteForm />}
                    {activeMenu === 'transferencia' && <PixForm />}
                </Box>
            </Container>
        </>
    );
}

export default App;