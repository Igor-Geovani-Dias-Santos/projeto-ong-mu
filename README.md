# ONG Mãos Unidas

Site de uma ONG fictícia, feito como **Single Page Application (SPA)** com HTML, CSS e JavaScript puro. Apresenta a organização, as campanhas de doação, as formas de ser voluntário e um formulário de cadastro com validação.

Projeto da Experiência Prática de Desenvolvimento Front-end.

## Funcionalidades

- Navegação sem recarregar a página (rotas por hash, como `#/projetos`)
- Menu responsivo: hambúrguer no celular e submenu dropdown nas telas maiores
- Cartões e tabela de campanhas gerados por JavaScript a partir de uma lista de dados
- Gráfico de barras com a meta de cada campanha
- Formulário de cadastro com validação em tempo real e aviso de erro ou sucesso
- Lista de cadastros salvos no navegador (localStorage)
- Componentes de aviso: badges, alertas, toast e modal

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica (`header`, `nav`, `main`, `section`, `footer`) e `<template>` |
| CSS3 | Design System com variáveis, Grid de 12 colunas, Flexbox e 5 breakpoints |
| JavaScript (ES6) | Rotas, validação, formulário e interface, divididos em módulos |
| Chart.js 4.5.1 | Gráfico das metas (arquivo local em `js/chart.umd.js`) |
| Git e GitHub | Versionamento com GitFlow, issues, milestones e pull requests |

## Estrutura de pastas

```
projeto-ong-mu/
├── .gitignore
├── package.json         Scripts e dependência (Vite)
├── vite.config.js       Configuração do build
├── html/
│   └── index.html        Página única (a SPA)
├── css/
│   └── style.css         Estilos e Design System
├── imagens/              Imagens (JPG, WebP 400px e WebP 800px)
└── js/
    ├── main.js           Liga os módulos
    ├── rotas.js          Rotas e troca de páginas
    ├── ui.js             Toast e modal
    ├── formulario.js     Avisos de erro e envio do formulário
    ├── validacao.js      Regras de validação (RegEx, CPF, data)
    ├── storage.js        localStorage
    ├── templates.js      Gera elementos a partir dos templates
    ├── grafico.js        Gráfico com Chart.js
    ├── dados.js          Lista de campanhas
    ├── aviso-servidor.js Aviso para abrir com servidor local
    └── chart.umd.js      Biblioteca Chart.js
```

## Pré-requisitos

- Navegador atualizado (Chrome, Edge ou Firefox)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) com a extensão **Live Server**

## Instalação e execução local

1. Clone o repositório:

   ```bash
   git clone https://github.com/Igor-Geovani-Dias-Santos/projeto-ong-mu.git
   ```

2. Abra a pasta `projeto-ong-mu` no VS Code.
3. Instale a extensão **Live Server** (de Ritwick Dey).
4. Clique com o botão direito em `html/index.html` e escolha **Open with Live Server**.

O site abre em um endereço `localhost`. Não é preciso instalar dependências, porque o projeto não usa `npm`.

> Os módulos ES6 não funcionam abrindo o `index.html` com clique duplo (`file://`). Por isso é preciso um servidor local. Se você abrir direto, o site mostra um aviso explicando isso.

## Build e testes

O projeto usa o [Vite](https://vite.dev/) para gerar a versão de produção. Ele junta os módulos e minifica CSS, JS e HTML.

```bash
npm install       # instala o Vite (só na primeira vez)
npm run build     # gera a pasta dist/
npm run preview   # abre a versão de produção para testar
```

Em desenvolvimento, o Live Server continua funcionando sem build. A pasta `dist/` não vai para o Git.

Resultado da minificação (tamanho em bytes):

| Arquivo | Antes | Depois | Redução |
|---|---|---|---|
| CSS | 15.676 | 11.180 | 29% |
| HTML | 10.229 | 8.280 | 19% |
| JS (nossos 9 módulos) | 16.479 | 7.643 | 54% |

A biblioteca Chart.js (208 KB) já vem minificada, então quase não muda. Não há testes automatizados. A validação do HTML é feita manualmente no [W3C Validator](https://validator.w3.org/).

## Imagens otimizadas

- Cada imagem tem 3 arquivos: WebP de 400px, WebP de 800px e o JPG original como reserva.
- A tag `<picture>` com `srcset` e `sizes` deixa o navegador escolher o tamanho certo para a tela.
- As imagens das campanhas usam `loading="lazy"` e só carregam quando aparecem na tela.
- `width` e `height` evitam que a página "pule" enquanto a imagem carrega.
- Redução: de 137.160 bytes (4 JPGs) para 32.214 bytes (WebP 800px, -77%) ou 15.508 bytes (WebP 400px, -89%).

## Versionamento

- **Branches (GitFlow):**
  - `main`: só versões prontas
  - `develop`: trabalho em andamento
  - `feature/...`: uma branch para cada funcionalidade
  - `hotfix/...`: correções urgentes, criadas a partir da `main`
- **Commits:** seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/), como `feat:`, `fix:`, `docs:` e `chore:`.
- **Versões:** seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`), marcadas com tags:
  - `v1.0.0`: primeira versão estável
  - `v1.0.1`: correção (`meta description`)
- **Organização:** tarefas em *issues* agrupadas em *milestones*, e integração por *pull requests* para a `develop`.

## Acessibilidade

- Títulos em ordem e `alt` nas imagens
- `label` ligado a cada campo e mensagens de erro associadas com `aria-describedby`
- Contraste de cores conferido (texto acima de 4,5:1 e contornos acima de 3:1)
- Modo escuro automático (`prefers-color-scheme: dark`)
- Versão de alto contraste (`prefers-contrast: more`), clara e escura
- Contorno de foco visível na navegação por teclado, com cor que muda em cada modo
- Animações desligadas para quem prefere menos movimento (`prefers-reduced-motion`)
- Modal e toast fecham com a tecla Esc

## Segurança

- Textos são inseridos com `textContent`, nunca com `innerHTML`
- O CPF não é guardado no `localStorage`
- A validação do formulário roda só no navegador. Num site real, o servidor precisa repetir as conferências.

## Contato

- E-mail: contato@maosunidas.org
- Telefone: (11) 3003-1189
- Endereço: Av. Paulista, 1415 - Bela Vista, São Paulo - SP, 01311-925

## Autor

Igor Geovani Dias Santos
