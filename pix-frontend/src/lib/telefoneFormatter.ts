export function formatarTelefone(value: string) {
    return value
        .replace(/\D/g, '') // Remove letras
        .replace(/(\d{2})(\d)/, '($1) $2') // Coloca o DDD entre parênteses
        .replace(/(\d{4,5})(\d)/, '$1-$2') // Coloca o hífen
        .replace(/(-\d{4})\d+?$/, '$1'); // Impede digitar mais que o necessário
}