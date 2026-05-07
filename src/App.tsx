/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeView } from './views/Home';
import { ServicesView } from './views/Services';
import { BookingView } from './views/Booking';
import { LoyaltyView } from './views/Loyalty';
import { ProfileView } from './views/Profile';
import { Navbar, BottomNav } from './components/layout/Navigation';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-cream/30 flex flex-col">
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0 md:pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/services" element={<ServicesView />} />
              <Route path="/booking" element={<BookingView />} />
              <Route path="/loyalty" element={<LoyaltyView />} />
              <Route path="/profile" element={<ProfileView />} />
            </Routes>
          </AnimatePresence>
        </main>
        <BottomNav />
        <Toaster position="top-center" expand={false} richColors />
      </div>
    </Router>
  );
}

