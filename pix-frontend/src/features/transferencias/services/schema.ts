import { z } from 'zod';

// Define o formato do formulário
export const transferenciaSchema = z.object({
    clienteId: z.string().min(1, "O ID do cliente é obrigatório"),
    chaveDestino: z.string().min(1, "A chave Pix é obrigatória"),
    valor: z.coerce.number().min(0.01, "O valor deve ser maior que zero"),
});

// Extrai o Tipo TypeScript a partir do Schema (Magia do Zod!)
export type TransferenciaForm = z.infer<typeof transferenciaSchema>;