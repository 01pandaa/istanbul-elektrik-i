// Türkçe ek ve metin yardımcıları
const UNLULER = "aeıioöuü";
const KALIN = "aıou";
const SERT = "fstkçşhp";

const kucuk = (s) => s.toLocaleLowerCase("tr");
const buyukIlk = (s) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);

function sonUnlu(kelime) {
  const k = kucuk(kelime);
  for (let i = k.length - 1; i >= 0; i--) if (UNLULER.includes(k[i])) return k[i];
  return "e";
}
const sonHarf = (k) => kucuk(k).slice(-1);
const unluyleBiter = (k) => UNLULER.includes(sonHarf(k));

// Kadıköy'de, Beşiktaş'ta
function de(ad) {
  const d = SERT.includes(sonHarf(ad)) ? "t" : "d";
  return `${ad}'${d}${KALIN.includes(sonUnlu(ad)) ? "a" : "e"}`;
}
// Kadıköy'den, Beşiktaş'tan
function den(ad) {
  const d = SERT.includes(sonHarf(ad)) ? "t" : "d";
  return `${ad}'${d}${KALIN.includes(sonUnlu(ad)) ? "an" : "en"}`;
}
// Kadıköy'e, Ümraniye'ye
function e(ad) {
  const u = KALIN.includes(sonUnlu(ad)) ? "a" : "e";
  return `${ad}'${unluyleBiter(ad) ? "y" : ""}${u}`;
}

// Deterministik seçim (aynı sayfa her derlemede aynı metni alır)
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const sec = (dizi, anahtar) => dizi[hash(anahtar) % dizi.length];
function secCoklu(dizi, adet, anahtar) {
  const k = dizi.map((x, i) => [hash(anahtar + i), x]).sort((a, b) => a[0] - b[0]);
  return k.slice(0, adet).map((x) => x[1]);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function listeMetni(dizi) {
  if (dizi.length <= 1) return dizi.join("");
  return dizi.slice(0, -1).join(", ") + " ve " + dizi[dizi.length - 1];
}

const deki = (ad) => de(ad) + "ki";
module.exports = { kucuk, buyukIlk, de, deki, den, e, hash, sec, secCoklu, esc, listeMetni };
