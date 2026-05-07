
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  points: number;
  level: 'Bronce' | 'Plata' | 'Oro' | 'Platino';
  history: Booking[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: string;
  date: Date;
  time: string;
  status: 'Confirmada' | 'Pendiente' | 'Completada';
  price: number;
}

interface AppState {
  user: User;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateUser: (userData: Partial<User>) => void;
  addPoints: (points: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        name: 'Carlos Fernández',
        email: 'carlos@example.com',
        phone: '+34 600 000 000',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
        points: 450,
        level: 'Plata',
        history: [],
      },
      bookings: [],
      addBooking: (booking) => set((state) => ({ 
        bookings: [...state.bookings, booking],
        user: { ...state.user, points: state.user.points + Math.floor(booking.price / 10) } 
      })),
      updateUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
      addPoints: (points) => set((state) => {
        const newPoints = state.user.points + points;
        let level: User['level'] = 'Bronce';
        if (newPoints > 1000) level = 'Platino';
        else if (newPoints > 500) level = 'Oro';
        else if (newPoints > 200) level = 'Plata';
        
        return { user: { ...state.user, points: newPoints, level } };
      }),
    }),
    { name: 'glamour-studio-storage' }
  )
);
