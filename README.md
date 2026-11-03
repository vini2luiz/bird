# KINGFISHER — Cinematic Prompt Library

Landing page de uma biblioteca fictícia de prompts cinematográficos. O hero é um vídeo de um martim-pescador que entra voando e pousa num galho; a interface se revela ao redor do pássaro no instante em que ele pousa.

O runtime não usa framework: é HTML, CSS e JavaScript nativos (ES modules). O build é um script Node de ~50 linhas, sem bundler, que pré-renderiza o HTML e junta o CSS.

---

## Começando

Requer Node 20.10+.

```bash
npm install
```

```bash
npm run dev
```

Abra <http://localhost:5173>.

| Script            | O que faz                                                                  |
| ----------------- | -------------------------------------------------------------------------- |
| `npm run dev`     | Servidor estático com suporte a Range (para o vídeo), renderiza no cliente |
| `npm run build`   | Gera `dist/`: HTML pré-renderizado + um único `app.css`                    |
| `npm run preview` | Build + serve o `dist/`                                                    |
| `npm test`        | Testes com `node:test`                                                     |
| `npm run lint`    | ESLint                                                                     |
| `npm run format`  | Prettier                                                                   |
| `npm run check`   | Lint + checagem de formatação + testes (rode antes de commitar)            |

> ES modules não carregam via `file://`; use sempre um servidor.

### Desenvolvimento × produção

- **Dev** (`index.html` na raiz): o `main.js` importa o `App` dinamicamente e renderiza no navegador. O CSS chega via `@import`.
- **Produção** (`dist/`): `scripts/build.mjs` roda o mesmo `App()` no Node e grava o HTML dentro de `#app` com `data-prerendered`. O `main.js` detecta isso e só liga os controllers. Componentes e textos nem são baixados.

O resultado são HTML real para SEO e primeira pintura, nenhuma cascata de `@import` e o mesmo código nos dois modos.

---

## Estrutura

```
.
├── index.html                    # Shell: <head>, fontes, #app e o entry point
├── assets/media/hero.mp4         # Filmagem do hero, hospedada no projeto
├── scripts/
│   ├── serve.mjs                 # Servidor estático sem dependências (com Range)
│   ├── build.mjs                 # Pré-render + bundle de CSS → dist/
│   └── lib/bundle-css.mjs        # Resolve @import recursivamente
├── test/                         # node:test — lib, App e bundler
└── src/
    ├── main.js                   # Entry point: (renderiza) + inicializa controllers
    ├── App.js                    # Composição da página
    ├── config.js                 # REVEAL_AT, vídeo, timeouts, silhueta
    ├── data/content.js           # Todo o texto, separado do markup
    ├── components/               # Nome.js + Nome.css por pasta
    │   ├── Section/              # Cabeçalho padrão das seções (kicker, título, intro)
    │   ├── Hero/  Nav/  HeroCopy/  TrustRow/  PromptCard/  SpeciesStrip/  MediaToggle/
    │   ├── FieldNotes/  NoteCard/  DiveArc/  Swatches/  Eyelid/  EyeTarget/  StatsBand/
    │   ├── Templates/            # Abas + visualizador de prompt com botão Copiar
    │   ├── Studios/  Pricing/  Faq/  Closing/  Footer/
    │   ├── BuildModal/           # "Watch a build" em <dialog>
    │   └── Button/  BirdMark/
    ├── controllers/              # Comportamento (DOM, eventos, observers)
    │   ├── heroChoreography.js   # Play, cor, reveal, fallbacks, replay
    │   ├── ghostWordMask.js      # Recorta a silhueta do pássaro da palavra
    │   ├── mediaToggle.js        # Pause / Play / Replay
    │   ├── scrollReveal.js       # IntersectionObserver abaixo da dobra
    │   ├── tabs.js               # Abas WAI-ARIA (setas, Home, End)
    │   ├── copyButtons.js        # Copiar com fallback e aviso em aria-live
    │   └── dialogs.js            # <dialog> modal
    ├── lib/                      # Funções puras e testáveis
    │   ├── dom.js                # html``, cx(), escapeHtml()
    │   ├── geometry.js           # Matemática do object-fit: cover
    │   ├── silhouette.js         # Máscara alfa + dilatação
    │   ├── backdrop.js           # Leitura de pixel, cor fantasma
    │   ├── thumbnails.js         # Recortes do frame
    │   ├── video.js  motion.js
    └── styles/                   # tokens, base, animations, main (entry)
```

### Camadas e responsabilidades

| Camada         | Faz                                                        | Não faz                     |
| -------------- | ---------------------------------------------------------- | --------------------------- |
| `data/`        | Guarda o conteúdo                                          | Markup ou lógica            |
| `components/`  | Funções puras `props → HTML` + o CSS do próprio componente | Tocar no DOM, ouvir eventos |
| `controllers/` | Comportamento: eventos, timers, observers                  | Gerar markup                |
| `lib/`         | Utilitários puros, cobertos por testes                     | Conhecer componentes        |
| `config.js`    | Valores ajustáveis                                         | —                           |

- **Ganchos de JS:** os controllers acham os elementos por `data-*`, nunca por classes de estilo.
- **CSS:** segue BEM, e cada componente estiliza só as próprias classes. Quem posiciona é o pai, via uma classe de _slot_ passada em `className`.
- **Texto:** `html` não escapa valores; campos `…Html` do conteúdo podem ter `<em>`. Qualquer outro texto que possa conter `<` ou `&` (como os prompts) passa por `escapeHtml`.

---

## Como o efeito funciona

**A palavra atrás do pássaro.** "Kingfisher" fica _acima_ do vídeo, com `mix-blend-mode: darken` e uma cor um tom mais escura que o fundo. Em cada pixel o navegador mantém o mais escuro dos dois, canal por canal. O pássaro é mais escuro que a palavra em quase todo lugar, então parece voar na frente dela.

**A exceção, e a correção.** A bochecha branca do pássaro é _mais clara_ que a palavra, então ali a palavra aparecia por cima dele. Depois do pouso, `ghostWordMask.js`:

1. lê o frame em 320 px de largura;
2. marca como "pássaro" todo pixel distante da cor do fundo (`SILHOUETTE_THRESHOLD`);
3. dilata a máscara (`SILHOUETTE_DILATE`) e suaviza 1 px;
4. aplica o resultado como segunda camada de `mask-image` da palavra (`mask-composite: intersect`), alinhada ao vídeo com a matemática do `object-fit: cover`.

A máscara é atualizada a cada `timeupdate` (~4 Hz) até o fim do clipe, acompanhando o leve ajuste de cabeça após o pouso. Durante o voo, só o blend trabalha. Se a leitura de pixels for bloqueada, o blend continua sozinho.

**Cor da página = cor da filmagem.** 1 px do canto superior direito do vídeo vira `--bg`; `--ghost` é essa cor × 0.955.

**Thumbnails.** São recortes do próprio frame (`<canvas data-crop="x,y,size">`):

- `x, y`: centro do recorte, em frações do frame;
- `size`: lado do quadrado, em fração da largura.

**O hero nunca fica em branco.** A UI também aparece nos eventos `ended` e `error`, se `play()` falhar, e após 9 s. Pausar o vídeo também revela a UI.

---

## Acessibilidade

- **Pausar o vídeo:** o botão Pause / Play / Replay é visível desde o primeiro frame, fora da coreografia de reveal (WCAG 2.2.2).
- **Movimento reduzido:** com `prefers-reduced-motion`, o vídeo pula para o último frame e transições, animações e smooth scroll são desligados. "Replay" ainda toca o filme, porque é uma ação do usuário.
- **Contraste:** `--ink-3` é `#3E4C47`, com 4.9:1 sobre o fundo (AA). Os rótulos em painéis escuros passam de 5.5:1.
- **Componentes:** abas WAI-ARIA com teclado, FAQ em `<details>` nativo, modal em `<dialog>` com foco gerenciado pelo navegador, e confirmação de cópia anunciada em `aria-live`.

---

## Ajustes comuns

### `REVEAL_AT`

Em [`src/config.js`](src/config.js). O valor `4.3` foi medido nesta filmagem. Para outro clipe, pause no pouso e rode no console:

```js
document.querySelector('[data-hero-video]').currentTime
```

### Trocar o vídeo

1. Substitua `assets/media/hero.mp4` ou altere `VIDEO_SRC`.
2. Ajuste `REVEAL_AT`.
3. Ajuste `BACKDROP_SAMPLE` se o canto superior direito não for fundo liso.
4. Ajuste os `crop` dos cards em `src/data/content.js`.
5. Se a silhueta pegar fundo demais, ou de menos, ajuste `SILHOUETTE_THRESHOLD`.

Se o vídeo vier de outro domínio, ele precisa enviar CORS. Sem CORS, a página funciona, mas sem casar a cor e sem a correção da silhueta.

### Adicionar um componente

1. Crie `src/components/Nome/Nome.js` (função `props → string`, com a tag `html`) e `Nome.css`.
2. Adicione o `@import` em `src/styles/main.css`.
3. Se tiver comportamento, crie o controller e inicialize-o em `main.js`.
4. Rode `npm run check`.

---

## Pendências conhecidas

- **Formatos de vídeo mais leves (WebM / AV1):** exigem ffmpeg para transcodificar. Quando houver, gere os arquivos em `assets/media/` e troque o `src` do vídeo por elementos `<source>`. Atenção: com `<source>`, o evento `error` dispara no `<source>`, não no `<video>`, então ajuste o `onError` da coreografia.
- **Poster:** não incluído de propósito. O primeiro frame é só o fundo liso, que o `background: var(--bg)` do vídeo já reproduz.
- **Conteúdo:** estúdios, depoimentos e preços são placeholders de um produto fictício.
