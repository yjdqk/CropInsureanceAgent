
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PhoneOff, Mic, MicOff, Camera, Video, MessageSquare, Scissors, Edit3, Repeat } from 'lucide-react';

const VideoConsultation: React.FC = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Background: User Camera View */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/crop-close/1000/1600')" }}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-10">
        <button onClick={() => navigate(-1)} className="text-white drop-shadow-lg"><ArrowLeft size={28} /></button>
        <h2 className="text-lg font-bold drop-shadow-lg">视频会诊 - 专家协同</h2>
        <button onClick={() => navigate(-1)} className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-all">
          <PhoneOff size={24} className="text-white fill-white" />
        </button>
      </header>

      {/* Expert PIP Window */}
      <div className="absolute top-24 right-6 w-32 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-20">
         <img src="https://picsum.photos/seed/doctor/300/400" className="w-full h-full object-cover" />
         <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md">
            <p className="text-[8px] font-bold">陈专家 (在线)</p>
         </div>
      </div>

      {/* Status Indicators */}
      <div className="absolute top-24 left-6 z-10 flex flex-col gap-3">
         <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-2">
           <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold">降噪模式已开启 (Active)</span>
         </div>
      </div>

      {/* Visual Marker (Simulated Overlay from Expert) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
         <div className="w-32 h-32 border-[3px] border-dashed border-rose-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
         </div>
      </div>

      {/* Live Transcription (Subtitle) */}
      <div className="absolute bottom-36 inset-x-8 z-20">
         <div className="p-5 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl">
            <p className="text-lg font-medium leading-relaxed italic">
              <span className="text-[#00ff88] font-black mr-2">专家 :</span>
              请靠近一点观察叶片背面的红蜘蛛情况，重点关注刚才我圈出的位置。
            </p>
         </div>
      </div>

      {/* Interaction Controls */}
      <div className="absolute bottom-10 inset-x-6 flex gap-4 z-20">
         <button className="flex-1 h-32 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 active:bg-white/20 transition-all">
           <Edit3 size={32} />
           <span className="text-xs font-bold">标记</span>
         </button>
         <button className="flex-1 h-32 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 active:bg-white/20 transition-all">
           <Scissors size={32} />
           <span className="text-xs font-bold">截图</span>
         </button>
         <button className="flex-[1.5] h-32 bg-blue-600 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-95 transition-all">
           <Repeat size={32} />
           <span className="text-xs font-bold">切换视角</span>
         </button>
      </div>
    </div>
  );
};

export default VideoConsultation;
