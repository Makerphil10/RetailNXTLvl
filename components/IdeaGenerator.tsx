import React, { useState } from 'react';
import { generateGamificationStrategies } from '../services/geminiService';
import { AIResponseState } from '../types';
import { Terminal, Cpu, AlertTriangle, Save } from 'lucide-react';

const IdeaGenerator: React.FC = () => {
  const [businessType, setBusinessType] = useState('');
  const [audience, setAudience] = useState('');
  const [result, setResult] = useState<AIResponseState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !audience) return;

    setResult({ isLoading: true, data: null, error: null });

    try {
      const strategies = await generateGamificationStrategies(businessType, audience);
      setResult({ isLoading: false, data: strategies, error: null });
    } catch (err) {
      setResult({ 
        isLoading: false, 
        data: null, 
        error: "Generation failed. Try again." 
      });
    }
  };

  return (
    <div className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Frame */}
        <div className="border-2 border-white p-1 mb-8">
            <div className="bg-white text-black p-2 flex justify-between items-center">
                <h2 className="font-pixel text-xl md:text-2xl uppercase">STRATEGY_ENGINE</h2>
                <Cpu className="w-6 h-6" />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Input Terminal */}
            <div className="lg:col-span-1">
                <div className="bg-black border border-cyan-400 p-4 shadow-[0_0_10px_rgba(103,232,249,0.1)] relative">
                    <div className="absolute -top-3 left-4 bg-black px-2 font-mono-tech text-cyan-400 text-sm">MISSION_BRIEF</div>
                    
                    <form onSubmit={handleGenerate} className="space-y-6 mt-4">
                        <div>
                            <label className="block font-mono-tech text-xs text-gray-500 mb-1 uppercase">Industry_Sector</label>
                            <input
                                type="text"
                                className="w-full bg-black border-b-2 border-white text-cyan-400 font-retro text-xl p-2 focus:outline-none focus:border-cyan-400 placeholder-gray-700"
                                placeholder="[TYPE HERE]"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-mono-tech text-xs text-gray-500 mb-1 uppercase">Target_Audience</label>
                            <input
                                type="text"
                                className="w-full bg-black border-b-2 border-white text-cyan-400 font-retro text-xl p-2 focus:outline-none focus:border-cyan-400 placeholder-gray-700"
                                placeholder="[TYPE HERE]"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={result.isLoading}
                            className="w-full border-2 border-white bg-transparent text-white font-pixel text-xs py-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {result.isLoading ? <span className="animate-pulse">GENERATING...</span> : 'GENERATE_CONCEPTS'}
                        </button>
                    </form>
                </div>
                
                {/* Decorative System Info */}
                <div className="mt-4 font-mono-tech text-[10px] text-gray-600 space-y-1">
                    <div className="flex justify-between">
                        <span>CREATIVITY</span>
                        <span>{result.isLoading ? '98%' : '100%'}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-800">
                        <div className={`h-full bg-cyan-400 ${result.isLoading ? 'w-[98%]' : 'w-[12%]'}`}></div>
                    </div>
                    <div className="flex justify-between">
                        <span>RESOURCES</span>
                        <span>AVAILABLE</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Output Display */}
            <div className="lg:col-span-2 min-h-[400px] border border-white/20 bg-black/50 relative p-6">
                {/* Scanline decorative */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10" style={{backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px'}}></div>

                {!result.data && !result.error && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono-tech">
                        <Terminal className="w-12 h-12 mb-4 opacity-50" />
                        <p className="animate-pulse">WAITING_FOR_BRIEF...</p>
                    </div>
                )}

                {result.error && (
                    <div className="border border-red-500 p-4 text-red-500 font-mono-tech flex items-start gap-4">
                        <AlertTriangle />
                        <div>
                            <p>ERROR</p>
                            <p>{result.error}</p>
                        </div>
                    </div>
                )}

                {result.data && (
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center justify-between border-b border-cyan-400 pb-2">
                            <span className="font-pixel text-cyan-400 text-xs">STRATEGIES_UNLOCKED: {result.data.length}</span>
                            <Save className="w-4 h-4 text-cyan-400 cursor-pointer hover:text-white" />
                        </div>

                        {result.data.map((idea, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-cyan-600 font-mono-tech">0{idx + 1}</span>
                                    <h3 className="text-white font-pixel text-sm uppercase">{idea.conceptName}</h3>
                                </div>
                                <div className="pl-6 border-l border-white/20 ml-2 space-y-2">
                                    <p className="font-retro text-lg text-gray-300">
                                        <span className="text-cyan-400 font-mono-tech text-xs mr-2">[GAMEPLAY]</span>
                                        {idea.mechanic}
                                    </p>
                                    <p className="font-retro text-lg text-gray-400">
                                        <span className="text-green-400 font-mono-tech text-xs mr-2">[REWARD]</span>
                                        {idea.expectedOutcome}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default IdeaGenerator;