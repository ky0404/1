import { useEffect, useRef } from 'react';

interface EmotionTrendChartProps {
  data: Array<{
    score: number;
    label: string;
    created_at: string;
  }>;
  isDarkMode: boolean;
}

const EmotionTrendChart: React.FC<EmotionTrendChartProps> = ({ data, isDarkMode }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const loadECharts = async () => {
      const echarts = await import('echarts');
      const chart = echarts.init(chartRef.current);

      const dates = data.map((d) => {
        const date = new Date(d.created_at);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });

      const scores = data.map((d) => d.score);
      const colors = data.map((d) => {
        if (d.score >= 7) return '#ef4444';
        if (d.score >= 5) return '#f59e0b';
        return '#10b981';
      });

      const option = {
        grid: { left: 50, right: 20, bottom: 40, top: 30 },
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            const p = params[0];
            let level = '积极';
            if (p.value >= 7) level = '高危';
            else if (p.value >= 5) level = '中等';
            return `日期: ${p.name}<br/>强度: ${p.value}/10<br/>状态: ${level}`;
          },
          backgroundColor: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
          borderColor: isDarkMode ? '#475569' : '#e2e8f0',
          textStyle: { color: isDarkMode ? '#f1f5f9' : '#1e293b' },
        },
        xAxis: {
          type: 'category',
          data: dates,
          name: '日期',
          nameTextStyle: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 },
          axisLabel: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 },
          axisLine: { lineStyle: { color: isDarkMode ? '#334155' : '#e2e8f0' } },
        },
        yAxis: {
          type: 'value',
          name: '情绪强度',
          min: 0,
          max: 10,
          nameTextStyle: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 },
          axisLabel: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 },
          splitLine: { lineStyle: { color: isDarkMode ? '#334155' : '#e2e8f0', type: 'dashed' } },
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: scores,
            lineStyle: { width: 3, color: '#6366f1' },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(99,102,241,0.3)' },
                  { offset: 1, color: 'rgba(99,102,241,0.05)' },
                ],
              },
            },
            itemStyle: {
              color: (params: any) => colors[params.dataIndex],
              borderWidth: 2,
              borderColor: '#fff',
            },
            markLine: {
              silent: true,
              lineStyle: { type: 'dashed', color: '#ef4444' },
              data: [{ yAxis: 7, label: { formatter: '危险阈值', color: '#ef4444' } }],
            },
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    };

    loadECharts();
  }, [data, isDarkMode]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <div className="text-center">
          <p className="text-lg mb-2">📊</p>
          <p>暂无情绪数据</p>
          <p className="text-sm">多聊天后会显示趋势哦</p>
        </div>
      </div>
    );
  }

  return <div ref={chartRef} className="w-full h-64" />;
};

export default EmotionTrendChart;