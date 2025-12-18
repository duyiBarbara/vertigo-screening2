import React, { useState } from 'react';
import { Eye, Activity, Info, CheckCircle2, AlertCircle } from 'lucide-react';

const DvaTestView: React.FC = () => {
  const [staticVa, setStaticVa] = useState<number>(5.0);
  const [dynamicVa, setDynamicVa] = useState<number>(5.0);
  const [tested, setTested] = useState(false);

  const vaDifference = Math.round((staticVa - dynamicVa) * 10) / 10;
  // Visual Acuity lines: In LogMAR or standard 5.0 scale, 0.1 difference usually represents 1 line.
  const linesDropped = Math.round(vaDifference * 10);

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Eye className="text-sky-600" /> 动态视敏度 (DVA)
        </h2>
        <p className="text-slate-500">评估前庭眼反射 (VOR) 在头部运动时的视力稳定能力。</p>
      </header>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-start gap-3 bg-sky-50 p-4 rounded-lg">
          <Info className="text-sky-600 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-sky-800 leading-relaxed">
            <strong>操作流程：</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>测量患者静止时的视力 (Static VA)。</li>
              <li>检查者以 2Hz 频率左右水平摆动患者头部（约20度范围）。</li>
              <li>在摆动过程中再次测量视力 (Dynamic VA)。</li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">静态视力 (SVA)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="4.0" max="5.2" step="0.1" value={staticVa}
                onChange={(e) => setStaticVa(parseFloat(e.target.value))}
                className="flex-1 accent-sky-600"
              />
              <span className="text-2xl font-mono font-bold text-sky-600">{staticVa.toFixed(1)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">动态视力 (DVA)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="4.0" max="5.2" step="0.1" value={dynamicVa}
                onChange={(e) => setDynamicVa(parseFloat(e.target.value))}
                className="flex-1 accent-sky-600"
              />
              <span className="text-2xl font-mono font-bold text-sky-600">{dynamicVa.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setTested(true)}
          className="w-full py-3 bg-sky-600 text-white font-bold rounded-xl shadow-lg hover:bg-sky-700 transition-all"
        >
          计算结果
        </button>
      </div>

      {tested && (
        <div className={`p-6 rounded-2xl border-2 animate-fade-in ${linesDropped >= 3 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="flex items-center gap-4">
            {linesDropped >= 3 ? (
              <AlertCircle className="text-rose-600 w-10 h-10" />
            ) : (
              <CheckCircle2 className="text-emerald-600 w-10 h-10" />
            )}
            <div>
              <h3 className={`text-xl font-bold ${linesDropped >= 3 ? 'text-rose-900' : 'text-emerald-900'}`}>
                {linesDropped >= 3 ? '异常下降' : '正常范围'}
              </h3>
              <p className="text-sm opacity-80">视力下降了 {linesDropped} 行</p>
            </div>
          </div>
          <div className="mt-4 text-sm leading-relaxed">
            {linesDropped >= 3 ? (
              <p className="text-rose-800">下降 &ge; 3 行，提示<strong>前庭眼反射 (VOR) 功能减退</strong>。可能存在双侧或单侧前庭系统损害，建议结合头脉冲检查。</p>
            ) : (
              <p className="text-emerald-800">下降 &lt; 3 行，提示头部运动时视网膜像基本稳定，前庭代偿功能良好。</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DvaTestView;