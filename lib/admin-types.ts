export type TeamMemberRecord = {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  researchgate?: string;
  orcid?: string;
  createdAt?: string | null;
};

export type PublicationRecord = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  url: string;
  coverTone: string;
  coverImage?: string;
  createdAt?: string | null;
};

export type NewsRecord = {
  id: string;
  title: string;
  date: string;
  summary: string;
  contentHtml: string;
  image?: string;
  createdAt?: string | null;
};

export type GalleryRecord = {
  id: string;
  title: string;
  date: string;
  images: string[];
  image?: string;
  createdAt?: string | null;
};
