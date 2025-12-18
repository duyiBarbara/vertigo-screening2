import React, { useState } from 'react';
import { Gauge, Info } from 'lucide-react';

const VasView: React.FC = () => {
  const [score, setScore] = useState(5);

  const getEmoji = (val: number) => {
    if (val === 0) return "😊";
    if (val <= 3) return "🙂";
    if (val <= 6) return "😐";
    if (val <= 8) return "😟";
    return "😫";
  };

  const getLevelDesc = (val: number) => {
    if (val === 0) return "无眩晕";
    if (val <= 3) return "轻微：不影响工作生活";
    if (val <= 6) return "中度：影响部分活动，需休息";
    if (val <= 8) return "重度：难以进行日常活动";
    return "极重度：卧床不起，剧烈恶心";
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Gauge className="text-orange-500" /> VAS 视觉模拟评分
        </h2>
        <p className="text-slate-500">主观量化患者当前感受到的眩晕强度。</p>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-12">
        <div className="space-y-4">
          <div className="text-8xl transition-transform duration-300 transform scale-110">
            {getEmoji(score)}
          </div>
          <div className="text-5xl font-black text-slate-800">
            {score} <span className="text-lg text-slate-400">/ 10</span>
          </div>
          <p className="text-xl font-bold text-orange-600">{getLevelDesc(score)}</p>
        </div>

        <div className="px-4 relative">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value))}
            className="w-full h-4 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
            <span>0 (完全无晕)</span>
            <span>10 (生平最剧烈)</span>
          </div>
        </div>

        <div className="grid grid-cols-11 gap-1 px-1">
          {[0,1,2,3,4,5,6,7,8,9,10].map(v => (
            <button 
              key={v}
              onClick={() => setScore(v)}
              className={`py-2 rounded transition-all text-xs font-bold ${score === v ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-700">
        <Info className="shrink-0" size={18} />
        <div>
          <p className="font-bold">评分建议：</p>
          <ul className="list-disc list-inside mt-1 opacity-80">
            <li>请患者根据过去24小时内眩晕发作的最严重程度进行标记。</li>
            <li>此分值常用于评估治疗前后的变化（如手法复位后）。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VasView;