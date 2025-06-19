'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Car, Star, Plus, CheckCircle, Edit3 } from 'lucide-react';
import { CarData } from './CompareContainer';
import CarForm from './CarForm';

interface CompareCardProps {
  carData?: CarData | null;
  onCarSelect: (carId: string) => void;
  isLoading: boolean;
  cardNumber: 1 | 2;
}

export default function CompareCard({ carData, onCarSelect, isLoading, cardNumber }: CompareCardProps) {
  const accentColor = cardNumber === 1 ? 'blue' : 'emerald';
  const cardLabel = cardNumber === 1 ? 'Prima Auto' : 'Seconda Auto';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: cardNumber * 0.1 }}
      className="h-fit"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-white dark:bg-slate-900">
        {/* Header minimalista */}
        <div className={`h-2 bg-gradient-to-r ${
          cardNumber === 1 
            ? 'from-blue-400 to-blue-600' 
            : 'from-emerald-400 to-emerald-600'
        }`}></div>

        <CardContent className="p-0">
          {!carData ? (
            /* Stato vuoto - Design più pulito */
            <div className="p-8">
              {/* Header con numero */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${
                  cardNumber === 1 
                    ? 'from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40' 
                    : 'from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/40'
                } mb-4`}>
                  <span className={`text-2xl font-bold ${
                    cardNumber === 1 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {cardNumber}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {cardLabel}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Scegli un modello per iniziare il confronto
                </p>
              </div>

              {/* Form di selezione */}
              <div className="mb-8">
                <CarForm 
                  onCarSelect={onCarSelect} 
                  isLoading={isLoading}
                  accentColor={accentColor}
                />
              </div>

              {/* Stato vuoto decorativo */}
              <div className="text-center py-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${
                  cardNumber === 1 
                    ? 'from-blue-50 to-blue-25 border border-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-800/30' 
                    : 'from-emerald-50 to-emerald-25 border border-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 dark:border-emerald-800/30'
                } mb-4`}>
                  <Plus className={`w-8 h-8 ${
                    cardNumber === 1 
                      ? 'text-blue-400 dark:text-blue-500' 
                      : 'text-emerald-400 dark:text-emerald-500'
                  }`} />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide font-medium">
                  In attesa di selezione
                </p>
              </div>
            </div>
          ) : (
            /* Auto selezionata - Design card prodotto */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Header con badge stato */}
              <div className="relative p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    cardNumber === 1 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  }`}>
                    <CheckCircle className="w-3 h-3 mr-1.5" />
                    {cardLabel} selezionata
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCarSelect('')}
                    className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Info principale auto */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {carData.brand}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-1">
                    {carData.model}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Anno {carData.year}
                  </p>
                </div>
              </div>

              {/* Immagine placeholder più grande */}
              <div className="px-6 mb-6">
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                  <Car className="w-16 h-16 text-slate-300 dark:text-slate-500" />
                </div>
              </div>

              {/* Metriche principali - Layout migliorato */}
              <div className="px-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Prezzo */}
                  <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      €{carData.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Prezzo
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {carData.rating}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Valutazione
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifiche compatte */}
              <div className="px-6 mb-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                  Specifiche Principali
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Potenza', value: carData.specs.power },
                    { label: 'Consumi', value: carData.specs.consumption },
                    { label: 'Svalutazione', value: `-${carData.depreciation}%` },
                    { label: 'Trasmissione', value: carData.specs.transmission }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {label}
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge bottom */}
              <div className={`mx-6 mb-6 p-3 rounded-xl bg-gradient-to-r ${
                cardNumber === 1 
                  ? 'from-blue-50 to-blue-25 border border-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-800/30' 
                  : 'from-emerald-50 to-emerald-25 border border-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 dark:border-emerald-800/30'
              }`}>
                <div className="flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${
                    cardNumber === 1 ? 'bg-blue-500' : 'bg-emerald-500'
                  } mr-2`}></div>
                  <span className={`text-xs font-medium ${
                    cardNumber === 1 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : 'text-emerald-700 dark:text-emerald-300'
                  }`}>
                    Pronta per il confronto
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}