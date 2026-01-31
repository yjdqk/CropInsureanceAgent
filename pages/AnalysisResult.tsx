
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Fixed: Added missing 'Grid' and 'Leaf' icons to the import list
import { ArrowLeft, Save, Users, Share, Info, AlertTriangle, ChevronRight, Calculator, FileText, RefreshCcw, Grid, Leaf } from 'lucide-react';

const AnalysisResult: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 pb-32">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-400"><ArrowLeft size={24} /></button>
        <h2 className="text-lg font-bold">分析结论</h2>
        <div className="flex gap-4">
           {/* Placeholder for header buttons */}
        </div>
      </header>

      {/* Visual Result Card */}
      <div className="relative aspect-square rounded-[40px] overflow-hidden mb-8 border border-white/10 shadow-2xl">
        <img src="https://picsum.photos/seed/diseased-leaf/800/800" className="w-full h-full object-cover" />
        
        {/* Detection Markers */}
        <div className="absolute top-[30%] left-[45%] w-8 h-8 rounded-full border-2 border-[#00ff88] bg-[#00ff88]/20 flex items-center justify-center animate-pulse">
           <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
        </div>
        <div className="absolute top-[25%] left-[20%] w-10 h-10 rounded-full border-2 border-[#00ff88] bg-[#00ff88]/20 flex items-center justify-center animate-pulse">
           <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
        </div>
        <div className="absolute top-[50%] right-[30%] w-12 h-12 rounded-full border-2 border-[#00ff88] bg-[#00ff88]/20 flex items-center justify-center animate-pulse">
           <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
        </div>

        <div className="absolute bottom-4 inset-x-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <Calculator size={18} className="text-[#00ff88]" />
             <span className="text-xs font-bold">AI 视觉定损点 (已标注 3 处)</span>
           </div>
           <button className="px-3 py-1 bg-[#00ff88] text-black text-[10px] font-black rounded-lg">慧眼 AI</button>
        </div>
      </div>

      {/* Assessment Info */}
      <div className="p-6 bg-[#1a1f1a] border border-white/10 rounded-[32px] mb-8 border-l-4 border-l-[#00ff88]">
         <div className="flex justify-between items-start mb-2">
           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">评估结果 · AI Assessment</span>
           <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded-full">中度危害</span>
         </div>
         <h3 className="text-2xl font-bold mb-6">稻瘟病 (Rice Blast)</h3>
         
         <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
               <p className="text-[10px] text-gray-500 font-bold mb-1">减产因子预估</p>
               <p className="text-2xl font-black text-[#00ff88]">-15%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
               <p className="text-[10px] text-gray-500 font-bold mb-1">受灾程度评分</p>
               <p className="text-2xl font-black text-white">68<span className="text-sm font-medium text-gray-500 ml-1">/100</span></p>
            </div>
         </div>
      </div>

      {/* Quantitative Indicators */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">AI 量化指标</h3>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">实时计算数据</span>
        </div>
        
        <div className="space-y-4">
           <div className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Grid size={20} className="text-gray-400" />
                 </div>
                 <div>
                    <h4 className="font-bold">65 粒/穗</h4>
                    <p className="text-[10px] text-gray-500">穗粒数 (比均值低 12%)</p>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-rose-400 text-sm font-black">-12%</span>
                 <AlertTriangle size={14} className="text-rose-400 opacity-50 mt-1" />
              </div>
           </div>

           <div className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Leaf size={20} className="text-gray-400" />
                 </div>
                 <div>
                    <h4 className="font-bold">3.8 kg/亩</h4>
                    <p className="text-[10px] text-gray-500">预估单位产量损失</p>
                 </div>
              </div>
              <span className="text-[#00ff88] text-xs font-bold animate-pulse">估算中</span>
           </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
         <button className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-white/10 transition-all">
           <Save size={18} />
           存入证据
         </button>
         <button 
           onClick={() => navigate('/video-consultation')}
           className="flex-[1.5] py-5 bg-[#00ff88] text-black font-black rounded-2xl flex items-center justify-center gap-3 neon-glow active:scale-95 transition-all shadow-xl"
         >
           <Users size={18} />
           专家咨询
         </button>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-all">
           <RefreshCcw size={14} />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em]">重置分析任务</span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
