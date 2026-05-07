
import { motion } from 'motion/react';
import { Award, Star, History, Sparkles, Gift, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/src/store/useStore';

export function LoyaltyView() {
  const { user, bookings } = useStore();
  
  const levels = [
    { name: 'Bronce', min: 0, color: 'text-amber-600', bg: 'bg-amber-100', icon: Star },
    { name: 'Plata', min: 200, color: 'text-gray-400', bg: 'bg-gray-100', icon: Award },
    { name: 'Oro', min: 500, color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Sparkles },
    { name: 'Platino', min: 1000, color: 'text-indigo-600', bg: 'bg-indigo-100', icon: Gift },
  ];

  const currentLevel = levels.find(l => l.name === user.level) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel ? (user.points / nextLevel.min) * 100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12 max-w-4xl"
    >
      <header className="mb-12 text-center">
        <h1 className="text-4xl mb-4">Tu Programa de Fidelidad</h1>
        <p className="text-gray-500">Cuanto más te cuidas, más te premiamos.</p>
      </header>

      {/* Main Card */}
      <Card className="border-none shadow-soft rounded-3xl overflow-hidden gold-gradient text-white mb-12">
        <CardContent className="p-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <currentLevel.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Nivel Actual</span>
                  <h2 className="text-3xl font-serif">{user.level}</h2>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold uppercase tracking-widest opacity-80">Puntos Totales</span>
                <div className="text-4xl font-serif">{user.points}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end text-sm font-bold">
                <span>Progreso {nextLevel ? `hacia nivel ${nextLevel.name}` : 'Nivel máximo alcanzado'}</span>
                {nextLevel && <span>{user.points} / {nextLevel.min}</span>}
              </div>
              <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-white"
                />
              </div>
            </div>
          </div>
          <Sparkles className="absolute -top-20 -right-20 w-80 h-80 opacity-10" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Stamp Card (Visual) */}
        <Card className="border-none shadow-soft rounded-2xl bg-white p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-brand-coral" />
            Tarjeta de Sellos
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${
                  i < (bookings.length % 8) 
                  ? 'bg-brand-coral/10 border-brand-coral border-dashed' 
                  : 'bg-gray-50 border-gray-100'
                }`}
              >
                {i < (bookings.length % 8) ? (
                  <CheckCircle2 className="w-6 h-6 text-brand-coral" />
                ) : (
                  <span className="text-gray-300 font-bold">{i + 1}</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center">
            {8 - (bookings.length % 8)} citas más para tu <strong>regalo sorpresa</strong>.
          </p>
        </Card>

        {/* Level Benefits */}
        <Card className="border-none shadow-soft rounded-2xl bg-white p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-gold" />
            Beneficios {user.level}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              </div>
              Citas prioritarias los fines de semana.
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              </div>
              Acumulas 1.5x puntos en cada reserva.
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              </div>
              Tratamiento facial de cortesía anual.
            </li>
          </ul>
          <Button className="w-full mt-6 rounded-full border-brand-coral/20 text-brand-coral hover:bg-brand-coral hover:text-white transition-colors" variant="outline">
            Ver Todos los Niveles
          </Button>
        </Card>
      </div>

      {/* History */}
      <h3 className="text-2xl font-serif mb-6">Historial de Recompensas</h3>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-soft border border-brand-coral/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-coral/10 flex items-center justify-center italic font-serif text-brand-coral font-bold">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-sm">{booking.serviceName}</h4>
                  <p className="text-xs text-gray-400">{new Date(booking.date).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-500">+{Math.floor(booking.price / 10)} pts</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Sello Ganado</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            Aún no has acumulado puntos. ¡Reserva tu primera cita!
          </div>
        )}
      </div>
    </motion.div>
  );
}
