import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SlideCaptchaProps {
  onVerify: (value: boolean) => void;
  resetTrigger: boolean;
  verified: boolean;
}

const CAPTCHA_VERIFY_DEBOUNCE = 500;

const SlideCaptcha: React.FC<SlideCaptchaProps> = ({ onVerify, resetTrigger, verified }) => {
  const [pos, setPos] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const verifyAtRef = useRef(0);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      const max = ref.current ? Math.max(ref.current.clientWidth - 52, 0) : 0;
      if (verified) {
        setDone(true);
        setPos(max);
        return;
      }
      setDone(false);
      setPos(0);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [resetTrigger, verified]);

  const finishVerify = useCallback(() => {
    const now = Date.now();
    if (done || now - verifyAtRef.current < CAPTCHA_VERIFY_DEBOUNCE) return;
    verifyAtRef.current = now;
    const max = ref.current ? Math.max(ref.current.clientWidth - 52, 0) : 0;
    setPos(max);
    setDone(true);
    onVerify(true);
  }, [done, onVerify]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (done || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const max = rect.width - 52;
      const next = Math.max(0, Math.min(clientX - rect.left - 24, max));
      setPos(next);
      if (next >= max - 2) finishVerify();
    },
    [done, finishVerify]
  );

  const resetIfNeeded = useCallback(() => {
    if (!done) setPos(0);
  }, [done]);

  const startDrag = () => {
    if (done) return;
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      resetIfNeeded();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const startTouch = (e: React.TouchEvent) => {
    if (done) return;
    e.preventDefault();
    const onMove = (te: TouchEvent) => {
      if (te.touches[0]) handleMove(te.touches[0].clientX);
    };
    const onUp = () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      resetIfNeeded();
    };
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  return (
    <div className="captcha-wrap" ref={ref}>
      <div
        className="captcha-progress"
        style={{
          width: pos + 52,
          background: done
            ? 'linear-gradient(90deg, #10b981, #34d399)'
            : 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.3))',
        }}
      />
      <div
        className={`captcha-btn${done ? ' done' : ''}`}
        style={{ left: pos }}
        onMouseDown={startDrag}
        onTouchStart={startTouch}
      >
        {done ? '✓' : '>>'}
      </div>
      <span className={`captcha-label${done ? ' done' : ''}`}>
        {done ? '验证通过，当前设备 30 分钟内免验证' : '向右滑动完成验证'}
      </span>
    </div>
  );
};

export default SlideCaptcha;