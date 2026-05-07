
import { Link, useLocation } from 'react-router-dom';
import { Home, Scissors, Calendar, Award, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Inicio', path: '/' },
  { icon: Scissors, label: 'Servicios', path: '/services' },
  { icon: Calendar, label: 'Reserva', path: '/booking' },
  { icon: Award, label: 'Fidelidad', path: '/loyalty' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-brand-coral/10 pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              location.pathname === item.path ? "text-brand-coral" : "text-gray-400"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 glass h-16 border-b border-brand-coral/10 z-50 hidden md:block">
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-white shadow-soft group-hover:scale-110 transition-transform">
            <Scissors className="w-4 h-4" />
          </div>
          <span className="text-xl font-serif font-bold text-brand-coral tracking-tight">
            GlamourStudio
          </span>
        </Link>
        
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-all relative py-1",
                location.pathname === item.path 
                  ? "text-brand-coral" 
                  : "text-gray-500 hover:text-brand-coral"
              )}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-coral rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-coral/20 hover:bg-brand-coral/5 transition-colors">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-medium">Club VIP</span>
        </button>
      </div>
    </header>
  );
}
