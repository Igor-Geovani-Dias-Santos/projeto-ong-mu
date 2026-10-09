/* main.js - ONG Mãos Unidas
   Arquivo principal: só liga os módulos. Cada módulo cuida de uma coisa:
   rotas.js (páginas), ui.js (toast e modal), formulario.js (cadastro),
   validacao.js (regras), storage.js (localStorage), templates.js (gera elementos),
   grafico.js (Chart.js) e dados.js (lista de campanhas). */

import { iniciarRotas } from './rotas.js';
import { iniciarUi } from './ui.js';
import { iniciarFormulario } from './formulario.js';

const app = document.getElementById('app');

iniciarUi();
iniciarFormulario(app);
iniciarRotas(app);
