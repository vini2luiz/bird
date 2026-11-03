/**
 * All page copy, kept apart from markup so components stay presentational.
 * Fields ending in `Html` may contain inline markup (<em>); everything else is plain text.
 * Studios, people and prices are placeholders for a fictional product.
 */

export const nav = {
  brand: 'KINGFISHER',
  links: [
    { label: 'Library', href: '#why' },
    { label: 'Templates', href: '#templates' },
    { label: 'Prompts', href: '#prompts' },
    { label: 'Pricing', href: '#pricing' },
  ],
  signIn: { label: 'SIGN IN', href: '#' },
  cta: { label: 'GET ACCESS', href: '#pricing' },
};

export const hero = {
  ghostWord: { plain: 'King', italic: 'fisher' },
  eyebrow: 'Cinematic prompt library',
  titleHtml: 'Websites that <em>land</em> with precision',
  lede: 'Four hundred tested prompts that choreograph footage, type and motion — so your hero holds its breath, reads the moment, then lets everything arrive at once.',
  primaryCta: { label: 'Explore the library', href: '#templates' },
  secondaryCta: { label: 'Watch a build', dialog: 'build-modal' },
  trust: { headline: '2,400+ studios', sub: 'Ship with Kingfisher' },
  cards: [
    {
      title: 'Prompts',
      index: '/ 01',
      crop: '0.555,0.335,0.22',
      caption: 'Head · final frame',
      alt: "Close crop of the kingfisher's head from the final frame",
      stat: 'Copy · Paste',
    },
    {
      title: 'Motion',
      index: '/ 02',
      crop: '0.43,0.60,0.24',
      caption: 'Wing · final frame',
      alt: "Close crop of the kingfisher's wing from the final frame",
      stat: '60fps',
      drop: true,
    },
  ],
  strip: {
    species: 'Species 01',
    latin: 'Alcedo atthis',
    geo: 'Delhi NCR · 28.61° N',
  },
  media: {
    pause: 'Pause',
    play: 'Play',
    replay: 'Replay',
    pauseAria: 'Pause the hero film',
    playAria: 'Play the hero film',
    replayAria: 'Replay the hero film',
  },
};

export const buildModal = {
  id: 'build-modal',
  kicker: 'Build 01 · Perched reveal',
  title: 'One clip, one blend mode, one reveal',
  caption:
    'The hero on this page: a single uncut 8-second clip, a giant word behind the bird held there by mix-blend-mode, and every piece of UI timed to the second the bird lands.',
  close: 'Close',
};

export const fieldNotes = {
  id: 'why',
  kicker: { number: '02', label: 'Field notes — Why a kingfisher' },
  titleHtml: 'It waits, reads the water, then <em>lands</em> in one clean motion',
  intro:
    'Every prompt in the library is built on the same three beats — a held frame, a careful read of the content, and one decisive reveal. We borrowed the timing from a bird that has been rehearsing it for a few million years.',
  notes: [
    {
      variant: 'dark',
      index: 'Note 01 · Engineering',
      titleHtml: 'The beak that reshaped the <em>Shinkansen</em>',
      body: "JR West's 500 Series kept booming out of tunnels as compressed air burst from the exits. Engineer Eiji Nakatsu, a birdwatcher, remembered a bird that slips from air into water with barely a splash. The new nose, modelled on the kingfisher's beak, ran quieter, faster and on less power.",
      visual: {
        type: 'dive',
        figures: [
          { value: '−15%', label: 'Electricity' },
          { value: '+10%', label: 'Speed' },
          { value: '1997', label: 'In service' },
        ],
      },
    },
    {
      variant: 'light',
      index: 'Note 02 · Colour',
      titleHtml: 'Blue, with no <em>blue</em> in it',
      body: 'There is no blue pigment in those feathers. Spongy keratin nanostructures scatter light, so the back shifts from teal to cobalt as the bird turns.',
      visual: {
        type: 'swatches',
        shift: { from: '0°', label: 'Viewing angle', to: '40°' },
        swatches: [
          { name: 'Teal', color: '#0E7C86' },
          { name: 'Cobalt', color: '#1F5FA8' },
          { name: 'Rufous', color: '#E8732A' },
        ],
      },
    },
    {
      variant: 'light',
      index: 'Note 03 · Optics',
      titleHtml: 'A lid for the <em>plunge</em>',
      body: 'A transparent third eyelid — the nictitating membrane — sweeps across each eye at impact: built-in goggles for the instant it breaks the surface.',
      visual: { type: 'eyelid' },
    },
    {
      variant: 'wide',
      index: 'Note 04 · Patience',
      titleHtml: 'Waiting <em>still</em> is the work',
      body: "Most of a kingfisher's day is stillness: head locked level while the branch sways, eyes correcting for the bend of light at the surface. Then a single committed motion. Good pages work the same way — hold, read, land.",
      visual: { type: 'eye' },
    },
  ],
  stats: [
    { label: 'Length', value: '16', unit: 'cm', viz: 'ruler', ticks: ['0', '10', '20 cm'], caption: 'Beak to tail' },
    {
      label: 'Weight',
      value: '~40',
      unit: 'g',
      viz: 'orbs',
      orbs: ['Bird 40 g', 'Golf ball 46 g'],
      caption: 'Lighter than a golf ball',
    },
    { label: 'Colour', value: 'Zero', viz: 'shimmer', caption: 'Blue pigment' },
    { label: 'Strike', value: 'One dive', viz: 'strike', caption: 'Perch → prey', accent: true },
  ],
};

export const templates = {
  id: 'templates',
  viewerId: 'prompts',
  kicker: { number: '03', label: 'Templates — From the library' },
  titleHtml: 'Three of four hundred. <em>Copy, paste,</em> ship.',
  intro:
    'Each template is a set of prompts that specify not just what goes on the page but when each part arrives. Here are three, in full.',
  copy: { idle: 'Copy prompt', done: 'Copied', fail: 'Select to copy' },
  items: [
    {
      slug: 'perched-reveal',
      index: '01',
      nameHtml: 'Perched <em>reveal</em>',
      meta: 'Hero · 6 prompts',
      file: 'perched-reveal.prompt',
      tags: ['Hero', 'Video', 'Blend mode'],
      prompt: `Build a full-viewport hero around one uncut clip of a subject arriving and settling against a flat backdrop.

Set a giant display word BEHIND the subject with mix-blend-mode: darken, coloured one shade darker than the backdrop, so the subject wins at every pixel and appears to fly in front of the type.

Sample the backdrop colour from the video at runtime and write it to --bg, so page and footage share one continuous surface.

Hold every UI element at opacity 0, translateY(18px), blur(6px). At REVEAL_AT — the second the subject settles — stagger them in at 90 ms intervals.

Never leave the hero blank: also reveal on ended, on error, when play() rejects, and after a 9 s timeout.`,
    },
    {
      slug: 'field-notes',
      index: '02',
      nameHtml: 'Field <em>notes</em>',
      meta: 'Scroll story · 9 prompts',
      file: 'field-notes.prompt',
      tags: ['Below the fold', 'Bento', 'SVG'],
      prompt: `Write one below-the-fold section that earns the scroll.

Header in two columns: a mono kicker with an orange index, a serif headline with one italic word, and a short paragraph beside it.

Then a bento grid (1.35fr 1fr 1fr, 16px gap): one dark note spanning two rows with a self-drawing SVG, and light notes on rgba(255,255,255,.45) with hairline borders and mono indexes.

Fade each card up 28px with an IntersectionObserver at threshold .18, staggered by 90 ms.

Give every SVG path pathLength="1", so a single stroke-dashoffset rule draws them all.`,
    },
    {
      slug: 'product-drop',
      index: '03',
      nameHtml: 'Product <em>drop</em>',
      meta: 'Launch · 7 prompts',
      file: 'product-drop.prompt',
      tags: ['Launch', 'Commerce', 'Timing'],
      prompt: `Design a launch page for a single physical product filmed on a seamless backdrop.

Match the page background to the footage, then let the product enter on a slow dolly. Price and call to action arrive only after the camera stops — never during motion.

Take one accent colour from the product itself; everything else stays in ink and paper.

Add a sticky buy bar after 60% scroll, and close with a band of four numbers, each with a tiny visualisation that animates once it is in view.`,
    },
  ],
};

export const studios = {
  id: 'studios',
  kicker: { number: '04', label: 'Studios — Who waits with us' },
  titleHtml: 'Studios that <em>wait</em> for the moment',
  intro: 'From two-person shops to in-house teams: the people who would rather hold a frame than fill it.',
  logos: [
    { name: 'Halcyon Works', style: 'serif' },
    { name: 'PAPER HERON', style: 'mono' },
    { name: 'lowtide', style: 'sans' },
    { name: 'Northlight', style: 'serif-roman' },
    { name: 'FIELD & FRAME', style: 'mono' },
    { name: 'Ostra', style: 'sans' },
  ],
  quotes: [
    {
      quote:
        'We stopped animating everything on load. The page holds still, the product lands, and clients finally look at the product.',
      name: 'Mara Ilunga',
      role: 'Creative director · Low Tide',
      tone: 'teal',
    },
    {
      quote:
        'Timing the UI to the footage instead of the other way round changed how we storyboard every landing page.',
      name: 'Joon Park',
      role: 'Founder · Paper Heron',
      tone: 'orange',
    },
    {
      quote: "Copy, paste, adjust two numbers. It's the first prompt library that reads like a director's notes.",
      name: 'Inês Duarte',
      role: 'Motion lead · Halcyon Works',
      tone: 'ink',
    },
  ],
};

export const pricing = {
  id: 'pricing',
  kicker: { number: '05', label: 'Pricing' },
  titleHtml: 'One library. <em>Three ways</em> in.',
  intro: 'Prices in USD. Cancel any time — every prompt you copied stays yours.',
  tiers: [
    {
      name: 'Field',
      price: '$0',
      period: 'forever',
      blurb: 'Start on the perch.',
      features: ['12 sample prompts', 'The Perched reveal template', 'Personal projects'],
      cta: { label: 'Start free', href: '#' },
    },
    {
      name: 'Studio',
      price: '$24',
      period: 'per month',
      blurb: 'The whole library, every drop.',
      features: [
        '400+ prompts across 30 templates',
        'A new drop every month',
        'Commercial licence',
        'Footage timing guides',
      ],
      cta: { label: 'Get access', href: '#' },
      featured: true,
      badge: 'Most chosen',
    },
    {
      name: 'Team',
      price: '$79',
      period: 'per month',
      blurb: 'For studios shipping together.',
      features: [
        'Everything in Studio',
        'Five seats, shared collections',
        'Private team templates',
        'Priority prompt requests',
      ],
      cta: { label: 'Talk to us', href: '#' },
    },
  ],
};

export const faq = {
  id: 'faq',
  kicker: { number: '06', label: 'FAQ' },
  titleHtml: 'Before you <em>dive</em>',
  items: [
    {
      question: 'What makes a prompt “cinematic”?',
      answer:
        'It specifies time as well as content: what holds still, what moves, the exact moment the interface arrives, and what happens when the footage fails. The result is a page with a beginning, a beat and a landing.',
    },
    {
      question: 'Which AI tools do the prompts work with?',
      answer:
        'Any capable coding model or AI site builder. Prompts are written in plain language with concrete CSS and JavaScript values — no tool-specific syntax to translate.',
    },
    {
      question: 'Do I need my own footage?',
      answer:
        'For the video templates, yes — and each one lists what kind of clip works. The blend-mode hero, for example, needs a subject darker than a fairly flat backdrop.',
    },
    {
      question: 'How do I time the reveal to my clip?',
      answer:
        'Pause your video on the frame where the subject settles, read its currentTime in the console, and set REVEAL_AT to that number. Every template names the constant to change.',
    },
    {
      question: 'Can I use the prompts for client work?',
      answer:
        'On Studio and Team, yes — both include a commercial licence. The free Field plan is for personal projects.',
    },
  ],
};

export const closing = {
  lineHtml: 'Hold still. Read the page. <em>Then land it.</em>',
  cta: { label: 'Get the library', href: '#pricing' },
};

export const footer = {
  left: 'Kingfisher — a fictional cinematic prompt library',
  right: '© 2026',
};
