/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Architecture } from './pages/Architecture';
import { Roadmap } from './pages/Roadmap';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-on-background">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
