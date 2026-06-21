export type Writing = {
  id: string;
  title: string;
  excerpt: string;
  body?: string[];
  kind: "Review" | "Essay" | "Fragment" | "deneme";
  date?: string;
  displayDate: string;
};

export type ArchiveBlock = {
  id: string;
  type: "Alıntı" | "Not" | "Bağlantı" | "Görsel notu" | "Müzik" | "Video";
  content: string;
  source: string;
  year: string;
  href?: string;
  mediaSrc?: string;
  posterSrc?: string;
};

export const profile = {
  name: "Ata Yılmaz Özpamukçu",
  location: "İstanbul",
  since: "2026’dan beri",
  bio: [
    "Ürettiğim ve üzerine düştüğüm şeyler için kişisel bir arşiv. Keyifli gördüğüm, ürettiğim şeyleri burada paylaşmak istiyorum. İyi eğlenceler.",
  ],
  details: [
    {
      label: "Şu sıralar",
      value: "Plaklara ara verildi, Fizikten uzaklaşıldı",
    },
  ],
  links: [
    {
      label: "E-posta",
      value: "a.ozpamukcu@gmail.com",
      href: "mailto:a.ozpamukcu@gmail.com",
    },
  ],
};

// Yeni yazılar geldikçe bu listeye Writing nesneleri eklenebilir.
export const writings: Writing[] = [
  {
    id: "yorum-testi",
    title: "Yorum Testi",
    excerpt: "Anonim ve moderasyonlu yorum sistemini denemek için geçici yazı.",
    body: [
      "Bu kısa metin yalnızca yorum akışını denemek için burada. Aşağıdaki formdan isimli veya anonim bir yorum bırakabilirsin.",
    ],
    kind: "deneme",
    displayDate: "taslak",
  },
];

// Yeni parçalar geldikçe bu listeye ArchiveBlock nesneleri eklenebilir.
export const blocks: ArchiveBlock[] = [
  {
    id: "after-a-series-of-unfortunate-events",
    type: "Video",
    content: "After a series of unfortunate events",
    source: "Özgün piyano bestesi",
    year: "09.08.2024",
    mediaSrc: "/video/after-a-series-of-unfortunate-events.m4v",
    posterSrc: "/video/after-a-series-of-unfortunate-events-poster.jpg",
  },
];
