import React, { useState, useEffect } from 'react';
import { Layers, Timer, Play, RotateCcw, CheckCircle2, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const CONDITIONS = [
  { id: 1, title: '睁眼，硬地', desc: '基准平衡（视觉、前庭、本体感觉完整）', surface: '硬地', eyes: 'OPEN' },
  { id: 2, title: '闭眼，硬地', desc: '消除视觉（依赖本体感觉与前庭）', surface: '硬地', eyes: 'CLOSED' },
  { id: 3, title: '睁眼，泡沫垫', desc: '干扰本体感觉（依赖视觉与前庭）', surface: '泡沫', eyes: 'OPEN' },
  { id: 4, title: '闭眼，泡沫垫', desc: '消除视觉、干扰本体（仅依赖前庭）', surface: '泡沫', eyes: 'CLOSED' },
];

const MctsibView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<Record<number, boolean | null>>({});

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleFinish(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => setIsActive(true);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(30);
  };

  const handleFinish = (success: boolean) => {
    setResults(prev => ({ ...prev, [CONDITIONS[currentIdx].id]: success }));
    setIsActive(false);
  };

  const currentCondition = CONDITIONS[currentIdx];

  const getOverallInterpretation = () => {
    const failedIds = Object.entries(results).filter(([id, success]) => success === false).map(([id]) => parseInt(id));
    if (failedIds.length === 0) return "各系统整合功能良好。";
    if (failedIds.includes(4) && failedIds.length === 1) return "提示前庭功能受损（单靠前庭时站立不稳）。";
    if (failedIds.includes(2) || failedIds.includes(4)) return "本体感觉或前庭系统可能异常。";
    return "平衡功能显著下降。";
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Layers className="text-purple-500" /> mCTSIB 感觉整合测试
        </h2>
        <p className="text-slate-500">通过改变视觉和支撑面，识别患者依赖哪个感觉系统来维持平衡。</p>
      </header>

      {/* Progress Steps */}
      <div className="flex justify-between px-2">
        {CONDITIONS.map((c, idx) => (
          <button 
            key={c.id}
            onClick={() => { setCurrentIdx(idx); handleReset(); }}
            className={`flex flex-col items-center gap-1 flex-1 relative`}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-all border-2
              ${currentIdx === idx ? 'bg-purple-600 text-white border-purple-600 scale-110' : 
                results[c.id] === true ? 'bg-green-100 text-green-600 border-green-200' :
                results[c.id] === false ? 'bg-red-100 text-red-600 border-red-200' :
                'bg-slate-100 text-slate-400 border-slate-200'}
            `}>
              {results[c.id] === true ? <CheckCircle2 size={18} /> : 
               results[c.id] === false ? <AlertTriangle size={18} /> : (idx + 1)}
            </div>
            <span className="text-[10px] font-bold text-slate-400 hidden md:block">{c.surface}</span>
          </button>
        ))}
      </div>

      {/* Active Stage Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-purple-50 p-6 flex justify-between items-center border-b border-purple-100">
          <div>
            <h3 className="text-xl font-bold text-purple-900">{currentCondition.title}</h3>
            <p className="text-sm text-purple-700 opacity-80">{currentCondition.desc}</p>
          </div>
          <div className="text-3xl">
            {currentCondition.eyes === 'OPEN' ? <Eye className="text-purple-600" /> : <EyeOff className="text-slate-400" />}
          </div>
        </div>

        <div className="p-10 text-center space-y-8">
          <div className={`text-7xl font-mono font-black ${timeLeft < 5 ? 'text-red-500' : 'text-slate-800'}`}>
            {timeLeft}s
          </div>

          <div className="flex justify-center gap-4">
            {!isActive ? (
              <button 
                onClick={handleStart}
                className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 shadow-lg transition-all"
              >
                <Play size={20} fill="currentColor" /> 开始计时
              </button>
            ) : (
              <button 
                onClick={() => handleFinish(false)}
                className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 shadow-lg animate-pulse"
              >
                <AlertTriangle size={20} /> 站立不稳/跌倒
              </button>
            )}
            <button 
              onClick={handleReset}
              className="px-4 py-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-200 hover:bg-slate-100"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
            <button 
              disabled={currentIdx === 0}
              onClick={() => { setCurrentIdx(prev => prev - 1); handleReset(); }}
              className="text-sm font-bold text-slate-400 disabled:opacity-30"
            >
              ← 上一项
            </button>
            <button 
              disabled={currentIdx === 3}
              onClick={() => { setCurrentIdx(prev => prev + 1); handleReset(); }}
              className="text-sm font-bold text-primary disabled:opacity-30"
            >
              下一项 →
            </button>
        </div>
      </div>

      {/* Summary Section */}
      {Object.keys(results).length > 0 && (
        <div className="bg-purple-900 text-white p-6 rounded-2xl shadow-xl space-y-3">
          <h4 className="font-bold border-b border-purple-800 pb-2">测评结论初步汇总</h4>
          <p className="text-sm opacity-90">{getOverallInterpretation()}</p>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {CONDITIONS.map(c => (
              <div key={c.id} className={`text-[10px] p-1 rounded text-center font-bold ${results[c.id] === true ? 'bg-green-500' : results[c.id] === false ? 'bg-red-500' : 'bg-purple-800 opacity-50'}`}>
                C{c.id} {results[c.id] === true ? 'OK' : results[c.id] === false ? 'FAIL' : '-'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MctsibView;