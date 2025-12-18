import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, AlertOctagon, Info, CheckCircle2 } from 'lucide-react';

const Abcd2View: React.FC = () => {
  const [factors, setFactors] = useState({
    age: 0,        // 1 if age >= 60
    bp: 0,         // 1 if >= 140/90
    clinical: 0,   // 2 if weakness, 1 if speech, 0 otherwise
    duration: 0,   // 2 if >= 60, 1 if 10-59, 0 < 10
    diabetes: 0    // 1 if yes
  });
  const [showResult, setShowResult] = useState(false);

  // Fix: Cast Object.values to number[] to ensure totalScore is a number for arithmetic and comparisons
  const totalScore = (Object.values(factors) as number[]).reduce((a, b) => a + b, 0);

  const getRisk = (score: number) => {
    if (score <= 3) return { label: '低危', color: 'text-emerald-600', bg: 'bg-emerald-50', risk: '2天内卒中风险约 1.0%' };
    if (score <= 5) return { label: '中危', color: 'text-amber-600', bg: 'bg-amber-50', risk: '2天内卒中风险约 4.1%' };
    return { label: '高危', color: 'text-rose-600', bg: 'bg-rose-50', risk: '2天内卒中风险约 8.1%' };
  };

  const riskInfo = getRisk(totalScore);

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="text-red-600" /> ABCD2 卒中风险评分
        </h2>
        <p className="text-slate-500">评估 TIA（短暂性脑缺血发作）后的短期卒中风险。</p>
      </header>

      {!showResult ? (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-xs text-blue-800">
            <h4 className="font-bold flex items-center gap-1 mb-1">
              <Info size={14} /> 临床意义
            </h4>
            <p>ABCD2 评分是预测 TIA 后 2 天、7 天及 90 天内发生卒中风险的重要工具。高分值意味着需要紧急收治和影像学检查。</p>
          </div>

          <div className="space-y-4">
            {/* Age */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-3">A - 年龄 (Age)</h4>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setFactors({...factors, age: 1})} className={`py-2 rounded-lg border font-bold ${factors.age === 1 ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>&ge; 60 岁 (+1)</button>
                <button onClick={() => setFactors({...factors, age: 0})} className={`py-2 rounded-lg border font-bold ${factors.age === 0 ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>&lt; 60 岁 (+0)</button>
              </div>
            </div>

            {/* BP */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-3">B - 血压 (Blood Pressure)</h4>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setFactors({...factors, bp: 1})} className={`py-2 rounded-lg border font-bold ${factors.bp === 1 ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>&ge; 140/90 mmHg (+1)</button>
                <button onClick={() => setFactors({...factors, bp: 0})} className={`py-2 rounded-lg border font-bold ${factors.bp === 0 ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>正常 (+0)</button>
              </div>
            </div>

            {/* Clinical */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-3">C - 临床特征 (Clinical Features)</h4>
              <div className="space-y-2">
                <button onClick={() => setFactors({...factors, clinical: 2})} className={`w-full py-2 rounded-lg border font-bold ${factors.clinical === 2 ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>单侧无力 (+2)</button>
                <button onClick={() => setFactors({...factors, clinical: 1})} className={`w-full py-2 rounded-lg border font-bold ${factors.clinical === 1 ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>言语障碍但无无力 (+1)</button>
                <button onClick={() => setFactors({...factors, clinical: 0})} className={`w-full py-2 rounded-lg border font-bold ${factors.clinical === 0 ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>其他症状 (+0)</button>
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-3">D - 持续时间 (Duration)</h4>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setFactors({...factors, duration: 2})} className={`py-2 rounded-lg border text-xs font-bold ${factors.duration === 2 ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>&ge; 60 min (+2)</button>
                <button onClick={() => setFactors({...factors, duration: 1})} className={`py-2 rounded-lg border text-xs font-bold ${factors.duration === 1 ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>10-59 min (+1)</button>
                <button onClick={() => setFactors({...factors, duration: 0})} className={`py-2 rounded-lg border text-xs font-bold ${factors.duration === 0 ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>&lt; 10 min (+0)</button>
              </div>
            </div>

            {/* Diabetes */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-3">D - 糖尿病 (Diabetes)</h4>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setFactors({...factors, diabetes: 1})} className={`py-2 rounded-lg border font-bold ${factors.diabetes === 1 ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>有 (+1)</button>
                <button onClick={() => setFactors({...factors, diabetes: 0})} className={`py-2 rounded-lg border font-bold ${factors.diabetes === 0 ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>无 (+0)</button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowResult(true)}
            className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl shadow-xl hover:bg-red-700 transition-all"
          >
            计算得分
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-10 rounded-3xl border-2 text-center ${riskInfo.bg} ${riskInfo.color.replace('text', 'border')}`}>
            <div className="text-7xl font-black mb-2 font-mono">{totalScore}</div>
            <div className="text-2xl font-bold uppercase tracking-widest">{riskInfo.label}风险</div>
            <p className="mt-4 text-slate-800 font-bold">{riskInfo.risk}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="text-rose-500" /> 管理建议
            </h3>
            <div className="text-sm space-y-4 text-slate-600 leading-relaxed">
              {totalScore >= 6 ? (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 font-bold">
                  建议立即收治住院。2天内卒中风险极高，需紧急行神经影像学检查（MRI-DWI）和血管评估。
                </div>
              ) : totalScore >= 4 ? (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 font-bold">
                  建议住院观察。有中度卒中风险，需完善病因筛查。
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800">
                  风险相对较低，可在门诊密切随访，并完善相关血管危险因素筛查。
                </div>
              )}
            </div>
            <button 
              onClick={() => { setShowResult(false); }}
              className="w-full py-2 text-slate-400 text-xs hover:text-slate-600"
            >
              修改评估参数
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Abcd2View;