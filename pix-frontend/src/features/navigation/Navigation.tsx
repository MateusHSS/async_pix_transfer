import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';

type MenuOption = 'cadastro' | 'transferencia';

interface NavigationProps {
    onMenuSelect: (option: MenuOption) => void;
    activeMenu: MenuOption;
}

export function Navigation({ onMenuSelect, activeMenu }: NavigationProps) {
    return (
        <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ gap: 2 }}>
                    <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                        <Button
                            onClick={() => onMenuSelect('cadastro')}
                            sx={{
                                color: 'white',
                                fontWeight: activeMenu === 'cadastro' ? 'bold' : 'normal',
                                borderBottom: activeMenu === 'cadastro' ? '3px solid white' : 'none',
                                borderRadius: 0,
                                pb: 0.5
                            }}
                        >
                            Cadastro de Cliente
                        </Button>
                        <Button
                            onClick={() => onMenuSelect('transferencia')}
                            sx={{
                                color: 'white',
                                fontWeight: activeMenu === 'transferencia' ? 'bold' : 'normal',
                                borderBottom: activeMenu === 'transferencia' ? '3px solid white' : 'none',
                                borderRadius: 0,
                                pb: 0.5
                            }}
                        >
                            Transferência Pix
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}



