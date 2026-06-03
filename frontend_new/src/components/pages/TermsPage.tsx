import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
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

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          媛心烨语 · 用户协议
        </h1>

        <div className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          <p><strong>生效日期：</strong>2025年1月1日</p>
          <p><strong>最后更新：</strong>2025年5月</p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">一、服务条款的确认和接纳</h2>
            <p>
              本用户协议（以下简称"本协议"）是用户（以下简称"你"）与媛心烨语产品团队
              （以下简称"我们"）之间关于使用媛心烨语 AI 情绪陪伴服务的法律协议。
              当你开始使用本服务时，即表示你已阅读、理解和同意接受本协议的所有条款。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">二、服务内容</h2>
            <p>媛心烨语提供以下服务：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>AI 情绪分析与陪伴对话</li>
              <li>个性化心理画像（需登录）</li>
              <li>情绪趋势追踪与分析</li>
              <li>用户反馈收集与 AI 优化</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">三、用户行为规范</h2>
            <p>你同意不会：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>利用本服务进行任何非法活动</li>
              <li>发送垃圾信息、骚扰他人</li>
              <li>尝试破解、攻击或干扰本服务</li>
              <li>复制、修改或传播本服务的任何内容</li>
              <li>使用本服务进行自我伤害或伤害他人</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">四、知识产权</h2>
            <p>
              本服务及其所有内容，包括但不限于文本、图形、标识、图标、图像、音频剪辑、
              视频剪辑、软件和代码，均由我们或我们的许可方拥有知识产权。
              未经我们书面许可，你不得复制、修改、分发或使用这些内容。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">五、免责声明</h2>
            <p>
              媛心烨语是一个 AI 情绪陪伴工具，不替代专业心理咨询或医疗诊断。
              我们不对以下情况承担责任：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>因使用本服务导致的任何心理伤害</li>
              <li>AI 回复的准确性、完整性或时效性</li>
              <li>用户之间的任何争议</li>
              <li>因不可抗力导致的服务中断</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">六、服务变更和终止</h2>
            <p>
              我们保留随时修改、暂停或终止本服务的权利，恕不另行通知。
              在终止情况下，你将无法访问你的数据，我们可能会删除这些数据。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">七、法律管辖</h2>
            <p>
              本协议受中华人民共和国法律管辖。如发生争议，双方应首先友好协商解决；
              协商不成的，任何一方均有权向服务提供方所在地人民法院提起诉讼。
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsPage;