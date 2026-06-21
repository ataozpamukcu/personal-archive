export type Writing = {
  slug: string;
  title: string;
  type: "inceleme" | "deneme" | "parça";
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

export const writings: Writing[] = [
  {
    slug: "minik-serce-biz-de-yeniden-baslariz",
    title: "Minik Serçe - Biz de Yeniden Başlarız",
    type: "inceleme",
    date: "2026-06-21",
    displayDate: "21 Haziran 2026",
    excerpt:
      "Sezen Aksu’nun dönüşünü, geçmiş ve gelecek arasında sıkışan bir duygu haliyle okumaya çalışan bir yazı.",
    body: [
      "Bu metin, Sezen Aksu’nun dönüşüne yalnızca yeni bir şarkı olarak değil; geçmişle gelecek arasında açılan tanıdık bir kapı olarak bakıyor.",
      "Hatırladığımız ses ile bugün duyduğumuz ses aynı yerde buluşurken, zamanın bizden neleri alıp neleri geri getirdiğini düşünmeye çalışıyor.",
      "Uzun metin tamamlandığında bu geçici paragraflar yerini incelemenin tam hâline bırakacak.",
    ],
  },
];

export const blocks: ArchiveBlock[] = [
  {
    slug: "after-a-series-of-unfortunate-events",
    title: "After a series of unfortunate events",
    type: "video",
    date: "2024-08-09",
    displayDate: "9 Ağustos 2024",
    excerpt: "Piyano için yazdığım özgün bir parça.",
    body: [
      "Bir dizi talihsiz olayın ardından piyanonun başında kalan kısa bir kayıt. Video ve beste bu arşivde birlikte duruyor.",
    ],
    source: "Özgün piyano bestesi",
    mediaSrc: "/video/after-a-series-of-unfortunate-events.m4v",
    posterSrc: "/video/after-a-series-of-unfortunate-events-poster.jpg",
  },
  {
    slug: "yeniden-baslamak",
    title: "Yeniden başlamak",
    type: "alıntı",
    displayDate: "2026",
    excerpt: "Yeniden başlamak bazen kaldığın yere başka biri olarak dönmektir.",
    body: [
      "Yeniden başlamak bazen kaldığın yere başka biri olarak dönmektir.",
      "Bu kısa parça, bitirmek ile geri dönmek arasındaki mesafeyi düşünmek için tutulmuş bir kenar notu.",
    ],
    source: "Kenar defteri, sayfa 14",
  },
];
