import React from 'react';
import { View } from '../types';
import { BookOpen, Stethoscope, RotateCw, Layers, Brain, Waves, Ear, ShieldAlert, Activity, Zap } from 'lucide-react';

interface TrainingCenterProps {
  onSelectLecture: (lectureId: string) => void;
}

export const LECTURES_DATA = [
  {
    id: 'balance',
    title: '平衡功能检查培训',
    subtitle: '基层医院必备的平衡评估工具与方法',
    icon: <Layers className="w-6 h-6" />,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 'bppv',
    title: '良性阵发性位置性眩晕',
    subtitle: 'BPPV的手法复位与诊断规范',
    icon: <RotateCw className="w-6 h-6" />,
    color: 'text-emerald-600 bg-emerald-100'
  },
  {
    id: 'md',
    title: '梅尼埃病管理',
    subtitle: '膜迷路积水的诊断“四联征”与阶梯治疗',
    icon: <Waves className="w-6 h-6" />,
    color: 'text-cyan-600 bg-cyan-100'
  },
  {
    id: 'vn',
    title: '前庭神经炎',
    subtitle: '急性持续性眩晕的鉴别与康复方案',
    icon: <Activity className="w-6 h-6" />,
    color: 'text-orange-600 bg-orange-100'
  },
  {
    id: 'vm',
    title: '前庭性偏头痛',
    subtitle: '认识眩晕界的“变色龙”与诱因管理',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-purple-600 bg-purple-100'
  },
  {
    id: 'tia',
    title: 'TIA 卒中预警',
    subtitle: '短暂性脑缺血发作的ABCD²风险评估',
    icon: <ShieldAlert className="w-6 h-6" />,
    color: 'text-rose-600 bg-rose-100'
  },
  {
    id: 'sudden-deafness',
    title: '突聋伴眩晕',
    subtitle: '急症识别：时间就是听力与前庭功能',
    icon: <Ear className="w-6 h-6" />,
    color: 'text-amber-600 bg-amber-100'
  },
  {
    id: 'dva',
    title: 'DVA 动态视力分析',
    subtitle: '前庭眼反射(VOR)功能的快速测评',
    icon: <Stethoscope className="w-6 h-6" />,
    color: 'text-sky-600 bg-sky-100'
  },
  {
    id: 'vhit',
    title: 'vHIT 临床应用',
    subtitle: '急性眩晕鉴别诊断的客观利器',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-red-600 bg-red-100'
  }
];

const TrainingCenter: React.FC<TrainingCenterProps> = ({ onSelectLecture }) => {
  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="text-primary" /> 培训讲义库
        </h2>
        <p className="text-slate-500">规范化学术内容，助力基层医生专业成长。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LECTURES_DATA.map((lecture) => (
          <button
            key={lecture.id}
            onClick={() => onSelectLecture(lecture.id)}
            className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-left group"
          >
            <div className={`p-3 rounded-xl shrink-0 ${lecture.color}`}>
              {lecture.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{lecture.title}</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{lecture.subtitle}</p>
              <div className="mt-4 text-xs font-bold text-primary flex items-center gap-1">
                开始学习 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrainingCenter;