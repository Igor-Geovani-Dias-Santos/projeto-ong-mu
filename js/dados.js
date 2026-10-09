/* dados.js - só os dados do site (nenhum código que mexe na tela).
   Para adicionar uma campanha nova, basta incluir mais um objeto na lista. */

export const campanhas = [
  {
    titulo: 'Cesta Solidária',
    imagem: new URL('../imagens/cesta-solidaria.jpg', import.meta.url).href,
    alt: 'Voluntários montando cestas básicas em uma mesa',
    descricao: 'Arrecadação de alimentos não perecíveis para famílias em situação de vulnerabilidade.',
    status: 'Em andamento', tipo: 'sucesso',
    meta: '500 cestas', metaNumero: 500, periodo: 'Janeiro a junho'
  },
  {
    titulo: 'Volta às Aulas',
    imagem: new URL('../imagens/volta-as-aulas.jpg', import.meta.url).href,
    alt: 'Crianças recebendo mochilas e material escolar',
    descricao: 'Doação de mochilas e materiais escolares para crianças da comunidade.',
    status: 'Últimos dias', tipo: 'aviso',
    meta: '300 kits escolares', metaNumero: 300, periodo: 'Janeiro e fevereiro'
  },
  {
    titulo: 'Inverno Solidário',
    imagem: new URL('../imagens/inverno-solidario.jpg', import.meta.url).href,
    alt: 'Pilha de cobertores e agasalhos organizados em caixas',
    descricao: 'Coleta de cobertores e agasalhos para o período de frio.',
    status: 'Em breve', tipo: 'info',
    meta: '800 agasalhos', metaNumero: 800, periodo: 'Maio a agosto'
  }
];
