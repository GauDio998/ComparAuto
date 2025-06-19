// src/app/page.tsx
'use client';

import Hero from '@/components/ui/Hero';
import Features from '@/components/ui/Features';
//import Cta from '@/components/ui/Cta';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />
      
      {/* CTA Section */}
      {/*<Cta /> */}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}