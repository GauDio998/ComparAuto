'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Car, Gauge, Shield, ChevronRight, BarChart3 } from 'lucide-react';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('Risposta API:', data);
      alert('Risposta API: ' + data.message);
    } catch (error) {
      console.error('Errore nella chiamata API:', error);
      alert('Errore nella connessione all\'API. Verifica che il server sia in esecuzione.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animazione per gli elementi decorativi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

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
    <section className="pt-28 pb-20 px-4 overflow-hidden relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Elementi decorativi di sfondo migliorati */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-blue-200/40 dark:bg-grid-blue-800/20 bg-[size:30px_30px] opacity-20"></div>
        
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-texture-dots opacity-5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonna sinistra con testo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-left"
          >
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 mb-5 rounded-full bg-gradient-to-r from-indigo-50 to-teal-50 text-indigo-600 font-medium text-sm border border-indigo-200/50 shadow-sm dark:from-indigo-900/30 dark:to-teal-900/30 dark:text-indigo-300 dark:border-indigo-700/50"
            >
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Rivoluziona la tua ricerca automobilistica
              </span>
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900 dark:from-white dark:via-indigo-300 dark:to-white">
                Trova l'Auto
              </span>
              <span className="relative mt-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-300 dark:to-indigo-400">
                Perfetta
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 140 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C20 0 60 0 139 5.5" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop stopColor="#0D9488" />
                      <stop offset="1" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900 dark:from-white dark:via-indigo-300 dark:to-white">
                per Te
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-600 mb-8 max-w-lg dark:text-slate-300"
            >
              Confronta il modello di auto che hai scelto e scopri quanto potrebbe 
              <span className="relative inline-block mx-1">
                <span className="absolute inset-x-0 bottom-0 h-1 bg-amber-200 -z-10"></span>
                svalutarsi
              </span> 
              in caso di rivendita: non sprecare il tuo denaro!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl px-6 shadow-lg shadow-indigo-500/20 flex items-center gap-2 group transition-all duration-300 ease-out transform hover:scale-105 dark:shadow-indigo-900/30"
                onClick={handleApiCall}
                disabled={isLoading}
              >
                {isLoading ? 
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Caricamento...
                  </span> : 
                  <span className="flex items-center gap-2">
                    <span>Inizia il Confronto</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                }
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-xl border-2 border-slate-300 hover:border-indigo-400 px-6 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 dark:border-slate-600 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/40"
              >
                Esplora Catalogo
              </Button>
            </motion.div>
            
            {/* Statistiche */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-2.5 rounded-lg shadow-sm border border-indigo-200/50 dark:from-indigo-900/40 dark:to-indigo-800/40 dark:border-indigo-700/50">
                  <Car className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">10K+ modelli disponibili</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-2.5 rounded-lg shadow-sm border border-teal-200/50 dark:from-teal-900/40 dark:to-teal-800/40 dark:border-teal-700/50">
                  <Gauge className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Analisi in tempo reale</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-2.5 rounded-lg shadow-sm border border-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/40 dark:border-amber-700/50">
                  <Shield className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Dati verificati</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Colonna destra con immagine/grafica */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <motion.div 
              animate={floatingAnimation}
              className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden p-5 shadow-xl border border-slate-200/80 backdrop-blur-sm dark:from-slate-800 dark:to-slate-900 dark:border-slate-700/80"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-white/50 backdrop-blur-sm dark:bg-slate-900/30"></div>
              
              {/* Elementi decorativi */}
              <div className="absolute top-5 right-5 h-24 w-24 bg-indigo-300/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 left-10 h-40 w-40 bg-teal-300/20 rounded-full blur-xl"></div>
              <div className="absolute top-1/4 left-1/3 h-16 w-16 bg-amber-300/20 rounded-full blur-lg"></div>
              
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-tr from-slate-900 to-indigo-900 shadow-lg border border-slate-300/30 dark:border-slate-700/50">
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"></div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-slate-300/10 bg-[size:20px_20px] opacity-30"></div>
                
                {/* Glassmorphism car container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-4/5 h-32 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg shadow-indigo-900/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        translateX: [0, 8, 0, -8, 0],
                        translateY: [0, -5, 2, 5, 0],
                        rotateZ: [0, 1, 0, -1, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 6,
                        ease: "easeInOut"
                      }}
                    >
                      <Car className="w-20 h-20 text-white drop-shadow-lg" />
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Chart lines animated overlay */}
                <div className="absolute inset-x-8 bottom-20 h-16 flex items-end space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: '20%' }}
                      animate={{ height: `${Math.random() * 80 + 20}%` }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                      className="flex-1 bg-indigo-400/30 backdrop-blur-sm rounded-t"
                    />
                  ))}
                </div>
                
                {/* Pulsating dots */}
                <div className="absolute bottom-8 right-8 flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-teal-400"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
                
                {/* Interfaccia UI sopra l'immagine */}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-white/40 dark:bg-slate-800/90 dark:border-slate-700/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                          <div className="absolute inset-0 w-2 h-2 rounded-full bg-teal-500 animate-ping opacity-75"></div>
                        </div>
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          Analisi completata
                        </span>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 flex items-center gap-1 dark:text-indigo-300">
                        <span>Visualizza Risultati</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Elementi dell'interfaccia */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-5 bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative z-10 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-slate-900 flex items-center gap-2 dark:text-white">
                      <BarChart3 className="h-4 w-4 text-indigo-500" />
                      Confronto Prestazioni
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="w-16 h-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"></div>
                      <p className="text-xs text-slate-500 ml-2 dark:text-slate-400">
                        Basato su <span className="font-medium text-indigo-600 dark:text-indigo-300">2.340</span> analisi
                      </p>
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-medium border-2 border-white shadow-sm dark:bg-indigo-900/60 dark:text-indigo-300 dark:border-slate-800">A</div>
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-xs text-teal-600 font-medium border-2 border-white shadow-sm dark:bg-teal-900/60 dark:text-teal-300 dark:border-slate-800">B</div>
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs text-amber-600 font-medium border-2 border-white shadow-sm dark:bg-amber-900/60 dark:text-amber-300 dark:border-slate-800">C</div>
                  </div>
                </div>
                
                {/* Mini graph */}
                <div className="mt-3 h-5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700/50">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 w-2/3 rounded-full relative">
                    <div className="absolute inset-0 bg-shine-gradient animate-shine"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -top-6 -right-6 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-200 flex items-center gap-1.5 dark:bg-slate-800 dark:border-slate-700"
            >
              <span className="flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">Svalutazione -15%</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-200 flex items-center gap-1.5 dark:bg-slate-800 dark:border-slate-700"
            >
              <span className="flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">Valutazione mercato</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* CSS per animazioni aggiuntive */}
      <style jsx>{`
        .bg-grid-blue-200\/40 {
          background-image: linear-gradient(to right, rgba(191, 219, 254, 0.4) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(191, 219, 254, 0.4) 1px, transparent 1px);
        }
        .bg-grid-blue-800\/20 {
          background-image: linear-gradient(to right, rgba(30, 64, 175, 0.2) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(30, 64, 175, 0.2) 1px, transparent 1px);
        }
        .bg-texture-dots {
          background-image: radial-gradient(circle, #4338ca 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .bg-shine-gradient {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        @keyframes shine {
          from {transform: translateX(-100%);}
          to {transform: translateX(100%);}
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </section>
  );
}