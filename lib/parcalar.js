// Tekrar kullanılan sayfa bölümleri
const site = require("../data/site");
const { ikon } = require("./icons");
const { esc } = require("./tr");
const { u, telA, waA } = require("./layout");

function hero({ h1, lead, ust = "", rozetler = true, gorsel = "", bc = "", waMesaj }) {
  const roz = rozetler
    ? `<ul class="rozet">
        <li>${ikon("arac")} Aynı gün servis imkânı</li>
        <li>${ikon("fiyat")} İşe başlamadan net fiyat</li>
        <li>${ikon("kalkan")} Ölçüme dayalı, güvenli işçilik</li>
      </ul>`
    : "";
  return `<section class="hero${gorsel ? " hero-g" : ""}"><div class="wrap hero-in">
  <div class="hero-txt">
    ${bc}
    ${ust ? `<p class="ust">${ust}</p>` : ""}
    <h1>${h1}</h1>
    <p class="lead">${lead}</p>
    <div class="cta-row">${telA("btn btn-acc btn-lg", site.telefon)}${waA("btn btn-ghost btn-lg", "WhatsApp'tan yazın", waMesaj)}</div>
    ${roz}
  </div>
  ${gorsel ? `<div class="hero-vis">${gorsel}</div>` : ""}
</div></section>`;
}

function kartlar(liste, linkFn, baslikFn = (h) => h.ad) {
  return `<div class="kartlar">${liste
    .map(
      (h) => `<a class="kart" href="${u(linkFn(h))}">
      <span class="kart-ic">${ikon(h.ikon)}</span>
      <h3>${esc(baslikFn(h))}</h3>
      <p>${esc(h.kisa)}</p>
      <span class="kart-ok">Detaylı bilgi ${ikon("ok")}</span>
    </a>`
    )
    .join("")}</div>`;
}

function adimlar(surec) {
  return `<ol class="adimlar">${surec.map(([b, m]) => `<li><b>${esc(b)}</b><span>${esc(m)}</span></li>`).join("")}</ol>`;
}

function liste(dizi, cls = "tikli") {
  return `<ul class="${cls}">${dizi.map((x) => `<li>${ikon("tik")}<span>${esc(x)}</span></li>`).join("")}</ul>`;
}

function sss(dizi) {
  return `<div class="sss">${dizi
    .map(([s, c], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(s)}</summary><div><p>${esc(c)}</p></div></details>`)
    .join("")}</div>`;
}
function sssSchema(dizi) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dizi.map(([s, c]) => ({ "@type": "Question", name: s, acceptedAnswer: { "@type": "Answer", text: c } })),
  };
}

function ctaBant(baslik = "Elektrik işiniz mi var?", alt = "Arayın, sorununuzu dinleyelim; size en yakın ustayı yönlendirelim.", waMesaj) {
  return `<section class="cta-bant"><div class="wrap cta-in">
  <div><h2>${baslik}</h2><p>${alt}</p></div>
  <div class="cta-row">${telA("btn btn-acc btn-lg", site.telefon)}${waA("btn btn-ghost-d btn-lg", "WhatsApp", waMesaj)}</div>
</div></section>`;
}

function guvenSerit() {
  const yil = site.kurulusYili ? new Date().getFullYear() - site.kurulusYili : null;
  return `<section class="serit"><div class="wrap serit-in">
  ${yil ? `<div><b>${yil}+ yıl</b><span>sahada deneyim</span></div>` : ""}
  <div><b>39 ilçe</b><span>iki yakada servis</span></div>
  <div><b>10 hizmet</b><span>tek ekipten</span></div>
  <div><b>${site.acilServis724 ? "7/24" : "Aynı gün"}</b><span>${site.acilServis724 ? "acil arıza hattı" : "servis imkânı"}</span></div>
</div></section>`;
}

function yanPanel(baslik, waMesaj) {
  return `<aside class="yan">
  <div class="yan-kart">
    <p class="yan-ust">${baslik}</p>
    <p class="yan-tel">${site.telefon}</p>
    ${telA("btn btn-acc btn-blok", "Hemen Ara")}
    ${waA("btn btn-ghost btn-blok", "WhatsApp'tan yazın", waMesaj)}
    <ul>
      <li>${ikon("saat")}${esc(site.calismaSaatleri)}</li>
      ${site.acilServis724 ? `<li>${ikon("ariza")}Acil arızalar için 7/24</li>` : ""}
      <li>${ikon("fiyat")}Fiyat işe başlamadan söylenir</li>
    </ul>
  </div>
</aside>`;
}

// Ana sayfa görseli: sigorta kutusu illüstrasyonu
function panoSvg() {
  const sig = (x, y, lbl, on = true) => `<g transform="translate(${x} ${y})">
    <rect width="34" height="78" rx="4" fill="#f7f6f2" stroke="#c9c3b6"/>
    <rect x="9" y="${on ? 14 : 36}" width="16" height="22" rx="3" fill="${on ? "#0e1a2b" : "#8a8f99"}"/>
    <text x="17" y="68" font-size="8" text-anchor="middle" fill="#5b6676" font-family="Inter,sans-serif">${lbl}</text></g>`;
  return `<svg class="pano" viewBox="0 0 360 330" role="img" aria-label="Etiketlenmiş sigorta kutusu illüstrasyonu">
  <rect x="10" y="10" width="340" height="310" rx="18" fill="#e9e5dc"/>
  <rect x="26" y="26" width="308" height="278" rx="12" fill="#fff" stroke="#d8d2c5"/>
  <rect x="26" y="26" width="308" height="44" rx="12" fill="#0e1a2b"/>
  <rect x="26" y="58" width="308" height="12" fill="#0e1a2b"/>
  <path d="M52 37 44 50h6l-2 9 9-13h-6z" fill="#f2b705"/>
  <text x="68" y="53" font-size="13" fill="#fff" font-family="Barlow Semi Condensed,sans-serif" font-weight="700" letter-spacing=".5">DAĞITIM PANOSU</text>
  <circle cx="306" cy="48" r="5" fill="#2fbf71"/>
  <g transform="translate(44 88)">
    <rect width="70" height="78" rx="4" fill="#fff7d6" stroke="#e1c56a"/>
    <rect x="12" y="14" width="46" height="22" rx="3" fill="#0e1a2b"/>
    <circle cx="56" cy="56" r="7" fill="#f2b705"/><text x="56" y="59" font-size="8" text-anchor="middle" font-family="Inter" font-weight="700" fill="#1a1400">T</text>
    <text x="22" y="60" font-size="8" fill="#5b6676" font-family="Inter,sans-serif">30mA</text>
  </g>
  ${sig(126, 88, "AYD.")}${sig(166, 88, "PRİZ")}${sig(206, 88, "MUTF.")}${sig(246, 88, "KLİMA")}${sig(286, 88, "BANYO")}
  ${sig(44, 186, "FIRIN")}${sig(84, 186, "ÇAM.")}${sig(124, 186, "KOMBİ")}${sig(164, 186, "KAM.")}${sig(204, 186, "BAHÇE", false)}
  <rect x="250" y="186" width="70" height="78" rx="4" fill="none" stroke="#d8d2c5" stroke-dasharray="4 4"/>
  <text x="285" y="229" font-size="8" text-anchor="middle" fill="#8a8f99" font-family="Inter,sans-serif">YEDEK</text>
  <path d="M44 282h276" stroke="#0e1a2b" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 282v14M120 282v14M180 282v14M240 282v14M300 282v14" stroke="#c9c3b6" stroke-width="2"/>
</svg>`;
}

module.exports = { hero, kartlar, adimlar, liste, sss, sssSchema, ctaBant, guvenSerit, yanPanel, panoSvg };
