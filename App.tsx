import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import IdeaGenerator from './components/IdeaGenerator';
import Contact from './components/Contact';
import { ViewState } from './types';
import { APP_NAME } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    const element = document.getElementById(view);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Drive parallax effects via CSS variables for performance
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-retro selection:bg-indigo-500 selection:text-white">
      {/* CRT Scanline Overlay */}
      <div className="scanlines"></div>

      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        <section id={ViewState.HOME}>
          <Hero onNavigate={handleNavigate} />
        </section>
        <section id={ViewState.SERVICES} className="scroll-mt-20 relative">
          <Services />
        </section>
        <section id={ViewState.AI_LAB} className="scroll-mt-20 relative">
          <IdeaGenerator />
        </section>
        <section id={ViewState.CONTACT} className="scroll-mt-20">
          <Contact />
        </section>
      </main>

      <footer className="bg-black border-t-4 border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" fillOpacity="0.1" />
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <rect x="2" y="2" width="20" height="20" fillOpacity="0.1" />
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-lg text-slate-500 font-retro">
              &copy; {new Date().getFullYear()} {APP_NAME}. LEVEL COMPLETE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;