import React, { useState } from 'react';
import { Ear, Info, CheckCircle2, AlertCircle } from 'lucide-react';

const HearingTestView: React.FC = () => {
  const [rinneLeft, setRinneLeft] = useState<'POS' | 'NEG' | null>(null);
  const [rinneRight, setRinneRight] = useState<'POS' | 'NEG' | null>(null);
  const [weber, setWeber] = useState<'MID' | 'LEFT' | 'RIGHT' | null>(null);

  const getInterpretation = () => {
    if (!rinneLeft || !rinneRight || !weber) return null;

    if (rinneLeft === 'POS' && rinneRight === 'POS') {
      if (weber === 'MID') return "听力基本正常";
      if (weber === 'LEFT') return "提示右耳感音神经性聋";
      if (weber === 'RIGHT') return "提示左耳感音神经性聋";
    }

    if (rinneLeft === 'NEG' && weber === 'LEFT') return "提示左耳传导性聋";
    if (rinneRight === 'NEG' && weber === 'RIGHT') return "提示右耳传导性聋";

    return "结果复杂，建议行纯音测听进一步检查";
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Ear className="text-cyan-600" /> 音叉检查 (Rinne & Weber)
        </h2>
        <p className="text-slate-500">快速区分传导性聋与感音神经性聋。</p>
      </header>

      {/* Rinne Test */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Info size={20} className="text-cyan-600" /> Rinne 试验 (任内试验)
        </h3>
        <p className="text-sm text-slate-600">比较气导 (AC) 与骨导 (BC) 时间。将音叉柄置于乳突 (BC)，消失后置于耳道口 (AC)。</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="font-bold text-sm text-slate-400">左耳结果</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setRinneLeft('POS')}
                className={`flex-1 py-2 rounded-lg font-bold border ${rinneLeft === 'POS' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                阳性 (AC &gt; BC)
              </button>
              <button 
                onClick={() => setRinneLeft('NEG')}
                className={`flex-1 py-2 rounded-lg font-bold border ${rinneLeft === 'NEG' ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                阴性 (BC &ge; AC)
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-sm text-slate-400">右耳结果</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setRinneRight('POS')}
                className={`flex-1 py-2 rounded-lg font-bold border ${rinneRight === 'POS' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                阳性 (AC &gt; BC)
              </button>
              <button 
                onClick={() => setRinneRight('NEG')}
                className={`flex-1 py-2 rounded-lg font-bold border ${rinneRight === 'NEG' ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200'}`}
              >
                阴性 (BC &ge; AC)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weber Test */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Info size={20} className="text-cyan-600" /> Weber 试验 (韦伯试验)
        </h3>
        <p className="text-sm text-slate-600">将音叉柄置于前额正中，询问哪一侧声音更响。</p>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => setWeber('LEFT')}
            className={`py-3 rounded-lg font-bold border ${weber === 'LEFT' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            偏左
          </button>
          <button 
            onClick={() => setWeber('MID')}
            className={`py-3 rounded-lg font-bold border ${weber === 'MID' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            居中
          </button>
          <button 
            onClick={() => setWeber('RIGHT')}
            className={`py-3 rounded-lg font-bold border ${weber === 'RIGHT' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            偏右
          </button>
        </div>
      </div>

      {getInterpretation() && (
        <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-2xl flex items-start gap-4 animate-fade-in">
          <CheckCircle2 className="text-cyan-600 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-cyan-900">初步分析结果</h4>
            <p className="text-cyan-800 mt-1 font-medium">{getInterpretation()}</p>
            <p className="text-xs text-cyan-700 mt-2 opacity-80 italic">*注：音叉检查为定性检查，确诊需参考纯音测听结果。</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HearingTestView;