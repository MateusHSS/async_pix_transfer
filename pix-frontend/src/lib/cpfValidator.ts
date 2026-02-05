export function validarCPF(cpf: string): boolean {
    // 1. Remove tudo que não é número (pontos e traços)
    cpf = cpf.replace(/[^\d]+/g, '');

    // 2. Verifica tamanho e se todos os dígitos são iguais (ex: 111.111.111-11)
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    // 3. Validação do 1º Dígito Verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = (resto === 10 || resto === 11) ? 0 : resto;
    if (digito1 !== parseInt(cpf.charAt(9))) return false;

    // 4. Validação do 2º Dígito Verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = (resto === 10 || resto === 11) ? 0 : resto;

    return digito2 === parseInt(cpf.charAt(10));
}

// Bônus: Função para formatar enquanto digita (Máscara simples)
export function formatarCPF(value: string) {
    return value
        .replace(/\D/g, '') // Remove letras
        .replace(/(\d{3})(\d)/, '$1.$2') // Põe o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2') // Põe o segundo ponto
        .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Põe o traço
        .replace(/(-\d{2})\d+?$/, '$1'); // Impede digitar mais que o necessário
}