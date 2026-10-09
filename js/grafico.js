/* grafico.js - gráfico das metas com a biblioteca Chart.js (arquivo local js/chart.umd.js).
   O Chart.js é carregado no index.html e fica disponível como variável global "Chart". */

let grafico = null;   // guarda o gráfico atual para poder destruir antes de criar outro

// Pega uma cor do Design System (variável do CSS)
function corDoCss(nome) {
  return getComputedStyle(document.documentElement).getPropertyValue(nome).trim();
}

// Libera o gráfico da página anterior
export function destruirGrafico() {
  if (grafico) {
    grafico.destroy();
    grafico = null;
  }
}

export function criarGrafico(campanhas) {
  const canvas = document.getElementById('grafico-metas');
  if (!canvas || typeof Chart === 'undefined') { return; }   // sem canvas ou sem a biblioteca: a tabela continua aparecendo

  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  grafico = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: campanhas.map(function (c) { return c.titulo; }),      // nomes no eixo X
      datasets: [{
        label: 'Meta',
        data: campanhas.map(function (c) { return c.metaNumero; }),  // valores das barras
        backgroundColor: [corDoCss('--cor-secundaria'), corDoCss('--cor-destaque'), corDoCss('--cor-primaria')]
      }]
    },
    options: {
      responsive: true,
      animation: reduzirMovimento ? false : undefined,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Meta de cada campanha (quantidade de itens)' }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
}
