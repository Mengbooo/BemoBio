'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DitheringShader = dynamic(() => import('./DitheringShader'), {
  ssr: false,
  loading: () => <HeroDitheringFallback />,
});

function HeroDitheringFallback() {
  return (
    <div className="absolute inset-0 bg-black">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 68%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 68%)',
        }}
      />
    </div>
  );
}

export default function HeroDithering() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(start, 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!ready) {
    return <HeroDitheringFallback />;
  }

  return (
    <DitheringShader
      bgColor="#000000"
      envIntensity={2}
      highlight="#066aff"
      gridSize={1.5}
      pixelSizeRatio={1}
      grayscaleOnly
      enableControls={false}
      allowPointerEvents={false}
    />
  );
}
