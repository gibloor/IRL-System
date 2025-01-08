'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;                  // Current X position
  y: number;                  // Current Y position
  size: number;               // Particle size
  velocity: {                 // Particle velocity
    x: number;               // X velocity component
    y: number;               // Y velocity component
  };
  alpha: number;              // Particle opacity
  startDelay: number;         // Delay before particle starts moving
  hasStarted: boolean;        // Whether particle has started moving
  originalX: number;          // Initial X position (for text masking)
  originalY: number;          // Initial Y position (for text masking)
  update: () => void;         // Update particle state
  draw: (ctx: CanvasRenderingContext2D) => void;  // Draw particle
}

interface TextParticlesProps {
  text?: string;              // Text to display
  fontSize?: number;          // Font size
  color?: string;             // Text color
  show: boolean;              // Whether to show text or particles
}

/**
 * Creates a new particle with specified parameters
 * Adjust velocity and alpha decay here to control particle movement speed and lifetime
 */
const createParticle = (x: number, y: number, startDelay: number): Particle => ({
  x,
  y,
  originalX: x,
  originalY: y,
  size: Math.random() * 2 + 1,  // Random size between 1-3
  velocity: {
    x: -Math.random() * 0.8 - 0.4,  // Increased speed (was 0.4)
    y: (Math.random() - 0.5) * 0.4   // Increased vertical movement (was 0.2)
  },
  alpha: 1,
  startDelay,
  hasStarted: false,

  update() {
    if (!this.hasStarted) {
      // Faster start delay decrease (was 0.2)
      if (this.startDelay > 0) {
        this.startDelay -= 0.4;
        return;
      }
      this.hasStarted = true;
    }

    // Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    // Faster fade out (was 0.0005)
    this.alpha -= 0.02;

    // Occasionally change vertical direction
    if (Math.random() < 0.01) {
      this.velocity.y = (Math.random() - 0.5) * 0.02;
    }
  },

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.hasStarted) return;
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
});

const TextParticles = ({ 
  text = 'Hello', 
  fontSize = 60, 
  color = 'white',
  show = true
}: TextParticlesProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const permanentMaskRef = useRef<HTMLCanvasElement | null>(null);

  const createTextCanvas = () => {
    const canvas = document.createElement('canvas');
    const mainCanvas = canvasRef.current;

    if (!mainCanvas) return canvas;
    canvas.width = mainCanvas.width;
    canvas.height = mainCanvas.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
    textCanvasRef.current = canvas;
    return canvas;
  };

  const drawText = (ctx: CanvasRenderingContext2D): void => {
    if (!textCanvasRef.current) {
      createTextCanvas();
    }
    if (textCanvasRef.current) {
      ctx.drawImage(textCanvasRef.current, 0, 0);
    }
  };

  const initParticles = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    particlesRef.current = [];

    const textCanvas = createTextCanvas();
    const textCtx = textCanvas.getContext('2d');
    if (!textCtx) return;

    // Create initial permanent mask
    permanentMaskRef.current = document.createElement('canvas');
    permanentMaskRef.current.width = canvas.width;
    permanentMaskRef.current.height = canvas.height;
    const maskCtx = permanentMaskRef.current.getContext('2d');
    if (maskCtx) {
      maskCtx.drawImage(textCanvas, 0, 0);
    }

    // Get text pixel data
    const imageData = textCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let maxX = 0;
    let minX = canvas.width;

    // Find text boundaries for delay calculation
    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 128) {
          maxX = Math.max(maxX, x);
          minX = Math.min(minX, x);
        }
      }
    }

    // Create particles for text pixels
    // Adjust step (4) to control particle density
    const step = 4;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 128) {
          // Delay based on horizontal position (left to right effect)
          const delay = Math.floor(((x - minX) / (maxX - minX)) * 50); // Reduced delay (was 200)
          particlesRef.current.push(createParticle(x, y, delay));
        }
      }
    }
  };

  const animate = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let anyVisible = false;

    if (permanentMaskRef.current) {
      // Draw current state of the text (with accumulated holes)
      ctx.drawImage(permanentMaskRef.current, 0, 0);

      // Update and create new holes
      const maskCtx = permanentMaskRef.current.getContext('2d');
      if (maskCtx) {
        maskCtx.globalCompositeOperation = 'destination-out';

        for (const particle of particlesRef.current) {
          if (particle.hasStarted) {
            const gradient = maskCtx.createRadialGradient(
              particle.originalX, particle.originalY, 0,
              particle.originalX, particle.originalY, 12
            );
            gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            maskCtx.fillStyle = gradient;
            maskCtx.beginPath();
            maskCtx.arc(particle.originalX, particle.originalY, 12, 0, Math.PI * 2);
            maskCtx.fill();
          }
        }

        // Reset composite operation
        maskCtx.globalCompositeOperation = 'source-over';
      }

      // Draw and update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        particlesRef.current[i].update();
        if (particlesRef.current[i].alpha <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          particlesRef.current[i].draw(ctx);
          anyVisible = true;
        }
      }

      // Stop animation when all particles are gone
      if (!anyVisible) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Effect for handling show/hide transitions
  useEffect(() => {
    if (!show) {
      initParticles();
      animate();
    }
  }, [show]);

  // Effect for handling window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = (): void => {
      const container = canvas.parentElement;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
  
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (show) {
          // If show is true, just draw the text
          drawText(ctx);
        } else {
          // Otherwise initialize particles
          initParticles();
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [show]);

  // Effect for initial text rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawText(ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default TextParticles;