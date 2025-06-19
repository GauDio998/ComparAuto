'use client';

import { motion } from 'framer-motion';
import { Car, Camera, Maximize2 } from 'lucide-react';
import { CarData } from './CompareContainer';

interface CarImageProps {
  carData: CarData;
  accentColor: string;
}

export default function CarImage({ carData, accentColor }: CarImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      <div className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 shadow-sm dark:from-slate-800 dark:to-slate-900 dark:border-slate-700`}>
        {/* Placeholder per l'immagine (dato che non possiamo caricare immagini reali) */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
          {/* Sfondo decorativo */}
          <div className="absolute inset-0">
            <div className={`absolute top-4 right-4 w-20 h-20 bg-${accentColor}-300/20 rounded-full blur-xl`}></div>
            <div className={`absolute bottom-4 left-4 w-16 h-16 bg-${accentColor}-400/15 rounded-full blur-lg`}></div>
            <div className="absolute inset-0 bg-grid-slate-300/10 bg-[size:20px_20px] opacity-30"></div>
          </div>
          
          {/* Icona auto centrale */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className={`relative z-10 p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-${accentColor}-200/50 shadow-lg dark:bg-slate-800/80 dark:border-${accentColor}-700/50`}
          >
            <Car className={`w-20 h-20 text-${accentColor}-600 dark:text-${accentColor}-400`} />
          </motion.div>
        </div>

        {/* Badge informativo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm dark:bg-slate-800/90 dark:border-slate-700/50"
        >
          <Camera className="h-3 w-3 text-slate-500 dark:text-slate-400" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {carData.year}
          </span>
        </motion.div>

        {/* Badge zoom (hover) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-3 right-3 p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Maximize2 className="h-4 w-4" />
        </motion.div>

        {/* Riflesso decorativo */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
      </div>

      {/* Info immagine */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"
      >
        <span>Immagine ufficiale {carData.brand}</span>
        <span className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full bg-${accentColor}-500`}></div>
          Verificata
        </span>
      </motion.div>

      {/* Gallery thumbnails simulata */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-3 flex gap-2"
      >
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`flex-1 aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center cursor-pointer hover:border-${accentColor}-300 transition-colors duration-200 dark:from-slate-700 dark:to-slate-800 dark:border-slate-600 dark:hover:border-${accentColor}-600`}
          >
            <Car className={`h-4 w-4 text-slate-400 dark:text-slate-500`} />
          </div>
        ))}
      </motion.div>

      {/* CSS per pattern griglia */}
      <style jsx>{`
        .bg-grid-slate-300\/10 {
          background-image: linear-gradient(to right, rgba(203, 213, 225, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(203, 213, 225, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </motion.div>
  );
}