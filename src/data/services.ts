
export interface Service {
  id: string;
  name: string;
  category: 'Adultos' | 'Niños' | 'Mascotas';
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
}

export const services: Service[] = [
  // Adultos
  {
    id: 'a1',
    name: 'Corte & Estilo Premium',
    category: 'Adultos',
    description: 'Corte personalizado con lavado y tratamiento hidratante.',
    price: 45,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'a2',
    name: 'Barba Ritual Real',
    category: 'Adultos',
    description: 'Arreglo de barba con toalla caliente y aceites esenciales.',
    price: 25,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  {
    id: 'a3',
    name: 'Coloración Orgánica',
    category: 'Adultos',
    description: 'Tinte de alta gama sin amoníaco para un brillo natural.',
    price: 75,
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'a4',
    name: 'Manicura Spa Gold',
    category: 'Adultos',
    description: 'Tratamiento completo de manos con exfoliación de oro.',
    price: 35,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
  },
  // Niños
  {
    id: 'k1',
    name: 'Primer Corte Mágico',
    category: 'Niños',
    description: 'Experiencia lúdica para los más pequeños con certificado.',
    price: 30,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
  },
  {
    id: 'k2',
    name: 'Trenzas Fantasía',
    category: 'Niños',
    description: 'Peinado creativo con accesorios y purpurina biodegradable.',
    price: 20,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1503910368127-b52881ee8b2d?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'k3',
    name: 'Corte Juvenil Trend',
    category: 'Niños',
    description: 'Estilos modernos para adolescentes con actitud.',
    price: 25,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1491013516836-7ad643eead76?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  // Mascotas
  {
    id: 'p1',
    name: 'Baño & Corte Canino',
    category: 'Mascotas',
    description: 'Higiene completa y corte según raza para tu mejor amigo.',
    price: 40,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'p2',
    name: 'Spa Relajante Mascotas',
    category: 'Mascotas',
    description: 'Hidromasaje y aromaterapia para mascotas estresadas.',
    price: 50,
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
  },
  {
    id: 'p3',
    name: 'Peluquería Felina',
    category: 'Mascotas',
    description: 'Cuidado especializado para gatos con manejo sin estrés.',
    price: 45,
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  {
    id: 'p4',
    name: 'Limpieza Dental Express',
    category: 'Mascotas',
    description: 'Remoción de sarro superficial sin anestesia.',
    price: 30,
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
  },
];
