// Basit çizgi ikonlar (stroke = currentColor)
const p = {
  tesisat: '<path d="M4 7h6a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h4"/><circle cx="4" cy="7" r="1.6"/><path d="M17 14h3v6h-3z"/><path d="M20 15.5h1.5M20 18.5h1.5"/>',
  tamir: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.6 17.4a1.4 1.4 0 0 0 2 2l5.7-5.7a4 4 0 0 0 5.4-5.4l-2.4 2.4-2-.6-.6-2z"/>',
  ariza: '<path d="M12 3 2.5 20h19z"/><path d="m12.6 9-2.2 4h3.2l-2.2 4"/>',
  sigorta: '<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9h17"/><rect x="6" y="11.5" width="2.6" height="5.5" rx=".6"/><rect x="10.7" y="11.5" width="2.6" height="5.5" rx=".6"/><rect x="15.4" y="11.5" width="2.6" height="5.5" rx=".6"/><path d="M6.5 6.2h4"/>',
  avize: '<path d="M12 2v5"/><path d="M5 11c0 2 3 3 7 3s7-1 7-3"/><path d="M5 11V9.5M19 11V9.5M12 7v7"/><path d="M5 11v3.5M19 11v3.5M12 14v3.5"/><circle cx="5" cy="16" r="1.4"/><circle cx="19" cy="16" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
  led: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.6V16h5.6v-.6c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z"/><path d="m12.6 7-1.6 3h2l-1.6 3"/>',
  proje: '<path d="M4 4h12l4 4v12H4z"/><path d="M16 4v4h4"/><path d="M7.5 12h9M7.5 15.5h6M7.5 8.5h4"/>',
  kamera: '<path d="M3 8.5 15 5l1.8 6L4.8 14.5z"/><path d="m16.8 9.8 3.7-1.2.9 3.3-3.7 1"/><path d="M8 13.6 9 19H5"/>',
  priz: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="12" r="4.6"/><circle cx="10.2" cy="12" r=".7" fill="currentColor"/><circle cx="13.8" cy="12" r=".7" fill="currentColor"/>',
  topraklama: '<path d="M12 3v9"/><path d="M5 12h14M7.5 15.5h9M10 19h4"/>',
  telefon: '<path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z"/>',
  whatsapp: '<path d="M4 20l1.2-3.6A8 8 0 1 1 8 19z"/><path d="M9.2 8.6c.2-.4.6-.5.9-.4l.6 1.4-.6.8a4.6 4.6 0 0 0 2.6 2.6l.8-.6 1.4.6c.1.3 0 .7-.4.9-.9.6-2.2.5-3.6-.4a7.5 7.5 0 0 1-2.2-2.3c-.6-1.1-.6-2.1.5-2.6z"/>',
  saat: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  kalkan: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
  tik: '<path d="m5 12.5 4.3 4.3L19 7.2"/>',
  konum: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  ok: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  posta: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 6.5 8 6 8-6"/>',
  fiyat: '<path d="M4 12.5V4h8.5L20 11.5 11.5 20z"/><circle cx="8.3" cy="8.3" r="1.3"/>',
  arac: '<path d="M3 15V9.5h11V15M14 11.5h4l3 3V15"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17.5" cy="16.5" r="1.8"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  belge: '<path d="M6 3.5h8.5L18 7v13.5H6z"/><path d="M9 11h6M9 14.5h6"/><circle cx="12" cy="7.2" r=".1"/>',
};
function ikon(ad, cls = "ic") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p[ad] || p.tik}</svg>`;
}
module.exports = { ikon };
