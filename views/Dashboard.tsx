import React from 'react';
import { View } from '../types';
import { 
  ArrowRight, 
  AlertTriangle, 
  AlertOctagon, 
  ClipboardList, 
  Gauge, 
  Layers, 
  Timer, 
  Stethoscope, 
  Ear, 
  Eye, 
  Zap, 
  ShieldAlert, 
  CheckSquare,
  RotateCw 
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const categories = [
    {
      group: "平衡功能初筛",
      items: [
        { id: View.ROMBERG, title: 'Romberg 试验', icon: <Stethoscope size={20}/>, desc: '静态平衡评估，基石检查。', color: 'bg-blue-50 border-blue-200 text-blue-700' },
        { id: View.TUG, title: 'TUG 测试', icon: <Timer size={20}/>, desc: '动态平衡，量化跌倒风险。', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
        { id: View.MCTSIB, title: 'mCTSIB 测试', icon: <Layers size={20}/>, desc: '平衡感觉整合，区分感觉障碍。', color: 'bg-purple-50 border-purple-200 text-purple-700' }
      ]
    },
    {
      group: "前庭与听觉临床检查",
      items: [
        { id: View.DIX_HALLPIKE, title: 'Dix-Hallpike', icon: <RotateCw size={20}/>, desc: 'BPPV（耳石症）诱发与判读。', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
        { id: View.BHIT_TEST, title: '床旁头脉冲 (bHIT)', icon: <Zap size={20}/>, desc: '快速评估半规管高频VOR功能。', color: 'bg-orange-50 border-orange-200 text-orange-700' },
        { id: View.DVA_TEST, title: '动态视敏度 (DVA)', icon: <Eye size={20}/>, desc: '前庭眼反射功能的视力代偿评估。', color: 'bg-sky-50 border-sky-200 text-sky-700' },
        { id: View.HEARING_TEST, title: '音叉试验', icon: <Ear size={20}/>, desc: 'Rinne与Weber试验，听力初筛。', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' }
      ]
    },
    {
      group: "主观量表与风险评分",
      items: [
        { id: View.HINTS, title: 'HINTS 检查', icon: <AlertOctagon size={20}/>, desc: '急性眩晕中枢性病变排查。', color: 'bg-rose-50 border-rose-200 text-rose-700', urgent: true },
        { id: View.ABCD2_SCORE, title: 'ABCD2 卒中风险', icon: <ShieldAlert size={20}/>, desc: 'TIA 后的短期脑卒中风险评估。', color: 'bg-red-50 border-red-200 text-red-700', urgent: true },
        { id: View.DHI, title: 'DHI 眩晕障碍', icon: <ClipboardList size={20}/>, desc: '评估眩晕对日常生活的影响。', color: 'bg-amber-50 border-amber-200 text-amber-700' },
        { id: View.VAS, title: 'VAS 评分', icon: <Gauge size={20}/>, desc: '患者主观眩晕强度量化。', color: 'bg-orange-50 border-orange-200 text-orange-700' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">眩晕与平衡障碍标准化筛查</h1>
        <p className="text-slate-500 text-sm">规范流程引导，辅助基层临床决策。</p>
        <p className="text-slate-400 text-xs mt-2 italic">中国医药教育协会前庭医学专业委员会基层医生眩晕规范化诊疗培训</p>
      </div>

      {categories.map((cat, idx) => (
        <section key={idx} className="space-y-4">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{cat.group}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-left p-5 rounded-xl border-2 border-white bg-white shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 flex flex-col h-full group"
              >
                <div className="flex justify-between items-start w-full mb-3">
                  <div className={`p-2 rounded-lg transition-colors ${item.color.split(' ')[0]} ${item.color.split(' ')[2]} group-hover:bg-primary group-hover:text-white`}>
                    {item.icon}
                  </div>
                  {item.urgent && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-100 animate-pulse">
                      高危鉴别
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">{item.desc}</p>
                <div className="text-primary text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  进入测评 <ArrowRight size={10} />
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-3 shadow-sm">
        <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={20} />
        <div className="text-sm">
          <h4 className="font-bold text-yellow-800 flex items-center gap-2">红旗征象提示</h4>
          <p className="text-yellow-700 mt-1 leading-relaxed">
            若患者伴有共济失调、吞咽困难、构音障碍、复视或明显的肢体无力，请高度警惕后循环卒中，立即启动急诊流程。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;