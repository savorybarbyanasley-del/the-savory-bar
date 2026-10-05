import React, { useEffect, useState } from 'react';
import TechText from './TechText';
import './TechText.css';

const lineConfigs = [
  { text: 'THE', family: 'Manrope, sans-serif', weight: 800, spacing: -0.085, accent: false },
  { text: 'SAVORY', family: '"Playfair Display", serif', weight: 600, spacing: -0.055, accent: true, style: 'italic' },
  { text: 'BAR', family: 'Manrope, sans-serif', weight: 800, spacing: -0.085, accent: false }
];

export default function HeroTechTitle() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.getAttribute('data-theme') || 'dark');
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const dark = theme !== 'light';

  return (
    <h1 className="hero-title hero-title-with-tech" aria-label="THE SAVORY BAR">
      {lineConfigs.map((line, index) => (
        <span
          className={`${line.accent ? 'display-accent ' : ''}hero-tech-line`}
          key={line.text}
        >
          <span className="hero-title-visible" aria-hidden="true">{line.text}</span>
          <span className="hero-title-tech-layer" aria-hidden="true">
            <TechText
              text={line.text}
              fontWeight={line.weight}
              fontSize={220}
              fontFamily={line.family}
              fontStyle={line.style || 'normal'}
              letterSpacing={line.spacing}
              color={line.accent
                ? (dark ? '#ffdc9d' : '#d28a46')
                : (dark ? '#fff8ec' : '#23160f')}
              accentColor={dark ? '#efb65d' : '#b66327'}
              fillOpacity={0}
              fitWidth={0.96}
              fitHeight={0.9}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={index === 1 ? 15 : 10}
              reach={180}
              softness={0.7}
              strokeWidth={1.5}
              speed={0.9 + index * 0.08}
              lineStyle="dashed"
              selection
              labels
              draggable
              sweep
              className="hero-tech-overlay"
            />
          </span>
        </span>
      ))}
    </h1>
  );
}
