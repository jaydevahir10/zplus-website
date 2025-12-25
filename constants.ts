import { ConcreteGrade, Review, GalleryItem } from './types';

export const PHONE_NUMBER = '9726147896';
export const EMAIL_ADDRESS = 'zplusconrete@gmail.com';
export const WHATSAPP_LINK = 'https://wa.me/919726147896?text=I%20want%20to%20order%20concrete';
export const PLANT_ADDRESS = 'Z Plus Ready Mix Concrete, 23Q7+3GM, Shinay, Mundra Highway, Gandhidham, Gujarat 370201';
export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/XhrtHL6D2jSk6sFQ9?g_st=ipc";

// REPLACE THIS URL BELOW with your specific Google Apps Script Web App URL after following the setup instructions.
export const GOOGLE_SHEETS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_YOUR_ID_HERE/exec";

// Fallback image for any loading errors
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1518709414768-a88986a455b9?auto=format&fit=crop&q=80&w=800";

export const CONCRETE_GRADES: ConcreteGrade[] = [
  {
    id: 'm20',
    grade: 'M20',
    description: 'Standard grade for domestic floors and foundations.',
    features: ['Residential Slabs', 'Driveways', 'Pathways']
  },
  {
    id: 'm25',
    grade: 'M25',
    description: 'Versatile mix for reinforced concrete construction.',
    features: ['Columns', 'Beams', 'Heavy Footings']
  },
  {
    id: 'm30',
    grade: 'M30',
    description: 'High strength for severe weather exposure areas.',
    features: ['Commercial Buildings', 'Roads', 'External Walls']
  },
  {
    id: 'm35',
    grade: 'M35',
    description: 'Structural grade for heavy loading requirements.',
    features: ['High-Rise Structures', 'Industrial Floors', 'Piles']
  },
  {
    id: 'custom',
    grade: 'Custom Mix',
    description: 'Tailored solutions for specific project needs.',
    features: ['Special Additives', 'Fiber Reinforced', 'Rapid Setting']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Rajesh Patel",
    role: "Contractor",
    text: "Best Ready Mix Concrete Service 🚀. The slump was perfect and delivery was exactly on time.",
    rating: 5
  },
  {
    id: 2,
    name: "Amit Shah",
    role: "Civil Engineer",
    text: "Excellent quality M30 grade provided for our industrial project near Mundra. Highly professional.",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Sinh",
    role: "Home Owner",
    text: "Ordered for my house slab. Very cooperative staff and transparent pricing.",
    rating: 4
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    category: 'Plant',
    src: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=800',
    title: 'Modern Plant Facility'
  },
  {
    id: 2,
    category: 'Plant',
    src: 'https://images.unsplash.com/photo-1533069123089-69335555776d?auto=format&fit=crop&q=80&w=800',
    title: 'Precision Cement Silos'
  },
  {
    id: 3,
    category: 'Plant',
    src: 'https://images.unsplash.com/photo-1590644365607-1c5a29d250c4?auto=format&fit=crop&q=80&w=800',
    title: 'Site Operations'
  },
  {
    id: 4,
    category: 'Fleet',
    src: 'https://images.unsplash.com/photo-1584661848419-5d2524f79435?auto=format&fit=crop&q=80&w=800',
    title: 'Transit Mixer Fleet'
  },
  {
    id: 5,
    category: 'Projects',
    src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    title: 'Industrial Foundation Pour'
  },
  {
    id: 6,
    category: 'Plant',
    src: 'https://images.unsplash.com/photo-1581093458891-2f30e2941689?auto=format&fit=crop&q=80&w=800',
    title: 'Quality Control Lab'
  }
];