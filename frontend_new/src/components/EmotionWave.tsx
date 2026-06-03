import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waves, TrendingUp, Zap } from 'lucide-react';
import { emotionApi } from '@/lib/api';

interface EmotionWaveProps {
  data?: Array<{ time: string; score: number }>;
}

const EmotionWave: React.FC<EmotionWaveProps> = ({ data }) => {
  const navigate = useNavigate();
  const [waveData, setWaveData] = useState<Array<{ time: string; score: number }>>(data || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setWaveData(data);
      return;
    }

    const fetchTrends = async () => {
      setLoading(true);
      try {
        const res = await emotionApi.getTrends(7);
        if (res.data?.code === 200 && res.data?.data?.records) {
          const records = res.data.data.records;
          const formatted = records.map((r: any) => ({
            time: new Date(r.created_at).toLocaleDateString('zh-CN', { weekday: 'short' }),
            score: r.score
          }));
          setWaveData(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch emotion trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [data]);

  const mockData = waveData.length > 0 ? waveData : [
    { time: '暂无', score: 0 },
    { time: '数据', score: 0 },
    { time: '快去', score: 0 },
    { time: '记录', score: 0 },
    { time: '吧~', score: 0 },
  ];

  const hasData = waveData.length > 0;

  const maxScore = 10;
  const height = 120;
  const width = 280;
  const step = width / (mockData.length - 1);

  const points = mockData.map((d, i) => ({
    x: i * step,
    y: height - (d.score / maxScore) * height
  }));

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const avg = mockData.reduce((a, b) => a + b.score, 0) / mockData.length;
  const trend = mockData[mockData.length - 1].score > mockData[0].score ? 'up' : 'down';

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 flex items-center gap-2">
        <Waves className="w-5 h-5 text-cyan-400" />
        情绪波浪
        {loading && <span className="text-xs text-gray-400 ml-2">加载中...</span>}
      </h3>

      <svg width={width} height={height} className="mx-auto">
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.5)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
        </defs>

        {[2.5, 5, 7.5, 10].map((s) => (
          <line
            key={s}
            x1="0"
            y1={height - (s / maxScore) * height}
            x2={width}
            y2={height - (s / maxScore) * height}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
        ))}

        <path
          d={pathData + ` L ${width} ${height} L 0 ${height} Z`}
          fill="url(#waveGradient)"
        />
        <path d={pathData} fill="none" stroke="#22d3ee" strokeWidth="2" />

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#22d3ee" />
        ))}
      </svg>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-[#F5F0EB]/60">平均: {avg.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-4 h-4 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
          <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? '上升' : '下降'}
          </span>
        </div>
      </div>

      <button 
        onClick={() => navigate('/dashboard')}
        className="mt-4 w-full py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-2xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all"
      >
        查看详细分析 →
      </button>
    </div>
  );
};

export default EmotionWave;