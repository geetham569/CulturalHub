export interface FilterOptions {
  category?: string;
  date?: string;
  location?: string;
  search?: string;
}

export interface SortOptions {
  field: 'date' | 'title' | 'venue' | 'price';
  direction: 'asc' | 'desc';
}

export type ViewMode = 'grid' | 'calendar';

export interface EventFormData {
  title: string;
  description: string;
  category: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  price: string;
  imageUrl: string;
  contactEmail?: string;
  bookingUrl?: string;
  submittedBy?: string;
}
