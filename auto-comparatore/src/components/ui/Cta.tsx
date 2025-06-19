'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Cta() {
  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto a trovare l'auto dei tuoi sogni?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di persone che hanno già trovato l'auto perfetta grazie ad AutoCompare
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Registrati Gratuitamente
          </Button>
        </motion.div>
      </div>
    </section>
  );
}