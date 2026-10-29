const site = require("../data/site");
const hizmetler = require("../data/hizmetler");
const ilceler = require("../data/ilceler");
const { ikon } = require("./icons");
const { esc } = require("./tr");

const u = (p) => site.basePath + p;
const abs = (p) => site.siteUrl + site.basePath + p;
const telA = (cls = "", metin = site.telefon) =>
  `<a class="${cls}" href="tel:${site.telefonLink}" data-ev="tel">${ikon("telefon")}<span>${metin}</span></a>`;
const waLink = (mesaj = "Merhaba, elektrik işi için bilgi almak istiyorum.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mesaj)}`;
const waA = (cls = "", metin = "WhatsApp", mesaj) =>
  `<a class="${cls}" href="${waLink(mesaj)}" target="_blank" rel="noopener" data-ev="whatsapp">${ikon("whatsapp")}<span>${metin}</span></a>`;

const isletmeId = abs("/#isletme");
function isletmeSchema() {
  const s = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": isletmeId,
    name: site.firmaAdi,
    url: abs("/"),
    telephone: site.telefonLink,
    email: site.eposta,
    image: abs("/assets/og-image.png"),
    logo: abs("/assets/logo.svg"),
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adres.sokak,
      addressLocality: site.adres.ilce,
      addressRegion: site.adres.il,
      postalCode: site.adres.postaKodu,
      addressCountry: "TR",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.koordinat.lat, longitude: site.koordinat.lng },
    areaServed: ilceler.map((i) => ({ "@type": "AdministrativeArea", name: `${i.ad}, İstanbul` })),
    openingHoursSpecification: site.acilServis724
      ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }]
      : [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "20:00" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elektrik Hizmetleri",
      itemListElement: hizmetler.map((h) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: h.ad, url: abs(`/hizmetler/${h.slug}/`) } })),
    },
  };
  if (site.kurulusYili) s.foundingDate = String(site.kurulusYili);
  const sameAs = Object.values(site.sosyal).filter(Boolean);
  if (sameAs.length) s.sameAs = sameAs;
  if (site.haritaLinki) s.hasMap = site.haritaLinki;
  return s;
}

function breadcrumbSchema(yol) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: yol.map(([ad, p], i) => ({ "@type": "ListItem", position: i + 1, name: ad, item: abs(p) })),
  };
}
function breadcrumbHtml(yol) {
  return `<nav class="bc" aria-label="Sayfa yolu"><ol>${yol
    .map(([ad, p], i) => (i === yol.length - 1 ? `<li aria-current="page">${esc(ad)}</li>` : `<li><a href="${u(p)}">${esc(ad)}</a></li>`))
    .join("")}</ol></nav>`;
}

function logo() {
  return `<a class="logo" href="${u("/")}" aria-label="${esc(site.firmaAdi)} ana sayfa">
  <svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="9" fill="var(--ink)"/><path d="M22.5 7 12 22.5h7.2L16.8 33 28 17h-7.4z" fill="var(--accent)"/></svg>
  <span><b>${esc(site.kisaAd)}</b><small>İstanbul Elektrik Servisi</small></span></a>`;
}

function header(aktif) {
  const hz = hizmetler.map((h) => `<a href="${u(`/hizmetler/${h.slug}/`)}">${ikon(h.ikon)}<span>${h.ad}</span></a>`).join("");
  const a = (k) => (aktif === k ? ' aria-current="page"' : "");
  return `<div class="topbar"><div class="wrap">
  <span>${ikon("saat")} ${site.acilServis724 ? "7/24 acil arıza hattı" : esc(site.calismaSaatleri)}</span>
  <span class="tb-yaka">${ikon("konum")} Anadolu ve Avrupa Yakası · 39 ilçe</span>
  ${telA("tb-tel")}
</div></div>
<header class="hdr"><div class="wrap hdr-in">
  ${logo()}
  <button class="menu-btn" aria-expanded="false" aria-controls="nav">${ikon("menu")}<span class="sr">Menü</span></button>
  <nav id="nav" class="nav" aria-label="Ana menü">
    <div class="dd"><a href="${u("/hizmetler/")}"${a("hizmetler")}>Hizmetler</a><div class="dd-panel">${hz}</div></div>
    <a href="${u("/bolgeler/")}"${a("bolgeler")}>Hizmet Bölgeleri</a>
    <a href="${u("/blog/")}"${a("blog")}>Rehber</a>
    <a href="${u("/hakkimizda/")}"${a("hakkimizda")}>Hakkımızda</a>
    <a href="${u("/iletisim/")}"${a("iletisim")}>İletişim</a>
    ${telA("btn btn-acc nav-tel", "Hemen Ara")}
  </nav>
</div></header>`;
}

function footer() {
  const anadolu = ilceler.filter((i) => i.yaka === "anadolu");
  const avrupa = ilceler.filter((i) => i.yaka === "avrupa");
  const il = (l) => l.map((i) => `<a href="${u(`/${i.slug}-elektrikci/`)}">${i.ad} Elektrikçi</a>`).join("");
  return `<footer class="ftr">
<div class="wrap ftr-grid">
  <div class="ftr-col">
    ${logo()}
    <p>${esc(site.slogan)}. Elektrik tesisatı, arıza servisi, sigorta, aydınlatma montajı, kamera sistemleri ve proje işleri.</p>
    <ul class="ftr-ilet">
      <li>${telA()}</li>
      <li>${waA("", "WhatsApp'tan yazın")}</li>
      <li><a href="mailto:${site.eposta}">${ikon("posta")}<span>${site.eposta}</span></a></li>
      <li>${ikon("konum")}<span>${esc(site.adres.sokak)}, ${site.adres.ilce} / ${site.adres.il}</span></li>
      <li>${ikon("saat")}<span>${esc(site.calismaSaatleri)}${site.acilServis724 ? " · Acil arıza 7/24" : ""}</span></li>
    </ul>
  </div>
  <div class="ftr-col"><h3>Hizmetler</h3>${hizmetler.map((h) => `<a href="${u(`/hizmetler/${h.slug}/`)}">${h.ad}</a>`).join("")}</div>
  <div class="ftr-col"><h3>Kurumsal</h3>
    <a href="${u("/hakkimizda/")}">Hakkımızda</a><a href="${u("/sss/")}">Sık Sorulan Sorular</a><a href="${u("/blog/")}">Elektrik Rehberi</a>
    <a href="${u("/iletisim/")}">İletişim</a><a href="${u("/kvkk-aydinlatma-metni/")}">KVKK Aydınlatma Metni</a><a href="${u("/gizlilik-politikasi/")}">Gizlilik Politikası</a>
  </div>
</div>
<div class="wrap ftr-bolge">
  <div><h3><a href="${u("/bolgeler/anadolu-yakasi/")}">Anadolu Yakası</a></h3><div class="ftr-links">${il(anadolu)}</div></div>
  <div><h3><a href="${u("/bolgeler/avrupa-yakasi/")}">Avrupa Yakası</a></h3><div class="ftr-links">${il(avrupa)}</div></div>
</div>
<div class="wrap ftr-alt"><span>© ${new Date().getFullYear()} ${esc(site.firmaAdi)}. Tüm hakları saklıdır.</span><span>İstanbul · Anadolu & Avrupa Yakası</span></div>
</footer>
<div class="mbar">${telA("mbar-tel", "Hemen Ara")}${waA("mbar-wa", "WhatsApp")}</div>`;
}

function layout({ title, desc, path, body, schema = [], aktif = "", ogType = "website", robots = "index,follow" }) {
  const tamBaslik = title.includes(site.kisaAd) ? title : `${title} | ${site.kisaAd}`;
  const tam = path === "/" || path === "/iletisim/" || path === "/hakkimizda/";
  const isl = tam ? isletmeSchema() : { "@context": "https://schema.org", "@type": "Electrician", "@id": isletmeId, name: site.firmaAdi, url: abs("/"), telephone: site.telefonLink };
  const ld = [isl, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n");
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tamBaslik)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${abs(path)}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="${esc(site.firmaAdi)}">
<meta property="og:title" content="${esc(tamBaslik)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs("/assets/og-image.png")}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0e1a2b">
<meta name="geo.region" content="TR-34">
<meta name="geo.placename" content="İstanbul">
<link rel="icon" href="${u("/assets/favicon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${u("/assets/style.css")}">
${ld}
</head>
<body>
<a class="skip" href="#icerik">İçeriğe geç</a>
${header(aktif)}
<main id="icerik">
${body}
</main>
${footer()}
<script src="${u("/assets/main.js")}" defer></script>
</body>
</html>`;
}

module.exports = { layout, u, abs, telA, waA, waLink, breadcrumbHtml, breadcrumbSchema, isletmeId };
