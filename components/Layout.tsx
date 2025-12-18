import React, { useState } from 'react';
import { View } from '../types';
import { 
  Activity, 
  Brain, 
  Timer, 
  RotateCw, 
  Menu, 
  X,
  Stethoscope,
  ClipboardList,
  Gauge,
  Layers,
  GraduationCap,
  BookOpen,
  Waves,
  Eye,
  Ear,
  ShieldAlert,
  CheckSquare
} from 'lucide-react';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navGroups = [
    {
      label: '主控台',
      items: [{ id: View.DASHBOARD, label: '筛查总览', icon: <Activity className="w-5 h-5" /> }]
    },
    {
      label: '平衡评估',
      items: [
        { id: View.ROMBERG, label: 'Romberg 试验', icon: <Stethoscope className="w-5 h-5" /> },
        { id: View.TUG, label: 'TUG 测试', icon: <Timer className="w-5 h-5" /> },
        { id: View.MCTSIB, label: 'mCTSIB 测试', icon: <Layers className="w-5 h-5" /> },
      ]
    },
    {
      label: '临床物理检查',
      items: [
        { id: View.DIX_HALLPIKE, label: 'Dix-Hallpike', icon: <RotateCw className="w-5 h-5" /> },
        { id: View.BHIT_TEST, label: '床旁头脉冲', icon: <Activity className="w-5 h-5" /> },
        { id: View.DVA_TEST, label: '动态视敏度', icon: <Eye className="w-5 h-5" /> },
        { id: View.HEARING_TEST, label: '音叉试验', icon: <Ear className="w-5 h-5" /> },
        { id: View.HINTS, label: 'HINTS 检查', icon: <Brain className="w-5 h-5" /> },
      ]
    },
    {
      label: '量表与风险评分',
      items: [
        { id: View.DHI, label: 'DHI 眩晕障碍', icon: <ClipboardList className="w-5 h-5" /> },
        { id: View.VAS, label: 'VAS 评分', icon: <Gauge className="w-5 h-5" /> },
        { id: View.ABCD2_SCORE, label: 'ABCD2 卒中风险', icon: <ShieldAlert className="w-5 h-5" /> },
      ]
    },
    {
      label: '学习中心',
      items: [
        { id: View.TRAINING_CENTER, label: '培训讲义库', icon: <GraduationCap className="w-5 h-5" /> },
      ]
    }
  ];

  const handleNavClick = (view: View) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center z-20 sticky top-0">
        <div className="flex items-center gap-2 font-bold text-primary text-xl">
          <Activity />
          <span>眩晕筛查助手</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="hidden md:block border-b border-slate-100">
          <div className="p-6 flex items-center gap-2 font-bold text-primary text-xl">
            <Activity />
            <span>眩晕筛查助手</span>
          </div>
          <div className="px-6 pb-4">
            <p className="text-[9px] text-slate-400 leading-tight">
              中国医药教育协会前庭医学专业委员会基层医生眩晕规范化诊疗培训
            </p>
          </div>
        </div>
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-160px)]">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left font-medium text-sm
                      ${currentView === item.id 
                        ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-50 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 text-center leading-tight">
            基层眩晕与平衡障碍筛查工具
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;