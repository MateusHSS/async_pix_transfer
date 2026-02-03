import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
    Box, Button, TextField, Typography, Paper, Alert, CircularProgress
} from '@mui/material';
import { api } from '../../../lib/api';
import { transferenciaSchema, type TransferenciaForm } from '../services/schema';

export function PixForm() {
    // 1. Configuração do Formulário
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransferenciaForm>({
        resolver: zodResolver(transferenciaSchema),
    });

    // 2. Configuração do Envio (React Query Mutation)
    const mutation = useMutation({
        mutationFn: async (dados: TransferenciaForm) => {
            // Envia para o Java
            return await api.post('/transferencias', dados);
        },
        onSuccess: () => {
            alert('Transferência enviada com sucesso! 🚀');
            reset(); // Limpa o formulário
        },
        onError: (error) => {
            console.error(error);
            // Aqui trataremos o erro de CORS daqui a pouco
        }
    });

    // 3. Função de Submit
    const onSubmit = (data: TransferenciaForm) => {
        mutation.mutate(data);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                Nova Transferência Pix
            </Typography>

            {mutation.isError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Erro ao enviar. Verifique o console (Provável CORS).
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                {/* Campo Cliente ID */}
                <TextField label="Seu ID (Cliente)"
                    {...register('clienteId')}
                    error={!!errors.clienteId}
                    helperText={errors.clienteId?.message}
                    fullWidth
                />

                {/* Campo Chave Pix */}
                <TextField
                    label="Chave Pix Destino"
                    {...register('chaveDestino')}
                    error={!!errors.chaveDestino}
                    helperText={errors.chaveDestino?.message}
                    fullWidth
                />

                {/* Campo Valor */}
                <TextField
                    label="Valor (R$)"
                    type="number"
                    {...register('valor')}
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                    fullWidth
                />

                {/* Botão de Enviar */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? <CircularProgress size={24} /> : 'Transferir Agora'}
                </Button>
            </Box>
    </Paper>
);
}