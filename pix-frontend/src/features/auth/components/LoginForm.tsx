import {Box, Button, Grid, Paper, TextField, Typography, Link} from "@mui/material";
import {useForm} from "react-hook-form";
import {type LoginForm, loginSchema} from "../services/schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import { CPFInput } from '../../../lib/components/inputs/CPFInput';

interface LoginFormProps {
    onShowPrimeiroAcesso?: () => void;
    onShowCadastro?: () => void;
}

export function LoginForm({ onShowPrimeiroAcesso, onShowCadastro }: LoginFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur"
    });

    const onSubmit = (data: LoginForm) => {
        console.log("Logando", data);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
                Login
            </Typography>

            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CPFInput
                            name="cpf"
                            control={control}
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Senha"
                            fullWidth
                            type="password"
                            {...register('senha')}
                            error={!!errors.senha}
                            helperText={errors.senha?.message}
                        />
                    </Grid>

                    <Grid item container xs={6} sm={12} sx={{ justifyContent: "space-between" }}>
                        <Link href="#" underline="hover" variant="body2" onClick={(e) => { e.preventDefault(); onShowCadastro?.(); }}>
                            Cadastre-se
                        </Link>

                        <Link href="#" underline="hover" variant="body2" onClick={(e) => { e.preventDefault(); onShowPrimeiroAcesso?.(); }}>
                            Primeiro acesso
                        </Link>
                    </Grid>


                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{fontWeight: "bold"}}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}