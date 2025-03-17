"use client";

import { createContext, useContext } from "react";

type MousePositionContextType = {
  position: { x: number; y: number };
  scroll: number;
};

export const MousePosition = createContext<MousePositionContextType>({
  position: { x: 0, y: 0 },
  scroll: 0,
});

export const useMousePosition = () => useContext(MousePosition);
