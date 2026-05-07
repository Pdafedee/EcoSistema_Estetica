
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, Calendar as CalendarIcon, 
  MapPin, CreditCard, CheckCircle2, Scissors, 
  Clock, User, Phone, Mail, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { services, Service } from '@/src/data/services';
import { useStore, Booking } from '@/src/store/useStore';
import { toast } from 'sonner';

type Step = 1 | 2 | 3 | 4 | 5;

export function BookingView() {
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const addBooking = useStore(state => state.addBooking);
  const user = useStore(state => state.user);

  const times = ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30', '19:00'];

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5) as Step);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as Step);

  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      category: selectedService.category,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmada',
      price: selectedService.price,
    };
    
    addBooking(newBooking);
    nextStep();
    toast.success('¡Cita agendada con éxito!');
  };

  const steps = [
    { title: 'Servicio', icon: Scissors },
    { title: 'Fecha', icon: CalendarIcon },
    { title: 'Datos', icon: User },
    { title: 'Pago', icon: CreditCard },
    { title: 'Listo', icon: CheckCircle2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12 max-w-4xl"
    >
      {/* Progress Bar */}
      <div className="mb-12 flex justify-between relative px-2">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-coral/10 -translate-y-1/2 z-0" />
        {steps.map((s, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              step > i + 1 ? 'bg-brand-coral text-white' : 
              step === i + 1 ? 'bg-brand-gold text-white shadow-lg scale-110' : 
              'bg-white text-gray-300 border border-brand-coral/10'
            }`}>
              {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              step === i + 1 ? 'text-brand-gold' : 'text-gray-400'
            }`}>{s.title}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif">Elige un servicio</h2>
                <p className="text-gray-500">Selecciona el tratamiento que deseas disfrutar hoy.</p>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {services.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedService?.id === s.id 
                        ? 'border-brand-coral bg-brand-coral/5 shadow-soft' 
                        : 'border-brand-coral/10 hover:border-brand-coral/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold">{s.name}</span>
                        <span className="text-brand-coral font-bold">{s.price}€</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-brand-gold font-medium uppercase tracking-widest">
                        {s.category} • {s.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {selectedService && (
                <div className="hidden md:block">
                  <Card className="border-none shadow-soft overflow-hidden rounded-2xl bg-white sticky top-24">
                    <img src={selectedService.image} alt={selectedService.name} className="w-full h-48 object-cover" />
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-2">{selectedService.name}</h3>
                      <p className="text-sm text-gray-500 mb-6">{selectedService.description}</p>
                      <Button onClick={nextStep} className="w-full bg-brand-coral rounded-full">
                        Continuar <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-serif mb-6">Selecciona el momento</h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-2xl border-none shadow-soft bg-white p-4"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-coral" />
                  Horarios disponibles
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {times.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        selectedTime === t 
                        ? 'bg-brand-coral border-brand-coral text-white shadow-soft' 
                        : 'border-brand-coral/10 text-gray-400 hover:border-brand-coral/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {selectedDate && selectedTime && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Button onClick={nextStep} className="w-full bg-brand-gold rounded-full mt-8">
                      Siguiente paso <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-serif mb-2">Tus Datos</h2>
                <p className="text-gray-500">Cuéntanos quién te visitará hoy.</p>
              </div>
              <div className="grid gap-6 bg-white p-8 rounded-2xl shadow-soft">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" defaultValue={user.name} className="rounded-xl border-brand-coral/10" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} className="rounded-xl border-brand-coral/10" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue={user.phone} className="rounded-xl border-brand-coral/10" />
                </div>
                <Button onClick={nextStep} className="bg-brand-coral rounded-full w-full h-12 text-lg">
                  Confirmar Datos
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-serif mb-8 text-center">Resumen de Reserva</h2>
              <Card className="border-none shadow-soft rounded-2xl overflow-hidden mb-8">
                <div className="bg-brand-coral/5 p-6 border-b border-brand-coral/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">{selectedService?.category}</span>
                    <Badge variant="outline" className="text-brand-coral border-brand-coral/20">Pago pendiente</Badge>
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{selectedService?.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 text-brand-gold" />
                      {selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      {selectedTime}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="flex justify-between items-center text-xl font-bold mb-8">
                    <span>Total a pagar</span>
                    <span className="text-brand-coral">{selectedService?.price}€</span>
                  </div>
                  <div className="space-y-3">
                    <Button onClick={handleConfirm} className="w-full bg-brand-gold rounded-full h-12 shadow-md">
                      Pagar y Confirmar
                    </Button>
                    <Button variant="ghost" className="w-full text-gray-400" onClick={prevStep}>
                      Modificar detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h2 className="text-4xl font-serif mb-4">¡Reserva Confirmada!</h2>
              <p className="text-gray-500 max-w-xs mx-auto mb-12">
                Te hemos enviado un correo de confirmación y un recordatorio para tu calendario.
              </p>
              <div className="flex gap-4">
                <Button className="rounded-full bg-brand-coral px-8" onClick={() => window.location.href = '/'}>
                  Volver al Inicio
                </Button>
                <Button variant="outline" className="rounded-full border-brand-coral/20 text-brand-coral" onClick={() => setStep(1)}>
                  Nueva Reserva
                </Button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 p-4 bg-brand-gold/10 rounded-2xl flex items-center gap-4 text-brand-gold"
              >
                <Sparkles className="w-6 h-6" />
                <span className="text-sm font-bold">¡Has ganado +{Math.floor((selectedService?.price || 0) / 10)} puntos de fidelidad!</span>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons for early steps */}
      {step < 5 && step > 1 && (
        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-brand-coral">
            <ChevronLeft className="mr-2 w-4 h-4" /> Anterior
          </Button>
        </div>
      )}
    </motion.div>
  );
}
