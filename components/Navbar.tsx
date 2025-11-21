import React from 'react';
import { ViewState } from '../types';
import { APP_NAME } from '../constants';
import { Terminal, Crosshair } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { label: 'HOME', value: ViewState.HOME },
    { label: 'SERVICES', value: ViewState.SERVICES },
    { label: 'STRATEGY', value: ViewState.AI_LAB },
    { label: 'CONTACT', value: ViewState.CONTACT },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-cyan-400/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer gap-3 group pl-2" 
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="text-cyan-400 animate-pulse">
                <Terminal className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
                <span className="font-pixel text-[10px] text-cyan-400 tracking-widest">LEVEL.2.0</span>
                <span className="font-mono-tech text-xl text-white tracking-tighter uppercase hover:text-cyan-400 transition-colors">
                {APP_NAME}
                </span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => onNavigate(item.value)}
                  className={`relative px-4 py-2 text-lg font-mono-tech uppercase tracking-wide transition-all duration-75 ${
                    currentView === item.value
                      ? 'bg-cyan-400 text-black font-bold border border-cyan-400'
                      : 'text-slate-400 hover:text-cyan-400 hover:border border border-transparent hover:border-cyan-400/50'
                  }`}
                >
                  {currentView === item.value && (
                      <Crosshair className="absolute top-0.5 right-0.5 w-2 h-2 text-black" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Nav - Minimal */}
          <div className="md:hidden flex space-x-4 pr-2">
            <span className="font-mono-tech text-cyan-400 text-xs animate-pulse">>> MENU</span>
          </div>
        </div>
      </div>
      {/* Decorative bottom line with ticks */}
      <div className="h-[2px] w-full bg-cyan-900 flex justify-between">
        {[...Array(20)].map((_, i) => (
            <div key={i} className="w-[1px] h-2 bg-cyan-400/20 mt-1"></div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;