/* validacao.js - só as regras de validação (RegEx e conferências).
   Não mexe na tela: recebe o id e o valor do campo e devolve a mensagem de erro. */

// Regras com RegEx: [padrão, mensagem de erro]
const regras = {
  nome:     [/^\S+(\s+\S+)+$/, 'Digite nome e sobrenome.'],
  email:    [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Digite um e-mail válido, como nome@exemplo.com.'],
  telefone: [/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Use o formato (11) 99999-9999.'],
  cpf:      [/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Use o formato 000.000.000-00.'],
  cep:      [/^\d{5}-\d{3}$/, 'Use o formato 00000-000.'],
  estado:   [/^[A-Za-z]{2}$/, 'Digite a sigla do estado, como SP.'],
  endereco: [/^.{5,}$/, 'Digite a rua e o número.'],
  cidade:   [/^.{2,}$/, 'Digite o nome da cidade.']
};

// Confere os dígitos verificadores do CPF
function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, '');
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) { return false; }
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) { soma += Number(n[i]) * (t + 1 - i); }
    const digito = (soma * 10) % 11 % 10;
    if (digito !== Number(n[t])) { return false; }
  }
  return true;
}

// Devolve a mensagem de erro, ou '' se estiver tudo certo
export function validarCampo(id, valorDigitado) {
  const valor = valorDigitado.trim();

  if (valor === '') { return 'Preencha este campo.'; }

  if (regras[id] && !regras[id][0].test(valor)) {
    return regras[id][1];
  }
  if (id === 'cpf' && !cpfValido(valor)) {
    return 'Este CPF não é válido.';
  }
  if (id === 'nascimento') {
    const data = new Date(valor);
    if (isNaN(data) || data.getFullYear() < 1900) { return 'Digite uma data válida.'; }
    if (data > new Date()) { return 'A data não pode ser no futuro.'; }
  }
  return '';
}
