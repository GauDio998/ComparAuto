'use client';

import { motion } from 'framer-motion';
import { 
  Cog, Gauge, Fuel, Zap, Settings, 
  Timer, Gauge as SpeedometerIcon, Weight, Ruler, ChevronDown 
} from 'lucide-react';
import { useState } from 'react';
import { CarData } from './CompareContainer';

interface CarSpecsProps {
  carData: CarData;
  compact?: boolean;
  accentColor: string;
}

export default function CarSpecs({ carData, compact = false, accentColor }: CarSpecsProps) {
  const [isExpanded, setIsExpanded] = useState(!compact);

  const specs = [
    {
      category: 'Motore',
      icon: Cog,
      items: [
        { label: 'Tipo', value: carData.specs.engine },
        { label: 'Potenza', value: carData.specs.power },
        { label: 'Trasmissione', value: carData.specs.transmission }
      ]
    },
    {
      category: 'Prestazioni',
      icon: Gauge,
      items: [
        { label: '0-100 km/h', value: carData.specs.acceleration },
        { label: 'Velocità max', value: carData.specs.topSpeed }
      ]
    },
    {
      category: 'Consumi',
      icon: Fuel,
      items: [
        { label: 'Carburante', value: carData.specs.fuel },
        { label: 'Consumo medio', value: carData.specs.consumption },
        { label: 'Emissioni CO2', value: carData.specs.emissions }
      ]
    },
    {
      category: 'Dimensioni',
      icon: Ruler,
      items: [
        { label: 'Peso', value: carData.specs.weight },
        { label: 'Dimensioni', value: carData.specs.dimensions }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 150 }
    }
  };

  if (compact) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-slate-900 dark:text-white">
            Specifiche Tecniche
          </h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1 rounded-lg hover:bg-${accentColor}-100 transition-colors duration-200 dark:hover:bg-${accentColor}-900/40`}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className={`h-4 w-4 text-${accentColor}-600 dark:text-${accentColor}-400`} />
            </motion.div>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3 pt-2">
            {specs.slice(0, 2).map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className={`p-3 rounded-lg bg-gradient-to-br from-${accentColor}-50 to-${accentColor}-25 border border-${accentColor}-200/50 dark:from-${accentColor}-950/40 dark:to-${accentColor}-900/40 dark:border-${accentColor}-800/30`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <category.icon className={`h-4 w-4 text-${accentColor}-600 dark:text-${accentColor}-400`} />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {category.category}
                  </span>
                </div>
                <div className="space-y-1">
                  {category.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                      <span className="font-medium text-slate-900 dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4"
    >
      <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
        Specifiche Tecniche Complete
      </h4>

      <div className="grid gap-4">
        {specs.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className={`p-4 rounded-xl bg-gradient-to-br from-${accentColor}-50 to-${accentColor}-25 border border-${accentColor}-200/50 dark:from-${accentColor}-950/40 dark:to-${accentColor}-900/40 dark:border-${accentColor}-800/30`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br from-${accentColor}-100 to-${accentColor}-50 dark:from-${accentColor}-900/60 dark:to-${accentColor}-800/60`}>
                <category.icon className={`h-5 w-5 text-${accentColor}-600 dark:text-${accentColor}-400`} />
              </div>
              <h5 className="font-medium text-slate-900 dark:text-white">
                {category.category}
              </h5>
            </div>

            <div className="grid gap-2">
              {category.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-b-0 dark:border-slate-700/50"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pro e Contro */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-25 border border-green-200/50 dark:from-green-950/40 dark:to-green-900/40 dark:border-green-800/30"
        >
          <h6 className="font-medium text-green-800 mb-3 dark:text-green-300">
            Punti di Forza
          </h6>
          <ul className="space-y-2">
            {carData.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                {pro}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-25 border border-amber-200/50 dark:from-amber-950/40 dark:to-amber-900/40 dark:border-amber-800/30"
        >
          <h6 className="font-medium text-amber-800 mb-3 dark:text-amber-300">
            Aspetti da Considerare
          </h6>
          <ul className="space-y-2">
            {carData.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                {con}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}