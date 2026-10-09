/* rotas.js - SPA com roteamento por hash (#/rota).
   Ao mudar a rota, limpa o <main id="app"> e injeta o conteúdo do <template> correspondente. */

import { campanhas } from './dados.js';
import { lerCadastros } from './storage.js';
import { preencherCampanhas, mostrarCadastros } from './templates.js';
import { criarGrafico, destruirGrafico } from './grafico.js';

// Cada rota aponta para um <template> do index.html e tem um título
const rotas = {
  inicio:      { template: 'view-inicio',      titulo: 'Início' },
  projetos:    { template: 'view-projetos',    titulo: 'Projetos' },
  cadastro:    { template: 'view-cadastro',    titulo: 'Cadastro' },
  componentes: { template: 'view-componentes', titulo: 'Componentes' }
};

// Lê o hash da URL. Exemplo: "#/projetos/campanhas" -> rota "projetos", seção "campanhas"
function lerRota() {
  const partes = location.hash.replace(/^#\/?/, '').split('/');
  return { nome: partes[0] || 'inicio', secao: partes[1] || '' };
}

// Destaca no menu a página atual
function marcarMenu(nome) {
  document.querySelectorAll('nav a[data-rota]').forEach(function (link) {
    if (link.dataset.rota === nome) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Função principal: limpa o contêiner e injeta o conteúdo da rota atual
function renderizar(app, primeiraVez) {
  const rota = lerRota();
  const config = rotas[rota.nome];
  const template = document.getElementById(config ? config.template : 'view-404');

  destruirGrafico();                                        // libera o gráfico da página anterior
  app.replaceChildren(template.content.cloneNode(true));   // limpa e injeta
  preencherCampanhas(campanhas);       // gera os cartões e as linhas da tabela
  mostrarCadastros(lerCadastros());    // restaura os cadastros salvos
  criarGrafico(campanhas);             // desenha o gráfico das metas (se a página tiver)

  document.title = (config ? config.titulo : 'Página não encontrada') + ' | ONG Mãos Unidas';
  marcarMenu(rota.nome);
  document.getElementById('menu-toggle').checked = false;   // fecha o menu hambúrguer

  const secao = rota.secao && document.getElementById(rota.secao);
  if (secao) {
    secao.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
  if (!primeiraVez) {
    app.focus({ preventScroll: true });   // leitores de tela percebem a troca de conteúdo
  }
}

export function iniciarRotas(app) {
  window.addEventListener('hashchange', function () { renderizar(app, false); });

  if (!location.hash) { location.replace('#/inicio'); }
  renderizar(app, true);
}
