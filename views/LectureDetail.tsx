import React, { useState } from 'react';
import { ArrowLeft, List, Info, AlertTriangle, AlertOctagon, CheckCircle2, ChevronRight, Timer, Heart, Brain, Ear, Activity } from 'lucide-react';

interface LectureDetailProps {
  lectureId: string;
  onBack: () => void;
}

const LectureDetail: React.FC<LectureDetailProps> = ({ lectureId, onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const Section = ({ title, children, id }: React.PropsWithChildren<{ title: string; id: string }>) => (
    <div id={id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 mb-8 shadow-sm scroll-mt-24">
      <h3 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-primary/20 flex items-center gap-2">
        <div className="w-2 h-6 bg-primary rounded-full"></div>
        {title}
      </h3>
      <div className="space-y-4 text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );

  const Highlight = ({ children, type = 'info' }: React.PropsWithChildren<{ type?: 'info' | 'warn' | 'danger' | 'success' }>) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-700',
      warn: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      danger: 'bg-rose-50 border-rose-200 text-rose-700',
      success: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    };
    const Icons = {
      info: <Info size={18} />,
      warn: <AlertTriangle size={18} />,
      danger: <AlertOctagon size={18} />,
      success: <CheckCircle2 size={18} />
    };
    return (
      <div className={`p-4 rounded-xl border flex gap-3 my-4 ${styles[type]}`}>
        <div className="shrink-0 mt-0.5">{Icons[type]}</div>
        <div className="text-sm">{children}</div>
      </div>
    );
  };

  const SubHeader = ({ children }: React.PropsWithChildren<{}>) => (
    <h4 className="font-bold text-slate-800 mt-6 mb-2 flex items-center gap-2 text-lg">
      <ChevronRight size={18} className="text-primary" />
      {children}
    </h4>
  );

  const renderMdContent = () => (
    <>
      <Section id="intro" title="梅尼埃病 (Meniere's Disease)">
        <SubHeader>核心定义与特征</SubHeader>
        <p>梅尼埃病是一种内耳“水灾”疾病（膜迷路积水）。其特征为发作性眩晕、波动性听力下降、耳鸣及耳闷胀感（四联征）。</p>
        <Highlight type="info">
          <strong>典型病程：</strong>发作持续20分钟至12小时，很少超过24小时。
        </Highlight>
        <SubHeader>诊断标准 (AAO-HNS)</SubHeader>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>2次或以上自发性眩晕发作。</li>
          <li>至少一次经证实的低频至中频感音神经性聋。</li>
          <li>排除其他前庭疾病。</li>
        </ul>
      </Section>
      <Section id="management" title="治疗与长期管理">
        <Highlight type="success">
          <strong>第一基石：低盐饮食。</strong>限盐（&lt;2g/天）是减轻膜迷路积水的关键。同时避免咖啡因、酒精及尼古丁。
        </Highlight>
        <SubHeader>药物阶梯治疗</SubHeader>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>急性期：前庭抑制剂（异丙嗪等）短期使用。</li>
          <li>间歇期：倍他司汀、利尿剂（氢氯噻嗪）。</li>
          <li>难治性：鼓室内注射激素或庆大霉素。</li>
        </ul>
      </Section>
    </>
  );

  const renderVnContent = () => (
    <>
      <Section id="intro" title="前庭神经炎 (Vestibular Neuritis)">
        <SubHeader>疾病概述</SubHeader>
        <p>前庭神经炎常被称为前庭神经的“感冒”。通常由病毒感染引起，导致单侧前庭功能突然丧失。</p>
        <Highlight type="warn">
          <strong>关键特征：</strong>剧烈持续性眩晕、恶心呕吐，但<strong>绝无</strong>听力下降或耳鸣。
        </Highlight>
      </Section>
      <Section id="dx" title="临床诊断与鉴别">
        <SubHeader>床边检查要点</SubHeader>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>自发眼震：</strong>快相朝向健侧。</li>
          <li><strong>头脉冲 (HIT)：</strong>患侧阳性（出现纠正扫视）。</li>
          <li><strong>ROMBERG：</strong>向患侧倾倒。</li>
        </ul>
        <Highlight type="success">
          <strong>康复是核心：</strong>早期下床活动，配合前庭康复训练 (VRT) 是预后的决定性因素。
        </Highlight>
      </Section>
    </>
  );

  const renderVmContent = () => (
    <>
      <Section id="intro" title="前庭性偏头痛 (Vestibular Migraine)">
        <SubHeader>认识“变色龙”</SubHeader>
        <p>VM 是常见的复发性眩晕原因。其表现多样，可模仿 BPPV 或梅尼埃病，但常伴有偏头痛特征。</p>
        <Highlight type="info">
          <strong>诊断关键：</strong>至少5次发作；既往或当前有偏头痛史；50%的发作伴有畏光、畏声或偏头痛样头痛。
        </Highlight>
      </Section>
      <Section id="trigger" title="诱因与管理">
        <SubHeader>常见诱因</SubHeader>
        <p>压力、睡眠不足、特定食物（巧克力、红酒、奶酪）、激素波动。</p>
        <Highlight type="success">
          <strong>管理策略：</strong>规律作息 + 诱因规避。预防性药物包括 β-受体阻滞剂、氟桂利嗪等。
        </Highlight>
      </Section>
    </>
  );

  const renderTiaContent = () => (
    <>
      <Section id="intro" title="TIA 卒中预警 (后循环缺血)">
        <SubHeader>警惕“中风警报”</SubHeader>
        <p>短暂性脑缺血发作是脑梗死的强烈预警。约 10-15% 的 TIA 患者在 3 个月内发生脑梗死。</p>
        <Highlight type="danger">
          <strong>红色警示：</strong>如果眩晕伴有复视、构音障碍、吞咽困难或肢体无力，请立即启动卒中绿通！
        </Highlight>
      </Section>
      <Section id="score" title="ABCD² 风险评估">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <ul className="space-y-1 text-sm font-medium">
            <li>Age: 年龄 &ge; 60岁 (1分)</li>
            <li>BP: 血压 &ge; 140/90 (1分)</li>
            <li>Clinical: 单侧无力 (2分), 言语障碍 (1分)</li>
            <li>Duration: &ge; 60min (2分), 10-59min (1分)</li>
            <li>Diabetes: 糖尿病 (1分)</li>
          </ul>
        </div>
        <p className="mt-4 text-xs">总分 4-7 分属于中高危，需住院观察。</p>
      </Section>
    </>
  );

  const renderSuddenDeafnessContent = () => (
    <>
      <Section id="intro" title="突聋伴眩晕">
        <SubHeader>急症定义</SubHeader>
        <p>72小时内突然发生的单侧听力下降（&ge; 30dB），且伴有旋转性眩晕。</p>
        <Highlight type="danger">
          <strong>时间就是听力：</strong>黄金救治期为发病后 72 小时内。延误治疗可能导致永久性全聋。
        </Highlight>
      </Section>
      <Section id="management" title="处理原则">
        <p>基层医生首要任务是识别并建议立即转诊。主要治疗方案包括大剂量激素冲击、改善微循环药物及高压氧治疗。</p>
      </Section>
    </>
  );

  const renderBalanceContent = () => (
    <>
      <Section id="intro" title="第一部分：临床应用 - 基层平衡评估">
        <SubHeader>为什么基层医院需要平衡检查？</SubHeader>
        <p>平衡功能检查就像是"平衡能力测试"，通过让患者做各种姿势和动作，来测试他们的平衡系统。基层医院具有设备简单、成本低、操作快、结果直观等核心优势。</p>
        <Highlight type="success">
          <strong>基层优势总结：</strong>成本极低、学习曲线短、空间要求小（2-3平米即可）、患者接受度高。
        </Highlight>
        <SubHeader>适应症</SubHeader>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>眩晕患者前庭功能损害程度评估</li>
          <li>老年人跌倒风险评估（预防骨折）</li>
          <li>康复效果动态监测</li>
        </ul>
        <Highlight type="danger">
          <strong>禁忌症：</strong>血压 &gt; 180/110mmHg、严重颈椎病（避免过度活动）、严重骨质疏松（跌倒骨折高风险）。
        </Highlight>
      </Section>
      <Section id="methods" title="第二部分：检查方法 - 实战指南">
        <SubHeader>1. Romberg 试验（闭目难立征）</SubHeader>
        <p>评估本体感觉与前庭功能。患者双脚并拢站立，先睁眼观察30s，后闭眼观察30s。</p>
        <ul className="list-disc list-inside ml-4 text-sm">
          <li>向一侧倾倒：提示前庭外周性病变</li>
          <li>无方向剧烈摇摆：提示小脑或中枢病变</li>
        </ul>

        <SubHeader>2. Fukuda 踏步试验</SubHeader>
        <p>闭眼原地踏步50步。<strong>正常标准：</strong>偏离距离 &lt; 30cm，旋转角度 &lt; 30度。向患侧偏离提示该侧前庭功能减退。</p>

        <SubHeader>3. 单脚站立试验</SubHeader>
        <p>反映核心力量与平衡储备。<strong>正常参考：</strong>50岁以上应 &gt; 10秒。</p>
      </Section>
    </>
  );

  const renderBppvContent = () => (
    <>
      <Section id="intro" title="第六部分：概述 - 认识耳石症">
        <p><strong>BPPV (耳石症)：</strong>内耳里的"小石头"（碳酸钙结晶）掉到了半规管里。当头位改变时，耳石滚动带动淋巴液，引发强烈的旋转性眩晕。</p>
        <Highlight type="info">
          <strong>典型病史：</strong>"一躺下/一起床就天旋地转，几十秒就好。"
        </Highlight>
      </Section>
      <Section id="diagnosis" title="第二部分：诊断与诱发试验">
        <SubHeader>Dix-Hallpike 试验 (后半规管)</SubHeader>
        <p>患者头转45度快速躺下，头悬出床沿。<strong>阳性表现：</strong>向地旋转性眼震，潜伏期1-5秒，持续 &lt; 1分钟。</p>
        <SubHeader>Roll Test 翻滚试验 (水平半规管)</SubHeader>
        <p>平卧头抬高30度，快速左右翻转。分为向地性眼震（管石症）和背地性眼震（嵴顶结石）。</p>
      </Section>
      <Section id="treatment" title="第四部分：手法复位">
        <Highlight type="success">
          <strong>手法复位是金标准：</strong>Epley法对后半规管BPPV成功率高达90%以上。注意动作要匀速，每个位置停留至少30秒。
        </Highlight>
        <p className="text-sm italic text-slate-500">提示：治疗后可嘱患者适当抬高枕头，避免剧烈俯冲动作。</p>
      </Section>
    </>
  );

  const renderDvaContent = () => (
    <>
      <Section id="intro" title="第一部分：DVA 动态视力原理">
        <p>DVA 是测试前庭-眼反射 (VOR) 的重要工具。前庭受损时，头部转动会导致视网膜成像模糊。</p>
        <Highlight type="info">
          <strong>检查参数：</strong>频率通常为 2Hz（每秒摆头2次），幅度左右各 20度。
        </Highlight>
      </Section>
      <Section id="clinic" title="结果判定标准">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <h5 className="font-bold text-emerald-800">正常</h5>
            <p className="text-xs text-emerald-700">动态视力下降 &lt; 2行</p>
          </div>
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
            <h5 className="font-bold text-rose-800">异常</h5>
            <p className="text-xs text-rose-700">动态视力下降 &ge; 3行</p>
          </div>
        </div>
        <Highlight type="warn">
          单侧下降常提示前庭神经炎；双侧下降应警惕药物中毒（如庆大霉素）。
        </Highlight>
      </Section>
    </>
  );

  const renderHearingContent = () => (
    <>
      <Section id="intro" title="音叉检查基础">
        <p>基层医生听力初筛的"听诊器"。常用 256Hz 或 512Hz 音叉。</p>
        <SubHeader>1. Rinne 试验 (气导与骨导)</SubHeader>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-emerald-500"/> 阳性 (+): 气导 &gt; 骨导 (正常/感音性)</li>
          <li className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-rose-500"/> 阴性 (-): 骨导 &gt; 气导 (传导性)</li>
        </ul>
        <SubHeader>2. Weber 试验 (骨导偏向)</SubHeader>
        <Highlight type="info">
          <strong>记忆口诀：</strong>Weber偏向传导侧，感音偏向健侧。
        </Highlight>
      </Section>
    </>
  );

  const renderVhitContent = () => (
    <>
      <Section id="intro" title="vHIT 视频头脉冲试验">
        <p>急性眩晕鉴别诊断的"量化工具"，是 HINTS 检查中 HIT 步骤的客观升级。</p>
        <SubHeader>核心指标：VOR 增益</SubHeader>
        <p>眼球速度 / 头部速度。正常值为 1.0 左右。</p>
        <Highlight type="danger">
          <strong>三种异常模式：</strong>
          <ul className="mt-2 text-xs space-y-1">
            <li>1. 单侧增益降低 + 扫视：外周性 (VN)</li>
            <li>2. 增益正常 + 无扫视（伴眩晕）：警惕中枢 (卒中)</li>
            <li>3. 交叉模式（显性扫视）：高度特异性指向中枢病变</li>
          </ul>
        </Highlight>
      </Section>
    </>
  );

  const renderContent = () => {
    switch(lectureId) {
      case 'balance': return renderBalanceContent();
      case 'bppv': return renderBppvContent();
      case 'dva': return renderDvaContent();
      case 'hearing': return renderHearingContent();
      case 'vhit': return renderVhitContent();
      case 'md': return renderMdContent();
      case 'vn': return renderVnContent();
      case 'vm': return renderVmContent();
      case 'tia': return renderTiaContent();
      case 'sudden-deafness': return renderSuddenDeafnessContent();
      default: return <p>内容加载中...</p>;
    }
  };

  const navChaptersMap: Record<string, { id: string; label: string }[]> = {
    balance: [{ id: 'intro', label: '应用' }, { id: 'methods', label: '检查' }],
    bppv: [{ id: 'intro', label: '概述' }, { id: 'diagnosis', label: '诊断' }, { id: 'treatment', label: '复位' }],
    md: [{ id: 'intro', label: '症状' }, { id: 'management', label: '管理' }],
    vn: [{ id: 'intro', label: '特征' }, { id: 'dx', label: '诊断' }],
    vm: [{ id: 'intro', label: '识别' }, { id: 'trigger', label: '诱因' }],
    tia: [{ id: 'intro', label: '预警' }, { id: 'score', label: '评估' }],
    'sudden-deafness': [{ id: 'intro', label: '急症' }, { id: 'management', label: '处理' }],
    dva: [{ id: 'intro', label: '原理' }, { id: 'clinic', label: '判定' }],
    hearing: [{ id: 'intro', label: '操作' }],
    vhit: [{ id: 'intro', label: '判读' }]
  };

  const navChapters = navChaptersMap[lectureId] || [];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-slate-50 py-4 -mx-4 px-4 border-b border-slate-200">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors">
          <ArrowLeft size={20} /> 返回讲义库
        </button>
        <div className="hidden md:flex gap-2">
          {navChapters.map(chapter => (
            <button 
              key={chapter.id}
              onClick={() => {
                const el = document.getElementById(chapter.id);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setActiveSection(chapter.id);
              }}
              className={`px-3 py-1 text-xs rounded-full font-bold border transition-all ${activeSection === chapter.id ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200'}`}
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in">
        {renderContent()}
      </div>

      <div className="fixed bottom-6 right-6 md:hidden">
        <button 
          className="p-4 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center"
          onClick={() => {
            const nextIdx = (navChapters.findIndex(c => c.id === activeSection) + 1) % navChapters.length;
            const nextId = navChapters[nextIdx].id;
            document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(nextId);
          }}
        >
          <List />
        </button>
      </div>
    </div>
  );
};

export default LectureDetail;