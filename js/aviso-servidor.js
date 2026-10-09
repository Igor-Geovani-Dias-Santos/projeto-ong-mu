/* aviso-servidor.js - script comum (não é módulo).
   Os módulos ES6 não carregam quando o arquivo é aberto com clique duplo (file://).
   Se isso acontecer, avisa em vez de deixar a página em branco. */

if (location.protocol === 'file:') {
  document.getElementById('app').textContent =
    'Para ver o site, abra com um servidor local, como a extensão Live Server do VS Code.';
}
