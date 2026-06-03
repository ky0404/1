import React from 'react';

interface PersonalityRadarProps {
  data?: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

const defaultData = {
  openness: 75,
  conscientiousness: 60,
  extraversion: 45,
  agreeableness: 80,
  neuroticism: 55
};

const labels = ['开放性', '尽责性', '外向性', '宜人性', '神经质'];

const PersonalityRadar: React.FC<PersonalityRadarProps> = ({ data = defaultData }) => {
  const values = [data.openness, data.conscientiousness, data.extraversion, data.agreeableness, data.neuroticism];
  const max = 100;
  const size = 160;
  const center = size / 2;
  const radius = 60;

  const getPoint = (angle: number, value: number) => {
    const rad = (angle * Math.PI) / 180;
    const dist = (value / max) * radius;
    return {
      x: center + dist * Math.cos(rad),
      y: center + dist * Math.sin(rad)
    };
  };

  const points = values.map((v, i) => getPoint(i * 72 - 90, v));
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">人格雷达图</h3>
      
      <div className="flex justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {[1, 0.75, 0.5, 0.25].map((r, i) => (
            <circle 
              key={i}
              cx={center} 
              cy={center} 
              r={radius * r} 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeDasharray="4 4"
            />
          ))}
          
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const p = getPoint(angle, 100);
            return (
              <line 
                key={i}
                x1={center} 
                y1={center} 
                x2={p.x} 
                y2={p.y} 
                stroke="rgba(255,255,255,0.1)" 
              />
            );
          })}

          <path d={pathData} fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" />
          
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#a855f7" />
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {labels.map((label, i) => (
          <div key={i} className="text-center">
            <p className="text-xs text-[#F5F0EB]/50">{label}</p>
            <p className="text-sm font-medium text-purple-300">{values[i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityRadar;