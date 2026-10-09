import { defineConfig } from 'vite';
import { minify } from 'html-minifier-terser';

// O aviso do servidor local só serve para file://. No site publicado ele não é preciso.
const removeAvisoServidor = {
  name: 'remove-aviso-servidor',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace(/\s*<script src="\.\.\/js\/aviso-servidor\.js" defer><\/script>/, '');
  },
};

// Minifica o HTML: tira comentários e espaços em branco extras.
const minificaHtml = {
  name: 'minifica-html',
  apply: 'build',
  enforce: 'post',
  async transformIndexHtml(html) {
    return minify(html, { collapseWhitespace: true, removeComments: true });
  },
};

export default defineConfig({
  root: 'html',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    assetsInlineLimit: 0, // não embute imagens pequenas dentro do JS
  },
  plugins: [removeAvisoServidor, minificaHtml],
});
