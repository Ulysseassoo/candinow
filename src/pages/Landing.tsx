
import { 
  Flower2, 
  WifiOff, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MousePointer2, 
  Layout, 
  Search, 
  Plus, 
  Clock, 
  CheckCircle2,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Landing = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="p-8 lg:px-20 flex items-center justify-between z-50"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transform -rotate-6 cursor-pointer"
          >
            <Flower2 size={24} />
          </motion.div>
          <span className="text-xl font-black text-text-primary tracking-tighter">Candinow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Button variant="ghost" size="sm" className="rounded-full" onClick={() => navigate({ to: '/app' })}>
            Accéder à l'App
          </Button>
        </div>
      </motion.header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 lg:py-24 relative">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-soft/30 rounded-full blur-[120px] -z-10"
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-soft rounded-full text-primary-dark">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Le futur du suivi de carrière</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl lg:text-8xl font-black text-text-primary tracking-tighter leading-[0.9]">
            Organisez votre futur job, <br />
            <span className="text-primary italic">sans le stress.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg lg:text-xl font-medium text-text-secondary leading-relaxed">
            Candinow est un tracker de candidatures <strong>esthétique</strong> et <strong>100% offline</strong>. 
            Suivez vos entretiens dans un jardin numérique conçu pour votre sérénité.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button size="lg" className="h-16 px-10 text-sm rounded-full" onClick={() => navigate({ to: '/app' })}>
              Commencer l'aventure <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-sm rounded-full" onClick={() => {
              const el = document.getElementById('preview');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Voir l'interface
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section id="preview" className="px-6 lg:px-20 py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl lg:text-5xl font-black text-text-primary tracking-tighter">Un tracking limpide.</h2>
            <p className="text-text-secondary font-bold uppercase text-xs tracking-widest">L'efficacité dans la douceur.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative group max-w-5xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[48px] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-1000 -z-10"></div>
            
            <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(255,183,197,0.3)] border border-primary/30 overflow-hidden">
              <div className="bg-gray-50/50 px-8 py-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-200"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
                  <div className="w-3 h-3 rounded-full bg-green-200"></div>
                </div>
                <div className="flex-1 max-w-md mx-auto relative px-4">
                  <div className="bg-white border border-border rounded-full py-1.5 px-10 text-[10px] text-text-secondary/40 font-bold flex items-center gap-2">
                    <Search size={12} /> app.candinow.local
                  </div>
                </div>
                <div className="w-20"></div>
              </div>

              <div className="p-8 lg:p-12 space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                    <div className="w-full bg-gray-50 border border-border rounded-full py-3 px-12 text-sm text-text-secondary/60 italic">Rechercher...</div>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <div className="bg-primary text-white rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Plus size={16} /> Ajouter
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden border border-border/80 rounded-3xl">
                  <table className="w-full text-left">
                    <thead className="bg-primary-soft/20">
                      <tr>
                        <th className="px-8 py-5 text-[9px] font-black text-text-secondary uppercase tracking-widest">Poste</th>
                        <th className="px-8 py-5 text-[9px] font-black text-text-secondary uppercase tracking-widest">Statut</th>
                        <th className="px-8 py-5 text-[9px] font-black text-text-secondary uppercase tracking-widest">Tracking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-text-primary">Product Designer</div>
                          <div className="text-xs text-text-secondary flex items-center gap-1 mt-1 font-medium"><Building2 size={12}/> Candinow</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-soft text-[#6A994E] rounded-full text-[10px] font-black uppercase tracking-tighter border border-success/10">
                            <CheckCircle2 size={12} /> Entretien
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-border rounded-full text-[10px] font-black uppercase tracking-tighter text-text-secondary">
                            <Clock size={12} /> 2j
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 lg:-right-12 bg-accent/20 backdrop-blur-md p-6 rounded-[32px] border border-white/90 shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-text-primary uppercase tracking-widest">Relance automatique</div>
                  <div className="text-xs font-bold text-text-secondary mt-0.5">Plus aucun oubli.</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="px-6 lg:px-20 py-24 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl lg:text-5xl font-black text-text-primary tracking-tighter">Pensé pour votre confort</h2>
            <p className="text-text-secondary font-bold uppercase text-xs tracking-widest">Simple. Privé. Puissant.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: WifiOff, title: "100% Offline", text: "Aucune connexion nécessaire. Vos données sont stockées localement.", color: "text-primary", bg: "bg-primary-soft" },
              { icon: ShieldCheck, title: "Confidentialité", text: "Pas de compte, pas de tracking. Vous êtes le seul maître de vos données.", color: "text-accent", bg: "bg-accent/10" },
              { icon: Layout, title: "Focus & Clarté", text: "Une interface pastel épurée pour éviter la surcharge cognitive.", color: "text-primary", bg: "bg-primary-soft" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: i * 0.2,
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
                className="soft-card p-10 space-y-6 bg-white border-none shadow-xl shadow-black/5"
              >
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center ${f.color}`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-text-primary tracking-tight">{f.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm font-medium">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-y border-border/40">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-12 grayscale group hover:grayscale-0 transition-all duration-1000"
        >
           <div className="flex items-center gap-2 font-black text-xl"><MousePointer2 /> Fast.</div>
           <div className="flex items-center gap-2 font-black text-xl"><Flower2 /> Aesthetic.</div>
           <div className="flex items-center gap-2 font-black text-xl"><WifiOff /> Private.</div>
        </motion.div>
      </section>

      <footer className="p-12 lg:p-20 flex flex-col items-center gap-8 bg-white">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 180 }} 
            transition={{ duration: 1.5, ease: "easeInOut" }} 
            className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white"
          >
            <Flower2 size={18} />
          </motion.div>
          <span className="font-black text-text-primary">Candinow</span>
        </div>
        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] text-center">
          © {new Date().getFullYear()} Candinow — Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};
