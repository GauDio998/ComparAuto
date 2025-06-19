'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, Share2, Download, BookmarkPlus, 
  Mail, MessageCircle, Printer, ArrowLeft 
} from 'lucide-react';
import { useState } from 'react';

interface CompareActionsProps {
  onReset: () => void;
  hasComparison: boolean;
}

export default function CompareActions({ onReset, hasComparison }: CompareActionsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Confronto Auto - ComparAuto',
          text: 'Guarda questo confronto dettagliato tra auto',
          url: window.location.href
        });
      } else {
        // Fallback: copia link negli appunti
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiato negli appunti!');
      }
    } catch (error) {
      console.error('Errore nella condivisione:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simula salvataggio
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Confronto salvato nei preferiti!');
    setIsSaving(false);
  };

  const handleExport = () => {
    // Simula export PDF
    alert('Funzione di export PDF in arrivo!');
  };

  const actions = [
    {
      id: 'reset',
      label: 'Nuovo Confronto',
      icon: RotateCcw,
      onClick: onReset,
      variant: 'outline' as const,
      className: 'border-slate-300 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:border-slate-600 dark:hover:border-indigo-500 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/40'
    },
    {
      id: 'share',
      label: 'Condividi',
      icon: Share2,
      onClick: handleShare,
      loading: isSharing,
      variant: 'outline' as const,
      className: 'border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:text-blue-300 dark:hover:bg-blue-950/40',
      disabled: !hasComparison
    },
    {
      id: 'save',
      label: 'Salva',
      icon: BookmarkPlus,
      onClick: handleSave,
      loading: isSaving,
      variant: 'outline' as const,
      className: 'border-slate-300 hover:border-green-400 hover:text-green-600 hover:bg-green-50 dark:border-slate-600 dark:hover:border-green-500 dark:hover:text-green-300 dark:hover:bg-green-950/40',
      disabled: !hasComparison
    },
    {
      id: 'export',
      label: 'Esporta PDF',
      icon: Download,
      onClick: handleExport,
      variant: 'default' as const,
      className: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-500/20 dark:shadow-indigo-900/30',
      disabled: !hasComparison
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 150 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl"
    >
      {/* Azioni principali */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-4 mb-6"
      >
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            size="lg"
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
            className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 transform hover:scale-105 ${action.className}`}
          >
            {action.loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Caricamento...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <action.icon className="h-4 w-4" />
                {action.label}
              </span>
            )}
          </Button>
        ))}
      </motion.div>

      {/* Azioni di condivisione aggiuntive */}
      {hasComparison && (
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-25 border border-slate-200/50 dark:from-slate-800/50 dark:to-slate-700/50 dark:border-slate-700/50"
        >
          <div className="text-center mb-4">
            <h3 className="font-medium text-slate-900 mb-2 dark:text-white">
              Condividi il Confronto
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Invia questo confronto ad amici o salvalo per dopo
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:text-blue-300 dark:hover:bg-blue-950/40"
              onClick={() => {
                const subject = encodeURIComponent('Confronto Auto - ComparAuto');
                const body = encodeURIComponent('Dai un\'occhiata a questo confronto dettagliato tra auto: ' + window.location.href);
                window.open(`mailto:?subject=${subject}&body=${body}`);
              }}
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-green-400 hover:text-green-600 hover:bg-green-50 dark:border-slate-600 dark:hover:border-green-500 dark:hover:text-green-300 dark:hover:bg-green-950/40"
              onClick={() => {
                const text = encodeURIComponent('Guarda questo confronto auto: ' + window.location.href);
                window.open(`https://wa.me/?text=${text}`);
              }}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 dark:border-slate-600 dark:hover:border-purple-500 dark:hover:text-purple-300 dark:hover:bg-purple-950/40"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-1" />
              Stampa
            </Button>
          </div>
        </motion.div>
      )}

      {/* Link di navigazione */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center mt-8"
      >
        <Button
          variant="ghost"
          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/40"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Home
        </Button>
      </motion.div>
    </motion.div>
  );
}