import React, { useState, useEffect } from 'react';
import { Timer, Play, RotateCcw, Footprints, AlertTriangle, CheckCircle } from 'lucide-react';

const TugView: React.FC = () => {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setFinished(true);
    } else {
      if (finished) {
        // Reset if starting again from finished state
        setTime(0);
        setFinished(false);
      }
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setFinished(false);
  };

  const seconds = (time / 1000).toFixed(1);
  const isHighRisk = time / 1000 > 12;

  return (
    <div className="space-y-6">
       <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">TUG 计时起立-行走测试</h2>
        <p className="text-slate-500">动态平衡与功能性移动能力评估。</p>
      </header>

      {/* Instruction Steps */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
             <Footprints className="text-indigo-500" />
             <h3 className="font-bold text-lg">测试流程</h3>
        </div>
        <div className="flex justify-between items-center text-sm md:text-base text-slate-700 text-center gap-2">
            <div className="flex-1 bg-indigo-50 p-2 rounded">
                1. 椅子起立
            </div>
            <div className="text-slate-300">→</div>
            <div className="flex-1 bg-indigo-50 p-2 rounded">
                2. 走3米
            </div>
            <div className="text-slate-300">→</div>
            <div className="flex-1 bg-indigo-50 p-2 rounded">
                3. 转身
            </div>
            <div className="text-slate-300">→</div>
            <div className="flex-1 bg-indigo-50 p-2 rounded">
                4. 走回坐下
            </div>
        </div>
      </div>

      {/* Stopwatch Area */}
      <div className={`
        p-8 rounded-2xl text-center border-2 transition-colors duration-300
        ${finished ? (isHighRisk ? 'bg-orange-50 border-orange-300' : 'bg-green-50 border-green-300') : 'bg-slate-50 border-slate-200'}
      `}>
        <div className="text-6xl font-mono font-bold text-slate-800 mb-8">
            {seconds}<span className="text-2xl text-slate-500">s</span>
        </div>

        <div className="flex justify-center gap-6 mb-8">
            <button 
                onClick={handleStartStop}
                className={`
                    h-16 w-16 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95
                    ${isRunning ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}
                `}
            >
                {isRunning ? <span className="font-bold text-xs">停止</span> : <Play fill="currentColor" className="ml-1" />}
            </button>
            <button 
                onClick={handleReset}
                className="h-16 w-16 rounded-full bg-white text-slate-600 border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50"
            >
                <RotateCcw size={24} />
            </button>
        </div>

        {/* Result Display */}
        {finished && (
            <div className="animate-fade-in-up">
                {isHighRisk ? (
                    <div className="flex flex-col items-center text-orange-700">
                        <AlertTriangle className="w-12 h-12 mb-2" />
                        <h3 className="text-xl font-bold">跌倒高风险</h3>
                        <p className="">耗时 &gt; 12秒，提示移动能力受损</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-green-700">
                        <CheckCircle className="w-12 h-12 mb-2" />
                        <h3 className="text-xl font-bold">风险较低</h3>
                        <p className="">耗时 ≤ 12秒，功能性移动能力正常</p>
                    </div>
                )}
            </div>
        )}
      </div>
      
      {!finished && (
          <div className="text-center text-sm text-slate-500">
            点击“开始”按钮时发出指令，当患者背部靠回椅背时点击“停止”。
          </div>
      )}
    </div>
  );
};

export default TugView;