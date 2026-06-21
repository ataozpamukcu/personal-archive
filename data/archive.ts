export type Writing = {
  id: string;
  title: string;
  excerpt: string;
  kind: "Essay" | "Notebook" | "Fragment";
  date: string;
  displayDate: string;
};

export type ArchiveBlock = {
  id: string;
  type: "Quotation" | "Note" | "Image note";
  content: string;
  source: string;
  year: string;
};

export const writings: Writing[] = [
  {
    id: "rooms-that-remember",
    title: "Rooms That Remember Us",
    excerpt:
      "On domestic space, inherited objects, and the strange persistence of rooms after their occupants leave.",
    kind: "Essay",
    date: "2026-05-18",
    displayDate: "18 May 2026",
  },
  {
    id: "margin-as-method",
    title: "The Margin as Method",
    excerpt:
      "Reading the pencil marks, folded corners, and small disagreements left in secondhand books.",
    kind: "Notebook",
    date: "2026-02-03",
    displayDate: "03 Feb 2026",
  },
  {
    id: "against-perfect-memory",
    title: "Against Perfect Memory",
    excerpt:
      "A brief defense of forgetting, misquotation, and the stories that emerge in the space between them.",
    kind: "Essay",
    date: "2025-10-27",
    displayDate: "27 Oct 2025",
  },
  {
    id: "rain-index",
    title: "An Index of Rain",
    excerpt:
      "Four observations from windows in Istanbul, London, and a train moving north.",
    kind: "Fragment",
    date: "2025-04-11",
    displayDate: "11 Apr 2025",
  },
];

export const blocks: ArchiveBlock[] = [
  {
    id: "le-guin-carrier-bag",
    type: "Quotation",
    content: "The natural, proper, fitting shape of the novel might be that of a sack, a bag.",
    source: "Ursula K. Le Guin, The Carrier Bag Theory of Fiction",
    year: "1986",
  },
  {
    id: "blue-hour",
    type: "Image note",
    content:
      "A nearly empty ferry crossing at blue hour. Three windows lit on the opposite shore; the water holding their reflections longer than expected.",
    source: "Field note, Kadikoy-Besiktas ferry",
    year: "2025",
  },
  {
    id: "woolf-diary",
    type: "Quotation",
    content: "What sort of diary should I like mine to be? Something loose knit and yet not slovenly.",
    source: "Virginia Woolf, A Writer's Diary",
    year: "1919",
  },
  {
    id: "found-list",
    type: "Note",
    content:
      "Found inside a library copy: lemons, thread, batteries, return key, call mother. A whole afternoon compressed into five errands.",
    source: "British Library reading room, scrap 04",
    year: "2024",
  },
  {
    id: "berger-seeing",
    type: "Quotation",
    content: "The relation between what we see and what we know is never settled.",
    source: "John Berger, Ways of Seeing",
    year: "1972",
  },
  {
    id: "archive-principle",
    type: "Note",
    content:
      "Keep the fragment beside the finished thought. The archive should preserve uncertainty, not tidy it away.",
    source: "Working principle no. 7",
    year: "2026",
  },
];
