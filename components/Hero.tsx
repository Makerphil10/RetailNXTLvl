import React from 'react';
import { ViewState } from '../types';
import { Globe, ArrowRight, Terminal, Activity } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16">
       {/* Background Grid with Perspective */}
       <div className="absolute inset-0 grid-bg opacity-25" style={{ perspective: '500px', transform: 'scale(1.1)' }}></div>
       
       {/* Fluid Ambient Glow */}
       <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content - Fluid Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center relative">
              
              {/* Decorative Tag */}
              <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-cyan-400 animate-ping"></div>
                  <div className="h-[1px] w-12 bg-cyan-900"></div>
                  <span className="font-mono-tech text-cyan-400 tracking-[0.2em] text-xs md:text-sm">EXPERIENCE LOADING...</span>
              </div>
              
              <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-8 text-shadow-glow">
                  RETAIL<br/>
                  <span className="text-cyan-400">NEXT_LEVEL</span>
              </h1>
              
              <div className="relative border-l-2 border-cyan-900/50 pl-6 py-2 mb-10 backdrop-blur-sm bg-black/20">
                  <div className="absolute top-0 left-[-2px] h-8 w-[2px] bg-cyan-400"></div>
                  <p className="font-retro text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                      Unlock the potential of your physical space. We gamify the customer journey to bridge the gap between digital behavior and real-world engagement.
                  </p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                  <button 
                    onClick={() => onNavigate(ViewState.SERVICES)}
                    className="group relative px-8 py-4 bg-cyan-400 text-black font-pixel text-xs md:text-sm hover:bg-white transition-all duration-300 box-chamfer overflow-hidden shadow-[0_0_20px_rgba(103,232,249,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                  >
                      <span className="relative z-10 flex items-center gap-3">
                        EXPLORE_LEVELS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                  </button>
                  
                  <button 
                    onClick={() => onNavigate(ViewState.AI_LAB)}
                    className="px-8 py-4 border border-white/30 text-white font-pixel text-xs md:text-sm hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-950/30 transition-all duration-300 box-chamfer flex items-center gap-3"
                  >
                      <Terminal className="w-4 h-4" />
                      AI_STRATEGIST
                  </button>
              </div>
          </div>

          {/* Right Visual - Floating Element */}
          <div className="lg:col-span-5 relative hidden lg:block perspective-1000">
               <div className="relative w-full aspect-square max-w-md mx-auto transform transition-transform duration-500 hover:scale-105">
                   {/* Rotating Rings */}
                   <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                   <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                   
                   {/* Center Content */}
                   <div className="absolute inset-4 flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 via-black to-blue-900/30 border border-cyan-400/30 rounded-full overflow-hidden relative shadow-[0_0_50px_rgba(103,232,249,0.15)] group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            
                            {/* Planet Overlay */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <Globe className="w-16 h-16 text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(103,232,249,0.8)]" strokeWidth={0.5} />
                                <span className="font-mono-tech text-[10px] text-cyan-400 mt-2 tracking-widest">OMNICHANNEL</span>
                            </div>
                        </div>
                   </div>

                   {/* Floating Data Points */}
                   <div className="absolute top-0 right-10 bg-black/80 border border-cyan-400/30 p-2 font-mono-tech text-xs text-cyan-400 backdrop-blur-md animate-bounce shadow-lg">
                       CX: OPTIMIZED
                   </div>
                   <div className="absolute bottom-20 left-0 bg-black/80 border border-white/20 p-2 font-mono-tech text-xs text-white backdrop-blur-md flex gap-2 items-center shadow-lg">
                       <Activity className="w-3 h-3 text-green-400" />
                       {'> PLAY_MODE'}
                   </div>
               </div>
          </div>
       </div>

       {/* Scroll Indicator */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
            <span className="font-mono-tech text-[10px] tracking-widest text-cyan-400">SCROLL_TO_START</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
       </div>
    </div>
  );
}

export default Hero;