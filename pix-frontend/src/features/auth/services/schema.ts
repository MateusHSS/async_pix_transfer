import {z} from "zod";
import {validarCPF} from "../../../lib/cpfValidator.ts";

export const loginSchema = z.object({
    cpf: z.string().min(11, 'O CPF deve ter pelo menos 11 dígitos').refine((cpf) => validarCPF(cpf), {
        message: 'CPF inválido'
    }),
    senha: z.string()
})

export type LoginForm = z.infer<typeof loginSchema>;