import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, AlertCircle } from 'lucide-react';

const DHI_QUESTIONS = [
  { id: 1, text: "抬头是否会加重你的头晕？", cat: "P" },
  { id: 2, text: "你是否因为头晕而感到挫折？", cat: "E" },
  { id: 3, text: "由于头晕，你是否限制了差旅或休闲活动？", cat: "F" },
  { id: 4, text: "在超市走廊走动是否会加重你的头晕？", cat: "P" },
  { id: 5, text: "由于头晕，你是否在上下床时感到困难？", cat: "F" },
  { id: 6, text: "头晕是否限制了你参加社交活动（如晚宴、聚会等）？", cat: "F" },
  { id: 7, text: "由于头晕，你阅读时是否有困难？", cat: "F" },
  { id: 8, text: "一些剧烈活动（如运动或家务）是否会加重头晕？", cat: "P" },
  { id: 9, text: "由于头晕，你是否不敢独自离家？", cat: "E" },
  { id: 10, text: "由于头晕，你是否在他人面前感到尴尬？", cat: "E" },
  { id: 11, text: "头部快速转动是否会诱发头晕？", cat: "P" },
  { id: 12, text: "由于头晕，你是否避免使用公共交通工具？", cat: "F" },
  { id: 13, text: "由于头晕，你是否避免去高度较高的地方？", cat: "P" },
  { id: 14, text: "由于头晕，你在黑暗中走路是否有困难？", cat: "F" },
  { id: 15, text: "你是否担心由于头晕，别人会认为你喝醉了？", cat: "E" },
  { id: 16, text: "由于头晕，你独自一人走路是否有困难？", cat: "F" },
  { id: 17, text: "在人行道上行走是否加重了你的头晕？", cat: "P" },
  { id: 18, text: "由于头晕，你的注意力是否有困难？", cat: "E" },
  { id: 19, text: "由于头晕，你在家里走路是否有困难？", cat: "F" },
  { id: 20, text: "你是否担心由于头晕，别人会认为你反应迟钝？", cat: "E" },
  { id: 21, text: "头晕是否影响了你与家人或朋友的关系？", cat: "E" },
  { id: 22, text: "由于头晕，你是否感到抑郁？", cat: "E" },
  { id: 23, text: "头晕是否影响了你的工作或家务能力？", cat: "F" },
  { id: 24, text: "弯腰是否会加重你的头晕？", cat: "P" },
  { id: 25, text: "头晕是否使你感到紧张？", cat: "E" }
];

const DhiView: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  // Fix: Explicitly cast totalScore to number to prevent 'unknown' inference in comparisons (lines 42-43)
  const totalScore = Object.values(answers).reduce((a: number, b: number) => a + b, 0) as number;
  const physicalScore = DHI_QUESTIONS.filter(q => q.cat === 'P').reduce((acc, q) => acc + (answers[q.id] || 0), 0);
  const functionalScore = DHI_QUESTIONS.filter(q => q.cat === 'F').reduce((acc, q) => acc + (answers[q.id] || 0), 0);
  const emotionalScore = DHI_QUESTIONS.filter(q => q.cat === 'E').reduce((acc, q) => acc + (answers[q.id] || 0), 0);

  const getSeverity = () => {
    if (totalScore <= 30) return { label: '轻度障碍', color: 'text-green-600', bg: 'bg-green-50' };
    if (totalScore <= 60) return { label: '中度障碍', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: '重度障碍', color: 'text-rose-600', bg: 'bg-rose-50' };
  };

  const handleSelect = (qId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ClipboardList className="text-amber-500" /> DHI 眩晕障碍量表
        </h2>
        <p className="text-slate-500">评估眩晕对患者身体、心理及日常功能的影响程度。</p>
      </header>

      {!showResult ? (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-amber-800 mb-6">
            请根据过去一个月的情况回答。评分标准：是 (4分)，有时 (2分)，否 (0分)。
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">问题内容</th>
                  <th className="px-4 py-3 text-center font-semibold w-56">选择评分</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DHI_QUESTIONS.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-700">{q.id}. {q.text}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {[4, 2, 0].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleSelect(q.id, val)}
                            className={`
                              px-3 h-8 rounded border text-xs font-bold transition-all min-w-[48px]
                              ${answers[q.id] === val 
                                ? 'bg-amber-500 text-white border-amber-500' 
                                : 'bg-white text-slate-400 border-slate-200 hover:border-amber-300'}
                            `}
                          >
                            {val === 4 ? '是' : val === 2 ? '有时' : '否'}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={() => setShowResult(true)}
              disabled={Object.keys(answers).length < 25}
              className="px-8 py-3 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:bg-amber-700 disabled:opacity-50 transition-all"
            >
              生成评估报告 ({Object.keys(answers).length}/25)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-8 rounded-2xl border-2 text-center ${getSeverity().bg} ${getSeverity().color.replace('text', 'border')}`}>
            <div className="text-6xl font-black mb-2">{totalScore}</div>
            <div className="text-xl font-bold uppercase tracking-widest">{getSeverity().label}</div>
            <p className="mt-4 text-sm opacity-80">总分范围 0-100，得分越高障碍越严重。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: '身体 (P)', score: physicalScore, max: 28, color: 'bg-blue-500' },
              { label: '功能 (F)', score: functionalScore, max: 36, color: 'bg-indigo-500' },
              { label: '情感 (E)', score: emotionalScore, max: 36, color: 'bg-purple-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">{stat.label} 分数</div>
                <div className="text-2xl font-bold text-slate-800">{stat.score} <span className="text-xs text-slate-300">/ {stat.max}</span></div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`${stat.color} h-full transition-all duration-500`} style={{ width: `${(stat.score / stat.max) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800">临床建议</h3>
            <div className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="text-green-500 shrink-0" size={18} />
              <p>轻度 (0-30): 建议进行前庭康复基础训练，动态平衡练习。</p>
            </div>
            <div className="flex gap-3 text-sm text-slate-600">
              <AlertCircle className="text-amber-500 shrink-0" size={18} />
              <p>中重度 (&gt;30): 建议详细进行前庭功能检查，排除心理性因素（PPPD），必要时心理科协作。</p>
            </div>
            <button 
              onClick={() => { setShowResult(false); setAnswers({}); }}
              className="w-full py-2 text-slate-400 text-xs font-medium hover:text-slate-600 transition-colors"
            >
              重新开始测评
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DhiView;