"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMousePosition } from "./mouse-position-context";

type PlanetType = "earth" | "mars" | "saturn" | "jupiter";

interface FloatingPlanetProps {
  type: PlanetType;
  size: number;
  position: { x: string; y: string };
  parallaxFactor: number;
}

export function FloatingPlanet({
  type,
  size,
  position,
  parallaxFactor,
}: FloatingPlanetProps) {
  const planetRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const planet = planetRef.current;
    if (!planet) return;

    // Set initial position
    planet.style.left = position.x;
    planet.style.top = position.y;

    // Animation properties
    let rotation = 0;
    let floatOffset = 0;
    let lastTime = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Extremely slow floating animation
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      // Extremely slow rotation
      rotation += deltaTime * 0.0005; // Drastically reduced from 0.003 to 0.0005

      // Very slow, gentle floating effect
      floatOffset = Math.sin(time * 0.00008) * 4; // Drastically reduced frequency and amplitude

      // Smooth mouse tracking
      if (mousePosition.position.x && mousePosition.position.y) {
        // Target mouse position
        lastMouseX = mousePosition.position.x;
        lastMouseY = mousePosition.position.y;
      }

      // Very slow easing toward mouse position
      currentMouseX += (lastMouseX - currentMouseX) * 0.003;
      currentMouseY += (lastMouseY - currentMouseY) * 0.003;

      // Calculate center offset
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate mouse offset from center (normalized)
      const offsetX = (currentMouseX - centerX) / centerX;
      const offsetY = (currentMouseY - centerY) / centerY;

      // Calculate target offsets with minimal movement
      const targetOffsetX = offsetX * 10 * parallaxFactor; // Drastically reduced from 30 to 10
      const targetOffsetY = offsetY * 10 * parallaxFactor; // Drastically reduced from 30 to 10

      // Extremely smooth easing
      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.005; // Reduced from 0.03 to 0.005
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.005; // Reduced from 0.03 to 0.005

      // Apply transform with extremely smooth transitions
      planet.style.transform = `
        translate(${currentOffsetX}px, ${currentOffsetY + floatOffset}px)
        rotate(${rotation}deg)
      `;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [position, parallaxFactor, mousePosition]);

  return (
    <div
      ref={planetRef}
      className="absolute z-0 transition-transform duration-1000 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="relative w-full h-full glow-effect">
        {/* <Image
          src={planetImages[type] || "/placeholder.svg"}
          alt={`${type} planet`}
          fill
          className="object-contain"
          priority
        /> */}
      </div>
    </div>
  );
}
