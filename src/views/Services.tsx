
import { motion } from 'motion/react';
import { useState } from 'react';
import { Star, Clock, Heart, Search, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { services } from '@/src/data/services';
import { Link } from 'react-router-dom';

export function ServicesView() {
  const [category, setCategory] = useState<string>('Todos');
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(s => 
    (category === 'Todos' || s.category === category) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <Badge className="bg-brand-gold/10 text-brand-gold border-none mb-4 hover:bg-brand-gold/20">Nuestro Catálogo</Badge>
          <h1 className="text-4xl mb-4">Servicios Profesionales</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Elige entre nuestra amplia gama de servicios especializados. Calidad garantizada en cada tratamiento.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="¿Qué servicio buscas hoy?" 
              className="pl-10 rounded-full border-brand-coral/10 focus-visible:ring-brand-coral"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Tabs value={category} onValueChange={setCategory} className="w-full md:w-auto">
            <TabsList className="bg-white p-1 rounded-full border border-brand-coral/10 h-auto">
              <TabsTrigger value="Todos" className="rounded-full px-6 data-[state=active]:bg-brand-coral data-[state=active]:text-white">Todos</TabsTrigger>
              <TabsTrigger value="Adultos" className="rounded-full px-6 data-[state=active]:bg-brand-coral data-[state=active]:text-white">Adultos</TabsTrigger>
              <TabsTrigger value="Niños" className="rounded-full px-6 data-[state=active]:bg-brand-coral data-[state=active]:text-white">Niños</TabsTrigger>
              <TabsTrigger value="Mascotas" className="rounded-full px-6 data-[state=active]:bg-brand-coral data-[state=active]:text-white">Mascotas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="flex flex-col sm:flex-row gap-4 p-4 border-none shadow-soft hover:shadow-md transition-shadow group">
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg leading-tight">{service.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-brand-gold font-bold">
                        <Star className="w-3 h-3 fill-brand-gold" />
                        {service.rating}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                      </div>
                      <span className="text-sm font-bold text-brand-coral">{service.price}€</span>
                    </div>
                    <Button size="sm" className="rounded-full bg-brand-coral h-8 px-4" asChild>
                      <Link to="/booking">Reservar</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p>No encontramos servicios con esos criterios.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
