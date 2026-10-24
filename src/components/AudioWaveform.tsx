import React from 'react';

interface AudioWaveformProps {
  color?: string;
  count?: number;
  isActive?: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  color = '#f97316',
  count = 7,
  isActive = true,
}) => {
  if (!isActive) return null;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', height: '32px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            backgroundColor: color,
            animationDelay: `${(i % 5) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};
