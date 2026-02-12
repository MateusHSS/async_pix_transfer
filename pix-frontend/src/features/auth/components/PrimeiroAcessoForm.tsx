import { useState } from 'react';
import { Typography, Box, Paper, Grid, Button, TextField, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CPFInput } from '../../../lib/components/inputs/CPFInput';
import { api } from '../../../lib/api';
import { validarCPF } from '../../../lib/cpfValidator';

// Esquema para buscar CPF
const buscarCpfSchema = z.object({
    cpf: z.string().min(11, 'O CPF deve ter pelo menos 11 dígitos').refine((cpf) => validarCPF(cpf), {
        message: 'CPF inválido'
    })
});

// Esquema para definir senha
const definirSenhaSchema = z.object({
    senha: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
    confirmarSenha: z.string().min(6)
}).refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha']
});

type BuscarCpfForm = z.infer<typeof buscarCpfSchema>;
type DefinirSenhaForm = z.infer<typeof definirSenhaSchema>;

interface PrimeiroAcessoFormProps {
    onSuccess?: () => void;
}

export function PrimeiroAcessoForm({ onSuccess }: PrimeiroAcessoFormProps) {
    const [loading, setLoading] = useState(false);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null); // apenas para sucessos/infos positivas

    const { control, handleSubmit: handleBuscar, formState: { errors: errosBuscar } , register, setError, clearErrors } = useForm<BuscarCpfForm>({
        resolver: zodResolver(buscarCpfSchema),
        mode: 'onBlur'
    });

    const { register: registerSenha, handleSubmit: handleDefinirSenha, formState: { errors: errosSenha }, reset: resetSenha, setError: setErrorSenha, clearErrors: clearErrorsSenha } = useForm<DefinirSenhaForm>({
        resolver: zodResolver(definirSenhaSchema),
        mode: 'onBlur'
    });

    const onBuscar = async (data: BuscarCpfForm) => {
        // limpar erros anteriores do CPF
        clearErrors('cpf');
        setClienteId(null);
        setLoading(true);
        try {
            const cpfLimpo = data.cpf.replace(/\D+/g, '');
            const { data: cliente } = await api.get(`/auth/status/${cpfLimpo}`);

            // Esperamos que a API retorne um objeto com campos como: id, cpf, ativo, senhaDefinida
            if (cliente.senhaDefinida || cliente.ativo) {
                // mostrar erro inline no campo CPF
                setError('cpf', { type: 'manual', message: 'Cadastro já possui senha. Faça login normalmente.' });
                setClienteId(null);
            } else {
                setClienteId(cliente.cliente_id);
                // garantir que não haja erro no cpf
                clearErrors('cpf');
            }
        } catch (error: any) {
            if (error?.response?.status === 404) {
                setError('cpf', { type: 'manual', message: 'CPF não encontrado. Verifique ou realize o cadastro.' });
            } else {
                console.error(error);
                setError('cpf', { type: 'manual', message: 'Erro ao consultar CPF. Tente novamente mais tarde.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const onDefinirSenha = async (data: DefinirSenhaForm) => {
        // limpar erros anteriores de senha
        clearErrorsSenha(['senha', 'confirmarSenha']);
        if (!clienteId) return;
        setLoading(true);
        setMensagem(null);
        try {
            await api.post(`/auth/definir-senha`, { clienteId, senha: data.senha });
            setMensagem('Senha definida com sucesso! Você já pode fazer login.');
            setClienteId(null);
            resetSenha();
            onSuccess?.();
        } catch (error: any) {
            console.error(error);
            // mostrar erro inline no campo de senha
            setErrorSenha('senha', { type: 'manual', message: 'Erro ao definir senha. Tente novamente.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
                Primeiro Acesso
            </Typography>

            <Box component="form" onSubmit={handleBuscar(onBuscar)} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CPFInput
                            name="cpf"
                            control={control}
                            error={!!errosBuscar.cpf}
                            helperText={errosBuscar.cpf?.message}
                        />
                    </Grid>

                    {/* Exibe o botão de verificar CPF apenas se o clienteId ainda não foi definido (ou seja, antes de buscar) */}
                    {!clienteId && (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" disabled={loading}>
                                {loading ? <CircularProgress size={20} color="inherit" /> : 'Verificar CPF'}
                            </Button>
                        </Grid>
                    )}

                    {/* Se o cliente foi encontrado e pode definir senha, mostra os campos de senha */}
                    {clienteId && (
                        <Grid item xs={12}>
                            <Box sx={{ mt: 1 }}>
                                 <Grid container spacing={2}>
                                     <Grid item xs={12}>
                                         <TextField
                                             label="Senha"
                                             type="password"
                                             fullWidth
                                             {...registerSenha('senha')}
                                             error={!!errosSenha.senha}
                                             helperText={errosSenha.senha?.message}
                                         />
                                     </Grid>

                                     <Grid item xs={12}>
                                         <TextField
                                             label="Confirmar Senha"
                                             type="password"
                                             fullWidth
                                             {...registerSenha('confirmarSenha')}
                                             error={!!errosSenha.confirmarSenha}
                                             helperText={errosSenha.confirmarSenha?.message}
                                         />
                                     </Grid>

                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="button" variant="contained" color="primary" onClick={handleDefinirSenha(onDefinirSenha)} disabled={loading}>
                                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Definir Senha'}
                                        </Button>
                                    </Grid>
                                 </Grid>
                            </Box>
                         </Grid>
                     )}
                </Grid>
            </Box>
        </Paper>
    );
}