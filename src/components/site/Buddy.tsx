import type { CSSProperties } from "react";
import { BUDDY_SHAPES, type BuddyShape } from "./buddyShapes";

/* A cut-paper buddy: one of the traced shapes with a simple face on it, so a
   shape reads as a little character (a student, a player) rather than a
   decoration. The face sits on the shape's roomiest spot and is capped in
   size, so it stays a face on the big round shapes too. */

export type Mood = "smile" | "grin" | "oh" | "wink" | "happy" | "meh";

const INK = "#14282D";

export const Buddy = ({ shape, color, mood = "smile", faceColor = INK, className, style }: {
  shape: BuddyShape; color: string; mood?: Mood; faceColor?: string; className?: string; style?: CSSProperties;
}) => {
  const s = BUDDY_SHAPES[shape];
  const r = Math.min(s.fr * 1.15, 0.62);
  const ex = 0.36 * r, ey = -0.1 * r, sw = 0.075 * r;
  const eye = (x: number, shut: boolean) => mood === "meh"
    ? <path d={`M${x - 0.1 * r} ${ey}H${x + 0.1 * r}`} stroke={faceColor} strokeWidth={sw * 1.2} strokeLinecap="round" />
    : shut
    ? <path d={`M${x - 0.1 * r} ${ey + 0.03 * r}Q${x} ${ey - 0.1 * r} ${x + 0.1 * r} ${ey + 0.03 * r}`} stroke={faceColor} strokeWidth={sw} strokeLinecap="round" fill="none" />
    : <ellipse cx={x} cy={ey} rx={0.085 * r} ry={0.12 * r} fill={faceColor} />;
  const mouth =
    mood === "grin" ? <path d={`M${-0.24 * r} ${0.14 * r}Q0 ${0.48 * r} ${0.24 * r} ${0.14 * r}Z`} fill={faceColor} />
    : mood === "meh" ? <path d={`M${-0.16 * r} ${0.24 * r}H${0.16 * r}`} stroke={faceColor} strokeWidth={sw} strokeLinecap="round" />
    : mood === "oh" ? <ellipse cx="0" cy={0.24 * r} rx={0.09 * r} ry={0.11 * r} fill={faceColor} />
    : <path d={`M${-0.2 * r} ${0.16 * r}Q0 ${0.36 * r} ${0.2 * r} ${0.16 * r}`} stroke={faceColor} strokeWidth={sw} strokeLinecap="round" fill="none" />;
  return (
    <svg aria-hidden viewBox="-1.05 -1.05 2.1 2.1" className={className} style={style}>
      <path d={s.d} fill={color} />
      <g transform={`translate(${s.fx} ${s.fy})`}>
        {eye(-ex, mood === "happy")}
        {eye(ex, mood === "happy" || mood === "wink")}
        {mouth}
      </g>
    </svg>
  );
};

/* The site's pattern: the same shapes, faceless, a shade darker than the
   page, scattered down both page edges so open sections don't feel empty
   while the middle stays clear for text. Placed by hand, not at random, so
   it reads the same on every load. x is from the left edge in %, y from the
   top of the section in %, s the size in px. */
const FIELD: { n: BuddyShape; x: number; y: number; s: number; r: number }[] = [
  { n: "splash", x: 3, y: 4, s: 104, r: 14 },
  { n: "maple", x: 10, y: 15, s: 52, r: -10 },
  { n: "sprout", x: 2, y: 26, s: 86, r: -18 },
  { n: "spool", x: 9, y: 37, s: 60, r: 20 },
  { n: "bush", x: 3, y: 48, s: 98, r: 6 },
  { n: "tulips", x: 10, y: 59, s: 50, r: -14 },
  { n: "buddy", x: 2, y: 70, s: 90, r: 10 },
  { n: "pinwheel", x: 9, y: 81, s: 58, r: -20 },
  { n: "coral", x: 3, y: 92, s: 96, r: 8 },
  { n: "bows", x: 97, y: 2, s: 92, r: -12 },
  { n: "heart", x: 90, y: 12, s: 58, r: 16 },
  { n: "cross", x: 98, y: 23, s: 100, r: 8 },
  { n: "hill", x: 91, y: 34, s: 54, r: -20 },
  { n: "pebble", x: 97, y: 45, s: 88, r: 0 },
  { n: "stack", x: 90, y: 56, s: 62, r: 12 },
  { n: "blob", x: 98, y: 67, s: 96, r: -8 },
  { n: "splash", x: 91, y: 78, s: 56, r: 18 },
  { n: "maple", x: 97, y: 89, s: 90, r: -4 },
  { n: "sprout", x: 90, y: 98, s: 60, r: 10 },
];

export const ShapeField = ({ color = "#E8D6AE", className = "" }: { color?: string; className?: string }) => (
  <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
    {FIELD.map((f, i) => (
      <svg
        key={i}
        viewBox="-1.05 -1.05 2.1 2.1"
        className="absolute"
        style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.s, height: f.s, transform: `translate(-50%, -50%) rotate(${f.r}deg)` }}
      >
        <path d={BUDDY_SHAPES[f.n].d} fill={color} />
      </svg>
    ))}
  </div>
);
