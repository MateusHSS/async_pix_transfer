import { z } from 'zod';
import {validarCPF} from "../../../lib/cpfValidator.ts";

export const clienteSchema = z.object({
    nomeCompleto: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres').transform(name => {
        // Bônus: Capitaliza o nome (ex: joao silva -> Joao Silva)
        return name.trim().split(' ').map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ');
    }),
    cpf: z.string().min(11, 'O CPF deve ter pelo menos 11 dígitos').refine((cpf) => validarCPF(cpf), {
        message: 'CPF inválido'
    }),
    email: z.string().email('Email inválido'),
    telefone: z.string().min(10, 'O telefone deve ter pelo menos 10 dígitos').refine((telefone) => {
        // Verifica se tem apenas números, parênteses, espaço e hífen
        const telefoneLimpo = telefone.replace(/[\s()-]/g, '');
        return /^\d{10,11}$/.test(telefoneLimpo);
    }, {
        message: 'Telefone inválido'
    })
});

export type ClientForm = z.infer<typeof clienteSchema>;