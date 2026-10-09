/* templates.js - gera elementos na tela a partir dos <template> do HTML e de listas de dados.
   Não busca dados sozinho: quem chama entrega a lista. */

// Cria UM cartão: copia o molde (template) e preenche com os dados da campanha
function criarCartao(campanha) {
  const cartao = document.getElementById('modelo-campanha').content.cloneNode(true);

  const badge = cartao.querySelector('.badge');
  badge.textContent = campanha.status;
  badge.classList.add('badge--' + campanha.tipo);

  cartao.querySelector('h3').textContent = campanha.titulo;
  cartao.querySelector('p').textContent = campanha.descricao;

  const imagem = cartao.querySelector('img');
  imagem.src = campanha.imagem;
  imagem.alt = campanha.alt;

  return cartao;
}

// Cria UMA linha da tabela com createElement
function criarLinha(campanha) {
  const linha = document.createElement('tr');
  [campanha.titulo, campanha.meta, campanha.periodo].forEach(function (texto) {
    const celula = document.createElement('td');
    celula.textContent = texto;
    linha.appendChild(celula);
  });
  return linha;
}

// Repete os moldes para cada campanha da lista e coloca na tela
export function preencherCampanhas(campanhas) {
  const area = document.getElementById('campanhas');
  if (area) {
    campanhas.forEach(function (campanha) {
      area.appendChild(criarCartao(campanha));
    });
  }

  const corpoTabela = document.getElementById('tabela-campanhas');
  if (corpoTabela) {
    campanhas.forEach(function (campanha) {
      corpoTabela.appendChild(criarLinha(campanha));
    });
  }
}

// Desenha a lista de cadastros salvos (roda toda vez que a página de cadastro abre)
export function mostrarCadastros(cadastros) {
  const lista = document.getElementById('lista-cadastros');
  if (!lista) { return; }

  lista.replaceChildren();

  cadastros.forEach(function (cadastro) {
    const item = document.createElement('li');
    const data = new Date(cadastro.data).toLocaleString('pt-BR');
    item.textContent = cadastro.nome + ' - ' + cadastro.cidade + '/' + cadastro.estado + ' (enviado em ' + data + ')';
    lista.appendChild(item);
  });

  document.getElementById('sem-cadastros').hidden = cadastros.length > 0;
  document.getElementById('limpar-cadastros').hidden = cadastros.length === 0;
}
