'use client';

import CompareContainer from '@/components/ui/compare/CompareContainer';
import Footer from '@/components/ui/Footer';

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Compare Container */}
      <CompareContainer />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}