'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Car, BarChart2, Search, ChevronRight, Star, Shield, Settings, Zap, Badge, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Car,
    accentColor: 'indigo',
    gradient: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-50/70 dark:bg-indigo-900/30',
    borderColor: 'border-indigo-200/50 dark:border-indigo-700/50',
    title: 'Ampio Catalogo',
    description: 'Il modello è stato allenato su innumerevoli specifiche di veicoli dal mercato globale',
    stats: '10.000+ modelli',
  },
  {
    icon: BarChart2,
    accentColor: 'violet',
    gradient: 'from-violet-50 to-violet-100 dark:from-violet-900/40 dark:to-violet-800/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
    textColor: 'text-violet-700 dark:text-violet-300',
    bgColor: 'bg-violet-50/70 dark:bg-violet-900/30',
    borderColor: 'border-violet-200/50 dark:border-violet-700/50',
    title: 'Confronto Dettagliato',
    description: 'Analisi approfondita di specifiche, prezzi e costo totale di proprietà dei veicoli selezionati',
    stats: '50+ parametri',
  },
  {
    icon: Search,
    accentColor: 'blue',
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50/70 dark:bg-blue-900/30',
    borderColor: 'border-blue-200/50 dark:border-blue-700/50',
    title: 'Ricerca Intelligente',
    description: 'Trova l\'auto ideale con filtri avanzati e suggerimenti personalizzati in base alle tue preferenze',
    stats: 'Risultati in tempo reale',
  },
];

const secondaryFeatures = [
  {
    icon: Star,
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    title: 'Recensioni verificate',
    description: 'Feedback reali da proprietari di veicoli'
  },
  {
    icon: Shield,
    gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    title: 'Controllo storico',
    description: 'Verifica la storia e i precedenti di ogni veicolo'
  },
  {
    icon: Settings,
    gradient: 'from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-700/40',
    iconColor: 'text-slate-600 dark:text-slate-400',
    title: 'Personalizzazione',
    description: 'Configura l\'auto secondo le tue esigenze'
  },
  {
    icon: Zap,
    gradient: 'from-sky-50 to-sky-100 dark:from-sky-900/40 dark:to-sky-800/40',
    iconColor: 'text-sky-600 dark:text-sky-400',
    title: 'Confronto veloce',
    description: 'Risultati istantanei con la nostra tecnologia'
  }
];

export default function Features() {
  // Varianti di animazione container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Varianti di animazione elementi
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -10, 0, 10, 0],
    rotate: [0, 1, 0, -1, 0],
    transition: { 
      repeat: Infinity, 
      duration: 8,
      ease: "easeInOut"
    }
  };

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-indigo-100/70 to-transparent rounded-full blur-3xl opacity-70 dark:from-indigo-900/20"></div>
        <div className="absolute bottom-20 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-blue-100/70 to-transparent rounded-full blur-3xl opacity-60 dark:from-blue-900/20"></div>
        <div className="absolute top-1/3 left-1/4 w-1/5 h-1/5 bg-gradient-to-tr from-violet-100/50 to-transparent rounded-full blur-3xl opacity-50 dark:from-violet-900/20"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 bg-[size:40px_40px] opacity-15"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 font-medium text-sm border border-indigo-200/50 shadow-sm dark:from-indigo-900/30 dark:to-blue-900/30 dark:text-indigo-300 dark:border-indigo-700/50"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Funzionalità potenti
            </span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-300 dark:to-white">
              Semplifica la tua scelta
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto dark:text-slate-300">
            Strumenti all'avanguardia che rendono il confronto tra auto 
            <span className="relative inline-block mx-1">
              <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-200/70 -z-10 dark:bg-blue-800/50"></span>
              veloce e preciso
            </span>
            , personalizzato per le tue esigenze.
          </p>
        </motion.div>

        {/* Main features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <Card className={`p-8 h-full border border-slate-200/80 hover:shadow-xl hover:shadow-${feature.accentColor}-500/10 transition-all duration-500 relative overflow-hidden group-hover:translate-y-[-8px] bg-white/80 backdrop-blur-sm rounded-xl dark:bg-slate-800/80 dark:border-slate-700/80`}>
                {/* Accent color corner */}
                <div className={`absolute top-0 right-0 w-28 h-28 rounded-bl-full bg-gradient-to-bl ${feature.gradient} opacity-70`}></div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden opacity-10 pointer-events-none">
                  <div className="absolute inset-0 bg-grid-slate-800/80 bg-[size:20px_20px]"></div>
                </div>
                
                {/* Icon with gradient background */}
                <div className={`relative mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} ${feature.iconColor} border ${feature.borderColor} shadow-sm`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 mb-6 dark:text-slate-300">{feature.description}</p>
                
                {/* Stats badge */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${feature.bgColor} ${feature.textColor} border ${feature.borderColor} shadow-sm`}>
                  <Badge className="h-3.5 w-3.5 mr-1.5" strokeWidth={2.5} />
                  {feature.stats}
                </div>
                
                {/* Hover action link */}
                <div className="mt-6 transition-all duration-300 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <a href="#" className={`inline-flex items-center ${feature.iconColor} font-medium text-sm`}>
                    Scopri di più
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary features in a grid */}
        <motion.div 

          className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-lg dark:from-slate-800 dark:to-slate-900 dark:border-slate-700/80"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-1.5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200/50 dark:from-indigo-900/40 dark:to-blue-900/40 dark:border-indigo-700/50">
                <BarChart2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-300">Altre funzionalità</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">Strumenti aggiuntivi per rendere la tua esperienza completa</p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-1 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
              >
                <div className={`bg-gradient-to-br ${feature.gradient} p-3 rounded-lg self-start border border-slate-200/60 shadow-sm dark:border-slate-700/60`}>
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1 dark:text-white">{feature.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Testimonial or call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-500/20 border border-indigo-500/20 dark:shadow-indigo-900/30 dark:border-indigo-500/10"
        >
          <div className="absolute inset-0">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-20 transform translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-300 rounded-full opacity-10 transform -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-indigo-200/10 bg-[size:30px_30px] opacity-20"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-shine-gradient opacity-10"></div>
          </div>
          
          <div className="relative z-10 md:w-2/3">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white/90 text-sm font-medium backdrop-blur-sm border border-white/10">
              Provalo subito
            </span>
            <h3 className="text-3xl font-bold mb-4">Pronto a confrontare?</h3>
            <p className="text-indigo-100 mb-8">Inizia subito a esplorare il nostro catalogo e trova l'auto che fa per te con un confronto dettagliato.</p>
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 py-3 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-indigo-700/20 hover:shadow-xl hover:shadow-indigo-700/30 flex items-center gap-2 hover:gap-3 group">
              <span>Inizia a confrontare</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
          
          {/* Decorative floating element */}
          <motion.div
            animate={{
              y: [0, -10, 0, 10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 md:right-20 hidden md:block"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-medium text-white/90">Confronto live</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-10 bg-indigo-400/50 rounded-sm"></div>
                <div className="w-3 h-14 bg-blue-400/50 rounded-sm"></div>
                <div className="w-3 h-7 bg-white/30 rounded-sm"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* CSS per animazioni aggiuntive */}
      <style jsx>{`
        .bg-grid-slate-200\/50 {
          background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                           linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
        }
        .bg-grid-slate-800\/20 {
          background-image: linear-gradient(to right, rgba(30, 41, 59, 0.2) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(30, 41, 59, 0.2) 1px, transparent 1px);
        }
        .bg-grid-indigo-200\/10 {
          background-image: linear-gradient(to right, rgba(199, 210, 254, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(199, 210, 254, 0.1) 1px, transparent 1px);
        }
        .bg-shine-gradient {
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 200%;
          animation: shine 6s infinite;
        }
        @keyframes shine {
          0% {background-position: -100% -100%;}
          100% {background-position: 100% 100%;}
        }
      `}</style>
    </section>
  );
}