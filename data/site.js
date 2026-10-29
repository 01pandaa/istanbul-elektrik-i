// =============================================================
//  FİRMA AYARLARI — Sitedeki tüm firma bilgileri buradan gelir.
//  Sadece bu dosyayı düzenleyip yeniden derlemeniz yeterli.
// =============================================================
module.exports = {
  // Firma adı (logo, başlıklar ve schema'da kullanılır)
  firmaAdi: "Garden Elektrik",
  kisaAd: "Garden Elektrik",
  slogan: "İstanbul'un iki yakasında güvenilir elektrik servisi",

  // Alan adı: sonunda / OLMADAN yazın. Örn: https://www.ustaelektrik.com
  siteUrl: "https://www.gardenelektrikci.com",
  // GitHub Pages proje sitesi (kullanici.github.io/repo) için "/repo" yazın.
  // Kendi alan adınızı bağladıysanız "" bırakın.
  basePath: "",
  // Kendi alan adınızı GitHub Pages'e bağladığınızda buraya yazın (örn: "www.ustaelektrik.com").
  // Boş bırakılırsa CNAME dosyası oluşturulmaz.
  cname: "www.gardenelektrikci.com",

  // İletişim — telefonlar hem görünen hem arama formatında
  telefon: "0546 967 19 45",
  telefonLink: "+905469671945",
  whatsapp: "905469671945", // ülke koduyla, + olmadan
  eposta: "gardenelektrik3134@gmail.com",
  adres: {
    sokak: "" /* açık adres verilince yazılacak; boşken sitede gösterilmez */,
    ilce: "Kadıköy",
    il: "İstanbul",
    postaKodu: "",
  },
  // Haritada gösterilecek konum (açık adres girilince doldurun; null iken harita gösterilmez)
  koordinat: null,
  // Google Haritalar işletme linki (varsa)
  haritaLinki: "",

  calismaSaatleri: "Haftanın 7 günü, 24 saat",
  // Gerçekten 7/24 acil servis veriyorsanız true bırakın, vermiyorsanız false yapın.
  acilServis724: true,

  kurulusYili: 2010,
  // Sahip olunan belgeler (gerçek olanları yazın; boş bırakılırsa gösterilmez)
  belgeler: [],

  sosyal: {
    instagram: "https://www.instagram.com/gardenelektrik34/",
    facebook: "",
  },

  // Gerçek müşteri yorumlarını buraya ekleyin. Boş bırakılırsa bölüm gösterilmez.
  // Örnek: { ad: "Ahmet Y.", ilce: "Kadıköy", metin: "..." }
  yorumlar: [],
};
