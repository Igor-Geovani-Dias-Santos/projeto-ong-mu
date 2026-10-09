/* ui.js - toast e modal: abrir e fechar (clique e tecla Esc).
   Não conhece rotas, formulário nem dados. */

let abertoPor = null;   // botão que abriu o componente, para devolver o foco ao fechar

function abrir(id, botao) {
  const caixa = document.getElementById(id);
  caixa.classList.add('aberto');
  abertoPor = botao;
  const primeiroBotao = caixa.querySelector('button');
  if (primeiroBotao) { primeiroBotao.focus(); }
  if (id === 'toast') {
    setTimeout(function () { caixa.classList.remove('aberto'); }, 5000);
  }
}

function fecharTudo() {
  document.querySelectorAll('.toast.aberto, .modal.aberto').forEach(function (caixa) {
    caixa.classList.remove('aberto');
  });
  if (abertoPor) {
    abertoPor.focus();
    abertoPor = null;
  }
}

export function iniciarUi() {
  // Um único ouvinte de clique para todos os botões de abrir e fechar
  document.addEventListener('click', function (evento) {
    const abrirBotao = evento.target.closest('[data-abrir]');
    if (abrirBotao) {
      abrir(abrirBotao.dataset.abrir, abrirBotao);
      return;
    }
    if (evento.target.closest('[data-fechar]') || evento.target.classList.contains('modal')) {
      fecharTudo();
    }
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') { fecharTudo(); }
  });
}
