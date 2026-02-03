import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
    Box, Button, TextField, Typography, Paper, Alert, CircularProgress, Step, Stepper, StepLabel
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { api } from '../../../lib/api';
import { transferenciaSchema, type TransferenciaForm } from '../services/schema';
import { useStatusTransferencia } from '../hooks/useStatusTransferencia';

export function PixForm() {
    // Estado para guardar o ID da transação criada
    const [idTransacao, setIdTransacao] = useState<string | null>(null);

    // Hook do Polling (Fica observando esse ID)
    const { data: statusAtual } = useStatusTransferencia(idTransacao);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransferenciaForm>({
        resolver: zodResolver(transferenciaSchema),
    });

    const mutation = useMutation({
        mutationFn: async (dados: TransferenciaForm) => {
            const response = await api.post('/transferencias', dados);
            return response.data;
        },
        onSuccess: (data) => {
            setIdTransacao(data.idTransacao); // SALVA O ID E INICIA O POLLING
            reset();
        },
        onError: (error) => {
            console.error(error);
            alert('Erro ao enviar. Verifique o console.');
        }
    });

    const onSubmit = (data: TransferenciaForm) => {
        mutation.mutate(data);
    };

    // --- RENDERIZAÇÃO DO STATUS (RESULTADO) ---
    if (idTransacao && statusAtual) {
        return (
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Status da Transação</Typography>

                {statusAtual.status === 'EM_ANALISE' && (
                    <Box sx={{ my: 4 }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }}>Processando no Banco Central...</Typography>
                    </Box>
                )}

                {statusAtual.status === 'APROVADO' && (
                    <Box sx={{ my: 4, color: 'green' }}>
                        <CheckCircleIcon sx={{ fontSize: 60 }} />
                        <Typography variant="h5" fontWeight="bold">Pix Realizado!</Typography>
                    </Box>
                )}

                {statusAtual.status === 'REPROVADO' && (
                    <Box sx={{ my: 4, color: 'red' }}>
                        <ErrorIcon sx={{ fontSize: 60 }} />
                        <Typography variant="h5" fontWeight="bold">Falha na Transação</Typography>
                    </Box>
                )}

                <Button variant="outlined" onClick={() => setIdTransacao(null)}>
                    Nova Transferência
                </Button>
            </Paper>
        );
    }

    // --- RENDERIZAÇÃO DO FORMULÁRIO ---
    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                Nova Transferência Pix
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Seu ID (Cliente)"
                    {...register('clienteId')}
                    error={!!errors.clienteId}
                    helperText={errors.clienteId?.message}
                    fullWidth
                />
                <TextField
                    label="Chave Pix Destino"
                    {...register('chaveDestino')}
                    error={!!errors.chaveDestino}
                    helperText={errors.chaveDestino?.message}
                    fullWidth
                />
                <TextField
                    label="Valor (R$)"
                    type="number"
                    {...register('valor')}
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Transferir Agora'}
                </Button>
            </Box>
        </Paper>
    );
}