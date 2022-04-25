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
  [BREAKPOINTNAME.lg]: 960,
  [BREAKPOINTNAME.xl]: 1800,
  [BREAKPOINTNAME.xxl]: 1536,
} as const;
