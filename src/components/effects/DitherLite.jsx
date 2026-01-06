import { useRef, useEffect, useCallback } from 'react';
import './Dither.css';

/**
 * Lightweight Canvas-based dither effect
 * Replaces the heavy Three.js version (~500KB savings)
 */
export default function DitherLite({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Bayer 8x8 dithering matrix
  const bayerMatrix = [
    [0, 48, 12, 60, 3, 51, 15, 63],
    [32, 16, 44, 28, 35, 19, 47, 31],
    [8, 56, 4, 52, 11, 59, 7, 55],
    [40, 24, 36, 20, 43, 27, 39, 23],
    [2, 50, 14, 62, 1, 49, 13, 61],
    [34, 18, 46, 30, 33, 17, 45, 29],
    [10, 58, 6, 54, 9, 57, 5, 53],
    [42, 26, 38, 22, 41, 25, 37, 21],
  ];

  // Perlin-like noise function
  const noise = useCallback((x, y) => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }, []);

  // Fractal brownian motion
  const fbm = useCallback((x, y, time) => {
    let value = 0;
    let amplitude = 1;
    let frequency = waveFrequency * 0.1;

    for (let i = 0; i < 4; i++) {
      const nx = x * frequency + time * waveSpeed;
      const ny = y * frequency + time * waveSpeed * 0.5;
      value += amplitude * (noise(nx, ny) - 0.5);
      amplitude *= waveAmplitude;
      frequency *= 2;
    }

    return value;
  }, [noise, waveSpeed, waveFrequency, waveAmplitude]);

  // Dither function
  const dither = useCallback((value, x, y) => {
    const threshold = bayerMatrix[y % 8][x % 8] / 64 - 0.25;
    const step = 1 / (colorNum - 1);
    const adjusted = value + threshold * step;
    const biased = Math.max(0, Math.min(1, adjusted - 0.2));
    return Math.floor(biased * (colorNum - 1) + 0.5) / (colorNum - 1);
  }, [colorNum]);

  const draw = useCallback((ctx, width, height, time) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const aspectRatio = width / height;
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    for (let py = 0; py < height; py += pixelSize) {
      for (let px = 0; px < width; px += pixelSize) {
        // Normalized coordinates
        let uv_x = (px / width - 0.5) * aspectRatio;
        let uv_y = py / height - 0.5;

        // Calculate wave pattern
        let f = fbm(uv_x, uv_y, time);

        // Mouse interaction
        if (enableMouseInteraction && mouseX !== 0 && mouseY !== 0) {
          const mx = (mouseX / width - 0.5) * aspectRatio;
          const my = mouseY / height - 0.5;
          const dist = Math.sqrt((uv_x - mx) ** 2 + (uv_y - my) ** 2);
          const effect = 1 - Math.min(1, dist / mouseRadius);
          f -= 0.5 * effect * effect;
        }

        // Map to color
        const intensity = Math.max(0, Math.min(1, f + 0.5));

        // Dither the color
        const ditheredR = dither(intensity * waveColor[0], px, py);
        const ditheredG = dither(intensity * waveColor[1], px, py);
        const ditheredB = dither(intensity * waveColor[2], px, py);

        // Fill pixel block
        for (let dy = 0; dy < pixelSize && py + dy < height; dy++) {
          for (let dx = 0; dx < pixelSize && px + dx < width; dx++) {
            const idx = ((py + dy) * width + (px + dx)) * 4;
            data[idx] = Math.floor(ditheredR * 255);
            data[idx + 1] = Math.floor(ditheredG * 255);
            data[idx + 2] = Math.floor(ditheredB * 255);
            data[idx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [fbm, dither, waveColor, pixelSize, enableMouseInteraction, mouseRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Use lower resolution for better performance
    const scale = 0.25; // Render at 25% resolution
    let width = Math.floor(window.innerWidth * scale);
    let height = Math.floor(window.innerHeight * scale);

    const resize = () => {
      width = Math.floor(window.innerWidth * scale);
      height = Math.floor(window.innerHeight * scale);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX * scale,
        y: e.clientY * scale,
      };
    };

    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const animate = () => {
      if (!disableAnimation) {
        timeRef.current += 0.016; // ~60fps
      }
      draw(ctx, width, height, timeRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw, disableAnimation, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className="dither-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
      }}
    />
  );
}
