
import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  User, Settings, Bell, CreditCard, 
  ChevronRight, LogOut, Camera, 
  MapPin, Phone, Mail, Shield 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/src/store/useStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

export function ProfileView() {
  const { user, updateUser } = useStore();
  const [editing, setEditing] = useState(false);
  
  const handleSave = () => {
    setEditing(false);
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12 max-w-2xl"
    >
      <header className="flex flex-col items-center mb-12">
        <div className="relative mb-6 group">
          <Avatar className="w-32 h-32 border-4 border-white shadow-soft">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-2 right-2 bg-brand-coral text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h1 className="text-3xl mb-1">{user.name}</h1>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest border border-brand-gold/20">
            Miembro {user.level}
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <section className="bg-white p-8 rounded-3xl shadow-soft">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold font-serif">Información Personal</h3>
            <Button 
              variant="ghost" 
              className={editing ? "text-brand-coral" : "text-gray-400"}
              onClick={() => editing ? handleSave() : setEditing(true)}
            >
              {editing ? 'Guardar' : 'Editar'}
            </Button>
          </div>
          
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Nombre Completo</Label>
              {editing ? (
                <Input defaultValue={user.name} className="rounded-xl border-brand-coral/10" />
              ) : (
                <p className="font-medium">{user.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Correo Electrónico</Label>
              {editing ? (
                <Input defaultValue={user.email} className="rounded-xl border-brand-coral/10" />
              ) : (
                <p className="font-medium">{user.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Teléfono</Label>
              {editing ? (
                <Input defaultValue={user.phone} className="rounded-xl border-brand-coral/10" />
              ) : (
                <p className="font-medium">{user.phone}</p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-soft overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 font-bold font-serif">Ajustes & Privacidad</div>
          <div className="divide-y divide-gray-50 text-sm">
            {[
              { icon: Bell, label: 'Notificaciones', desc: 'Gestiona tus recordatorios' },
              { icon: CreditCard, label: 'Métodos de Pago', desc: 'Tarjetas guardadas terminales con 1234' },
              { icon: MapPin, label: 'Direcciones', desc: 'Ubicaciones guardadas' },
              { icon: Shield, label: 'Seguridad', desc: 'Contraseña y accesos' },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-6 hover:bg-brand-coral/5 transition-colors group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand-coral group-hover:bg-brand-coral/10 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.label}</h4>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </section>

        <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl h-14">
          <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
        </Button>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-12 uppercase tracking-[0.2em] font-bold">
        GlamourStudio v1.0.4 • 2024
      </p>
    </motion.div>
  );
}
