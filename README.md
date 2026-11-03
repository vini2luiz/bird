# KINGFISHER — Cinematic Prompt Library

Landing page de uma biblioteca fictícia de prompts cinematográficos. O hero é um vídeo de um martim-pescador que entra voando e pousa num galho; a interface se revela ao redor do pássaro no instante em que ele pousa.

Sem framework, sem build step, sem dependências: HTML, CSS e JavaScript nativos (ES modules).

---

## Como rodar

ES modules não carregam via `file://`, então sirva a pasta com qualquer servidor estático:

```bash
python -m http.server 8765
```

ou

```bash
npx serve .
```

Depois abra <http://localhost:8765>.

> Servir por HTTP também habilita a leitura de pixels do vídeo (o servidor do vídeo envia `Access-Control-Allow-Origin: *`), que é o que permite casar a cor da página com o fundo da filmagem.

---

## Estrutura

```
.
├── index.html                  # Shell: <head>, fontes, #app e o entry point
├── README.md
└── src/
    ├── main.js                 # Entry point: renderiza o App e inicializa os controllers
    ├── App.js                  # Composição da página (conteúdo → markup)
    ├── config.js               # REVEAL_AT, URL do vídeo, timeouts, ponto de amostragem
    │
    ├── data/
    │   └── content.js          # Todo o texto da página, separado do markup
    │
    ├── components/             # Componentes de apresentação: cada pasta = Nome.js + Nome.css
    │   ├── Hero/               # Vídeo, palavra fantasma, véu e os "slots" do layout
    │   ├── Nav/
    │   ├── BirdMark/           # Logo SVG de dois tons
    │   ├── Button/             # CtaButton, PillButton, UnderlineLink
    │   ├── HeroCopy/           # Eyebrow, h1, lede e CTAs
    │   ├── TrustRow/           # Avatares sobrepostos
    │   ├── PromptCard/         # Cards escuros com thumbnail recortada do vídeo
    │   ├── SpeciesStrip/       # Faixa inferior com o botão de replay
    │   ├── FieldNotes/         # Seção "Why a Kingfisher"
    │   ├── NoteCard/           # Notas do bento (variantes dark / light / wide)
    │   ├── DiveArc/            # Arco do mergulho PERCH → ENTRY (SVG que se desenha)
    │   ├── EyeTarget/          # Olho + mira (SVG)
    │   ├── Swatches/           # Chips de cor
    │   ├── StatsBand/          # Faixa de estatísticas com mini-visualizações
    │   ├── Closing/            # Frase final + CTA
    │   └── Footer/
    │
    ├── controllers/            # Comportamento (DOM, eventos, observers)
    │   ├── heroChoreography.js # Play, amostragem de cor, reveal, fallbacks, replay
    │   └── scrollReveal.js     # IntersectionObserver da seção abaixo da dobra
    │
    ├── lib/                    # Utilitários puros e reutilizáveis
    │   ├── dom.js              # Template tag `html` e helper `cx`
    │   ├── backdrop.js         # Lê 1px do vídeo e aplica --bg / --ghost
    │   ├── thumbnails.js       # Recorta o frame do vídeo nos <canvas data-crop>
    │   ├── video.js            # hasFrame()
    │   └── motion.js           # prefersReducedMotion()
    │
    └── styles/
        ├── main.css            # Entry point do CSS (@import na ordem certa)
        ├── tokens.css          # Cores, fontes, easing, gutter, breakpoints
        ├── base.css            # Reset e utilitários de tipografia (.mono, .serif, .wrap)
        └── animations.css      # .rv (hero), .io (scroll), .draw (SVG)
```

### Camadas e responsabilidades

| Camada | Faz | Não faz |
| --- | --- | --- |
| `data/` | Guarda o conteúdo | Markup ou lógica |
| `components/` | Funções puras `props → string HTML` + o CSS do próprio componente | Tocar no DOM ou ouvir eventos |
| `controllers/` | Comportamento: eventos, timers, observers | Gerar markup |
| `lib/` | Utilitários sem estado, testáveis isoladamente | Conhecer componentes específicos |
| `config.js` | Valores ajustáveis | — |

Os controllers encontram os elementos por atributos `data-*` (`data-hero`, `data-hero-video`, `data-replay`, `data-crop`), nunca por classes de estilo. Assim, renomear uma classe CSS não quebra o comportamento.

O CSS segue BEM (`bloco__elemento--modificador`) e cada componente só estiliza as próprias classes. Quem posiciona um componente é o pai, através de uma classe de *slot* passada via `className` (ex.: `hero__copy`, `hero__strip`).

---

## Como o efeito funciona

**A palavra atrás do pássaro.** "Kingfisher" fica *acima* do vídeo, com `mix-blend-mode: darken` e uma cor só um pouco mais escura que o fundo (`#ADBAA7` sobre `#B6C3B0`). Em cada pixel o navegador mantém o mais escuro dos dois. Como o pássaro é mais escuro que a palavra em todo lugar, ele vence e parece voar *na frente* do texto. Não há máscara recortada, canal alpha nem processamento por frame. Um `mask-image` dissolve a metade de baixo da palavra para os descendentes não colidirem com o galho.

**Cor da página = cor da filmagem.** No `loadeddata`, `lib/backdrop.js` desenha 1px do canto superior direito do vídeo (94% x, 12% y) num canvas 1×1, lê a cor e grava em `--bg`. `--ghost` recebe essa cor × 0.955. Se a leitura falhar (canvas "tainted" em `file://`), ficam os valores do CSS.

**Thumbnails dos cards.** São recortes do próprio vídeo. Quando o pássaro pousa, `lib/thumbnails.js` faz `drawImage` do frame em cada `<canvas data-crop="x,y,size">`:
- `x, y`: centro do recorte, em frações do frame;
- `size`: lado do quadrado, em fração da largura do frame.

`drawImage` funciona mesmo onde a leitura de pixels é bloqueada.

**A coreografia.** Todo elemento de UI do hero tem `.rv` (opacidade 0, `translateY(18px)`, `blur(6px)`). Quando `currentTime >= REVEAL_AT`, o hero ganha `.is-revealed` e os elementos entram com stagger de `--d × 90ms`.

**O hero nunca fica em branco.** A revelação também acontece:
- nos eventos `ended` e `error` do vídeo;
- se `play()` for rejeitado (por exemplo, autoplay bloqueado);
- após um timeout fixo de 9s.

Se a requisição com CORS falhar, o vídeo é recarregado sem `crossorigin`: as thumbnails continuam funcionando e só a amostragem de cor é perdida. Com `prefers-reduced-motion`, o vídeo pula direto para o último frame e tudo aparece sem transição.

---

## Ajustes comuns

### Mudar o momento do pouso (`REVEAL_AT`)

Em [`src/config.js`](src/config.js):

```js
export const REVEAL_AT = 4.3;
```

O valor `4.3` foi medido nesta filmagem: o galho entra em quadro por volta de 4.0s e o pássaro está pousado em ~4.3s. Para descobrir o valor de outro clipe, pause no frame do pouso e rode no console:

```js
document.querySelector('[data-hero-video]').currentTime
```

### Trocar o vídeo

1. Altere `VIDEO_SRC` em `src/config.js`. O servidor precisa enviar CORS para a amostragem de cor funcionar; sem CORS a página ainda funciona, com as cores padrão.
2. Ajuste `REVEAL_AT`.
3. Se o fundo da nova filmagem não for liso no canto superior direito, ajuste `BACKDROP_SAMPLE`.
4. Ajuste os recortes `crop` dos cards em `src/data/content.js`.

### Editar textos

Todo o texto está em [`src/data/content.js`](src/data/content.js). Campos terminados em `Html` aceitam markup inline (como `<em>` para o itálico).

### Adicionar um componente

1. Crie `src/components/MeuComponente/MeuComponente.js`, exportando uma função `props → string` (use a tag `html` de `lib/dom.js`).
2. Crie `MeuComponente.css` com classes prefixadas pelo nome do bloco.
3. Adicione o `@import` em `src/styles/main.css`.
4. Se ele tiver comportamento, crie um controller em `src/controllers/` e inicialize em `main.js`.

> A tag `html` insere valores sem escapar, porque todo o conteúdo aqui é estático e confiável. Se algum dia vier conteúdo de usuário ou de uma API, escape antes.

---

## Responsivo

- **≤ 900px:** some com os links da nav e o SIGN IN; a palavra gigante vai para 22vw; o hero vira coluna, com o texto e os cards descendo abaixo do pássaro; o card 2 perde o deslocamento; o bento vira uma coluna e as estatísticas viram 2×2. O gutter lateral é de 16px e não há scroll horizontal.
- **≤ 520px:** ajustes finos de tamanho em notas e estatísticas.

## Compatibilidade

Navegadores evergreen (Chrome, Edge, Firefox, Safari 16+). Recursos usados: ES modules, `mix-blend-mode`, `mask-image`, `color-mix()`, unidades `svh`, `IntersectionObserver`. `requestVideoFrameCallback` é usado quando disponível, para um reveal exato no frame, com `timeupdate` como alternativa.

## Por que sem build?

Era um requisito do projeto, e ES modules nativos já dão a organização em módulos. Para migrar para [Vite](https://vitejs.dev) no futuro:
1. Rode `npm create vite@latest` (template `vanilla`).
2. Mova `src/` e `index.html`.
3. Troque os `@import` do CSS por `import './Nome.css'` em cada componente.

O resto do código funciona como está.
