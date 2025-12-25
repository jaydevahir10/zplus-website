export interface ConcreteGrade {
  id: string;
  grade: string;
  description: string;
  features: string[];
}

export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  role: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  location: string;
  grade: string;
  quantity: string;
  date: string;
  notes: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  category: 'Plant' | 'Fleet' | 'Projects';
  title: string;
}
