import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
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
          媛心烨语 · 隐私政策
        </h1>

        <div className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          <p><strong>生效日期：</strong>2025年1月1日</p>
          <p><strong>最后更新：</strong>2025年5月</p>
          <p><strong>适用版本：</strong>媛心烨语 v3.x</p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">一、总则</h2>
            <p>
              媛心烨语（以下简称"本产品"或"我们"）是面向大学生群体的 AI 情绪陪伴系统。
              我们深知心理健康数据的高度敏感性，因此将隐私保护置于产品设计的核心位置。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">二、我们收集的数据</h2>
            
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">2.1 你主动提供的数据</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>账号信息：</strong>邮箱地址、用户名、加密密码</li>
              <li><strong>对话内容：</strong>你发送的文字消息</li>
              <li><strong>反馈数据：</strong>点赞/踩/重新生成操作</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mt-4 mb-2">2.2 系统自动生成的数据</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>情绪记录：</strong>情绪类别、强度评分、关键词</li>
              <li><strong>用户画像：</strong>压力关键词、情绪均值、危机计数</li>
              <li><strong>访问日志：</strong>IP 地址、请求时间（脱敏处理）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">三、数据使用方式</h2>
            <p>我们使用你的数据只为以下目的：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>提供服务：</strong>分析你的情绪状态，生成个性化陪伴回复</li>
              <li><strong>改善体验：</strong>根据反馈数据优化 AI 回复质量</li>
              <li><strong>安全保护：</strong>检测异常访问、实施风险识别与危机干预</li>
              <li><strong>72小时随访：</strong>在高风险对话后，可能发送关怀邮件（可关闭）</li>
            </ul>
            <p className="mt-2 text-red-500 font-medium">我们绝不会出售你的数据或用于广告推送。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">四、数据存储与安全</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>存储位置：</strong>腾讯云服务器（中国大陆），受《网络安全法》保护</li>
              <li><strong>加密存储：</strong>密码使用 BCrypt 哈希存储</li>
              <li><strong>传输加密：</strong>全站 HTTPS 加密传输</li>
              <li><strong>访问控制：</strong>仅授权人员可访问数据库</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">五、你的权利</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>查看数据：</strong>可以查看我们在系统中存储的关于你的所有数据</li>
              <li><strong>删除数据：</strong>可以一键清空所有对话记录、情绪分析数据</li>
              <li><strong>注销账号：</strong>可以永久删除账号及所有关联数据</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">六、联系我们</h2>
            <p>
              如果你对本政策有任何疑问，请联系我们的隐私保护负责人。
              我们将在 7 个工作日内回复。
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPage;