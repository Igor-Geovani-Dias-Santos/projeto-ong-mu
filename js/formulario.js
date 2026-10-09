/* formulario.js - formulário de cadastro: aviso visual de erro/sucesso e envio.
   As regras vêm do validacao.js e o armazenamento do storage.js. */

import { validarCampo } from './validacao.js';
import { lerCadastros, salvarCadastro, limparCadastros } from './storage.js';
import { mostrarCadastros } from './templates.js';

// Tira as marcas de erro/sucesso e a mensagem do campo
function limparEstado(campo) {
  const mensagem = document.getElementById('erro-' + campo.id);
  if (mensagem) { mensagem.remove(); }
  campo.classList.remove('campo--erro', 'campo--ok');
  campo.removeAttribute('aria-invalid');
  campo.removeAttribute('aria-describedby');
}

// Marca o campo como errado (com mensagem) ou certo, mexendo no DOM
function marcarCampo(campo, mensagem) {
  limparEstado(campo);
  if (mensagem) {
    campo.classList.add('campo--erro');
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', 'erro-' + campo.id);

    const aviso = document.createElement('p');
    aviso.id = 'erro-' + campo.id;
    aviso.className = 'mensagem-erro';
    aviso.textContent = mensagem;
    campo.insertAdjacentElement('afterend', aviso);   // injeta logo abaixo do campo
  } else {
    campo.classList.add('campo--ok');
  }
}

// Valida e marca um campo. Devolve true se estiver certo
function checar(campo) {
  const mensagem = validarCampo(campo.id, campo.value);
  marcarCampo(campo, mensagem);
  return mensagem === '';
}

// Alerta no topo do formulário (sucesso ou erro)
function mostrarAlertaForm(form, tipo, texto) {
  const anterior = form.parentNode.querySelector('.alerta-form');
  if (anterior) { anterior.remove(); }

  const alerta = document.createElement('div');
  alerta.className = 'alerta alerta--' + tipo + ' alerta-form';
  alerta.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
  alerta.textContent = (tipo === 'erro' ? '\u2716 ' : '\u2714 ') + texto;
  form.parentNode.insertBefore(alerta, form);
}

export function iniciarFormulario(app) {
  // Em tempo real: valida quando a pessoa sai do campo (focusout)...
  app.addEventListener('focusout', function (evento) {
    if (evento.target.matches('form input')) { checar(evento.target); }
  });

  // ...e, depois da primeira checagem, a cada letra digitada (input)
  app.addEventListener('input', function (evento) {
    const campo = evento.target;
    if (campo.matches('form input') &&
        (campo.classList.contains('campo--erro') || campo.classList.contains('campo--ok'))) {
      checar(campo);
    }
  });

  // No envio: o preventDefault() impede o recarregamento e o código confere todos os campos
  app.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const form = evento.target;
    let primeiroErro = null;

    form.querySelectorAll('input').forEach(function (campo) {
      if (!checar(campo) && !primeiroErro) { primeiroErro = campo; }
    });

    if (primeiroErro) {
      mostrarAlertaForm(form, 'erro', 'Corrija os campos destacados e envie de novo.');
      primeiroErro.focus();
      return;
    }

    // Guarda só dados simples (nunca o CPF). Precisa vir antes do reset, que limpa os campos
    salvarCadastro({
      nome: form.elements.nome.value.trim(),
      cidade: form.elements.cidade.value.trim(),
      estado: form.elements.estado.value.trim().toUpperCase(),
      data: new Date().toISOString()
    });
    mostrarCadastros(lerCadastros());

    mostrarAlertaForm(form, 'sucesso', 'Cadastro enviado com sucesso!');
    form.reset();
    form.querySelectorAll('input').forEach(limparEstado);
  });

  // Botão "Limpar lista" dos cadastros salvos
  document.addEventListener('click', function (evento) {
    if (evento.target.closest('[data-limpar-cadastros]')) {
      limparCadastros();
      mostrarCadastros(lerCadastros());
    }
  });
}
