
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Layers, Grid, Play, Home as HomeIcon, RefreshCw, Bot, Signal, SignalHigh } from 'lucide-react';

// 定义从后端获取的数据结构
interface DroneFrame {
  id: number;
  imgUrl: string;
  tag?: string;
  timestamp: string;
  detectionResults?: {
    crop: string;
    confidence: number;
  };
}

const EagleScan: React.FC = () => {
  const navigate = useNavigate();
  const [frames, setFrames] = useState<DroneFrame[]>([]);
  const [frameCount, setFrameCount] = useState(0);
  const [currentDetection, setCurrentDetection] = useState({ crop: '正在初始化...', confidence: 0 });
  const [isConnected, setIsConnected] = useState(false);
  const [isLive, setIsLive] = useState(true);

  // --- 后端对接逻辑示例 ---
  // 在实际部署时，请将此处的 URL 替换为您的后端接口地址
  const BACKEND_API_URL = 'https://your-api-endpoint.com/v1/drone/stream';

  const fetchLatestFrame = useCallback(async () => {
    try {
      // 实际开发中启用此行:
      // const response = await fetch(BACKEND_API_URL);
      // const data = await response.json();
      
      // 模拟后端返回的数据结构
      const mockData: DroneFrame = {
        id: Math.floor(Date.now() / 1000),
        imgUrl: `https://picsum.photos/seed/${Math.random()}/600/800`,
        tag: Math.random() > 0.7 ? 'SCAN' : undefined,
        timestamp: new Date().toLocaleTimeString(),
        detectionResults: {
          crop: '水稻 (分蘖期)',
          confidence: 0.92 + Math.random() * 0.07
        }
      };

      // 更新状态
      setFrames(prev => [mockData, ...prev].slice(0, 10)); // 保留最近10帧
      setFrameCount(prev => prev + 1);
      if (mockData.detectionResults) {
        setCurrentDetection(mockData.detectionResults);
      }
      setIsConnected(true);
    } catch (error) {
      console.error('无法连接至后端服务:', error);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    let interval: number;
    if (isLive) {
      // 模拟实时轮询，每 3 秒从后端取一次数据
      interval = window.setInterval(fetchLatestFrame, 3000);
    }
    return () => clearInterval(interval);
  }, [isLive, fetchLatestFrame]);

  return (
    <div className="h-screen bg-black relative flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="absolute top-0 inset-x-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="font-bold">飞鹰快扫 - 后端协同识别</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00ff88]' : 'bg-rose-500'} animate-pulse`}></div>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${isConnected ? 'text-[#00ff88]' : 'text-rose-500'}`}>
              {isConnected ? '链路已加密 · 实时回传' : '数据链路中断'}
            </span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Settings size={20} />
        </button>
      </header>

      {/* Main Stream Area */}
      <div className="flex-1 relative">
        {/* 这里展示后端传回的最新帧图片 */}
        <div className="absolute inset-0 transition-opacity duration-1000">
           {frames.length > 0 ? (
             <img 
               src={frames[0].imgUrl} 
               alt="Drone Feed" 
               className="w-full h-full object-cover transition-all duration-700"
             />
           ) : (
             <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center">
                <RefreshCw size={48} className="text-[#00ff88] animate-spin mb-4" />
                <p className="text-gray-500 font-bold">正在建立数据链路...</p>
             </div>
           )}
           {/* 扫描线动画 */}
           <div className="absolute inset-x-0 h-1 bg-[#00ff88]/50 shadow-[0_0_15px_#00ff88] animate-[scan_4s_linear_infinite] top-0"></div>
        </div>
        
        {/* Radar Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#00ff88]/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute top-24 left-6 z-10 flex flex-col gap-4">
          <div className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
            <p className="text-[10px] text-gray-400 font-bold">回传总数</p>
            <p className="text-4xl font-black text-[#00ff88] tabular-nums">{frameCount}<span className="text-sm ml-1">帧</span></p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
            <p className="text-[10px] text-gray-400 font-bold">后端识别作物</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">{currentDetection.crop}</p>
              <div className="px-2 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] text-[10px] font-bold">
                {(currentDetection.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Status Bubble */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="px-6 py-3 bg-black/80 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-3 shadow-2xl">
             <SignalHigh size={20} className="text-[#00ff88]" />
             <span className="font-bold tracking-widest text-[#00ff88]">云端 AI 协同中</span>
           </div>
        </div>

        {/* AI Hint from Backend */}
        <div className="absolute bottom-4 inset-x-6 z-10">
           <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-[#00ff88] flex items-center justify-center text-black">
               <Bot size={22} />
             </div>
             <div>
               <p className="text-[10px] text-[#00ff88] font-bold">服务器反馈 (Server Log)</p>
               <p className="text-sm font-medium">
                 {frames.length > 0 ? `最新分析时间: ${frames[0].timestamp}` : '正在等待云端计算节点响应...'}
               </p>
             </div>
           </div>
        </div>
      </div>

      {/* Frame Buffer Section (展示从后端接收到的历史序列) */}
      <div className="h-64 bg-[#0a120a] border-t border-white/10 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">后端推送队列 (History Feed)</h3>
          <span className="text-[10px] font-bold text-[#00ff88]">STATUS: SYNCED</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {frames.map((f, i) => (
            <div key={f.id} className="relative min-w-[80px] h-20 rounded-full border-2 border-[#1a2b1a] overflow-hidden group">
               <img src={f.imgUrl} alt="Frame" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
               <div className="absolute bottom-1 right-1 px-1 rounded-sm bg-black/60 text-[8px] font-mono text-white">#{f.id.toString().slice(-4)}</div>
               {f.tag && (
                 <div className="absolute inset-0 bg-[#00ff88]/20 flex items-center justify-center">
                    <div className="px-1 bg-[#00ff88] text-black text-[8px] font-bold uppercase rounded-sm">AI HIT</div>
                 </div>
               )}
            </div>
          ))}
          {/* 占位符 */}
          {frames.length === 0 && [1,2,3,4].map(i => (
            <div key={i} className="min-w-[80px] h-20 rounded-full bg-white/5 animate-pulse border-2 border-dashed border-[#1a2b1a]"></div>
          ))}
        </div>

        <div className="flex gap-4">
           <button 
             onClick={() => navigate('/analysis-result')}
             className="flex-1 py-4 bg-[#00ff88] text-black font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
           >
             <Play size={20} fill="currentColor" />
             进入深度报告
           </button>
           <button 
             onClick={() => setIsLive(!isLive)}
             className={`flex-1 py-4 border font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all ${
               isLive ? 'bg-rose-500/10 border-rose-500/50 text-rose-500' : 'bg-white/5 border-white/10 text-white'
             }`}
           >
             <RefreshCw size={20} className={isLive ? 'animate-spin' : ''} />
             {isLive ? '停止同步' : '恢复同步'}
           </button>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default EagleScan;
