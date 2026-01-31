
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Bot, BarChart2, User } from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: ClipboardList, label: '查勘', path: '/insight-assessment' },
    { icon: Bot, label: 'AI助手', path: '/analysis-result' },
    { icon: BarChart2, label: '产量分析', path: '/yield-foresight' },
    { icon: User, label: '我的', path: '/profile' },
  ];

  // Hide nav on specific immersive pages
  const hideNav = ['/eagle-scan', '/video-consultation'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden bg-[#050805]">
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {!hideNav && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] z-50">
          <nav className="bg-[#0a140a]/90 backdrop-blur-xl border border-white/5 rounded-3xl py-3 px-4 flex justify-between items-center shadow-2xl">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    isActive ? 'text-[#00ff88] scale-110' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;
