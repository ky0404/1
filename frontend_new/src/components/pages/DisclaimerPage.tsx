import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DisclaimerPageProps {
  onBack: () => void;
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            免责声明
          </h1>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
          <section className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              ⚠️ 重要提示：媛心烨语是 AI 情绪陪伴工具，不替代专业心理咨询或医疗诊断。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">一、服务性质声明</h2>
            <p>
              媛心烨语是由团队开发的 AI 情绪陪伴系统，旨在为用户提供情感支持和倾听服务。
              这是一个非营利性项目（用于中国大学生计算机设计大赛），不构成专业的心理咨询、
              心理治疗或医疗服务。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">二、不替代专业服务</h2>
            <p>AI 陪伴无法替代以下专业服务：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>专业心理咨询或心理治疗</li>
              <li>精神疾病诊断和治疗</li>
              <li>紧急危机干预（如自杀倾向）</li>
              <li>医疗诊断和处方</li>
            </ul>
            <p className="mt-2">
              如果你正在经历严重的情绪困扰、心理危机或精神健康问题，
              请立即寻求专业心理咨询师或精神科医生的帮助。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">三、AI 回复的局限性</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>AI 可能无法准确理解复杂的人类情感</li>
              <li>AI 的回复可能存在事实错误或不当建议</li>
              <li>AI 无法识别你没有明确表达的心理危机</li>
              <li>AI 缺乏对个人具体情况的专业判断能力</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">四、危机情况处理</h2>
            <p>
              如果你或他人正处于危机状态（包括自杀倾向、伤害他人等），
              请立即拨打以下紧急求助电话：
            </p>
            <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-center">
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  全国心理援助热线
                </span>
              </p>
              <p className="text-center text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                400-161-9995
              </p>
              <p className="text-center text-sm text-red-500 dark:text-red-300 mt-1">
                24 小时免费热线
              </p>
            </div>
            <p>
              如遇紧急生命危险，请立即拨打 110 报警或 120 就医。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">五、用户责任</h2>
            <p>作为用户，你应当：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>理性使用 AI 陪伴服务，不将其作为唯一情感支持来源</li>
              <li>在需要时主动寻求专业帮助</li>
              <li>保护自己的账户安全，不向他人透露账户信息</li>
              <li>遵守服务条款，不进行任何可能伤害自己或他人的行为</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">六、责任限制</h2>
            <p>
              在法律允许的最大范围内，我们不对因使用或无法使用本服务而导致的任何损失承担责任，
              包括但不限于直接损失、间接损失、偶然损失、惩罚性损失或衍生性损失。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">七、联系我们</h2>
            <p>
              如对本免责声明有任何疑问，请通过项目官方渠道联系我们。
            </p>
          </section>

          <section className="text-sm text-slate-400 dark:text-slate-500 mt-8">
            <p>最后更新：2025年5月</p>
            <p>版本：v1.0</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default DisclaimerPage;