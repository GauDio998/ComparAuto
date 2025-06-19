'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, ArrowLeft, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CompareCard from './CompareCard';
import CompareResults from './CompareResults';
import CompareActions from './CompareActions';

// Tipo per i dati dell'auto
export interface CarData {
  id: string;
  brand: string;
  model: string;
  year: number;
  image: string;
  price: number;
  depreciation: number;
  specs: {
    engine: string;
    power: string;
    fuel: string;
    consumption: string;
    emissions: string;
    transmission: string;
    acceleration: string;
    topSpeed: string;
    weight: string;
    dimensions: string;
  };
  features: string[];
  rating: number;
  pros: string[];
  cons: string[];
}

export default function CompareContainer() {
  const [car1, setCar1] = useState<CarData | null>(null);
  const [car2, setCar2] = useState<CarData | null>(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  // Funzione per gestire la selezione auto
  const handleCarSelect = async (carId: string, cardNumber: 1 | 2) => {
    const setLoading = cardNumber === 1 ? setIsLoading1 : setIsLoading2;
    const setCar = cardNumber === 1 ? setCar1 : setCar2;
    
    setLoading(true);
    
    try {
      // Simulazione chiamata API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dati mock per demo
      const mockCarData: CarData = {
        id: carId,
        brand: cardNumber === 1 ? 'BMW' : 'Mercedes',
        model: cardNumber === 1 ? 'Serie 3' : 'Classe C',
        year: 2023,
        image: '/api/placeholder/400/250',
        price: cardNumber === 1 ? 45000 : 48000,
        depreciation: cardNumber === 1 ? 15 : 18,
        specs: {
          engine: cardNumber === 1 ? '2.0L Turbo' : '1.5L Turbo',
          power: cardNumber === 1 ? '184 CV' : '170 CV',
          fuel: 'Benzina',
          consumption: cardNumber === 1 ? '6.2 L/100km' : '6.8 L/100km',
          emissions: cardNumber === 1 ? '142 g/km' : '155 g/km',
          transmission: 'Automatico 8 rapporti',
          acceleration: cardNumber === 1 ? '7.1 s' : '7.8 s',
          topSpeed: cardNumber === 1 ? '235 km/h' : '230 km/h',
          weight: cardNumber === 1 ? '1.515 kg' : '1.590 kg',
          dimensions: cardNumber === 1 ? '4.709 x 1.827 x 1.442 mm' : '4.686 x 1.810 x 1.447 mm'
        },
        features: [
          'Navigatore GPS',
          'Climatizzatore automatico',
          'Sensori parcheggio',
          'Bluetooth',
          'Cruise control'
        ],
        rating: cardNumber === 1 ? 4.5 : 4.3,
        pros: [
          cardNumber === 1 ? 'Ottime prestazioni' : 'Design elegante',
          cardNumber === 1 ? 'Buona tenuta di strada' : 'Comfort superiore',
          'Tecnologia avanzata'
        ],
        cons: [
          cardNumber === 1 ? 'Prezzo elevato' : 'Consumi alti',
          'Manutenzione costosa'
        ]
      };
      
      setCar(mockCarData);
    } catch (error) {
      console.error('Errore nel caricamento dei dati auto:', error);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per resettare il confronto
  const handleReset = () => {
    setCar1(null);
    setCar2(null);
  };

  // Varianti animazione
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Header con sfondo decorativo */}
      <div className="relative pt-28 pb-12 px-4 overflow-hidden">
        {/* Elementi decorativi */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-blue-200/30 dark:bg-grid-blue-800/10 bg-[size:30px_30px] opacity-20"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center relative"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-indigo-50 to-teal-50 text-indigo-600 font-medium text-sm border border-indigo-200/50 shadow-sm dark:from-indigo-900/30 dark:to-teal-900/30 dark:text-indigo-300 dark:border-indigo-700/50"
          >
            <span className="flex items-center gap-1.5">
              <Car className="h-4 w-4" />
              Confronto Intelligente Auto
            </span>
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900 dark:from-white dark:via-indigo-300 dark:to-white">
              Confronta le Auto
            </span>
            <span className="relative mt-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-300 dark:to-indigo-400">
              Fianco a Fianco
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 140 6" fill="none">
                <path d="M1 4C20 0 60 0 139 4" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop stopColor="#0D9488" />
                    <stop offset="1" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto dark:text-slate-300">
            Seleziona due modelli di auto per un confronto dettagliato di prestazioni, 
            consumi, svalutazione e caratteristiche tecniche.
          </p>
        </motion.div>
      </div>

      {/* Container principale */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Griglia delle schede di confronto */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            <CompareCard
              carData={car1}
              onCarSelect={(carId) => handleCarSelect(carId, 1)}
              isLoading={isLoading1}
              cardNumber={1}
            />
            
            <CompareCard
              carData={car2}
              onCarSelect={(carId) => handleCarSelect(carId, 2)}
              isLoading={isLoading2}
              cardNumber={2}
            />
          </motion.div>

          {/* Risultati del confronto */}
          {car1 && car2 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <CompareResults car1={car1} car2={car2} />
            </motion.div>
          )}

          {/* Azioni */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <CompareActions 
              onReset={handleReset}
              hasComparison={!!(car1 && car2)}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* CSS per pattern griglia */}
      <style jsx>{`
        .bg-grid-blue-200\/30 {
          background-image: linear-gradient(to right, rgba(191, 219, 254, 0.3) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(191, 219, 254, 0.3) 1px, transparent 1px);
        }
        .bg-grid-blue-800\/10 {
          background-image: linear-gradient(to right, rgba(30, 64, 175, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(30, 64, 175, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}