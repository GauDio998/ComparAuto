'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Car, Calendar, Euro } from 'lucide-react';

interface CarFormProps {
  onCarSelect: (carId: string) => void;
  isLoading: boolean;
  accentColor: string;
}

export default function CarForm({ onCarSelect, isLoading, accentColor }: CarFormProps) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Dati mock per i dropdown
  const brands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Ford', 'Toyota', 
    'Honda', 'Nissan', 'Hyundai', 'Kia', 'Peugeot', 'Renault', 'Fiat'
  ];

  const models = selectedBrand ? [
    `${selectedBrand} Serie 1`,
    `${selectedBrand} Serie 3`, 
    `${selectedBrand} X1`,
    `${selectedBrand} X3`,
    `${selectedBrand} Compact`
  ] : [];

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const handleSearch = async () => {
    if (!selectedBrand || !selectedModel || !selectedYear) return;
    
    setIsSearching(true);
    
    // Simula ricerca
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const carId = `${selectedBrand}-${selectedModel}-${selectedYear}`;
    onCarSelect(carId);
    
    setIsSearching(false);
  };

  const isFormValid = selectedBrand && selectedModel && selectedYear;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Marca */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Marca
        </label>
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedModel(''); // Reset model quando cambia la marca
            }}
            className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-transparent appearance-none transition-all duration-200 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:focus:ring-${accentColor}-400`}
          >
            <option value="">Seleziona una marca</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Modello */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Modello
        </label>
        <div className="relative">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedBrand}
            className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-transparent appearance-none transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-400 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:focus:ring-${accentColor}-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500`}
          >
            <option value="">
              {selectedBrand ? 'Seleziona un modello' : 'Prima seleziona la marca'}
            </option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Anno */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Anno
        </label>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-transparent appearance-none transition-all duration-200 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:focus:ring-${accentColor}-400`}
          >
            <option value="">Seleziona un anno</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Filtri rapidi */}
      <div className="pt-2">
        <p className="text-xs font-medium text-slate-600 mb-3 dark:text-slate-400">
          Filtri rapidi:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Elettriche', icon: Car },
            { label: 'Nuove', icon: Calendar },
            { label: 'Budget', icon: Euro }
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:bg-${accentColor}-50 hover:border-${accentColor}-300 hover:text-${accentColor}-700 dark:hover:bg-${accentColor}-950/40 dark:hover:border-${accentColor}-700 dark:hover:text-${accentColor}-300 bg-slate-100 border-slate-300 text-slate-600 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300`}
            >
              <Icon className="h-3 w-3 inline mr-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Pulsante ricerca */}
      <Button
        onClick={handleSearch}
        disabled={!isFormValid || isLoading || isSearching}
        className={`w-full bg-gradient-to-r from-${accentColor}-600 to-${accentColor}-700 hover:from-${accentColor}-700 hover:to-${accentColor}-800 rounded-xl font-medium shadow-md shadow-${accentColor}-500/20 py-3 dark:shadow-${accentColor}-900/30`}
      >
        {isSearching || isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isLoading ? 'Caricamento...' : 'Ricerca in corso...'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Cerca Auto
          </span>
        )}
      </Button>
    </motion.div>
  );
}