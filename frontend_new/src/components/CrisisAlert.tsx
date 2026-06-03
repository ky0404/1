import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, X } from 'lucide-react';

interface CrisisAlertProps {
  isVisible: boolean;
  onClose: () => void;
}

const CrisisAlert: React.FC<CrisisAlertProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
    >
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-red-500 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-semibold">
            <AlertTriangle className="h-5 w-5" />
            心理危机提示
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed mb-4">
            我感受到你最近的情绪可能比较低落。AI 陪伴无法替代专业心理咨询，
            如果你感到难以承受，请及时寻求专业帮助。
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              全国心理援助热线：
            </p>
            <a
              href="tel:4001619995"
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
            >
              <Phone className="h-5 w-5" />
              400-161-9995
            </a>
          </div>

          <p className="text-xs text-red-600 dark:text-red-300 mt-3 text-center">
            24 小时倾听 | 免费通话 | 保密安全
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CrisisAlert;