// Statik site derleyici — bağımlılık yok. Çalıştırma: node build.js  → çıktı: dist/
const fs = require("fs");
const path = require("path");
const site = require("./data/site");
const hizmetler = require("./data/hizmetler");
const ilceler = require("./data/ilceler");
const blog = require("./data/blog");
const M = require("./data/metinler");
const T = require("./lib/tr");
const { ikon } = require("./lib/icons");
const L = require("./lib/layout");
const P = require("./lib/parcalar");
const { esc } = T;
const { u, abs } = L;

const DIST = path.join(__dirname, "dist");
const sayfalar = []; // sitemap için
const hz = Object.fromEntries(hizmetler.map((h) => [h.slug, h]));
const ilc = Object.fromEntries(ilceler.map((i) => [i.slug, i]));
const yakaAd = { anadolu: "Anadolu Yakası", avrupa: "Avrupa Yakası" };
const yakaSlug = { anadolu: "anadolu-yakasi", avrupa: "avrupa-yakasi" };
const ilceUrl = (i) => `/${i.slug}-elektrikci/`;
const comboUrl = (i, h) => `/${i.slug}-${h.slug}/`;
const hizmetUrl = (h) => `/hizmetler/${h.slug}/`;

function yaz(p, html, oncelik = 0.6) {
  const dosya = path.join(DIST, p, p.endsWith(".html") ? "" : "index.html");
  fs.mkdirSync(path.dirname(dosya), { recursive: true });
  fs.writeFileSync(dosya, html);
  if (!p.endsWith(".html")) sayfalar.push([p, oncelik]);
}
function doldur(sablon, i, h) {
  const r = {
    "{ilce}": i.ad, "{ilceDe}": T.de(i.ad), "{ilceDeki}": T.deki(i.ad), "{ilceE}": T.e(i.ad),
    "{yakaDe}": `${yakaAd[i.yaka]}'nda`,
  };
  if (h) { r["{hk}"] = h.adKucuk; r["{hkB}"] = T.buyukIlk(h.adKucuk); }
  return sablon.replace(/\{[a-zA-Z]+\}/g, (m) => r[m] ?? m);
}
const cumle = (s) => T.buyukIlk(s);

// ------------------------------------------------------------------ ANA SAYFA
function anaSayfa() {
  const sorular = [
    ["İstanbul'un hangi ilçelerine hizmet veriyorsunuz?", "Anadolu Yakası ve Avrupa Yakası'ndaki 39 ilçenin tamamına servis veriyoruz. Şile, Silivri, Çatalca ve Adalar gibi merkeze uzak bölgelere servis randevuyla planlanır."],
    ["Fiyatı ne zaman öğrenirim?", "Telefonda sorunu dinleyip kabaca bilgi veriyoruz. Usta yerinde gördükten sonra, işe başlamadan önce net fiyatı söylüyor; onayınız olmadan işe başlanmıyor."],
    ["Malzemeyi siz mi getiriyorsunuz?", "Arızalarda sık kullanılan malzemeler (sigorta, kaçak akım rölesi, priz, klemens, kablo) ustamızın yanında bulunur. Daha büyük işlerde malzeme listesini önceden çıkarıp isterseniz biz temin ediyoruz."],
    ["Yapılan işe garanti veriyor musunuz?", "Yaptığımız işçilikle ilgili bir sorun çıkarsa geri dönüp ücretsiz düzeltiyoruz. Kullanılan malzemeler üreticinin garantisi kapsamındadır."],
    ["Elektrik kesintisi bizden mi şebekeden mi, nasıl anlarım?", "Komşularınızda da elektrik yoksa sorun büyük ihtimalle şebekededir; Anadolu Yakası için AYEDAŞ, Avrupa Yakası için BEDAŞ'ın 186 arıza hattını arayabilirsiniz. Yalnızca sizde yoksa sorun iç tesisattadır."],
  ];
  const anadolu = ilceler.filter((i) => i.yaka === "anadolu");
  const avrupa = ilceler.filter((i) => i.yaka === "avrupa");
  const bolgeKolon = (ad, l, s) => `<div class="yaka-kart"><h3><a href="${u(`/bolgeler/${s}/`)}">${ad}</a></h3>
    <div class="ilce-grid">${l.map((i) => `<a href="${u(ilceUrl(i))}">${i.ad}</a>`).join("")}</div></div>`;
  const yorumlar = site.yorumlar.length
    ? `<section class="blk"><div class="wrap"><h2>Müşterilerimiz ne diyor?</h2><div class="yorumlar">${site.yorumlar
        .map((y) => `<figure><blockquote>${esc(y.metin)}</blockquote><figcaption>${esc(y.ad)} · ${esc(y.ilce)}</figcaption></figure>`)
        .join("")}</div></div></section>`
    : "";
  const body = `
${P.hero({
  ust: "İstanbul · Anadolu ve Avrupa Yakası",
  h1: "İstanbul Elektrikçi<br><span>Tesisat, arıza ve montaj işleriniz tek ekipte</span>",
  lead: "Elektrik tesisatı, arıza servisi, sigorta ve pano tamiri, avize ve LED montajı, güvenlik kamerası ve proje işleri. İki yakada 39 ilçeye usta yönlendiriyor, fiyatı işe başlamadan söylüyoruz.",
  gorsel: P.panoSvg(),
})}
${P.guvenSerit()}
<section class="blk"><div class="wrap">
  <div class="blk-bas"><h2>Elektrik hizmetlerimiz</h2><p>Küçük bir priz arızasından komple tesisat yenilemeye kadar evinizin ve iş yerinizin tüm elektrik işleri.</p></div>
  ${P.kartlar(hizmetler, hizmetUrl)}
</div></section>

<section class="blk blk-koyu"><div class="wrap iki-kol">
  <div>
    <h2>Neden bizimle çalışmalısınız?</h2>
    <p class="acik">Elektrik işinde iyi işçilik görünmez; yıllarca sorun çıkmamasıyla anlaşılır. Çalışma şeklimizi buna göre kurduk.</p>
  </div>
  <div class="neden">
    <div>${ikon("fiyat", "ic ic-b")}<h3>Önce fiyat, sonra iş</h3><p>Usta yerinde görür, net fiyatı söyler. Onayınız olmadan işe başlanmaz, sonradan ek ücret çıkmaz.</p></div>
    <div>${ikon("kalkan", "ic ic-b")}<h3>Ölçüme dayalı tespit</h3><p>Arızayı tahminle değil, ölçü aletleriyle buluruz. Gereksiz kırım ve parça değişimi yapmayız.</p></div>
    <div>${ikon("sigorta", "ic ic-b")}<h3>Yönetmeliğe uygun işçilik</h3><p>Doğru kesitte kablo, uygun sigorta, kaçak akım koruması ve topraklama — kısa yol yok.</p></div>
    <div>${ikon("tik", "ic ic-b")}<h3>Temiz teslim</h3><p>İş bitince ortamı temiz bırakır, yapılan işi ve panodaki hatları size anlatırız.</p></div>
  </div>
</div></section>

<section class="blk"><div class="wrap">
  <div class="blk-bas"><h2>Nasıl çalışıyoruz?</h2><p>Aramanızdan işin tesliminden sonraki kontrole kadar.</p></div>
  ${P.adimlar([
    ["Arayın ya da yazın", "Sorunu ya da işi kısaca anlatın, fotoğraf gönderebilirsiniz."],
    ["Usta yönlendirme", "Bulunduğunuz ilçeye en yakın ustayı yönlendirir, varış saatini bildiririz."],
    ["Yerinde tespit", "Usta ölçüm yapar, sorunu ve çözüm seçeneklerini anlatır."],
    ["Net fiyat ve onay", "İşe başlamadan fiyatı söyleriz; onayınızla başlarız."],
    ["İş ve test", "İş yapılır, yük altında test edilir, ortam temiz bırakılır."],
  ])}
</div></section>

<section class="blk blk-acik"><div class="wrap">
  <div class="blk-bas"><h2>Hizmet verdiğimiz bölgeler</h2><p>İstanbul'un iki yakasında, 39 ilçenin tamamında elektrikçi hizmeti.</p></div>
  <div class="yakalar">${bolgeKolon("Anadolu Yakası", anadolu, "anadolu-yakasi")}${bolgeKolon("Avrupa Yakası", avrupa, "avrupa-yakasi")}</div>
</div></section>
${yorumlar}
<section class="blk"><div class="wrap">
  <div class="blk-bas"><h2>Elektrik rehberi</h2><p>Evde elektrikle ilgili en çok merak edilenler.</p></div>
  <div class="blog-grid">${blog.slice(0, 3).map(blogKart).join("")}</div>
  <p class="orta"><a class="btn btn-ghost" href="${u("/blog/")}">Tüm yazılar ${ikon("ok")}</a></p>
</div></section>

<section class="blk blk-acik"><div class="wrap dar">
  <h2>Sık sorulan sorular</h2>
  ${P.sss(sorular)}
  <p class="orta"><a class="btn btn-ghost" href="${u("/sss/")}">Tüm sorular ${ikon("ok")}</a></p>
</div></section>
${P.ctaBant()}`;
  yaz("/", L.layout({
    title: `İstanbul Elektrikçi | Elektrik Tesisatı, Arıza Servisi | ${site.kisaAd}`,
    desc: "İstanbul Anadolu ve Avrupa Yakası'nda elektrikçi: elektrik tesisatı, arıza servisi, sigorta tamiri, avize ve LED montajı, kamera sistemleri. Aynı gün servis, net fiyat.",
    path: "/",
    body,
    schema: [P.sssSchema(sorular), { "@context": "https://schema.org", "@type": "WebSite", name: site.firmaAdi, url: abs("/"), inLanguage: "tr-TR" }],
  }), 1.0);
}

function blogKart(b) {
  const tarih = new Date(b.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  return `<a class="blog-kart" href="${u(`/blog/${b.slug}/`)}">
    <span class="blog-et">${ikon(hz[b.hizmet].ikon)} ${hz[b.hizmet].ad}</span>
    <h3>${esc(b.baslik)}</h3><p>${esc(b.ozet)}</p><time datetime="${b.tarih}">${tarih}</time></a>`;
}

// ------------------------------------------------------------------ HİZMETLER
function hizmetlerSayfasi() {
  const yol = [["Ana Sayfa", "/"], ["Hizmetler", "/hizmetler/"]];
  const body = `
${P.hero({ bc: L.breadcrumbHtml(yol), h1: "Elektrik Hizmetlerimiz", lead: "İstanbul genelinde konut, dükkân, ofis ve küçük işletmeler için verdiğimiz tüm elektrik hizmetleri. Her hizmetin kapsamını, sürecini ve fiyatı etkileyen etkenleri ilgili sayfada bulabilirsiniz.", rozetler: false })}
<section class="blk"><div class="wrap">${P.kartlar(hizmetler, hizmetUrl)}</div></section>
${P.ctaBant("Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?", "Sorunu anlatın, doğru hizmeti birlikte belirleyelim.")}`;
  yaz("/hizmetler/", L.layout({
    title: "Elektrik Hizmetleri – Tesisat, Arıza, Montaj",
    desc: "Elektrik tesisatı, tesisat tamiri, arıza servisi, sigorta ve pano, avize ve LED montajı, proje, güvenlik kamerası, priz ve topraklama hizmetleri. İstanbul geneli.",
    path: "/hizmetler/", body, aktif: "hizmetler",
    schema: [L.breadcrumbSchema(yol), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: hizmetler.map((h, i) => ({ "@type": "ListItem", position: i + 1, url: abs(hizmetUrl(h)), name: h.ad })) }],
  }), 0.9);
}

function hizmetIcerik(h, { ilce = null } = {}) {
  // Hizmet ve ilçe-hizmet sayfalarının ortak gövdesi
  const tipNot = ilce ? M.hizmetTip[h.slug][T.sec(ilce.tip, h.slug + ilce.slug)] : "";
  const giris = ilce
    ? `<p>${doldur(T.sec(M.girisVaryant, ilce.slug + h.slug), ilce, h)}</p><p>${esc(tipNot)}</p><p>${esc(h.giris[0])}</p>`
    : h.giris.map((g) => `<p>${esc(g)}</p>`).join("");
  return `
  <h2>${ilce ? `${T.de(ilce.ad)} ${h.adKucuk}` : `${h.ad} hizmeti`}</h2>
  ${giris}
  ${ilce ? `<p>${esc(h.giris[1])}</p>` : ""}
  <h2>Neler yapıyoruz?</h2>
  ${P.liste(h.kapsam)}
  <h2>${esc(h.belirtilerBaslik)}</h2>
  ${P.liste(h.belirtiler, "noktali")}
  <h2>Çalışma sürecimiz</h2>
  ${P.adimlar(h.surec)}
  <h2>Fiyatı neler belirler?</h2>
  <p>${ilce ? `${T.de(ilce.ad)} ${h.adKucuk} fiyatı` : `${cumle(h.adKucuk)} fiyatı`} işin kapsamına göre değişir. Telefonda kabaca bilgi veriyor, yerinde gördükten sonra işe başlamadan net fiyatı söylüyoruz.</p>
  ${P.liste(h.fiyatEtkenleri, "fiyat-liste")}`;
}

function hizmetSayfasi(h) {
  const yol = [["Ana Sayfa", "/"], ["Hizmetler", "/hizmetler/"], [h.ad, hizmetUrl(h)]];
  const ilceListe = (yaka) => ilceler.filter((i) => i.yaka === yaka).map((i) => `<a href="${u(comboUrl(i, h))}">${i.ad} ${h.ad}</a>`).join("");
  const waMesaj = `Merhaba, ${h.adKucuk} için bilgi almak istiyorum.`;
  const body = `
${P.hero({ bc: L.breadcrumbHtml(yol), ust: "İstanbul geneli", h1: `İstanbul ${h.ad}`, lead: esc(h.kisa) + " Anadolu ve Avrupa Yakası'nda 39 ilçede.", waMesaj })}
<section class="blk"><div class="wrap icerik-grid">
  <article class="metin">
    ${hizmetIcerik(h)}
    <h2>Sık sorulan sorular</h2>
    ${P.sss(h.sss)}
  </article>
  ${P.yanPanel(h.ad, waMesaj)}
</div></section>
<section class="blk blk-acik"><div class="wrap">
  <div class="blk-bas"><h2>İlçelere göre ${h.adKucuk}</h2><p>Bulunduğunuz ilçeyi seçerek o bölgeye özel bilgileri görebilirsiniz.</p></div>
  <div class="yakalar">
    <div class="yaka-kart"><h3>Anadolu Yakası</h3><div class="link-grid">${ilceListe("anadolu")}</div></div>
    <div class="yaka-kart"><h3>Avrupa Yakası</h3><div class="link-grid">${ilceListe("avrupa")}</div></div>
  </div>
</div></section>
<section class="blk"><div class="wrap"><div class="blk-bas"><h2>İlgili hizmetler</h2></div>${P.kartlar(h.ilgili.map((s) => hz[s]), hizmetUrl)}</div></section>
${P.ctaBant(`${h.ad} için hemen arayın`, undefined, waMesaj)}`;
  yaz(hizmetUrl(h), L.layout({
    title: `${h.title} – İstanbul`,
    desc: `İstanbul ${h.adKucuk}: ${h.kisa} Anadolu ve Avrupa Yakası, aynı gün servis imkânı, işe başlamadan net fiyat.`.slice(0, 300),
    path: hizmetUrl(h), body, aktif: "hizmetler",
    schema: [
      L.breadcrumbSchema(yol),
      P.sssSchema(h.sss),
      { "@context": "https://schema.org", "@type": "Service", name: h.ad, serviceType: h.ad, description: h.kisa, provider: { "@id": L.isletmeId }, areaServed: { "@type": "City", name: "İstanbul" }, url: abs(hizmetUrl(h)) },
    ],
  }), 0.9);
}

// ------------------------------------------------------------------ BÖLGELER
function bolgelerSayfasi() {
  const yol = [["Ana Sayfa", "/"], ["Hizmet Bölgeleri", "/bolgeler/"]];
  const kol = (yaka) => {
    const l = ilceler.filter((i) => i.yaka === yaka);
    return `<div class="yaka-kart"><h2><a href="${u(`/bolgeler/${yakaSlug[yaka]}/`)}">${yakaAd[yaka]}</a> <small>${l.length} ilçe</small></h2>
    <div class="ilce-grid">${l.map((i) => `<a href="${u(ilceUrl(i))}">${i.ad}</a>`).join("")}</div></div>`;
  };
  const body = `
${P.hero({ bc: L.breadcrumbHtml(yol), h1: "Hizmet Bölgelerimiz", lead: "İstanbul'un Anadolu ve Avrupa yakalarındaki 39 ilçenin tamamında elektrikçi hizmeti veriyoruz. İlçenizi seçerek o bölgedeki hizmetlerimizi inceleyebilirsiniz.", rozetler: false })}
<section class="blk"><div class="wrap"><div class="yakalar">${kol("anadolu")}${kol("avrupa")}</div>
<p class="not">${ikon("saat")} Adalar, Şile, Silivri ve Çatalca gibi merkeze uzak bölgelere servis, ulaşım süresi nedeniyle randevuyla planlanır.</p></div></section>
${P.ctaBant()}`;
  yaz("/bolgeler/", L.layout({
    title: "Hizmet Bölgeleri – İstanbul 39 İlçe Elektrikçi",
    desc: "İstanbul Anadolu Yakası ve Avrupa Yakası'nda 39 ilçede elektrikçi hizmeti. İlçenizi seçin, size en yakın ustayı yönlendirelim.",
    path: "/bolgeler/", body, aktif: "bolgeler", schema: [L.breadcrumbSchema(yol)],
  }), 0.8);

  for (const yaka of ["anadolu", "avrupa"]) {
    const l = ilceler.filter((i) => i.yaka === yaka);
    const p = `/bolgeler/${yakaSlug[yaka]}/`;
    const y = [...yol, [`${yakaAd[yaka]} Elektrikçi`, p]];
    const diger = yaka === "anadolu" ? "avrupa" : "anadolu";
    const b = `
${P.hero({ bc: L.breadcrumbHtml(y), ust: `${l.length} ilçe`, h1: `${yakaAd[yaka]} Elektrikçi`, lead: `${yakaAd[yaka]}'ndaki ${l.length} ilçede elektrik tesisatı, arıza servisi, sigorta tamiri, avize ve LED montajı, kamera sistemleri ve proje işleri. ${listeKisa(l)} başta olmak üzere tüm ilçelere servis veriyoruz.` })}
<section class="blk"><div class="wrap">
  <div class="blk-bas"><h2>${yakaAd[yaka]}'nda hizmet verdiğimiz ilçeler</h2></div>
  <div class="ilce-kartlar">${l.map((i) => `<a class="ilce-kart" href="${u(ilceUrl(i))}"><h3>${i.ad} Elektrikçi</h3><p>${i.mahalleler.slice(0, 4).join(", ")} ve diğer mahalleler</p><span class="kart-ok">İncele ${ikon("ok")}</span></a>`).join("")}</div>
</div></section>
<section class="blk blk-acik"><div class="wrap">
  <div class="blk-bas"><h2>${yakaAd[yaka]}'nda hizmetlerimiz</h2></div>
  ${P.kartlar(hizmetler, hizmetUrl)}
  <p class="orta"><a class="btn btn-ghost" href="${u(`/bolgeler/${yakaSlug[diger]}/`)}">${yakaAd[diger]} ilçeleri ${ikon("ok")}</a></p>
</div></section>
${P.ctaBant(`${yakaAd[yaka]}'nda elektrikçi mi arıyorsunuz?`)}`;
    yaz(p, L.layout({
      title: `${yakaAd[yaka]} Elektrikçi – ${l.length} İlçede Servis`,
      desc: `${yakaAd[yaka]} elektrikçi: ${listeKisa(l)} ve diğer ilçelerde elektrik tesisatı, arıza servisi, sigorta tamiri, avize, LED ve kamera montajı.`,
      path: p, body: b, aktif: "bolgeler",
      schema: [L.breadcrumbSchema(y)],
    }), 0.8);
  }
}
const listeKisa = (l) => l.slice(0, 4).map((i) => i.ad).join(", ");

function ilceSayfasi(i) {
  const yol = [["Ana Sayfa", "/"], ["Hizmet Bölgeleri", "/bolgeler/"], [yakaAd[i.yaka], `/bolgeler/${yakaSlug[i.yaka]}/`], [`${i.ad} Elektrikçi`, ilceUrl(i)]];
  const waMesaj = `Merhaba, ${T.de(i.ad)} elektrik işi için bilgi almak istiyorum.`;
  const tipMetin = i.tip.map((t) => `<p>${doldur(M.tipGenel[t], i)}</p>`).join("");
  const sorular = [
    [`${T.de(i.ad)} aynı gün elektrikçi gönderebilir misiniz?`, `Gün içindeki yoğunluğa göre ${T.e(i.ad)} çoğu zaman aynı gün usta yönlendirebiliyoruz. Aradığınızda tahmini varış süresini söylüyoruz.${i.not ? " " + i.not : ""}`],
    [`${i.ad} genelinde hangi mahallelere hizmet veriyorsunuz?`, `${T.listeMetni(i.mahalleler)} başta olmak üzere ${i.ad} ilçesinin tüm mahallelerine servis veriyoruz.`],
    [`${T.de(i.ad)} hangi elektrik işlerini yapıyorsunuz?`, `Elektrik tesisatı ve tesisat yenileme, tesisat tamiri, arıza servisi, sigorta ve pano tamiri, avize ve LED montajı, elektrik projesi, güvenlik kamerası, priz–anahtar montajı ile topraklama ve kaçak akım işleri.`],
    ["Elektrik kesildi, önce ne yapmalıyım?", `Önce komşularınızda elektrik olup olmadığına bakın. Komşularda da yoksa sorun şebekededir; ${i.yaka === "anadolu" ? "AYEDAŞ" : "BEDAŞ"} 186 arıza hattını arayabilirsiniz. Yalnızca sizde yoksa panodaki sigorta ve kaçak akım rölesini kontrol edin, kalkmıyorsa bizi arayın.`],
  ];
  const komsular = i.komsu.map((s) => ilc[s]).filter(Boolean);
  const body = `
${P.hero({ bc: L.breadcrumbHtml(yol), ust: `${yakaAd[i.yaka]} · İstanbul`, h1: `${i.ad} Elektrikçi`, lead: doldur(T.sec(M.ilceGiris, i.slug), i), waMesaj })}
<section class="blk"><div class="wrap">
  <div class="blk-bas"><h2>${T.de(i.ad)} verdiğimiz elektrik hizmetleri</h2></div>
  ${P.kartlar(hizmetler, (h) => comboUrl(i, h), (h) => `${i.ad} ${h.ad}`)}
</div></section>
<section class="blk blk-acik"><div class="wrap icerik-grid">
  <article class="metin">
    <h2>${i.ad} elektrik işlerinde en sık karşılaştıklarımız</h2>
    ${tipMetin}
    ${i.not ? `<p class="not">${ikon("saat")} ${esc(i.not)}</p>` : ""}
    <h2>${i.ad} mahalleleri</h2>
    <p>${i.ad} ilçesinin tüm mahallelerine servis veriyoruz. En çok çağrı aldığımız mahallelerden bazıları:</p>
    <ul class="etiketler">${i.mahalleler.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
    <h2>Sık sorulan sorular</h2>
    ${P.sss(sorular)}
  </article>
  ${P.yanPanel(`${i.ad} Elektrikçi`, waMesaj)}
</div></section>
<section class="blk"><div class="wrap">
  <div class="blk-bas"><h2>Yakın ilçeler</h2><p>${i.ad} çevresinde de hizmet veriyoruz.</p></div>
  <div class="link-grid link-grid-b">${komsular.map((k) => `<a href="${u(ilceUrl(k))}">${k.ad} Elektrikçi</a>`).join("")}<a href="${u(`/bolgeler/${yakaSlug[i.yaka]}/`)}">Tüm ${yakaAd[i.yaka]} ilçeleri</a></div>
</div></section>
${P.ctaBant(`${T.de(i.ad)} elektrikçi mi lazım?`, "Arayın, sorununuzu dinleyelim; ustamızı yönlendirelim.", waMesaj)}`;
  yaz(ilceUrl(i), L.layout({
    title: `${i.ad} Elektrikçi – Tesisat, Arıza, Sigorta Tamiri`,
    desc: `${i.ad} elektrikçi: ${i.mahalleler.slice(0, 3).join(", ")} ve tüm mahallelerde elektrik tesisatı, arıza servisi, sigorta tamiri, avize, LED ve kamera montajı. Net fiyat, aynı gün servis.`,
    path: ilceUrl(i), body, aktif: "bolgeler",
    schema: [
      L.breadcrumbSchema(yol), P.sssSchema(sorular),
      { "@context": "https://schema.org", "@type": "Service", name: `${i.ad} Elektrikçi`, serviceType: "Elektrikçi", provider: { "@id": L.isletmeId }, areaServed: { "@type": "AdministrativeArea", name: `${i.ad}, İstanbul` }, url: abs(ilceUrl(i)) },
    ],
  }), 0.8);
}

function comboSayfasi(i, h) {
  const p = comboUrl(i, h);
  const yol = [["Ana Sayfa", "/"], ["Hizmet Bölgeleri", "/bolgeler/"], [`${i.ad} Elektrikçi`, ilceUrl(i)], [`${i.ad} ${h.ad}`, p]];
  const waMesaj = `Merhaba, ${T.de(i.ad)} ${h.adKucuk} için bilgi almak istiyorum.`;
  const sorular = [
    [`${T.de(i.ad)} ${h.adKucuk} için aynı gün gelebilir misiniz?`, `Gün içindeki yoğunluğa bağlı olarak ${T.e(i.ad)} çoğu zaman aynı gün yönlendirme yapabiliyoruz. Aradığınızda size en yakın ustanın tahmini varış süresini söylüyoruz.${i.not ? " " + i.not : ""}`],
    [`${i.ad} ${h.adKucuk} fiyatı nasıl belirleniyor?`, `Fiyat; ${h.fiyatEtkenleri.map((f) => f.toLocaleLowerCase("tr")).join(", ")} gibi etkenlere göre belirlenir. Telefonda kabaca bilgi verir, yerinde görünce net fiyatı işe başlamadan söyleriz.`],
    ...T.secCoklu(h.sss, 2, i.slug + h.slug),
    [`${i.ad} genelinde hangi mahallelere geliyorsunuz?`, `${T.listeMetni(i.mahalleler.slice(0, 6))} başta olmak üzere ${i.ad} ilçesinin tüm mahallelerine geliyoruz.`],
  ];
  const komsular = i.komsu.map((s) => ilc[s]).filter(Boolean);
  const digerHizmet = hizmetler.filter((x) => x.slug !== h.slug);
  const body = `
${P.hero({ bc: L.breadcrumbHtml(yol), ust: `${i.ad} · ${yakaAd[i.yaka]}`, h1: `${i.ad} ${h.ad}`, lead: `${T.de(i.ad)} ${esc(T.kucuk(h.kisa.charAt(0)) + h.kisa.slice(1))} ${i.mahalleler.slice(0, 3).join(", ")} başta olmak üzere ilçenin tüm mahallelerine servis.`, waMesaj })}
<section class="blk"><div class="wrap icerik-grid">
  <article class="metin">
    ${hizmetIcerik(h, { ilce: i })}
    <h2>${T.de(i.ad)} hizmet verdiğimiz mahalleler</h2>
    <ul class="etiketler">${i.mahalleler.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
    ${i.not ? `<p class="not">${ikon("saat")} ${esc(i.not)}</p>` : ""}
    <h2>Sık sorulan sorular</h2>
    ${P.sss(sorular)}
  </article>
  ${P.yanPanel(`${i.ad} ${h.ad}`, waMesaj)}
</div></section>
<section class="blk blk-acik"><div class="wrap iki-liste">
  <div><h2>${T.de(i.ad)} diğer hizmetler</h2><div class="link-grid">${digerHizmet.map((x) => `<a href="${u(comboUrl(i, x))}">${i.ad} ${x.ad}</a>`).join("")}</div></div>
  <div><h2>Yakın ilçelerde ${h.adKucuk}</h2><div class="link-grid">${komsular.map((k) => `<a href="${u(comboUrl(k, h))}">${k.ad} ${h.ad}</a>`).join("")}<a href="${u(hizmetUrl(h))}">İstanbul ${h.ad}</a></div></div>
</div></section>
${P.ctaBant(`${i.ad} ${h.adKucuk} için arayın`, "Sorununuzu anlatın; size fiyat ve varış süresi bilgisini verelim.", waMesaj)}`;
  yaz(p, L.layout({
    title: `${i.ad} ${h.ad} – Aynı Gün Servis`,
    desc: `${i.ad} ${h.adKucuk}: ${h.kisa} ${i.mahalleler.slice(0, 2).join(", ")} ve tüm ${i.ad} mahallelerinde. İşe başlamadan net fiyat.`,
    path: p, body, aktif: "bolgeler",
    schema: [
      L.breadcrumbSchema(yol), P.sssSchema(sorular),
      { "@context": "https://schema.org", "@type": "Service", name: `${i.ad} ${h.ad}`, serviceType: h.ad, description: h.kisa, provider: { "@id": L.isletmeId }, areaServed: { "@type": "AdministrativeArea", name: `${i.ad}, İstanbul` }, url: abs(p) },
    ],
  }), 0.7);
}

// ------------------------------------------------------------------ BLOG
function blogSayfalari() {
  const yol = [["Ana Sayfa", "/"], ["Elektrik Rehberi", "/blog/"]];
  yaz("/blog/", L.layout({
    title: "Elektrik Rehberi – Ev Elektriği Hakkında Bilmeniz Gerekenler",
    desc: "Sigorta neden atar, kaçak akım rölesi nedir, eski binada tesisat ne zaman yenilenir? Usta elektrikçilerden pratik rehber yazıları.",
    path: "/blog/", aktif: "blog", schema: [L.breadcrumbSchema(yol)],
    body: `${P.hero({ bc: L.breadcrumbHtml(yol), h1: "Elektrik Rehberi", lead: "Evde ve iş yerinde elektrikle ilgili en çok sorulan konuları, sahada edindiğimiz tecrübeyle anlatıyoruz.", rozetler: false })}
<section class="blk"><div class="wrap"><div class="blog-grid">${blog.map(blogKart).join("")}</div></div></section>${P.ctaBant()}`,
  }), 0.6);
  for (const b of blog) {
    const p = `/blog/${b.slug}/`;
    const y = [...yol, [b.baslik, p]];
    const h = hz[b.hizmet];
    const digerleri = blog.filter((x) => x.slug !== b.slug).slice(0, 3);
    const tarih = new Date(b.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    yaz(p, L.layout({
      title: b.baslik, desc: b.ozet, path: p, aktif: "blog", ogType: "article",
      schema: [L.breadcrumbSchema(y), { "@context": "https://schema.org", "@type": "BlogPosting", headline: b.baslik, description: b.ozet, datePublished: b.tarih, dateModified: b.tarih, inLanguage: "tr-TR", author: { "@id": L.isletmeId }, publisher: { "@id": L.isletmeId }, mainEntityOfPage: abs(p) }],
      body: `${P.hero({ bc: L.breadcrumbHtml(y), ust: `<time datetime="${b.tarih}">${tarih}</time>`, h1: esc(b.baslik), lead: esc(b.ozet), rozetler: false })}
<section class="blk"><div class="wrap icerik-grid">
  <article class="metin yazi">${b.icerik}
    <div class="ilgili-hizmet">${ikon(h.ikon, "ic ic-b")}<div><b>Bu konuda yardıma mı ihtiyacınız var?</b><p>${esc(h.kisa)}</p><a href="${u(hizmetUrl(h))}">${h.ad} hizmetimiz ${ikon("ok")}</a></div></div>
  </article>
  ${P.yanPanel("Usta desteği", `Merhaba, "${b.baslik}" yazınızı okudum, bilgi almak istiyorum.`)}
</div></section>
<section class="blk blk-acik"><div class="wrap"><div class="blk-bas"><h2>Diğer yazılar</h2></div><div class="blog-grid">${digerleri.map(blogKart).join("")}</div></div></section>
${P.ctaBant()}`,
    }), 0.5);
  }
}

// ------------------------------------------------------------------ KURUMSAL
function kurumsal() {
  // Hakkımızda
  let yol = [["Ana Sayfa", "/"], ["Hakkımızda", "/hakkimizda/"]];
  const belgeler = site.belgeler.length ? `<h2>Belgelerimiz</h2>${P.liste(site.belgeler)}` : "";
  yaz("/hakkimizda/", L.layout({
    title: "Hakkımızda", desc: `${site.firmaAdi}: İstanbul'un iki yakasında elektrik tesisatı, arıza servisi ve montaj işleri yapan elektrikçi ekibi.`,
    path: "/hakkimizda/", aktif: "hakkimizda", schema: [L.breadcrumbSchema(yol)],
    body: `${P.hero({ bc: L.breadcrumbHtml(yol), h1: "Hakkımızda", lead: `${esc(site.firmaAdi)}, İstanbul'un Anadolu ve Avrupa yakalarında konut ve iş yerlerine elektrik hizmeti veren bir usta ekibidir.`, rozetler: false })}
${P.guvenSerit()}
<section class="blk"><div class="wrap icerik-grid"><article class="metin">
  <h2>Biz kimiz?</h2>
  <p>${site.kurulusYili ? `${site.kurulusYili} yılından bu yana` : "Uzun yıllardır"} İstanbul'da elektrik işleri yapıyoruz. Bir prizin değişiminden bir dükkânın komple tesisatına, gece yarısı kesilen elektrikten yeni bir evin avize montajına kadar her işi aynı özenle ele alıyoruz.</p>
  <p>Elektrik, hatanın kabul edilmediği bir iş. Bu yüzden kısa yoldan değil, doğru yoldan çalışıyoruz: arızayı ölçerek buluyor, kabloyu yükü taşıyacak kesitte seçiyor, kaçak akım korumasını ve topraklamayı atlamıyoruz.</p>
  <h2>Çalışma ilkelerimiz</h2>
  ${P.liste(["İşe başlamadan önce net fiyat; onayınız olmadan iş yok", "Arıza tespitinde ölçüme dayalı çalışma", "Yönetmeliğe uygun malzeme ve işçilik", "Randevu saatine sadakat; gecikme olursa önceden haber", "İş sonunda temiz teslim ve yapılan işin açıklaması", "İşçilikten kaynaklanan sorunlarda ücretsiz geri dönüş"])}
  ${belgeler}
  <h2>Hizmet bölgemiz</h2>
  <p>Anadolu Yakası'nda Kadıköy'den Tuzla'ya, Avrupa Yakası'nda Beşiktaş'tan Beylikdüzü'ne kadar 39 ilçenin tamamına servis veriyoruz. <a href="${u("/bolgeler/")}">Tüm hizmet bölgelerimizi görün.</a></p>
</article>${P.yanPanel("Bize ulaşın")}</div></section>${P.ctaBant()}`,
  }), 0.5);

  // SSS
  yol = [["Ana Sayfa", "/"], ["Sık Sorulan Sorular", "/sss/"]];
  const genel = [
    ["Hangi ilçelere hizmet veriyorsunuz?", "İstanbul'un 39 ilçesinin tamamına servis veriyoruz. Adalar, Şile, Silivri ve Çatalca gibi uzak bölgeler randevuyla planlanır."],
    ["Fiyatı ne zaman öğrenirim?", "Telefonda kabaca bilgi veriyoruz; usta yerinde gördükten sonra işe başlamadan net fiyatı söylüyor."],
    ["Ödeme seçenekleriniz neler?", "Nakit ve banka havalesi/EFT ile ödeme alıyoruz. Kart ile ödeme seçeneğini aramanız sırasında sorabilirsiniz."],
    ["Fatura kesiyor musunuz?", "Evet, yapılan iş için fatura düzenliyoruz."],
    ["Yaptığınız işe garanti var mı?", "İşçilikten kaynaklanan bir sorun olursa geri dönüp ücretsiz düzeltiyoruz. Malzemeler üretici garantisi kapsamındadır."],
    ["Hafta sonu çalışıyor musunuz?", `${site.calismaSaatleri} arasında çalışıyoruz.${site.acilServis724 ? " Acil arızalar için 7/24 ulaşabilirsiniz." : ""}`],
  ];
  const tum = [...genel, ...hizmetler.flatMap((h) => h.sss.slice(0, 2))];
  const gruplar = `<h2>Genel</h2>${P.sss(genel)}${hizmetler.map((h) => `<h2><a href="${u(hizmetUrl(h))}">${h.ad}</a></h2>${P.sss(h.sss.slice(0, 2))}`).join("")}`;
  yaz("/sss/", L.layout({
    title: "Sık Sorulan Sorular – Elektrikçi", desc: "Elektrik tesisatı, arıza, sigorta, avize ve LED montajı, kamera sistemleri hakkında sık sorulan sorular ve cevapları.",
    path: "/sss/", schema: [L.breadcrumbSchema(yol), P.sssSchema(tum)],
    body: `${P.hero({ bc: L.breadcrumbHtml(yol), h1: "Sık Sorulan Sorular", lead: "Merak ettiğiniz sorunun cevabını bulamazsanız bizi arayın ya da WhatsApp'tan yazın.", rozetler: false })}
<section class="blk"><div class="wrap dar metin">${gruplar}</div></section>${P.ctaBant()}`,
  }), 0.5);

  // İletişim
  yol = [["Ana Sayfa", "/"], ["İletişim", "/iletisim/"]];
  const opt = (l) => l.map((x) => `<option>${esc(x)}</option>`).join("");
  const anadolu = ilceler.filter((i) => i.yaka === "anadolu").map((i) => i.ad);
  const avrupa = ilceler.filter((i) => i.yaka === "avrupa").map((i) => i.ad);
  yaz("/iletisim/", L.layout({
    title: "İletişim – Elektrikçi Çağır", desc: `${site.firmaAdi} iletişim: ${site.telefon}. İstanbul'un 39 ilçesinde elektrik servisi için arayın ya da WhatsApp'tan yazın.`,
    path: "/iletisim/", aktif: "iletisim", schema: [L.breadcrumbSchema(yol)],
    body: `${P.hero({ bc: L.breadcrumbHtml(yol), h1: "İletişim", lead: "En hızlı yol telefon. Fotoğraflı anlatmak isterseniz WhatsApp'tan yazabilir ya da aşağıdaki formu doldurabilirsiniz.", rozetler: false })}
<section class="blk"><div class="wrap iletisim-grid">
  <div class="ilet-kartlar">
    <a class="ilet-kart" href="tel:${site.telefonLink}" data-ev="tel">${ikon("telefon", "ic ic-b")}<span>Telefon</span><b>${site.telefon}</b></a>
    <a class="ilet-kart" href="${L.waLink()}" target="_blank" rel="noopener" data-ev="whatsapp">${ikon("whatsapp", "ic ic-b")}<span>WhatsApp</span><b>Mesaj gönderin</b></a>
    <a class="ilet-kart" href="mailto:${site.eposta}">${ikon("posta", "ic ic-b")}<span>E-posta</span><b>${site.eposta}</b></a>
    <div class="ilet-kart">${ikon("saat", "ic ic-b")}<span>Çalışma saatleri</span><b>${esc(site.calismaSaatleri)}</b>${site.acilServis724 ? "<small>Acil arıza: 7/24</small>" : ""}</div>
    ${site.sosyal.instagram ? `<a class="ilet-kart" href="${site.sosyal.instagram}" target="_blank" rel="noopener">${ikon("instagram", "ic ic-b")}<span>Instagram</span><b>@${site.sosyal.instagram.replace(/\/$/, "").split("/").pop()}</b></a>` : ""}
    <div class="ilet-kart">${ikon("konum", "ic ic-b")}<span>Hizmet bölgesi</span><b>${L.adresMetni()}</b></div>
  </div>
  <form class="form" id="talep" novalidate>
    <h2>Servis talebi</h2>
    <p>Formu gönderdiğinizde bilgileriniz WhatsApp mesajı olarak hazırlanır; göndermeden önce kontrol edebilirsiniz.</p>
    <label>Adınız<input name="ad" required autocomplete="name"></label>
    <label>Telefonunuz<input name="tel" type="tel" required autocomplete="tel" inputmode="tel"></label>
    <div class="form-iki">
      <label>İlçe<select name="ilce" required><option value="">Seçin</option><optgroup label="Anadolu Yakası">${opt(anadolu)}</optgroup><optgroup label="Avrupa Yakası">${opt(avrupa)}</optgroup></select></label>
      <label>Hizmet<select name="hizmet" required><option value="">Seçin</option>${opt(hizmetler.map((h) => h.ad))}<option>Diğer</option></select></label>
    </div>
    <label>Kısaca sorun / iş<textarea name="mesaj" rows="4"></textarea></label>
    <label class="onay"><input type="checkbox" name="kvkk" required> <span><a href="${u("/kvkk-aydinlatma-metni/")}" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum.</span></label>
    <button class="btn btn-acc btn-lg" type="submit">${ikon("whatsapp")}<span>WhatsApp ile gönder</span></button>
    <p class="form-hata" role="alert" hidden>Lütfen zorunlu alanları doldurun.</p>
  </form>
</div>
${site.koordinat ? `<div class="wrap harita"><iframe title="Konum" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${site.koordinat.lat},${site.koordinat.lng}&z=13&output=embed"></iframe></div>` : ""}
</section>`,
  }), 0.6);

  // Yasal sayfalar
  const yasal = (p, baslik, icerik) => {
    const y = [["Ana Sayfa", "/"], [baslik, p]];
    yaz(p, L.layout({ title: baslik, desc: `${site.firmaAdi} ${baslik}.`, path: p, schema: [L.breadcrumbSchema(y)],
      body: `${P.hero({ bc: L.breadcrumbHtml(y), h1: baslik, lead: "Son güncelleme: " + new Date().toLocaleDateString("tr-TR"), rozetler: false })}<section class="blk"><div class="wrap dar metin">${icerik}</div></section>` }), 0.2);
  };
  yasal("/kvkk-aydinlatma-metni/", "KVKK Aydınlatma Metni", `
<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla <b>${esc(site.firmaAdi)}</b> tarafından hazırlanmıştır.</p>
<h2>İşlenen kişisel veriler</h2><p>Bizimle telefon, WhatsApp, e-posta veya iletişim formu üzerinden paylaştığınız ad-soyad, telefon numarası, adres/ilçe bilgisi ve talebinize ilişkin açıklamalar.</p>
<h2>İşleme amaçları</h2><p>Servis talebinizin alınması, ustanın yönlendirilmesi, fiyat bilgisinin iletilmesi, hizmetin yerine getirilmesi, faturalandırma ve yasal yükümlülüklerin yerine getirilmesi.</p>
<h2>Hukuki sebep</h2><p>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması ve veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi (KVKK m.5/2-c ve m.5/2-ç).</p>
<h2>Aktarım</h2><p>Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz. İletişim formu, mesajınızı WhatsApp uygulaması üzerinden iletmenizi sağlar; bu durumda ilgili uygulamanın gizlilik koşulları da geçerlidir.</p>
<h2>Haklarınız</h2><p>KVKK'nın 11. maddesi kapsamındaki haklarınıza ilişkin taleplerinizi <a href="mailto:${site.eposta}">${site.eposta}</a> adresine iletebilirsiniz.</p>
<p class="not">Bu metin genel bir şablondur; işletmenize uygunluğu için bir hukukçuya danışmanız önerilir.</p>`);
  yasal("/gizlilik-politikasi/", "Gizlilik Politikası", `
<p>${esc(site.firmaAdi)} olarak web sitemizi ziyaret edenlerin gizliliğine önem veriyoruz.</p>
<h2>Toplanan bilgiler</h2><p>Sitemizde üyelik sistemi bulunmaz. İletişim formu, girdiğiniz bilgileri sunucumuza kaydetmez; bilgileriniz yalnızca sizin onayınızla WhatsApp mesajı olarak gönderilir.</p>
<h2>Çerezler</h2><p>Site, yazı tipleri ve harita gibi üçüncü taraf hizmetleri kullanır; bu hizmetler kendi çerez politikalarına tabidir. Ziyaret istatistikleri için analiz aracı eklenirse bu sayfa güncellenecektir.</p>
<h2>İletişim</h2><p>Sorularınız için <a href="mailto:${site.eposta}">${site.eposta}</a> adresine yazabilirsiniz.</p>`);

  // 404
  yaz("/404.html", L.layout({ title: "Sayfa bulunamadı", desc: "Aradığınız sayfa bulunamadı.", path: "/404.html", robots: "noindex",
    body: `${P.hero({ h1: "Bu sayfa bulunamadı", lead: "Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Hizmetlerimize veya bölgelerimize göz atabilir, doğrudan bizi arayabilirsiniz.", rozetler: false })}
<section class="blk"><div class="wrap">${P.kartlar(hizmetler.slice(0, 6), hizmetUrl)}</div></section>` }));
}

// ------------------------------------------------------------------ DOSYALAR
function statik() {
  const kaynak = path.join(__dirname, "assets");
  const hedef = path.join(DIST, "assets");
  fs.mkdirSync(hedef, { recursive: true });
  for (const f of fs.readdirSync(kaynak)) fs.copyFileSync(path.join(kaynak, f), path.join(hedef, f));
  const bugun = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sayfalar
    .map(([p, o]) => `  <url><loc>${abs(p)}</loc><lastmod>${bugun}</lastmod><priority>${o.toFixed(1)}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml);
  fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`);
  fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
  if (site.cname) fs.writeFileSync(path.join(DIST, "CNAME"), site.cname + "\n");
}

fs.rmSync(DIST, { recursive: true, force: true });
anaSayfa();
hizmetlerSayfasi();
hizmetler.forEach(hizmetSayfasi);
bolgelerSayfasi();
ilceler.forEach(ilceSayfasi);
for (const i of ilceler) for (const h of hizmetler) comboSayfasi(i, h);
blogSayfalari();
kurumsal();
statik();
console.log(`✓ ${sayfalar.length} sayfa üretildi → dist/`);
