/* storage.js - só o Web Storage (localStorage).
   Não mexe na tela: quem quiser mostrar os dados usa as funções daqui. */

const CHAVE = 'maosunidas:cadastros';

// Lê a lista salva. getItem devolve texto e o JSON.parse converte de volta em array
export function lerCadastros() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE));
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    return [];   // dado corrompido ou localStorage bloqueado: começa com lista vazia
  }
}

// Salva a lista. O localStorage só guarda texto, então o JSON.stringify converte o array em string
export function salvarCadastro(cadastro) {
  const lista = lerCadastros();
  lista.push(cadastro);
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch (erro) {
    // navegador bloqueou ou sem espaço: o site continua funcionando, só não guarda
  }
}

// Apaga todos os cadastros salvos
export function limparCadastros() {
  try {
    localStorage.removeItem(CHAVE);
  } catch (erro) {
    // sem acesso ao armazenamento
  }
}
