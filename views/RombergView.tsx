import React, { useState, useEffect } from 'react';
import { Timer, Check, AlertCircle, RefreshCw } from 'lucide-react';

const RombergView: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState<'NONE' | 'PERIPHERAL' | 'CENTRAL'>('NONE');

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const toggleTimer = () => setIsActive(!isActive);
  const reset = () => {
    setTimer(0);
    setIsActive(false);
    setResult('NONE');
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Romberg 试验 (闭目难立征)</h2>
        <p className="text-slate-500">评估本体感觉与前庭功能，筛查老年跌倒风险。</p>
      </header>

      {/* Guide Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Check className="text-green-500" /> 标准操作规范
        </h3>
        <ol className="list-decimal list-inside space-y-3 text-slate-700">
          <li><strong>体位：</strong> 患者双脚并拢站立，双手抱胸或向前平伸。</li>
          <li><strong>睁眼：</strong> 先观察睁眼状态下是否平稳（基线）。</li>
          <li><strong>闭眼：</strong> 嘱患者闭眼，观察身体晃动情况。</li>
          <li><strong>保护：</strong> 检查者须站在患者身旁，随时准备搀扶，防止跌倒。</li>
        </ol>
      </div>

      {/* Timer Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
        <div className="text-5xl font-mono font-bold text-slate-700 mb-6">
          {timer} <span className="text-xl text-slate-400">秒</span>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-lg font-bold text-white transition-colors ${
              isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary hover:bg-sky-600'
            }`}
          >
            {isActive ? '暂停计时' : '开始计时'}
          </button>
          <button
            onClick={reset}
            className="px-6 py-2 rounded-lg font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 flex items-center gap-2"
          >
            <RefreshCw size={18} /> 重置
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-4">建议观察时间至少 30 秒</p>
      </div>

      {/* Interpretation Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => setResult('PERIPHERAL')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            result === 'PERIPHERAL' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="font-bold text-slate-800 mb-1">向一侧倾倒 / 晃动</div>
          <div className="text-sm text-slate-600">闭眼后明显向特定一侧倾倒，睁眼后改善。</div>
          {result === 'PERIPHERAL' && (
            <div className="mt-3 text-blue-700 text-sm font-semibold">
              提示：前庭外周性病变（迷路、前庭神经）
            </div>
          )}
        </button>

        <button
          onClick={() => setResult('CENTRAL')}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            result === 'CENTRAL' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-300'
          }`}
        >
          <div className="font-bold text-slate-800 mb-1">无方向性剧烈晃动 / 睁眼即不稳</div>
          <div className="text-sm text-slate-600">前后左右摇摆不定，或睁眼闭眼均站立不稳。</div>
          {result === 'CENTRAL' && (
            <div className="mt-3 text-red-700 text-sm font-semibold">
              提示：小脑病变或本体感觉障碍（需进一步检查）
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default RombergView;