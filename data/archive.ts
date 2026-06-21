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
  type: "Alıntı" | "Not" | "Bağlantı" | "Görsel notu" | "Müzik" | "Video";
  content: string;
  source: string;
  year: string;
  href?: string;
  mediaSrc?: string;
};

export const profile = {
  // Kişisel bilgilerini bu alanlardan değiştirebilirsin.
  name: "Adını buraya yaz",
  location: "İstanbul",
  since: "2026’dan beri",
  bio: [
    "Buraya kendin hakkında kısa bir giriş yazabilirsin: kim olduğun, neyle ilgilendiğin ve bu arşivi neden tuttuğun gibi.",
    "İkinci paragrafı daha kişisel bir not, çalışma biçimin veya şu sıralar düşündüğün şeyler için kullanabilirsin.",
  ],
  details: [
    { label: "Uğraş", value: "Buraya ekle" },
    { label: "İlgi alanları", value: "Buraya ekle" },
    { label: "Şu sıralar", value: "Buraya ekle" },
  ],
  links: [
    { label: "E-posta", value: "adresini ekle" },
    { label: "Are.na", value: "profilini ekle" },
    { label: "Diğer", value: "bağlantı ekle" },
  ],
};

// Yeni yazılar geldikçe bu listeye Writing nesneleri eklenebilir.
export const writings: Writing[] = [];

// Yeni parçalar geldikçe bu listeye ArchiveBlock nesneleri eklenebilir.
export const blocks: ArchiveBlock[] = [
  {
    id: "after-a-series-of-unfortunate-events",
    type: "Video",
    content: "After a series of unfortunate events",
    source: "Özgün piyano bestesi",
    year: "09.08.2024",
    mediaSrc: "/video/after-a-series-of-unfortunate-events.m4v",
  },
];
