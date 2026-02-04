import {Typography, TextField, Box, Button, Paper, Grid} from "@mui/material";
import {formatarCPF} from "../../../lib/cpfValidator.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {clienteSchema, type ClientForm} from "../services/schema.ts";
import {formatarTelefone} from "../../../lib/telefoneFormatter.ts";

export function CadastroClienteForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ClienteForm>({
        resolver: zodResolver(clienteSchema),
        mode: 'onBlur' // Valida quando o usuário sai do campo (melhor UX para CPF)
    });

    const onSubmit = (data: ClienteForm) => {
        // Aqui você vai chamar sua API depois
        console.log("Dados Validados:", data);
        // Remove pontuação antes de enviar pro Back (opcional, mas recomendado)
        const cpfLimpo = data.cpf.replace(/[^\d]+/g, '');
        console.log("CPF para enviar pro banco:", cpfLimpo);
        alert('Cliente cadastrado com sucesso! (Olhe o console)');
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
                Cadastro de Cliente
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            label="Nome Completo"
                            fullWidth
                            {...register('nomeCompleto')}
                            error={!!errors.nomeCompleto}
                            helperText={errors.nomeCompleto?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CPF"
                            fullWidth
                            {...register('cpf')}
                            onChange={(e) => {
                                // Aplica a máscara e atualiza o React Hook Form
                                const formatted = formatarCPF(e.target.value);
                                setValue('cpf', formatted);
                            }}
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                            inputProps={{ maxLength: 14 }} // 11 números + 3 símbolos
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Telefone"
                            fullWidth
                            placeholder="(00) 00000-0000"
                            {...register('telefone')}
                            onChange={(e) => {
                                const formatted = formatarTelefone(e.target.value);
                                setValue('telefone', formatted);
                            }}
                            error={!!errors.telefone}
                            helperText={errors.telefone?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="E-mail"
                            fullWidth
                            type="email"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                        >
                            Cadastrar Cliente
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </Paper>
    );
}