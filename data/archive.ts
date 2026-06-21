export type Writing = {
  id: string;
  title: string;
  excerpt: string;
  kind: "Review" | "Essay" | "Fragment";
  date?: string;
  displayDate: string;
};

export type ArchiveBlock = {
  id: string;
  type: "Alıntı" | "Not" | "Bağlantı" | "Görsel notu";
  content: string;
  source: string;
  year: string;
  href?: string;
};

export const writings: Writing[] = [
  {
    id: "minik-serce-biz-de-yeniden-baslariz",
    title: "Minik Serçe - Biz de Yeniden Başlarız",
    excerpt:
      "Sezen Aksu’nun dönüşünü, geçmiş ve gelecek arasında sıkışan bir duygu haliyle okumaya çalışan bir yazı.",
    kind: "Review",
    date: "2026-06-21",
    displayDate: "21 Haziran 2026",
  },
  {
    id: "zamanin-kiskaci",
    title: "Zamanın Kıskacı",
    excerpt:
      "Zaman, hatırlama ve gecikmiş duygular üzerine kısa bir deneme.",
    kind: "Essay",
    displayDate: "Taslak",
  },
  {
    id: "kenar-notlari",
    title: "Kenar Notları",
    excerpt:
      "Tam yazıya dönüşmemiş düşünceler, alıntılar ve küçük gözlemler.",
    kind: "Fragment",
    displayDate: "Taslak",
  },
];

export const blocks: ArchiveBlock[] = [
  {
    id: "yeniden-baslamak",
    type: "Alıntı",
    content: "Yeniden başlamak bazen kaldığın yere başka biri olarak dönmektir.",
    source: "Kenar defteri, sayfa 14",
    year: "2026",
  },
  {
    id: "vapur-cami",
    type: "Görsel notu",
    content:
      "Akşam vapurundan çekilmiş bulanık bir İstanbul fotoğrafı. Camdaki yansıma, kıyıdan daha belirgin; görüntü sanki iki ayrı zamana ait.",
    source: "Telefon arşivi / henüz taranmadı",
    year: "2026",
  },
  {
    id: "okuma-listesi",
    type: "Bağlantı",
    content:
      "Dönüp yeniden bakılacak metinler, yarım kalmış okumalar ve açık sekmeler için geçici bir raf.",
    source: "Okuma listesi / yakında",
    year: "İndeks",
    href: "#writings",
  },
  {
    id: "gecikmis-cumle",
    type: "Not",
    content:
      "Bir cümleyi zamanında kuramayınca, yıllar sonra yazıya dönüşüyor. Belki bazı metinler yalnızca gecikmiş konuşmalardır.",
    source: "Dağınık notlar, no. 03",
    year: "2026",
  },
  {
    id: "siir-defteri",
    type: "Bağlantı",
    content:
      "Tamamlanmamış şiirler, tek dizelik başlangıçlar ve silinmeye kıyılamayan kelimeler.",
    source: "Şiir defteri / yakında",
    year: "Koleksiyon",
    href: "#blocks",
  },
  {
    id: "arsiv-kurali",
    type: "Not",
    content:
      "Bitmiş metni sakla, ama taslağı da silme. Bazen düşüncenin asıl biçimi, tamamlanmadan hemen önceki halidir.",
    source: "Arşiv kuralı, no. 01",
    year: "2026",
  },
];
