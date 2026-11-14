import type { ReactNode } from "react";

/* A section laid on the page as a sheet of cut paper: straight scissor cuts
   that never quite line up, a slight tilt, and the same hard offset shadow as
   the site's buttons. Only the paper tilts; the content stays level. */

const EDGES = [
  "M10 16L260 4L540 14L790 2L992 12L998 210L990 420L996 590L720 598L450 586L190 597L4 588L12 380L2 190Z",
  "M4 8L230 18L500 4L760 16L996 4L988 200L998 400L990 596L760 584L480 598L220 588L8 596L2 410L12 200Z",
];

export const PaperSheet = ({ color, tilt = -1, edge = 0, className = "", children }: {
  color: string; tilt?: number; edge?: number; className?: string; children: ReactNode;
}) => (
  <div className={`relative ${className}`}>
    <svg
      aria-hidden
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
      style={{ transform: `rotate(${tilt}deg)`, filter: "drop-shadow(6px 7px 0 hsl(var(--nb-border)))" }}
    >
      <path d={EDGES[edge % EDGES.length]} fill={color} />
    </svg>
    <div className="relative">{children}</div>
  </div>
);
