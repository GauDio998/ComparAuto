'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, TrendingDown, Equal, Star, Euro, Fuel, 
  Gauge, Timer, Award, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { CarData } from './CompareContainer';

interface CompareResultsProps {
  car1: CarData;
  car2: CarData;
}

export default function CompareResults({ car1, car2 }: CompareResultsProps) {
  // Funzioni di comparazione
  const compareNumeric = (val1: number, val2: number) => {
    if (val1 > val2) return 'better1';
    if (val2 > val1) return 'better2';
    return 'equal';
  };

  const parseNumericValue = (value: string) => {
    return parseFloat(value.replace(/[^\d.]/g, ''));
  };

  // Metriche di confronto
  const comparisons = [
    {
      category: 'Prezzo',
      icon: Euro,
      car1Value: `€${car1.price.toLocaleString()}`,
      car2Value: `€${car2.price.toLocaleString()}`,
      winner: compareNumeric(car2.price, car1.price), // Prezzo più basso è meglio
      description: 'Prezzo di listino'
    },
    {
      category: 'Svalutazione',
      icon: TrendingDown,
      car1Value: `-${car1.depreciation}%`,
      car2Value: `-${car2.depreciation}%`,
      winner: compareNumeric(car2.depreciation, car1.depreciation), // Svalutazione minore è meglio
      description: 'Perdita di valore stimata in 3 anni'
    },
    {
      category: 'Potenza',
      icon: Gauge,
      car1Value: car1.specs.power,
      car2Value: car2.specs.power,
      winner: compareNumeric(parseNumericValue(car1.specs.power), parseNumericValue(car2.specs.power)),
      description: 'Potenza massima del motore'
    },
    {
      category: 'Consumi',
      icon: Fuel,
      car1Value: car1.specs.consumption,
      car2Value: car2.specs.consumption,
      winner: compareNumeric(parseNumericValue(car2.specs.consumption), parseNumericValue(car1.specs.consumption)), // Consumi minori sono meglio
      description: 'Consumo medio combinato'
    },
    {
      category: 'Accelerazione',
      icon: Timer,
      car1Value: car1.specs.acceleration,
      car2Value: car2.specs.acceleration,
      winner: compareNumeric(parseNumericValue(car2.specs.acceleration), parseNumericValue(car1.specs.acceleration)), // Tempo minore è meglio
      description: 'Tempo 0-100 km/h'
    },
    {
      category: 'Rating',
      icon: Star,
      car1Value: `${car1.rating}/5`,
      car2Value: `${car2.rating}/5`,
      winner: compareNumeric(car1.rating, car2.rating),
      description: 'Valutazione media utenti'
    }
  ];

  // Calcola il vincitore generale
  const car1Wins = comparisons.filter(c => c.winner === 'better1').length;
  const car2Wins = comparisons.filter(c => c.winner === 'better2').length;
  const ties = comparisons.filter(c => c.winner === 'equal').length;

  const overallWinner = car1Wins > car2Wins ? 'car1' : car2Wins > car1Wins ? 'car2' : 'tie';

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

  const getWinnerIcon = (winner: string) => {
    switch (winner) {
      case 'better1':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'better2':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'equal':
        return <Equal className="h-4 w-4 text-slate-500" />;
      default:
        return null;
    }
  };

  const getValueClass = (winner: string, position: 'car1' | 'car2') => {
    if (winner === 'equal') return 'text-slate-600 dark:text-slate-400';
    if ((winner === 'better1' && position === 'car1') || (winner === 'better2' && position === 'car2')) {
      return 'text-green-600 font-semibold dark:text-green-400';
    }
    return 'text-slate-600 dark:text-slate-400';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header risultati */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/40 dark:to-violet-800/40">
                <Award className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <span>Risultati del Confronto</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Riepilogo vincitore */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-25 border border-slate-200/50 dark:from-slate-800/50 dark:to-slate-700/50 dark:border-slate-700/50">
              <div className="text-center">
                {overallWinner === 'tie' ? (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Equal className="h-6 w-6 text-slate-500" />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      Pareggio
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="h-6 w-6 text-amber-500" />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      Vincitore: {overallWinner === 'car1' ? `${car1.brand} ${car1.model}` : `${car2.brand} ${car2.model}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Auto 1: {car1Wins} vittorie
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Auto 2: {car2Wins} vittorie
                  </span>
                  {ties > 0 && (
                    <span className="flex items-center gap-1">
                      <Equal className="h-4 w-4 text-slate-500" />
                      {ties} pareggi
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tabella comparativa */}
            <div className="space-y-3">
              {comparisons.map((comparison, index) => (
                <motion.div
                  key={comparison.category}
                  variants={itemVariants}
                  className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-25 border border-slate-200/50 hover:shadow-md transition-all duration-200 dark:from-slate-800/30 dark:to-slate-700/30 dark:border-slate-700/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Categoria */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm border border-slate-200/50 dark:bg-slate-800 dark:border-slate-700/50">
                        <comparison.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {comparison.category}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {comparison.description}
                        </div>
                      </div>
                    </div>

                    {/* Valore Auto 1 */}
                    <div className="text-center">
                      <div className={`font-mono ${getValueClass(comparison.winner, 'car1')}`}>
                        {comparison.car1Value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {car1.brand} {car1.model}
                      </div>
                    </div>

                    {/* Indicatore vincitore */}
                    <div className="flex justify-center">
                      {comparison.winner === 'better1' && (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs font-medium">Auto 1</span>
                        </div>
                      )}
                      {comparison.winner === 'better2' && (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs font-medium">Auto 2</span>
                        </div>
                      )}
                      {comparison.winner === 'equal' && (
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <Equal className="h-4 w-4" />
                          <span className="text-xs font-medium">Pari</span>
                        </div>
                      )}
                    </div>

                    {/* Valore Auto 2 */}
                    <div className="text-center">
                      <div className={`font-mono ${getValueClass(comparison.winner, 'car2')}`}>
                        {comparison.car2Value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {car2.brand} {car2.model}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Raccomandazioni */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40">
                <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span>Raccomandazioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Raccomandazione Auto 1 */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-25 border border-indigo-200/50 dark:from-indigo-950/40 dark:to-indigo-900/40 dark:border-indigo-800/30">
                <h4 className="font-medium text-indigo-900 mb-2 dark:text-indigo-300">
                  {car1.brand} {car1.model}
                </h4>
                <p className="text-sm text-indigo-700 mb-3 dark:text-indigo-300">
                  {car1Wins > car2Wins 
                    ? "Scelta consigliata per prestazioni e caratteristiche superiori."
                    : car1.price < car2.price 
                      ? "Opzione più economica con buon rapporto qualità-prezzo."
                      : "Alternativa valida con caratteristiche specifiche interessanti."
                  }
                </p>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-indigo-800 dark:text-indigo-200">Ideale per:</div>
                  <ul className="text-xs text-indigo-700 space-y-1 dark:text-indigo-300">
                    {car1.pros.slice(0, 2).map((pro, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Raccomandazione Auto 2 */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-teal-25 border border-teal-200/50 dark:from-teal-950/40 dark:to-teal-900/40 dark:border-teal-800/30">
                <h4 className="font-medium text-teal-900 mb-2 dark:text-teal-300">
                  {car2.brand} {car2.model}
                </h4>
                <p className="text-sm text-teal-700 mb-3 dark:text-teal-300">
                  {car2Wins > car1Wins 
                    ? "Scelta consigliata per prestazioni e caratteristiche superiori."
                    : car2.price < car1.price 
                      ? "Opzione più economica con buon rapporto qualità-prezzo."
                      : "Alternativa valida con caratteristiche specifiche interessanti."
                  }
                </p>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-teal-800 dark:text-teal-200">Ideale per:</div>
                  <ul className="text-xs text-teal-700 space-y-1 dark:text-teal-300">
                    {car2.pros.slice(0, 2).map((pro, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <div className="w-1 h-1 rounded-full bg-teal-500 mt-1.5 flex-shrink-0"></div>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Considerazioni finali */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-25 border border-amber-200/50 dark:from-amber-950/40 dark:to-amber-900/40 dark:border-amber-800/30">
              <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4" />
                Considerazioni Importanti
              </h4>
              <div className="text-sm text-amber-700 space-y-2 dark:text-amber-300">
                <p>
                  • La svalutazione può variare in base alle condizioni del mercato e alla manutenzione del veicolo
                </p>
                <p>
                  • I consumi reali possono differire da quelli dichiarati in base allo stile di guida
                </p>
                <p>
                  • Considera sempre i costi di manutenzione e assicurazione nella valutazione finale
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}