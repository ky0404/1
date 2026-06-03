import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  isDarkMode: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<ParticleClass[]>([]);

  class ParticleClass {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = getRandomColor();
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
      if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;

      this.vx = Math.max(-1, Math.min(1, this.vx));
      this.vy = Math.max(-1, Math.min(1, this.vy));

      this.opacity += (Math.random() - 0.5) * 0.02;
      this.opacity = Math.max(0.1, Math.min(0.7, this.opacity));
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = this.opacity * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const getRandomColor = () => {
    const colors = isDarkMode
      ? ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
      : ['#FF9A58', '#4ECDC4', '#A8D8EA', '#FFB6C1', '#98FB98'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initParticles = () => {
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new ParticleClass(canvas.width, canvas.height));
      }
    };

    initParticles();

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100 && ctx) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = isDarkMode ? '#4ECDC4' : '#FF9A58';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100 && distance > 0) {
          const force = (100 - distance) / 100;
          particle.vx -= (dx / distance) * force * 0.1;
          particle.vy -= (dy / distance) * force * 0.1;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;