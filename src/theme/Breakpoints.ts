import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { COLOR, COLORNAME } from "./Color";

export const BREAKPOINTNAME = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xxl",
} as const;

export type BreakpointName = keyof typeof BREAKPOINTNAME;

export const BREAKPOINT = {
  [BREAKPOINTNAME.sm]: 320,
  [BREAKPOINTNAME.md]: 768,
  [BREAKPOINTNAME.lg]: 1440,
  [BREAKPOINTNAME.xl]: 1700,
  [BREAKPOINTNAME.xxl]: 2000,
} as const;

export const BreakPointsOverwrite = {
  sm: "768px",
  md: "1000px",
  lg: "1440px",
  xl: "1700px",
  "2xl": "2000px",
} as const;
