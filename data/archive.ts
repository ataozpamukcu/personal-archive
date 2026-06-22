export type Writing = {
  slug: string;
  title: string;
  type: "inceleme" | "deneme" | "parça" | "şiir";
  date?: string;
  displayDate: string;
  excerpt?: string;
  body: string[];
};

export type ArchiveBlock = {
  slug: string;
  title?: string;
  type: "alıntı" | "not" | "bağlantı" | "görsel notu" | "müzik" | "video";
  date?: string;
  displayDate?: string;
  excerpt?: string;
  body: string[];
  source?: string;
  sourceHref?: string;
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

export const writings: Writing[] = [];

export const blocks: ArchiveBlock[] = [
  {
    slug: "after-a-series-of-unfortunate-events",
    title: "After a series of unfortunate events",
    type: "video",
    date: "2024-08-09",
    displayDate: "9 Ağustos 2024",
    body: [],
    mediaSrc: "/video/after-a-series-of-unfortunate-events.m4v",
    posterSrc: "/video/after-a-series-of-unfortunate-events-poster.jpg",
  },
];
