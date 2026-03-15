export interface SeoRouteData {
  description: string;
  ogImage?: string;
}

export interface NavLink {
  label: string;
  path: string;
  queryParams?: Record<string, string>;
}

export interface HeroStat {
  value: string;
  label: string;
}

export type CollectionCategory =
  | 'bespoke-sneakers'
  | 'elegant-shoes'
  | 'wedding-shoes'
  | 'ceremonial-footwear'
  | 'luxury-casual';

export interface CollectionFilter {
  value: 'all' | CollectionCategory;
  label: string;
}

export interface CollectionModel {
  slug: string;
  name: string;
  category: CollectionCategory;
  styleTag: string;
  description: string;
  accentNote: string;
  startingPrice: string;
  leadTime: string;
  baseModel: string;
  palette: string;
  materials: string[];
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  detail: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  image: string;
  thumb: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  city: string;
  pair: string;
  rating: number;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export interface AboutPillar {
  title: string;
  description: string;
  note: string;
  image: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface UploadedReference {
  name: string;
  size: number;
  type: string;
}
