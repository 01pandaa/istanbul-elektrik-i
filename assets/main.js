(function () {
  // Mobil menü
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var acik = nav.classList.toggle("acik");
      btn.setAttribute("aria-expanded", acik ? "true" : "false");
    });
  }

  // Arama / WhatsApp tıklama ölçümü (Google Analytics / Tag Manager eklenirse otomatik çalışır)
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-ev]");
    if (!a) return;
    var ev = a.getAttribute("data-ev") === "tel" ? "telefon_tikla" : "whatsapp_tikla";
    if (window.gtag) window.gtag("event", ev, { sayfa: location.pathname });
    if (window.dataLayer) window.dataLayer.push({ event: ev, sayfa: location.pathname });
  });

  // İletişim formu → WhatsApp mesajı
  var form = document.getElementById("talep");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var hata = form.querySelector(".form-hata");
      if (!form.checkValidity()) { hata.hidden = false; form.reportValidity(); return; }
      hata.hidden = true;
      var d = new FormData(form);
      var metin = "Merhaba, servis talebim var.\n" +
        "Ad: " + d.get("ad") + "\nTelefon: " + d.get("tel") +
        "\nİlçe: " + d.get("ilce") + "\nHizmet: " + d.get("hizmet") +
        (d.get("mesaj") ? "\nAçıklama: " + d.get("mesaj") : "");
      var wa = document.querySelector('.mbar-wa, [data-ev="whatsapp"]');
      var no = wa ? (wa.getAttribute("href").match(/wa\.me\/(\d+)/) || [])[1] : "";
      window.open("https://wa.me/" + no + "?text=" + encodeURIComponent(metin), "_blank", "noopener");
    });
  }
})();
