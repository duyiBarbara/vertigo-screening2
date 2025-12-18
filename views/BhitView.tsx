import React, { useState } from 'react';
import { Zap, Info, CheckCircle2, AlertOctagon } from 'lucide-react';

const BhitView: React.FC = () => {
  const [leftFinding, setLeftFinding] = useState<'NORMAL' | 'SACCADE' | null>(null);
  const [rightFinding, setRightFinding] = useState<'NORMAL' | 'SACCADE' | null>(null);

  const getSummary = () => {
    if (leftFinding === 'SACCADE' && rightFinding === 'NORMAL') return "提示左侧前庭外周性损害";
    if (rightFinding === 'SACCADE' && leftFinding === 'NORMAL') return "提示右侧前庭外周性损害";
    if (leftFinding === 'SACCADE' && rightFinding === 'SACCADE') return "提示双侧前庭功能损害";
    if (leftFinding === 'NORMAL' && rightFinding === 'NORMAL') return "双侧头脉冲阴性";
    return null;
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Zap className="text-orange-500" /> 床旁头脉冲检查 (bHIT)
        </h2>
        <p className="text-slate-500">临床评估前庭眼反射 (VOR) 高频功能的关键床边检查。</p>
      </header>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="bg-orange-50 p-4 rounded-lg flex items-start gap-3">
          <Info className="text-orange-600 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-orange-800 leading-relaxed">
            <strong>检查规范：</strong>
            <p className="mt-1">嘱患者紧盯检查者鼻尖。双手扶患者头部，在患者不经意的情况下，快速、小幅度（约10-20度）、爆发式地将头部向一侧转动，观察眼球是否能维持固视。</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700 border-l-4 border-orange-500 pl-2">头转向左侧</h4>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => setLeftFinding('NORMAL')}
                className={`py-4 rounded-xl font-bold border-2 transition-all ${leftFinding === 'NORMAL' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'}`}
              >
                阴性 (正常)
                <span className="block text-[10px] font-normal opacity-70">眼球始终锁定目标</span>
              </button>
              <button 
                onClick={() => setLeftFinding('SACCADE')}
                className={`py-4 rounded-xl font-bold border-2 transition-all ${leftFinding === 'SACCADE' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-slate-600 border-slate-100 hover:border-orange-200'}`}
              >
                阳性 (发现扫视)
                <span className="block text-[10px] font-normal opacity-70">眼球随头转动，随后追赶跳回</span>
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700 border-l-4 border-orange-500 pl-2">头转向右侧</h4>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => setRightFinding('NORMAL')}
                className={`py-4 rounded-xl font-bold border-2 transition-all ${rightFinding === 'NORMAL' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'}`}
              >
                阴性 (正常)
                <span className="block text-[10px] font-normal opacity-70">眼球始终锁定目标</span>
              </button>
              <button 
                onClick={() => setRightFinding('SACCADE')}
                className={`py-4 rounded-xl font-bold border-2 transition-all ${rightFinding === 'SACCADE' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-slate-600 border-slate-100 hover:border-orange-200'}`}
              >
                阳性 (发现扫视)
                <span className="block text-[10px] font-normal opacity-70">眼球随头转动，随后追赶跳回</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {getSummary() && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center gap-3 text-orange-600">
            <AlertOctagon size={24} />
            <h4 className="font-bold text-lg">临床提示</h4>
          </div>
          <p className="text-slate-800 font-bold">{getSummary()}</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            * 头脉冲阳性通常提示<strong>外周性前庭损害</strong>（如前庭神经炎）。
            而在急性眩晕发作期，若头脉冲<strong>阴性</strong>，则需高度警惕中枢性病变（如卒中），需完善 HINTS 检查。
          </p>
          <div className="flex justify-end pt-2">
            <button onClick={() => {setLeftFinding(null); setRightFinding(null);}} className="text-xs text-slate-400 font-bold hover:text-slate-600">重置检查</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BhitView;