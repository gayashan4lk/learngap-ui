"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "./mouse-position-context";

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create stars with extremely slow movement
    const stars: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
    }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
        speed: Math.random() * 0.005, // Drastically reduced from 0.02 to 0.005
      });
    }

    // Create nebulae
    const nebulae: { x: number; y: number; radius: number; color: string }[] =
      [];
    const colors = [
      "rgba(41, 121, 255, 0.15)",
      "rgba(255, 41, 117, 0.08)",
      "rgba(200, 90, 242, 0.1)",
    ];

    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Create extremely slow pulsing effect for nebulae
    let pulsePhases = nebulae.map(() => Math.random() * Math.PI * 2);
    const pulseSpeed = 0.00008; // Extremely slow pulse (reduced from 0.0003)

    // Animation loop
    let animationFrameId: number;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0B0B19");
      gradient.addColorStop(1, "#0F0F2D");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update nebulae pulse phases
      pulsePhases = pulsePhases.map((phase) => {
        return (phase + pulseSpeed) % (Math.PI * 2);
      });

      // Draw nebulae with extremely gentle pulsing
      nebulae.forEach((nebula, i) => {
        // Calculate pulse factor (between 0.95 and 1.05 - very subtle)
        const pulseFactor = 0.95 + 0.1 * Math.sin(pulsePhases[i]);

        const grd = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius * pulseFactor
        );
        grd.addColorStop(0, nebula.color);
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(
          nebula.x,
          nebula.y,
          nebula.radius * pulseFactor,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Smooth mouse tracking
      if (mousePosition.position.x && mousePosition.position.y) {
        // Target mouse position
        lastMouseX = mousePosition.position.x;
        lastMouseY = mousePosition.position.y;
      }

      // Very slow easing toward mouse position
      currentMouseX += (lastMouseX - currentMouseX) * 0.005;
      currentMouseY += (lastMouseY - currentMouseY) * 0.005;

      // Draw stars with extremely slow mouse influence
      stars.forEach((star) => {
        // Move stars based on mouse position with minimal sensitivity
        if (currentMouseX && currentMouseY) {
          const dx = currentMouseX - canvas.width / 2;
          const dy = currentMouseY - canvas.height / 2;
          star.x -= dx * star.speed * 0.0008; // Drastically reduced from 0.004 to 0.0008
          star.y -= dy * star.speed * 0.0008; // Drastically reduced from 0.004 to 0.0008
        }

        // Wrap stars around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
