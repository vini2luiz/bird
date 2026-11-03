/** Eye inside a slowly turning target reticle. Decorative. */
export const EyeTarget = () => `
  <svg class="eye-target" viewBox="0 0 200 200" aria-hidden="true">
    <circle class="eye-target__ring" cx="100" cy="100" r="88" fill="none" stroke="rgba(16,32,31,.28)" stroke-dasharray="2 7"/>
    <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(16,32,31,.14)"/>
    <path d="M100 4v26M100 170v26M4 100h26M170 100h26" stroke="rgba(16,32,31,.3)" stroke-linecap="round"/>
    <path d="M34 100 Q100 44 166 100 Q100 156 34 100Z" fill="rgba(255,255,255,.55)" stroke="#10201F" stroke-width="1.4"/>
    <circle cx="100" cy="100" r="23" fill="#0E7C86"/>
    <circle cx="100" cy="100" r="9.5" fill="#10201F"/>
    <circle cx="106" cy="93" r="3.2" fill="#E3E8DE"/>
    <circle cx="100" cy="100" r="34" fill="none" stroke="#E8732A" stroke-width="1.2" stroke-dasharray="4 4"/>
  </svg>`;
