"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "./mouse-position-context";

export function ParallaxStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    // For extremely smooth transitions
    const currentPositions: { [key: string]: { x: number; y: number } } = {};
    let lastMouseX = 0;
    let lastMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const container = containerRef.current;
    if (!container) return;

    // Create star layers with minimal parallax effects
    const createStarLayer = (
      count: number,
      size: number,
      color: string,
      speed: number
    ) => {
      const layer = document.createElement("div");
      layer.className =
        "absolute top-0 left-0 w-full h-full pointer-events-none";
      layer.style.zIndex = "1";

      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "absolute rounded-full";
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = color;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        star.style.transition = "transform 3s ease-out"; // Added long transition

        // Store original position
        const originalX = Number.parseFloat(star.style.left);
        const originalY = Number.parseFloat(star.style.top);

        // Add data attributes for animation
        star.dataset.originalX = originalX.toString();
        star.dataset.originalY = originalY.toString();
        star.dataset.speed = speed.toString();

        layer.appendChild(star);
      }

      container.appendChild(layer);
      return layer;
    };

    const layers = [
      createStarLayer(50, 1, "rgba(255, 255, 255, 0.8)", 0.003), // Drastically reduced from 0.01
      createStarLayer(30, 2, "rgba(255, 255, 255, 0.9)", 0.005), // Drastically reduced from 0.02
      createStarLayer(20, 3, "rgba(200, 200, 255, 1)", 0.008), // Drastically reduced from 0.03
    ];

    // Update star positions based on mouse movement with extremely smooth transitions
    const updateStarPositions = () => {
      // Smooth mouse tracking
      if (mousePosition.position.x && mousePosition.position.y) {
        // Target mouse position
        lastMouseX = mousePosition.position.x;
        lastMouseY = mousePosition.position.y;
      }

      // Very slow easing toward mouse position
      currentMouseX += (lastMouseX - currentMouseX) * 0.005;
      currentMouseY += (lastMouseY - currentMouseY) * 0.005;

      // Calculate center offset
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate mouse offset from center (normalized)
      const offsetX = (currentMouseX - centerX) / centerX;
      const offsetY = (currentMouseY - centerY) / centerY;

      layers.forEach((layer, layerIndex) => {
        Array.from(layer.children).forEach((star, starIndex) => {
          const htmlStar = star as HTMLElement;
          const speed = Number.parseFloat(htmlStar.dataset.speed || "0");
          const originalX = Number.parseFloat(
            htmlStar.dataset.originalX || "0"
          );
          const originalY = Number.parseFloat(
            htmlStar.dataset.originalY || "0"
          );

          // Calculate target position with minimal movement
          const targetX = originalX + offsetX * 15 * speed; // Reduced from 40 to 15
          const targetY = originalY + offsetY * 15 * speed; // Reduced from 40 to 15

          // Create unique ID for this star
          const starId = `${layerIndex}-${starIndex}`;

          // Initialize current position if not exists
          if (!currentPositions[starId]) {
            currentPositions[starId] = { x: originalX, y: originalY };
          }

          // Extremely smooth transition to target (very slow easing)
          currentPositions[starId].x +=
            (targetX - currentPositions[starId].x) * 0.01; // Reduced from 0.05 to 0.01
          currentPositions[starId].y +=
            (targetY - currentPositions[starId].y) * 0.01; // Reduced from 0.05 to 0.01

          // Apply position
          htmlStar.style.left = `${currentPositions[starId].x}%`;
          htmlStar.style.top = `${currentPositions[starId].y}%`;
        });
      });

      requestAnimationFrame(updateStarPositions);
    };

    // Start the animation loop
    requestAnimationFrame(updateStarPositions);

    return () => {
      layers.forEach((layer) => container.removeChild(layer));
    };
  }, [mousePosition]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
