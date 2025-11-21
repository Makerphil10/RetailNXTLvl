import React from 'react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="py-24 bg-black relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 border-b-2 border-white/20 pb-4 flex justify-between items-end">
            <div>
                <h2 className="font-pixel text-3xl md:text-5xl text-white uppercase text-shadow-glow">
                    XP MODULES
                </h2>
                <div className="flex gap-2 mt-2">
                    <div className="w-4 h-4 bg-cyan-400"></div>
                    <div className="w-4 h-4 border border-white/50"></div>
                </div>
            </div>
            <div className="hidden md:block font-mono-tech text-cyan-400 text-xl tracking-widest">
                SOLUTIONS :: SET 1
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Box;

            return (
              <div 
                key={index}
                className="group relative bg-black border border-white/20 hover:border-cyan-400 transition-all duration-300 p-1 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(103,232,249,0.25)]"
              >
                {/* Inner Border/Content Area */}
                <div className="border border-white/10 h-full p-6 flex flex-col relative overflow-hidden bg-white/5 group-hover:bg-black transition-colors">
                    
                    {/* Scanline on hover */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 hidden group-hover:block animate-[scan_2s_linear_infinite]" style={{animation: 'scan 2s linear infinite'}}></div>
                    <style>{`@keyframes scan { 0% {top:0} 100% {top:100%} }`}</style>

                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4 group-hover:border-cyan-400/30 transition-colors">
                        <span className="font-mono-tech text-xs text-cyan-400">LVL_0{index + 1}</span>
                        <IconComponent className="h-8 w-8 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    {/* Title */}
                    <h3 className="font-pixel text-sm text-white mb-4 leading-relaxed group-hover:text-cyan-400 uppercase tracking-wide">
                        {service.title}
                    </h3>
                    
                    {/* Description Area */}
                    <div className="flex-grow font-retro text-lg text-gray-400 leading-tight group-hover:text-gray-300">
                        <span className="text-cyan-600 mr-2 group-hover:text-cyan-400">{'>'}</span>
                        {service.description}
                    </div>

                    {/* Bottom Metadata footer */}
                    <div className="mt-6 pt-2 border-t border-white/10 flex justify-between items-center group-hover:border-cyan-400/30 transition-colors">
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1 h-1 ${i < 3 ? 'bg-gray-600 group-hover:bg-cyan-400' : 'border border-gray-600'}`}></div>
                            ))}
                         </div>
                         <span className="font-mono-tech text-[10px] text-gray-600 group-hover:text-cyan-400">STATUS: UNLOCKED</span>
                    </div>

                    {/* Decorative Background Glitch Text */}
                    <div className="absolute bottom-2 right-2 opacity-5 group-hover:opacity-10 pointer-events-none font-pixel text-5xl text-white select-none truncate max-w-full transition-opacity">
                        {index}101
                    </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom Glitch Bar */}
        <div className="mt-16 h-12 w-full border-y border-white/10 flex items-center overflow-hidden opacity-50 bg-black/50">
             <div className="font-pixel text-4xl text-cyan-900/40 whitespace-nowrap animate-pulse w-full text-center">
                %&^!*#@ LEVEL UP YOUR STORE %&^!*#@ LOADING NEXT LEVEL... %&^!*#@
             </div>
        </div>

      </div>
    </div>
  );
};

export default Services;