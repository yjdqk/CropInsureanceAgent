
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, CloudRain, Bug, Leaf, Info, MapPin, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: '5月', yield: 380 },
  { name: '6月', yield: 410 },
  { name: '7月', yield: 440 },
  { name: '8月', yield: 490 },
  { name: '预测', yield: 510 },
];

const YieldForesight: React.FC = () => {
  const navigate = useNavigate();

  const factors = [
    { name: '降雨量', impact: 5, desc: '过去14天降水充沛', icon: CloudRain, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: '病虫害', impact: -8, desc: '局部发现稻飞虱迹象', icon: Bug, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { name: '作物长势', impact: 3, desc: '分蘖期叶色浓绿，发育良好', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="p-6 pb-32">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-400"><ArrowLeft size={24} /></button>
        <h2 className="text-lg font-bold">产量预估 - 结果预览</h2>
        <button className="text-gray-400"><Share2 size={20} /></button>
      </header>

      {/* Prediction Summary */}
      <div className="relative p-8 rounded-[40px] bg-gradient-to-br from-[#1a2b1a] to-[#0a140a] border border-white/5 overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/10 blur-[50px] rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
           <div className="flex items-center gap-2 mb-4">
             <span className="text-[10px] font-bold text-[#00ff88] uppercase tracking-widest">Agri 巡通 · 智能预测</span>
           </div>
           <p className="text-2xl font-bold mb-1">预计亩产:</p>
           <p className="text-5xl font-black text-[#00ff88] mb-4">450-520 <span className="text-xl font-bold">公斤</span></p>
           <div className="flex items-center gap-2 text-xs text-gray-400">
             <CheckCircle size={14} className="text-[#00ff88]" />
             <span>模型置信度: 94%</span>
           </div>
        </div>
        <div className="absolute bottom-4 right-8 opacity-20 rotate-12">
          <Leaf size={80} className="text-[#00ff88]" />
        </div>
      </div>

      {/* Analysis Section */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-1">增减产因素分析</h3>
        <p className="text-xs text-gray-500 mb-6">基于当前气象与作物实时长势监测</p>

        <div className="flex flex-col gap-4">
          {factors.map((f, i) => (
            <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center gap-4">
               <div className={`w-14 h-14 rounded-full ${f.bg} ${f.color} flex items-center justify-center`}>
                  <f.icon size={28} />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                   <h4 className="font-bold">{f.name}</h4>
                   <span className={`text-sm font-black ${f.impact > 0 ? 'text-[#00ff88]' : 'text-rose-400'}`}>
                     {f.impact > 0 ? '+' : ''}{f.impact}%
                   </span>
                 </div>
                 <p className="text-xs text-gray-500 leading-tight">{f.desc}</p>
                 <div className="mt-2 text-[8px] font-bold text-gray-600 uppercase tracking-tighter">Impact</div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">地块监测全景</h3>
          <button className="text-xs text-[#00ff88] font-bold">查看详情</button>
        </div>
        <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10">
           <img src="https://picsum.photos/seed/satellite/800/400" className="w-full h-full object-cover grayscale opacity-60" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl animate-bounce">
               <MapPin size={24} className="text-black" />
             </div>
           </div>
           <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
             <p className="text-[10px] font-bold">成都市双流区 · 试验田</p>
           </div>
        </div>
      </section>

      <button className="w-full py-5 bg-[#00ff88] hover:bg-[#00e67a] text-black font-black rounded-3xl flex items-center justify-center gap-3 neon-glow transition-all active:scale-[0.98]">
         <CheckCircle size={22} />
         一键生成报告
      </button>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">Nong Xun Tong · Agricultural Field Intelligence</p>
      </div>
    </div>
  );
};

export default YieldForesight;
