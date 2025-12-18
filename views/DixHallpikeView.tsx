import React, { useState } from 'react';
import { RotateCw, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

const DixHallpikeView: React.FC = () => {
  const [outcome, setOutcome] = useState<'POSITIVE' | 'NEGATIVE' | null>(null);

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Dix-Hallpike 诱发试验</h2>
        <p className="text-slate-500">诊断后半规管BPPV（耳石症）的金标准。</p>
      </header>

      {/* Guide Steps */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl font-bold text-emerald-100 mb-2">01</div>
          <h4 className="font-bold text-slate-800 mb-2">头部扭转</h4>
          <p className="text-sm text-slate-600">患者坐于检查床，头部向患侧（检查侧）旋转 45度。</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl font-bold text-emerald-100 mb-2">02</div>
          <h4 className="font-bold text-slate-800 mb-2">快速躺下</h4>
          <p className="text-sm text-slate-600">保持头位，快速躺下，使头部悬空于床沿下约 20度。</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl font-bold text-emerald-100 mb-2">03</div>
          <h4 className="font-bold text-slate-800 mb-2">观察眼震</h4>
          <p className="text-sm text-slate-600">观察是否有旋转性眼震及眩晕感。通常有 1-5秒 潜伏期。</p>
        </div>
      </div>

      {/* Interactive Result Section */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-bold text-lg mb-4 text-slate-800">结果判读</h3>
        
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    id="vertigo" 
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    onChange={() => {}}
                />
                <label htmlFor="vertigo" className="text-slate-700">诱发出强烈的短暂眩晕（通常 &lt; 1分钟）</label>
            </div>
            <div className="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    id="nystagmus" 
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    onChange={() => {}}
                />
                <label htmlFor="nystagmus" className="text-slate-700">观察到上跳性、扭转性眼震</label>
            </div>
        </div>

        <div className="mt-6 flex gap-4">
            <button 
                onClick={() => setOutcome('POSITIVE')}
                className={`flex-1 py-3 rounded-lg font-bold border-2 transition-colors ${outcome === 'POSITIVE' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-600 border-emerald-200 hover:border-emerald-400'}`}
            >
                阳性 (+)
            </button>
            <button 
                onClick={() => setOutcome('NEGATIVE')}
                className={`flex-1 py-3 rounded-lg font-bold border-2 transition-colors ${outcome === 'NEGATIVE' ? 'bg-slate-600 text-white border-slate-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
            >
                阴性 (-)
            </button>
        </div>

        {outcome === 'POSITIVE' && (
            <div className="mt-6 p-4 bg-emerald-100 text-emerald-800 rounded-lg flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="mt-1" />
                <div>
                    <h4 className="font-bold">提示：BPPV（耳石症）</h4>
                    <p className="text-sm mt-1">
                        建议进行 Epley 手法复位。耳石症是基层最常见且可治愈的眩晕病因。
                    </p>
                </div>
            </div>
        )}

        {outcome === 'NEGATIVE' && (
             <div className="mt-6 p-4 bg-slate-100 text-slate-800 rounded-lg flex items-start gap-3 animate-fade-in">
             <HelpCircle className="mt-1" />
             <div>
                 <h4 className="font-bold">提示：阴性</h4>
                 <p className="text-sm mt-1">
                     如患者仍有严重持续性眩晕，请进行 HINTS 检查排除中枢性病变。
                 </p>
             </div>
         </div>
        )}
      </div>
    </div>
  );
};

export default DixHallpikeView;