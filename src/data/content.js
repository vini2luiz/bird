/**
 * All page copy, kept apart from markup so components stay presentational.
 * Fields ending in `Html` may contain inline markup (<em>); everything here is static and trusted.
 */

export const nav = {
  brand: 'KINGFISHER',
  links: [
    { label: 'Library', href: '#' },
    { label: 'Templates', href: '#' },
    { label: 'Prompts', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  signIn: { label: 'SIGN IN', href: '#' },
  cta: { label: 'GET ACCESS', href: '#' },
};

export const hero = {
  ghostWord: { plain: 'King', italic: 'fisher' },
  eyebrow: 'Cinematic prompt library',
  titleHtml: 'Websites that <em>land</em> with precision',
  lede: 'Four hundred tested prompts that choreograph footage, type and motion — so your hero holds its breath, reads the moment, then lets everything arrive at once.',
  primaryCta: { label: 'Explore the library', href: '#' },
  secondaryCta: { label: 'Watch a build', href: '#' },
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
    replay: 'Replay',
  },
};

export const fieldNotes = {
  kicker: { number: '02', label: 'Field notes — Why a kingfisher' },
  titleHtml: 'It waits, reads the water, then <em>lands</em> in one clean motion',
  intro: 'Every prompt in the library is built on the same three beats — a held frame, a careful read of the content, and one decisive reveal. We borrowed the timing from a bird that has been rehearsing it for a few million years.',
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
      visual: { type: 'meta', label: 'Nictitating membrane' },
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
    { label: 'Length', value: '16', unit: 'cm', viz: 'ruler', caption: 'Beak to tail · of 20' },
    { label: 'Weight', value: '~40', unit: 'g', viz: 'orbs', caption: 'Light enough to hover' },
    { label: 'Colour', value: 'Zero', viz: 'shimmer', caption: 'Blue pigment' },
    { label: 'Strike', value: 'One dive', viz: 'strike', caption: 'Perch → prey', accent: true },
  ],
  closing: {
    lineHtml: 'Hold still. Read the page. <em>Then land it.</em>',
    cta: { label: 'Get the library', href: '#' },
  },
  footer: {
    left: 'Kingfisher — a fictional cinematic prompt library',
    right: '© 2026',
  },
};
