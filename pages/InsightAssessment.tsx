
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Zap, Camera, Image as ImageIcon, Sparkles, Layout as LayoutIcon, Maximize2 } from 'lucide-react';

const InsightAssessment: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    };
    startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  return (
    <div className="h-screen bg-black relative flex flex-col overflow-hidden">
      {/* Background Camera Feed (Simulated if no stream) */}
      {!stream && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/wheat/1000/1600')" }}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
        </div>
      )}
      {stream && (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      )}

      {/* Header Overlay */}
      <header className="absolute top-0 inset-x-0 p-6 z-20 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-bold text-lg drop-shadow-md">慧眼勘损</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
            <Zap size={20} className="fill-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Toggle Selector */}
      <div className="absolute top-20 inset-x-0 z-20 flex justify-center">
        <div className="bg-black/60 backdrop-blur-xl p-1 rounded-xl flex border border-white/10">
           <button className="px-6 py-1.5 rounded-lg bg-[#00ff88] text-black font-bold text-sm">引导拍摄</button>
           <button className="px-6 py-1.5 rounded-lg text-white/60 font-medium text-sm">视频查勘</button>
        </div>
      </div>

      {/* AI Viewfinder */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
        <div className="w-full max-w-sm aspect-[3/4] relative border-2 border-[#00ff88]/30 rounded-[40px]">
          {/* Bounding Box Corner */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00ff88] rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#00ff88] rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00ff88] rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#00ff88] rounded-br-3xl"></div>

          {/* Label */}
          <div className="absolute -top-10 left-4 bg-[#00ff88] px-3 py-1 rounded-md">
            <span className="text-[10px] font-black tracking-widest text-black">CROP DETECTION ACTIVE</span>
          </div>

          {/* AI Stats Card */}
          <div className="absolute top-12 -right-4 w-44 p-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
             <div className="flex flex-col gap-4">
                <div>
                   <p className="text-[8px] font-bold text-[#00ff88] mb-1">AI 实时监测</p>
                   <p className="text-[10px] text-gray-400">倒伏面积</p>
                   <p className="text-2xl font-black text-white">23.5<span className="text-sm font-medium opacity-60 ml-0.5">%</span></p>
                   <div className="w-full h-1 bg-white/10 rounded-full mt-2">
                     <div className="w-[23.5%] h-full bg-[#00ff88] rounded-full"></div>
                   </div>
                </div>
                <div>
                   <p className="text-[10px] text-gray-400">病害等级</p>
                   <p className="text-xl font-bold text-white">中等</p>
                   <div className="flex gap-1 mt-2">
                     {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-[#00ff88]' : 'bg-white/10'}`}></div>
                     ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Focus Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#00ff88]/20 rounded-full">
            <div className="absolute inset-0 m-auto w-1 h-1 bg-[#00ff88] rounded-full"></div>
          </div>

          {/* Secondary Controls */}
          <div className="absolute bottom-12 -right-8 flex flex-col gap-4">
             <button className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center">
               <LayoutIcon size={24} className="text-white/80" />
             </button>
             <button className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center">
               <Maximize2 size={24} className="text-white/80" />
             </button>
          </div>
        </div>
      </div>

      {/* AI Guidance Tooltip */}
      <div className="absolute bottom-32 inset-x-0 flex justify-center z-10">
         <div className="px-6 py-2 bg-[#1a2b1a]/80 backdrop-blur-xl border border-[#00ff88]/30 rounded-full flex items-center gap-3">
           <div className="flex gap-1">
             {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-[#00ff88] rounded-full animate-pulse"></div>)}
           </div>
           <span className="text-sm font-bold text-[#00ff88]">请后退两步拍全貌</span>
         </div>
      </div>

      {/* Shutter Bar */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black to-transparent p-6 flex items-center justify-between">
         <button className="w-12 h-12 rounded-xl bg-white/10 p-0.5 border border-white/20 overflow-hidden">
           <img src="https://picsum.photos/seed/last/100/100" className="w-full h-full object-cover" />
         </button>
         
         <button 
           onClick={() => navigate('/analysis-result')}
           className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center group active:scale-90 transition-all"
         >
           <div className="w-16 h-16 rounded-full bg-white group-hover:scale-95 transition-all"></div>
         </button>

         <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
           <Sparkles size={24} className="text-[#00ff88]" />
         </button>
      </div>
    </div>
  );
};

export default InsightAssessment;
