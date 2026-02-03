import { Container, Box } from '@mui/material';
import { PixForm } from './features/transferencias/components/PixForm';

function App() {
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <PixForm />
            </Box>
        </Container>
    );
}

export default App;