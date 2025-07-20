'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, ChevronUp, MessageCircle, MapPin, Phone, Shield, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Animazione per gli elementi decorativi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Varianti di animazione elementi
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-slate-800/20 bg-[size:40px_40px] opacity-20"></div>
      
      {/* Dotted pattern */}
      <div className="absolute inset-0 bg-texture-dots opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top section with newsletter */}
        <div className="mb-16 lg:flex lg:justify-between lg:items-start gap-10">
          <div className="mb-10 lg:mb-0 lg:max-w-md text-center lg:text-left">
  <div className="flex items-center mb-4 justify-center lg:justify-start">
    <div className="mr-3 relative">
      <div className="absolute -inset-2 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 rounded-full blur-md"></div>
      <div className="relative bg-slate-900 rounded-full p-2.5 border border-indigo-500/30">
        <Car className="w-6 h-6 text-indigo-400" />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">AutoCompare</h2>
  </div>
  <p className="text-slate-400 mb-6 leading-relaxed">
    Il modo più semplice e intelligente per confrontare, analizzare e scegliere la tua prossima auto. 
    Dati aggiornati e verificati per farti prendere la decisione giusta.
  </p>
  <div className="flex space-x-3 justify-center lg:justify-start">
    <a href="#" className="p-2.5 rounded-full bg-slate-800/80 hover:bg-indigo-800/80 text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-indigo-500/50 shadow-sm">
      <Facebook className="w-5 h-5" />
    </a>
    <a href="#" className="p-2.5 rounded-full bg-slate-800/80 hover:bg-blue-800/80 text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50 shadow-sm">
      <Twitter className="w-5 h-5" />
    </a>
    <a href="#" className="p-2.5 rounded-full bg-slate-800/80 hover:bg-violet-800/80 text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-violet-500/50 shadow-sm">
      <Instagram className="w-5 h-5" />
    </a>
    <a href="#" className="p-2.5 rounded-full bg-slate-800/80 hover:bg-blue-800/80 text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50 shadow-sm">
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
</div>
          
          <div className="lg:min-w-[24rem] bg-slate-800/30 backdrop-blur-sm p-7 rounded-2xl border border-slate-700/50 shadow-lg">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-gradient-to-br from-indigo-900/70 to-blue-900/70 rounded-lg border border-indigo-700/50">
                <MessageCircle className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ricevi aggiornamenti</h3>
            </div>
            <p className="text-slate-400 mb-5">Iscriviti alla newsletter per ricevere le ultime novità e offerte speciali.</p>
            
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-emerald-900/30 text-emerald-400 p-4 rounded-xl border border-emerald-800/50 shadow-inner"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4" />
                  <p className="font-medium">Grazie per l'iscrizione! ✓</p>
                </div>
                <p className="text-sm text-emerald-300/80">Ti terremo aggiornato sulle novità.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <div className="flex-grow relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    className="w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-600/50 focus:border-indigo-500/50 rounded-l-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-opacity-50 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-4 py-3 rounded-r-xl transition-all duration-300 shadow-md shadow-indigo-900/30 flex items-center group"
                >
                  <span className="hidden sm:inline mr-2">Iscriviti</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Middle section with links */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-16"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 flex items-center gap-2">
              <div className="p-1 bg-indigo-900/50 rounded border border-indigo-700/50">
                <Globe className="w-4 h-4 text-indigo-400" />
              </div>
              Collegamenti Rapidi
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Auto', path: '/cars' },
                { name: 'Confronto', path: '/compare' },
                { name: 'Chi Siamo', path: '/about' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className="text-slate-400 hover:text-indigo-300 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-2.5 group-hover:bg-indigo-500 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 flex items-center gap-2">
              <div className="p-1 bg-blue-900/50 rounded border border-blue-700/50">
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
              Risorse
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: 'Blog', path: '/blog' },
                { name: 'Guide all\'acquisto', path: '/guides' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Supporto', path: '/support' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className="text-slate-400 hover:text-blue-300 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-2.5 group-hover:bg-blue-500 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300 flex items-center gap-2">
              <div className="p-1 bg-violet-900/50 rounded border border-violet-700/50">
                <Car className="w-4 h-4 text-violet-400" />
              </div>
              Servizi
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: 'Confronto veicoli', path: '/services/compare' },
                { name: 'Storia veicoli', path: '/services/history' },
                { name: 'Valutazione usato', path: '/services/valuation' },
                { name: 'Configuratore', path: '/services/configurator' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className="text-slate-400 hover:text-violet-300 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-2.5 group-hover:bg-violet-500 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 flex items-center gap-2">
              <div className="p-1 bg-blue-900/50 rounded border border-blue-700/50">
                <MessageCircle className="w-4 h-4 text-blue-400" />
              </div>
              Contatti
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-2 bg-gradient-to-br from-slate-800 to-indigo-900/30 rounded-lg border border-indigo-700/30 shadow-sm">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Email</p>
                  <a href="mailto:info@autocompare.it" className="text-slate-400 hover:text-indigo-300 transition-all duration-300">
                    info@autocompare.it
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-2 bg-gradient-to-br from-slate-800 to-indigo-900/30 rounded-lg border border-indigo-700/30 shadow-sm">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Telefono</p>
                  <a href="tel:+39123456789" className="text-slate-400 hover:text-indigo-300 transition-all duration-300">
                    +39 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-2 bg-gradient-to-br from-slate-800 to-indigo-900/30 rounded-lg border border-indigo-700/30 shadow-sm">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Sede</p>
                  <p className="text-slate-400">
                    Via Automobili 42, Milano, IT
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Bottom section with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800/80">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AutoCompare. Tutti i diritti riservati.
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-indigo-300 transition-all duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-indigo-300 transition-all duration-300">
              Termini di Servizio
            </Link>
            <Link href="/cookies" className="text-slate-500 hover:text-indigo-300 transition-all duration-300">
              Cookie Policy
            </Link>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-full shadow-lg shadow-indigo-900/30 transform transition-all duration-300 hover:scale-110 focus:outline-none group border border-indigo-500/20"
            aria-label="Torna su"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* CSS per animazioni aggiuntive */}
      <style jsx>{`
        .bg-grid-slate-800\/20 {
          background-image: linear-gradient(to right, rgba(30, 41, 59, 0.2) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(30, 41, 59, 0.2) 1px, transparent 1px);
        }
        .bg-texture-dots {
          background-image: radial-gradient(circle, rgba(99, 102, 241, 0.2) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </footer>
  );
}