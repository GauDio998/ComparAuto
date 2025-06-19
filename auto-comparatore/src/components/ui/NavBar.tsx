'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Car, PieChart, Users, ChevronDown, SparklesIcon, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Auto', href: '/cars', icon: Car },
  { name: 'Confronto', href: '/compare', icon: PieChart },
  { name: 'Chi Siamo', href: '/about', icon: Users },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Varianti di animazione
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 px-6 sm:px-8 lg:px-12 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-indigo-100/70 dark:bg-slate-900/80 dark:border-indigo-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-md opacity-70 dark:from-indigo-900 dark:to-blue-900"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-full p-2.5 shadow-sm border border-indigo-100 dark:border-indigo-800">
                  <Car className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-600 dark:from-indigo-300 dark:to-blue-400 leading-none">
                  ComparAuto
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400">Confronta</span> • 
                  <span className="text-blue-600 dark:text-blue-400"> Scegli</span> • 
                  <span className="text-violet-600 dark:text-violet-400"> Guida</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div 
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
              className="ml-10 flex items-center space-x-1"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemAnimation}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeItem === item.name 
                        ? 'text-indigo-600 bg-indigo-50 shadow-sm dark:text-indigo-300 dark:bg-indigo-950/40' 
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 dark:text-slate-300 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/30'
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <item.icon className={`h-4 w-4 ${activeItem === item.name ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.name}</span>
                    
                    {item.name === 'Auto' && (
                      <ChevronDown className="h-3 w-3 ml-0.5" />
                    )}
                  </Link>
                  
                  {/* Indicatore attivo */}
                  {activeItem === item.name && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-1 w-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full dark:from-indigo-400 dark:to-blue-400"></div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={itemAnimation}
              >
                <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl font-medium ml-2 shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transform transition-all duration-300 hover:scale-105 dark:shadow-indigo-900/30">
                  <span className="relative">
                    <span className="absolute top-0 right-0 -mt-1.5 -mr-1.5">
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75 dark:bg-blue-500"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400 dark:bg-blue-600"></span>
                      </span>
                    </span>
                    Inizia Ora
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-xl p-2 ${isScrolled ? 'text-slate-700 hover:bg-indigo-50 dark:text-slate-300 dark:hover:bg-indigo-950/40' : 'text-slate-700 hover:bg-white/30 dark:text-slate-300 dark:hover:bg-slate-800/30'}`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-lg border-t border-indigo-100 shadow-lg rounded-b-2xl overflow-hidden dark:bg-slate-900/90 dark:border-indigo-900/30"
          >
            <div className="px-6 sm:px-8 py-5 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeItem === item.name
                      ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/40'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 dark:text-slate-300 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/30'
                  }`}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsOpen(false);
                  }}
                >
                  <div className={`p-2 rounded-lg ${
                    activeItem === item.name
                      ? 'bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40'
                      : 'bg-slate-100 dark:bg-slate-800/70'
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      activeItem === item.name
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`} />
                  </div>
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="px-4 py-3">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl font-medium shadow-md shadow-indigo-500/20 py-6 dark:shadow-indigo-900/30">
                  <span className="flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    Inizia Ora
                  </span>
                </Button>
              </div>
              
              {/* Elemento decorativo */}
              <div className="mx-4 p-3.5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/70 flex items-center justify-between dark:from-indigo-950/40 dark:to-blue-950/40 dark:border-indigo-800/30">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm border border-indigo-100/70 dark:bg-slate-800 dark:border-indigo-800/30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3V4M12 20V21M3 12H4M20 12H21M18.364 18.364L17.657 17.657M18.364 5.636L17.657 6.343M5.636 18.364L6.343 17.657M5.636 5.636L6.343 6.343" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="4" fill="#818cf8" fillOpacity="0.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Novità: confronto tra veicoli elettrici</span>
                </div>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Scopri</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}