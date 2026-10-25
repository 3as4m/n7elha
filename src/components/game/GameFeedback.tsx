import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── In-game rewards ─────────────────────────────────────────────────────────
// Every mode shows what an answer earned the same way: the HUD stat that went
// up takes it itself. The chip pops, grows to show "+30" next to its number,
// then folds back. No floating text, no toasts — the number you care about is
// the one that moves.
//
// It watches the value rather than being told about gains, so it works however
// a mode's points arrive (a local update, a realtime row, a server RPC). Only
// rises count: a tank draining or a balance being halved shows nothing.

/** The last rise of `value`, cleared shortly after. `null` while loading. */
export const useRise = (value: number | null | undefined) => {
  const prev = useRef<number | null | undefined>(value);
  const [rise, setRise] = useState<{ k: number; n: number } | null>(null);
  useEffect(() => {
    const before = prev.current;
    prev.current = value;
    if (value == null || before == null || value <= before) return;
    const k = Date.now() + Math.random();
    setRise({ k, n: value - before });
    const t = setTimeout(() => setRise(r => (r?.k === k ? null : r)), 1600);
    return () => clearTimeout(t);
  }, [value]);
  return rise;
};

/**
 * A HUD stat chip that shows its own gains. `children` is the chip's normal
 * content (icon + number); `popStyle` is merged in while it's celebrating.
 */
export const GainChip = ({ value, className, style, popStyle, gainClassName, label, children }: {
  value: number | null | undefined;
  className?: string;
  style?: CSSProperties;
  popStyle?: CSSProperties;
  gainClassName?: string;
  /** How the gain reads; "+30" by default. */
  label?: (n: number) => string;
  children: ReactNode;
}) => {
  const rise = useRise(value);
  return (
    // Keyed by the gain so the pop plays once per gain and never on a re-render.
    <div key={rise?.k ?? "idle"} className={cn(className, rise && "animate-chip-bump")}
      style={rise && popStyle ? { ...style, ...popStyle, transition: "background-color .4s, color .4s" } : { ...style, transition: "background-color .4s, color .4s" }}>
      {children}
      {rise && (
        <span className={cn("animate-chip-gain tabular-nums whitespace-nowrap", gainClassName)}>
          {label ? label(rise.n) : `+${rise.n.toLocaleString()}`}
        </span>
      )}
    </div>
  );
};
