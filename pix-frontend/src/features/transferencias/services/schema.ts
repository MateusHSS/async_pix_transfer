import { z } from 'zod';
import { validarConta } from '../../../lib/accountValidation';

// Define o formato do formulário
export const transferenciaSchema = z.object({
    clienteId: z.string().min(1, "O ID do cliente é obrigatório"),
    chaveDestino: z.string()
        .min(7, "Número de conta inválido")
        .refine(validarConta, {
            message: "Conta inválida (Dígito verificador incorreto)"
        }),
    valor: z.coerce.number().min(0.01, "O valor deve ser maior que zero"),
});

// Extrai o Tipo TypeScript a partir do Schema (Magia do Zod!)
export type TransferenciaForm = z.infer<typeof transferenciaSchema>;