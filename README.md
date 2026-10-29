# İstanbul Elektrikçi Web Sitesi

İstanbul Anadolu ve Avrupa Yakası'nda hizmet veren elektrikçi için statik, SEO odaklı web sitesi. Bağımlılık yok; Node.js ile derlenir, GitHub Pages'te otomatik yayınlanır.

## Sayfa yapısı (456 sayfa)

| Sayfa | Adres örneği | Adet |
|---|---|---|
| Ana sayfa | `/` | 1 |
| Hizmetler | `/hizmetler/`, `/hizmetler/avize-montaji/` | 11 |
| Bölgeler | `/bolgeler/`, `/bolgeler/anadolu-yakasi/` | 3 |
| İlçe sayfaları | `/kadikoy-elektrikci/` | 39 |
| İlçe × hizmet (programatik) | `/kadikoy-avize-montaji/` | 390 |
| Rehber (blog) | `/blog/sigorta-neden-atar/` | 7 |
| Kurumsal | Hakkımızda, SSS, İletişim, KVKK, Gizlilik | 5 |

Her sayfada: başlık/açıklama, canonical, Open Graph, `Electrician` + `Service` + `FAQPage` + `BreadcrumbList` yapılandırılmış verisi. `sitemap.xml` ve `robots.txt` otomatik üretilir.

İlçe sayfalarındaki metinler, ilçenin yapı tipine (eski apartman, yeni site, villa, sanayi, tarihi) göre farklılaşır; mahalle adları, komşu ilçe bağlantıları ve sorular ilçeye özeldir.

## Firma bilgilerini değiştirme

Tüm firma bilgileri **`data/site.js`** dosyasında: firma adı, telefon, WhatsApp, e-posta, adres, alan adı, çalışma saatleri, 7/24 servis var/yok, belgeler, müşteri yorumları.

- Hizmet metinleri: `data/hizmetler.js`
- İlçeler ve mahalleler: `data/ilceler.js`
- Rehber yazıları: `data/blog.js`
- İlçe tipine göre metinler: `data/metinler.js`

## Yerelde derleme

```bash
node build.js        # çıktı: dist/
npx serve dist       # http://localhost:3000
```

## GitHub Pages ile yayın

1. Repo'yu GitHub'a gönderin.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions** seçin.
3. `main` dalına her push'ta site otomatik derlenip yayınlanır.

**Kendi alan adınız:** `data/site.js` içinde `siteUrl` (ör. `https://www.ornekelektrik.com`) ve `cname` (ör. `www.ornekelektrik.com`) alanlarını doldurun, alan adınızın DNS'inde GitHub Pages kayıtlarını ekleyin.

**Alan adı yoksa:** `siteUrl: "https://KULLANICI.github.io"` ve `basePath: "/REPO-ADI"` yapın.

## Yayından sonra

- Google Search Console'a siteyi ekleyip `sitemap.xml` gönderin.
- Google Business Profile (Haritalar) kaydı açın; adres/telefonun sitedekiyle birebir aynı olmasına dikkat edin.
- Gerçek iş fotoğraflarını ve müşteri yorumlarını ekleyin (`data/site.js → yorumlar`).
