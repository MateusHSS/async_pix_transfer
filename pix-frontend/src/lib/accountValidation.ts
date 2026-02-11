export function formatarConta(value: string) {
    return value
        .replace(/\D/g, '') // Remove letras
        .replace(/(\d)(\d{1})$/, '$1-$2'); // Coloca o traço antes do último número
}

export function validarConta(conta: string): boolean {
    // 1. Limpeza básica
    if (!conta || !conta.includes('-')) return false;

    const [base, digitoInformadoStr] = conta.split('-');

    // Se não tiver base ou dígito, ou se o dígito for maior que 1 char
    if (!base || !digitoInformadoStr || digitoInformadoStr.length !== 1) return false;

    const digitoInformado = parseInt(digitoInformadoStr);

    // 2. Cálculo do Módulo 11 (O mesmo do Java!)
    let soma = 0;
    let peso = 2;

    // Percorre de trás pra frente
    for (let i = base.length - 1; i >= 0; i--) {
        const numero = parseInt(base[i]);
        soma += numero * peso;
        peso++;
        if (peso > 9) peso = 2;
    }

    const resto = soma % 11;
    let digitoCalculado = 11 - resto;

    // Regra de exceção (10 ou 11 viram 0)
    if (digitoCalculado >= 10) {
        digitoCalculado = 0;
    }

    // 3. Comparação final
    return digitoCalculado === digitoInformado;
}