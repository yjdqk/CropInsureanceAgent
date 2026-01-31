
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Video, Plane, ShieldCheck, LineChart, Users, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: '飞鹰快扫',
      subtitle: '高精度测绘与长势分析',
      tag: '空基',
      icon: Plane,
      path: '/eagle-scan',
      color: 'bg-[#00ff88]/10 text-[#00ff88]'
    },
    {
      title: '慧眼勘损',
      subtitle: '即时AI多维损毁评估',
      tag: '地基',
      icon: ShieldCheck,
      path: '/insight-assessment',
      color: 'bg-emerald-500/10 text-emerald-400'
    },
    {
      title: '产量先见',
      subtitle: '深度学习收成前瞻测算',
      tag: '天基',
      icon: LineChart,
      path: '/yield-foresight',
      color: 'bg-teal-500/10 text-teal-400'
    },
    {
      title: '视频会诊',
      subtitle: '专家实时在线远程定损',
      tag: '专家',
      icon: Video,
      path: '/video-consultation',
      color: 'bg-cyan-500/10 text-cyan-400'
    }
  ];

  return (
    <div className="px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#00ff88]/30 p-0.5 overflow-hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI 农险助手</h1>
            <p className="text-[10px] text-[#00ff88] uppercase tracking-[0.2em]">天 - 空 - 地 协同系统</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
          <Search size={20} />
        </button>
      </header>

      {/* Main Visual */}
      <div className="relative mb-12 flex flex-col items-center">
        <div className="relative w-48 h-48 mb-8">
           <div className="absolute inset-0 bg-[#00ff88] blur-[60px] opacity-20 animate-pulse"></div>
           <div className="relative z-10 w-full h-full rounded-full border-4 border-[#1a2b1a] overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.3)]">
             <img src="https://picsum.photos/seed/farm/400/400" alt="Farm" className="w-full h-full object-cover grayscale-[0.2]" />
           </div>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center leading-tight">今天有什么可以帮您？</h2>
        
        <button 
          onClick={() => navigate('/video-consultation')}
          className="group w-full py-4 bg-[#00ff88] hover:bg-[#00e67a] text-[#050805] font-bold rounded-2xl flex items-center justify-center gap-3 transition-all neon-glow active:scale-95"
        >
          <Video size={24} fill="currentColor" />
          <span className="text-lg">实时视频</span>
        </button>
      </div>

      {/* Grid Modules */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">核心功能模块</h3>
        <span className="text-xs py-1 px-3 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">4个模块已就绪</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((m, idx) => (
          <div 
            key={idx}
            onClick={() => navigate(m.path)}
            className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-2xl ${m.color} flex items-center justify-center mb-6`}>
               <m.icon size={24} />
            </div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold opacity-60">【{m.tag}】</span>
            </div>
            <h4 className="text-lg font-bold mb-1">{m.title}</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">{m.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
