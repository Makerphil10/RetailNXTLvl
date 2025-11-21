import React, { useState } from 'react';
import { Mail, MapPin, Phone, Radio } from 'lucide-react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="bg-black py-24 relative border-t border-white/10 overflow-hidden">
      {/* Decorative background binary */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 font-mono-tech text-xs text-cyan-400 break-all pointer-events-none overflow-hidden">
        {Array(2000).fill(0).map(() => Math.round(Math.random())).join('')}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Info Panel */}
            <div className="border-2 border-white p-6 lg:p-12 flex flex-col justify-between box-chamfer relative">
                <div className="absolute top-0 right-0 p-2">
                    <Radio className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>

                <div>
                    <h2 className="font-pixel text-3xl text-white mb-8 uppercase">
                        Start New<br/>Game
                    </h2>
                    <p className="font-retro text-xl text-gray-400 mb-12 max-w-md">
                        Ready to gamify your retail experience? Connect with us to design the next level.
                    </p>

                    <div className="space-y-6 font-mono-tech text-sm text-cyan-400">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-2">
                            <Phone className="w-4 h-4" />
                            <span>PHONE: +49 (177) 4333 272</span>
                        </div>
                        <div className="flex items-center gap-4 border-b border-white/10 pb-2">
                            <Mail className="w-4 h-4" />
                            <span>EMAIL: info@RETAILNEXTLVL.COM</span>
                        </div>
                        <div className="flex items-center gap-4 border-b border-white/10 pb-2">
                            <MapPin className="w-4 h-4" />
                            <span>HQ: NUREMBERG, GERMANY</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12">
                    <div className="w-full h-8 border border-white/30 flex items-center px-2 font-mono-tech text-xs text-gray-500">
                        CONNECTION: SECURE
                    </div>
                </div>
            </div>

            {/* Form Panel */}
            <div className="bg-cyan-900/10 border border-cyan-400/50 p-6 lg:p-8 relative">
                {/* Corner accoutrements */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400"></div>

                <h3 className="font-mono-tech text-cyan-400 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    MESSAGE_PANEL
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            className="block w-full bg-black/50 border border-white/30 text-white font-retro text-xl p-3 focus:border-cyan-400 focus:outline-none transition-colors pl-10"
                            placeholder="NAME"
                            required
                        />
                        <div className="absolute left-3 top-4 text-gray-500 text-xs font-mono-tech">ID:</div>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="email"
                            className="block w-full bg-black/50 border border-white/30 text-white font-retro text-xl p-3 focus:border-cyan-400 focus:outline-none transition-colors pl-12"
                            placeholder="EMAIL ADDRESS"
                            required
                        />
                         <div className="absolute left-3 top-4 text-gray-500 text-xs font-mono-tech">@:</div>
                    </div>

                    <div className="relative">
                        <textarea
                            rows={4}
                            className="block w-full bg-black/50 border border-white/30 text-white font-retro text-xl p-3 focus:border-cyan-400 focus:outline-none transition-colors"
                            placeholder="HOW CAN WE HELP YOU LEVEL UP?"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 font-pixel text-sm uppercase tracking-widest transition-all relative overflow-hidden group ${
                            sent ? 'bg-green-500 text-black' : 'bg-cyan-400 text-black hover:bg-white'
                        }`}
                    >
                        <span className="relative z-10">{sent ? 'MESSAGE SENT' : 'SEND MESSAGE'}</span>
                        <div className="absolute top-0 left-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                    </button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;