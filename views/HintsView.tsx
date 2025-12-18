import React, { useState } from 'react';
import { AlertOctagon, Info, ShieldCheck, AlertTriangle } from 'lucide-react';

type Step = 'IMPULSE' | 'NYSTAGMUS' | 'SKEW' | 'RESULT';

const HintsView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<Step>('IMPULSE');
  
  // State for findings
  const [impulseNormal, setImpulseNormal] = useState<boolean | null>(null);
  const [nystagmusChanging, setNystagmusChanging] = useState<boolean | null>(null);
  const [skewPresent, setSkewPresent] = useState<boolean | null>(null);

  const getResult = () => {
    // Rule: INFARCT
    // Impulse Normal OR Fast-phase Alternating (Changing) OR Refixation on Cover Test (Skew)
    // ANY of these signs = STROKE concern
    if (impulseNormal === true || nystagmusChanging === true || skewPresent === true) {
        return 'STROKE';
    }
    // If Impulse Abnormal AND Nystagmus Unidirectional AND Skew Absent -> Vestibular Neuritis
    if (impulseNormal === false && nystagmusChanging === false && skewPresent === false) {
        return 'NEURITIS';
    }
    return 'UNCLEAR';
  };

  const renderResult = () => {
      const diagnosis = getResult();
      if (diagnosis === 'STROKE') {
          return (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 text-center animate-pulse">
                  <AlertOctagon className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-700 mb-2">高度疑似中枢性卒中</h3>
                  <p className="text-red-800 mb-4 font-bold">建议立即转诊 / 启动卒中绿色通道</p>
                  <div className="text-left bg-white p-4 rounded border border-red-200 text-sm text-red-900">
                    <strong>判定依据 (符合其一即高危):</strong>
                    <ul className="list-disc list-inside mt-1">
                        {impulseNormal && <li>头脉冲正常 (Infarct signs)</li>}
                        {nystagmusChanging && <li>变向性眼震</li>}
                        {skewPresent && <li>眼偏斜阳性</li>}
                    </ul>
                  </div>
                  <button onClick={() => setActiveStep('IMPULSE')} className="mt-6 text-red-600 underline">重新检查</button>
              </div>
          )
      } else if (diagnosis === 'NEURITIS') {
          return (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
                <ShieldCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">提示：前庭神经炎</h3>
                <p className="text-green-800 mb-4">符合外周性前庭病变特征</p>
                <div className="text-left bg-white p-4 rounded border border-green-200 text-sm text-green-900">
                    <ul className="list-disc list-inside mt-1">
                        <li>头脉冲异常 (甩头向患侧时有纠正扫视)</li>
                        <li>单向眼震</li>
                        <li>无眼偏斜</li>
                    </ul>
                </div>
                <button onClick={() => setActiveStep('IMPULSE')} className="mt-6 text-green-600 underline">重新检查</button>
            </div>
          )
      } else {
        return (
            <div className="bg-slate-50 border-2 border-slate-300 rounded-xl p-6 text-center">
                 <AlertTriangle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-700">结果不典型</h3>
                 <p className="text-slate-600 mb-4">未完全符合典型模式，建议结合临床及影像学检查。</p>
                 <button onClick={() => setActiveStep('IMPULSE')} className="mt-6 text-slate-600 underline">重新检查</button>
            </div>
        )
      }
  }

  return (
    <div className="space-y-6">
       <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">HINTS 检查 (恶性眩晕照妖镜)</h2>
        <p className="text-slate-500">用于鉴别急性前庭综合征（持续性眩晕、恶心、呕吐、眼震）。</p>
      </header>

      <div className="flex justify-between mb-8 px-4">
          {['HI', 'N', 'TS', '结果'].map((label, idx) => {
              const stepMap = ['IMPULSE', 'NYSTAGMUS', 'SKEW', 'RESULT'];
              const isDone = stepMap.indexOf(activeStep) > idx;
              const isCurrent = stepMap.indexOf(activeStep) === idx;
              
              return (
                  <div key={label} className={`flex flex-col items-center flex-1 relative`}>
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10
                        ${isDone ? 'bg-green-500 text-white' : (isCurrent ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500')}
                      `}>
                          {idx + 1}
                      </div>
                      <span className={`text-xs mt-1 font-medium ${isCurrent ? 'text-primary' : 'text-slate-400'}`}>{label}</span>
                      {idx !== 3 && <div className="absolute top-4 left-1/2 w-full h-[2px] bg-slate-200 -z-0"></div>}
                  </div>
              )
          })}
      </div>

      <div className="max-w-xl mx-auto">
        {activeStep === 'IMPULSE' && (
            <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800">1. Head Impulse (头脉冲试验)</h3>
                <p className="text-slate-600 bg-blue-50 p-3 rounded text-sm">
                    <Info size={16} className="inline mr-1"/> 
                    嘱患者紧盯检查者鼻尖，快速向一侧转头。
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button 
                        onClick={() => { setImpulseNormal(true); setActiveStep('NYSTAGMUS'); }}
                        className="p-6 border-2 border-red-200 bg-red-50 hover:bg-red-100 rounded-xl text-left transition-all"
                    >
                        <div className="font-bold text-red-700 text-lg mb-1">正常 (-)</div>
                        <div className="text-xs text-red-600">视线锁定无移动 (无纠正扫视)</div>
                        <div className="text-xs font-bold mt-2 bg-white/50 inline-block px-2 py-1 rounded text-red-800">中枢性警示</div>
                    </button>
                    <button 
                        onClick={() => { setImpulseNormal(false); setActiveStep('NYSTAGMUS'); }}
                        className="p-6 border-2 border-green-200 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-all"
                    >
                         <div className="font-bold text-green-700 text-lg mb-1">异常 (+)</div>
                         <div className="text-xs text-green-600">眼球随头转动，随后出现纠正扫视</div>
                         <div className="text-xs font-bold mt-2 bg-white/50 inline-block px-2 py-1 rounded text-green-800">外周性特征</div>
                    </button>
                </div>
            </div>
        )}

        {activeStep === 'NYSTAGMUS' && (
             <div className="space-y-4 animate-fade-in">
             <h3 className="text-xl font-bold text-slate-800">2. Nystagmus (眼震性质)</h3>
             <p className="text-slate-600 bg-blue-50 p-3 rounded text-sm">
                 <Info size={16} className="inline mr-1"/> 
                 观察患者向左、右注视时的眼震方向。
             </p>
             <div className="grid grid-cols-2 gap-4 mt-4">
                 <button 
                     onClick={() => { setNystagmusChanging(true); setActiveStep('SKEW'); }}
                     className="p-6 border-2 border-red-200 bg-red-50 hover:bg-red-100 rounded-xl text-left transition-all"
                 >
                     <div className="font-bold text-red-700 text-lg mb-1">变向性</div>
                     <div className="text-xs text-red-600">向左看左跳，向右看右跳</div>
                     <div className="text-xs font-bold mt-2 bg-white/50 inline-block px-2 py-1 rounded text-red-800">中枢性警示</div>
                 </button>
                 <button 
                     onClick={() => { setNystagmusChanging(false); setActiveStep('SKEW'); }}
                     className="p-6 border-2 border-green-200 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-all"
                 >
                      <div className="font-bold text-green-700 text-lg mb-1">单向性</div>
                      <div className="text-xs text-green-600">无论看向何方，眼震快相方向不变</div>
                      <div className="text-xs font-bold mt-2 bg-white/50 inline-block px-2 py-1 rounded text-green-800">外周性特征</div>
                 </button>
             </div>
         </div>
        )}

        {activeStep === 'SKEW' && (
            <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-800">3. Test of Skew (眼偏斜试验)</h3>
            <p className="text-slate-600 bg-blue-50 p-3 rounded text-sm">
                <Info size={16} className="inline mr-1"/> 
                遮盖-去遮盖试验。观察去遮盖时眼球是否有垂直向调整。
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                    onClick={() => { setSkewPresent(true); setActiveStep('RESULT'); }}
                    className="p-6 border-2 border-red-200 bg-red-50 hover:bg-red-100 rounded-xl text-left transition-all"
                >
                    <div className="font-bold text-red-700 text-lg mb-1">有偏斜</div>
                    <div className="text-xs text-red-600">去遮盖眼球出现垂直移动</div>
                    <div className="text-xs font-bold mt-2 bg-white/50 inline-block px-2 py-1 rounded text-red-800">中枢性警示</div>
                </button>
                <button 
                    onClick={() => { setSkewPresent(false); setActiveStep('RESULT'); }}
                    className="p-6 border-2 border-green-200 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-all"
                >
                     <div className="font-bold text-green-700 text-lg mb-1">无偏斜</div>
                     <div className="text-xs text-green-600">眼球位置固定，无垂直移动</div>
                     <div className="text-xs font-bold mt-2 bg-white/50 inline-block px-2 py-1 rounded text-green-800">外周性特征</div>
                </button>
            </div>
        </div>
        )}

        {activeStep === 'RESULT' && renderResult()}
      </div>
    </div>
  );
};

export default HintsView;