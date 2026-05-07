
import { motion } from 'motion/react';
import { Star, ArrowRight, ShieldCheck, Clock, Sparkles, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services } from '@/src/data/services';

export function HomeView() {
  const featuredServices = services.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-2xl overflow-hidden mb-20 shadow-soft">
        <img 
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200" 
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white max-w-2xl">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 backdrop-blur-sm text-brand-gold text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Experiencia Premium
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Descubre tu <span className="text-brand-coral">mejor versión</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-md">
            Servicios de belleza de lujo diseñados para ti, tus pequeños y tus leales compañeros.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-brand-coral hover:bg-brand-coral/90 rounded-full" asChild>
              <Link to="/booking">Reserva Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full" asChild>
              <Link to="/services">Ver Catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="mb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl mb-2">Servicios Destacados</h2>
            <p className="text-gray-500">Lo mejor de nuestro estudio a tu alcance.</p>
          </div>
          <Button variant="ghost" className="text-brand-coral hover:text-brand-coral/80" asChild>
            <Link to="/services" className="flex items-center gap-2">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="overflow-hidden border-none shadow-soft hover:shadow-lg transition-shadow bg-white rounded-2xl group">
                <div className="h-48 overflow-hidden relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-bold text-brand-coral">
                    {service.price}€
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{service.category}</span>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      {service.rating}
                    </div>
                  </div>
                  <h3 className="text-xl mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{service.description}</p>
                  <Button variant="outline" className="w-full rounded-full border-brand-coral/20 text-brand-coral hover:bg-brand-coral/5" asChild>
                    <Link to="/booking">Reservar</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promos */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-brand-coral rounded-2xl p-8 text-white flex flex-col justify-center shadow-soft relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl mb-2">Packs Familiares</h3>
            <p className="mb-6 opacity-90">Reserva 3 servicios o más y obtén un 15% de descuento en el total de tu factura.</p>
            <Button className="bg-white text-brand-coral hover:bg-gray-100 rounded-full w-fit">Aplicar Promo</Button>
          </div>
          <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
        </div>
        <div className="bg-brand-gold rounded-2xl p-8 text-white flex flex-col justify-center shadow-soft relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl mb-2">Pet Spa Day</h3>
            <p className="mb-6 opacity-90">Lunes de relax para mascotas. Hidromasaje con un 20% de descuento directo.</p>
            <Button className="bg-white text-brand-gold hover:bg-gray-100 rounded-full w-fit">Ver Detalles</Button>
          </div>
          <Scissors className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-2">Historias de Glamour</h2>
          <p className="text-gray-500">Lo que dicen nuestros clientes consentidos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          {[
            { name: "Elena Sanz", user: "Adulto", text: "El servicio de coloración es insuperable. Salí con un brillo que nunca había tenido." },
            { name: "Sira & Toby", user: "Mascota", text: "Toby odiaba el agua y ahora se duerme en el spa. Trato excelente y mucho amor." },
            { name: "Lucas", user: "Niño", text: "Mi hijo Lucas se divirtió mucho con su primer corte. El ambiente es perfecto." }
          ].map((t, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
              </div>
              <p className="italic text-gray-700 mb-6 font-serif">"{t.text}"</p>
              <span className="font-bold">{t.name}</span>
              <span className="text-xs text-brand-gold font-medium uppercase tracking-widest">{t.user}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-brand-coral/10">
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="w-8 h-8 text-brand-coral mb-3" />
          <span className="text-sm font-bold uppercase tracking-tighter">Productos Orgánicos</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Clock className="w-8 h-8 text-brand-coral mb-3" />
          <span className="text-sm font-bold uppercase tracking-tighter">Puntualidad Real</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Star className="w-8 h-8 text-brand-coral mb-3" />
          <span className="text-sm font-bold uppercase tracking-tighter">Ranking 4.9/5</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Sparkles className="w-8 h-8 text-brand-coral mb-3" />
          <span className="text-sm font-bold uppercase tracking-tighter">VIP Experience</span>
        </div>
      </section>
    </motion.div>
  );
}
