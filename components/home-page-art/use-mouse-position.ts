"use client";

import { useContext } from "react";
import { MousePosition } from "./mouse-position-context";

export function useMousePosition() {
  return useContext(MousePosition);
}
