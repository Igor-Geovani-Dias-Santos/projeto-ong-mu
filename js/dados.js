/* dados.js - só os dados do site (nenhum código que mexe na tela).
   Para adicionar uma campanha nova, basta incluir mais um objeto na lista. */

// Cada imagem tem 3 arquivos: WebP pequeno (400px), WebP grande (800px) e JPG de reserva.
// new URL(..., import.meta.url) faz o Vite copiar os arquivos para o build.
function imagem(nome) {
  return {
    jpg: new URL(`../imagens/${nome}.jpg`, import.meta.url).href,
    webp400: new URL(`../imagens/${nome}-400.webp`, import.meta.url).href,
    webp800: new URL(`../imagens/${nome}-800.webp`, import.meta.url).href
  };
}

export const campanhas = [
  {
    titulo: 'Cesta Solidária',
    imagem: imagem('cesta-solidaria'),
    alt: 'Voluntários montando cestas básicas em uma mesa',
    descricao: 'Arrecadação de alimentos não perecíveis para famílias em situação de vulnerabilidade.',
    status: 'Em andamento', tipo: 'sucesso',
    meta: '500 cestas', metaNumero: 500, periodo: 'Janeiro a junho'
  },
  {
    titulo: 'Volta às Aulas',
    imagem: imagem('volta-as-aulas'),
    alt: 'Crianças recebendo mochilas e material escolar',
    descricao: 'Doação de mochilas e materiais escolares para crianças da comunidade.',
    status: 'Últimos dias', tipo: 'aviso',
    meta: '300 kits escolares', metaNumero: 300, periodo: 'Janeiro e fevereiro'
  },
  {
    titulo: 'Inverno Solidário',
    imagem: imagem('inverno-solidario'),
    alt: 'Pilha de cobertores e agasalhos organizados em caixas',
    descricao: 'Coleta de cobertores e agasalhos para o período de frio.',
    status: 'Em breve', tipo: 'info',
    meta: '800 agasalhos', metaNumero: 800, periodo: 'Maio a agosto'
  }
];
