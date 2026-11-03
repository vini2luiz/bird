const EYE = 'M16 55 Q120 -6 224 55 Q120 116 16 55Z';

/**
 * Eye with a translucent third eyelid sweeping across it, front (beak side) to back.
 * The sweep runs while its note is in view (.is-in); reduced motion shows it half-drawn.
 */
export const Eyelid = () => `
  <figure class="eyelid">
    <svg viewBox="0 0 240 110" role="img" aria-label="An eye with a clear third eyelid sliding across it">
      <defs>
        <clipPath id="eyelid-clip"><path d="${EYE}"/></clipPath>
        <linearGradient id="eyelid-membrane" x1="0" x2="1">
          <stop offset="0" stop-color="#E3E8DE" stop-opacity=".25"/>
          <stop offset=".86" stop-color="#E3E8DE" stop-opacity=".8"/>
          <stop offset="1" stop-color="#0E7C86" stop-opacity=".6"/>
        </linearGradient>
      </defs>
      <path d="${EYE}" fill="rgba(255,255,255,.6)"/>
      <circle cx="120" cy="55" r="27" fill="#0E7C86"/>
      <circle cx="120" cy="55" r="11" fill="#10201F"/>
      <circle cx="128" cy="47" r="3.5" fill="#E3E8DE"/>
      <g clip-path="url(#eyelid-clip)">
        <path class="eyelid__membrane" d="M-236 -10 H0 Q18 55 0 120 H-236Z" fill="url(#eyelid-membrane)"/>
      </g>
      <path d="${EYE}" fill="none" stroke="#10201F" stroke-width="1.4"/>
    </svg>
    <figcaption class="eyelid__scale mono"><span>Front</span><span>Membrane</span><span>Back</span></figcaption>
  </figure>`;
