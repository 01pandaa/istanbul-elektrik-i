// İlçe yapı tipine göre değişen metinler. {ilce}, {ilceDe} yer tutucuları derlemede doldurulur.
const tipGenel = {
  eski: "{ilceDeki} konutların önemli bir kısmı onlarca yıllık apartmanlardan oluşuyor. Bu binalarda en sık karşılaştığımız sorunlar; alüminyum ya da ince kesitli kablolar, topraklaması olmayan prizler, buşonlu eski sigorta kutuları ve bugünün cihaz yüküne yetmeyen hatlar.",
  yeni: "{ilceDe} son yıllarda yapılan site ve rezidanslarda tesisat altyapısı genellikle güncel. Burada daha çok avize ve LED montajı, kamera sistemleri, ek priz ve klima hattı gibi taleplerle; garanti süresi dolmuş binalarda ise kaçak akım rölesi ve pano arızalarıyla karşılaşıyoruz.",
  villa: "{ilceDeki} müstakil ev, villa ve bahçeli yapılarda tesisat, apartmanlara göre daha uzun hatlar ve dış mekân kullanımı içeriyor. Bahçe ve cephe aydınlatması, topraklama, çevre güvenliği için kamera sistemleri ve fırtına sonrası arızalar bu bölgede en çok çağrıldığımız işler.",
  sanayi: "{ilceDe} konutların yanında atölye, dükkân, depo ve küçük sanayi işletmeleri de yoğun. Bu işletmelerde trifaze sistemler, pano bakımı, makine besleme hatları, iş yeri aydınlatması ve elektrik projesi ihtiyaçlarına da destek veriyoruz.",
  tarihi: "{ilceDe} tarihi ve eski yapılar önemli yer tutuyor. Bu binalarda duvar dokusuna zarar vermeden, gerektiğinde sıva üstü kanalla yapılan dikkatli tesisat yenileme ile yangın riskine karşı pano ve kaçak akım koruması öncelikli işlerimiz.",
  karma: "{ilce}, eski apartmanlarla yeni yapıların bir arada bulunduğu bir ilçe. Bu yüzden aynı gün içinde bir sokakta 40 yıllık bir dairenin tesisatını yenileyip birkaç sokak ötede yeni bir sitede LED ve avize montajı yapabiliyoruz.",
};

const hizmetTip = {
  "elektrik-tesisati": {
    eski: "Eski apartman dairelerinde tesisat yenilemeyi çoğunlukla mutfak–banyo tadilatıyla birlikte planlıyor, alüminyum hatları bakırla ve topraklamalı olarak baştan çekiyoruz.",
    yeni: "Yeni dairelerde genellikle ek priz, klima ve fırın hattı, çalışma odası ve zayıf akım (data, TV) altyapısı gibi ilavelerle tesisatı kullanım düzeninize uyarlıyoruz.",
    villa: "Müstakil ev ve villalarda kat panolarını, bahçe ve otopark hatlarını ve dış mekân prizlerini su korumalı ekipmanla planlıyoruz.",
    sanayi: "Dükkân, ofis ve atölyelerde makine ve cihaz yüküne göre trifaze dağıtım, ayrı aydınlatma ve priz hatları kuruyoruz.",
    tarihi: "Tarihi ve eski yapılarda duvara en az müdahaleyle, gerektiğinde estetik sıva üstü kanal çözümleriyle tesisat yeniliyoruz.",
    karma: "Eski dairelerde komple yenileme, yeni dairelerde ise ihtiyaca göre ek hat ve priz ilavesi en sık yaptığımız tesisat işleri.",
  },
  "elektrik-tesisat-tamiri": {
    eski: "Eski binalarda arızaların büyük kısmı buat içindeki yaşlanmış eklerden kaynaklanıyor; bu ekleri klemensle yenileyerek çoğu sorunu kırım yapmadan çözüyoruz.",
    yeni: "Yeni binalarda tamir ihtiyacı çoğunlukla tadilat sırasında delinen hatlardan, gevşek priz bağlantılarından ve hatalı yapılmış ilavelerden doğuyor.",
    villa: "Villalarda uzun hatlar ve dış mekân bağlantıları neme ve kemirgen hasarına daha açık; arızalı bölümü ölçümle bulup yalnızca o kısmı yeniliyoruz.",
    sanayi: "İş yerlerinde titreşim ve yoğun kullanım bağlantıları gevşetiyor; arızayı mesainizi en az aksatacak şekilde gideriyoruz.",
    tarihi: "Kalın taş ve tuğla duvarlı eski yapılarda hattı izleyerek arızayı bulmak deneyim istiyor; gereksiz kırımdan özellikle kaçınıyoruz.",
    karma: "Hem eski hem yeni yapılarda arızayı tahminle değil, hat hat ölçüm yaparak buluyoruz.",
  },
  "elektrik-ariza-servisi": {
    eski: "Eski tesisatlarda kış aylarında ısıtıcı kullanımıyla birlikte aşırı yük ve ısınma kaynaklı arızalar belirgin şekilde artıyor.",
    yeni: "Yeni binalarda en sık gelen arıza çağrısı, kaçak akım rölesinin sürekli atması ve tek bir hattın çalışmaması.",
    villa: "Fırtına, yağmur ve sulama sonrası dış mekân hatlarında oluşan kaçak ve kısa devreler, müstakil yapılarda en sık arıza nedeni.",
    sanayi: "İş yerlerinde arıza üretimi ve satışı durdurduğu için bu çağrılara öncelik veriyor, arızayı ilk ziyarette çözmeye çalışıyoruz.",
    tarihi: "Eski ve tarihi yapılarda yanık kokusu ya da ısınan pano ciddiye alınması gereken bir uyarı; bu tür çağrılara öncelik veriyoruz.",
    karma: "Gün içinde en çok gelen çağrılar kesinti, atan sigorta ve kaçak akım rölesi arızaları; usta yedek malzemeyle yönlendiriliyor.",
  },
  "sigorta-ve-pano-tamiri": {
    eski: "Eski dairelerde hâlâ buşonlu sigorta kutularıyla karşılaşıyoruz; bunları kaçak akım rölesi içeren modern panolarla değiştiriyoruz.",
    yeni: "Yeni binalarda pano genellikle güncel; sorun çoğunlukla yanlış amperde seçilmiş sigorta ya da ayrılmamış yüksek güçlü hatlar.",
    villa: "Çok katlı müstakil yapılarda kat panoları ile ana pano arasındaki uyumu kontrol ediyor, dış mekân hatlarına ayrı koruma ekliyoruz.",
    sanayi: "Trifaze iş yeri panolarında faz dengesini, bağlantı sıkılığını ve koruma elemanlarını kontrol ediyoruz.",
    tarihi: "Eski yapılarda pano yenilemesi, yangın riskini azaltmak için yapılabilecek en etkili müdahalelerden biri.",
    karma: "İlçede hem eski tip sigorta kutularını yeniliyor hem de yeni binalarda atan sigortaların nedenini tespit ediyoruz.",
  },
  "avize-montaji": {
    eski: "Eski binalarda yüksek tavanlar ve kartonpiyerli tavan göbekleri avize montajında özen istiyor; tavan göbeğine zarar vermeden askı yapıyoruz.",
    yeni: "Yeni dairelerde taşınma sonrası tüm evin avize, sarkıt ve aplik montajını tek ziyarette tamamlıyoruz.",
    villa: "Villa ve dubleks evlerdeki yüksek galeri boşluklarına uzun sarkıtlı ve büyük ölçülü avizeleri uygun ekipmanla asıyoruz.",
    sanayi: "Mağaza ve ofislerde dekoratif sarkıt ve armatür montajını iş saatleri dışında da planlayabiliyoruz.",
    tarihi: "Tarihi yapılarda tavan süslemelerine ve sıvaya zarar vermemek için askı noktasını dikkatle seçiyoruz.",
    karma: "Kristal avizeden modern sarkıtlara kadar her tip armatürü, tavan yapısına uygun askıyla monte ediyoruz.",
  },
  "led-aydinlatma-montaji": {
    eski: "Eski dairelerde mevcut tesisata ek yük getirmeden, düşük tüketimli LED aydınlatmaya geçişi planlıyoruz.",
    yeni: "Yeni dairelerde kartonpiyer arkası gizli ışık, mutfak dolabı altı ve TV ünitesi LED'i en çok istenen uygulamalar.",
    villa: "Villalarda bahçe yolu, cephe ve havuz çevresi aydınlatmasını su korumalı LED ve zaman ayarlı kontrolle kuruyoruz.",
    sanayi: "Dükkân, depo ve atölyelerde eski floresanları LED panel ve armatürlerle değiştirerek tüketimi düşürüyoruz.",
    tarihi: "Tarihi yapılarda cephe ve iç mekân dokusunu öne çıkaran, ısı yaymayan LED çözümleri uyguluyoruz.",
    karma: "Gizli ışıktan spot yerleşimine kadar LED uygulamalarını güç hesabıyla planlıyoruz.",
  },
  "elektrik-plan-proje": {
    eski: "Eski binalarda güç artırımı ve tadilat sonrası proje güncellemesi en sık ihtiyaç duyulan proje işleri.",
    yeni: "Yeni bağımsız bölüm ve iş yeri dönüşümlerinde abonelik için gereken proje süreçlerinde destek oluyoruz.",
    villa: "Müstakil yapılar ve villalarda abonelik, güç ihtiyacı ve dış mekân tesisatını kapsayan projelendirme süreçlerini yürütüyoruz.",
    sanayi: "Atölye, dükkân ve işletmelerde kurulu güç hesabı, trifaze dağıtım ve abonelik için proje süreçlerini koordine ediyoruz.",
    tarihi: "Koruma altındaki ya da eski yapılarda tadilat projelerini yapının özelliklerini gözeterek planlıyoruz.",
    karma: "Konut ve iş yeri projelerinde keşiften uygulamaya kadar süreci tek elden takip ediyoruz.",
  },
  "guvenlik-kamera-sistemleri": {
    eski: "Apartman dairelerinde kapı önü ve balkon gibi kendi alanınızı gören, kablosu düzgün gizlenmiş kamera kurulumları yapıyoruz.",
    yeni: "Sitelerde ortak alan kamera sistemlerinin yanı sıra daire içi ve kapı önü kameralarını mobil izlemeyle kuruyoruz.",
    villa: "Villalarda bahçe çevresini, giriş kapısını ve otoparkı gece görüşlü dış mekân kameralarıyla kör nokta bırakmadan izlemeye alıyoruz.",
    sanayi: "Dükkân, depo ve atölyelerde kasa, giriş ve yükleme alanlarını kapsayan, uzun kayıt süreli sistemler kuruyoruz.",
    tarihi: "Eski yapılarda cepheyi bozmayacak, kablosu gizlenmiş kamera yerleşimine özen gösteriyoruz.",
    karma: "Ev, dükkân ve apartmanlar için ihtiyaca göre IP ya da analog kamera sistemleri kuruyoruz.",
  },
  "priz-ve-anahtar-montaji": {
    eski: "Eski dairelerde iki uçlu, kararmış prizleri topraklı prizlerle değiştiriyor, topraklama hattının gerçekten bağlı olup olmadığını ölçüyoruz.",
    yeni: "Yeni dairelerde mobilya düzenine göre ek priz, USB'li priz ve TV–data prizi ilaveleri en çok yapılan işler.",
    villa: "Müstakil evlerde bahçe ve teras için su korumalı dış mekân prizleri ve vavien anahtar uygulamaları yapıyoruz.",
    sanayi: "İş yerlerinde cihaz yüküne uygun endüstriyel ve trifaze priz montajı yapıyoruz.",
    tarihi: "Eski yapılarda priz eklerken duvar dokusuna uygun, gerekirse sıva üstü şık kanal çözümleri öneriyoruz.",
    karma: "Tek bir priz değişiminden tüm evin priz–anahtar takımının yenilenmesine kadar her işe geliyoruz.",
  },
  "topraklama-ve-kacak-akim": {
    eski: "Eski binaların önemli bir kısmında prizlerde topraklama ya hiç yok ya da bağlı değil; ölçümle tespit edip panodan toprak hattı çekiyoruz.",
    yeni: "Yeni binalarda topraklama genellikle mevcut; sorun çoğunlukla cihaz kaynaklı kaçaklar ve rölelerin sık atması.",
    villa: "Müstakil yapılarda bina topraklama tesisinin durumunu ölçüyor, gerektiğinde topraklama tesisi kuruyoruz.",
    sanayi: "İş yerlerinde metal gövdeli makine ve tezgâhların topraklamasını ve kaçak akım korumasını kontrol ediyoruz.",
    tarihi: "Eski ve tarihi yapılarda topraklama eksikliği yaygın; insan güvenliği için kaçak akım rölesiyle birlikte çözüm sunuyoruz.",
    karma: "Topraklama ve kaçak akım sorunlarını, binanın yaşından bağımsız olarak ölçüm cihazıyla tespit ediyoruz.",
  },
};

// İlçe-hizmet sayfası giriş paragrafı varyasyonları
const girisVaryant = [
  "{ilceDe} {hk} için güvenilir bir usta arıyorsanız doğru yerdesiniz. {yakaDe} hizmet veren ekibimiz {ilce} ve çevresindeki mahallelere düzenli olarak servis veriyor.",
  "{ilce} ve çevresinde {hk} hizmetini yerinde keşif, net fiyat ve temiz işçilikle sunuyoruz. {yakaDe} ekiplerimiz gün içinde farklı ilçelerde çalıştığı için {ilceE} yönlendirme çoğu zaman hızlı yapılıyor.",
  "Eviniz ya da iş yeriniz {ilceDe} ise {hk} işiniz için tek bir telefonla usta yönlendiriyoruz. İşe başlamadan önce fiyatı söylüyor, sonradan sürpriz maliyet çıkarmıyoruz.",
  "{hkB}, işini bilen ellerde yapıldığında yıllarca sorun çıkarmaz. {ilce} genelinde bu işi ölçüme dayalı, düzenli ve güvenli şekilde yapıyoruz.",
];

// İlçe ana sayfası giriş varyasyonları
const ilceGiris = [
  "{ilceDe} elektrik tesisatı, arıza, sigorta, avize ve LED montajı, kamera sistemleri ve proje işleri için tek numara. {ilce} ve komşu ilçelerde çalışan ekibimizle evinize ya da iş yerinize usta yönlendiriyoruz.",
  "{ilce} elektrikçi ihtiyacınızda; küçük bir priz arızasından komple tesisat yenilemeye kadar tüm elektrik işlerini yerinde keşif ve net fiyatla yapıyoruz.",
  "{ilceDeki} ev ve iş yerleri için elektrik servisi: arıza tespiti, tesisat tamiri, sigorta ve pano işleri, aydınlatma montajı ve güvenlik kamerası kurulumu.",
];

module.exports = { tipGenel, hizmetTip, girisVaryant, ilceGiris };
