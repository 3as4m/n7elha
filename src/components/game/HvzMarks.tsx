import { useId } from "react";
import { HVZ } from "@/lib/hvzRender";

// ── Humans vs Zombies team marks ────────────────────────────────────────────
// The two sides. The human is a friendly face in the team's blue hoodie, hood
// up, the way the game dresses its humans; the zombie is a face gone wrong,
// with a bite out of it, an X for an eye and its mouth stitched shut.
// Full color on purpose, so they read from the back of a classroom.

type Props = { size?: number; className?: string };

const INK = HVZ.ink;

export const HumanMark = ({ size = 40, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
    {/* the team's blue hoodie, hood up */}
    <path d="M32 4C48 4 59 16 59 32C59 46 52 55 45 59.5H19C12 55 5 46 5 32C5 16 16 4 32 4Z" fill="#2F6FB8" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M13 22C16 13 23 8.5 31 8" fill="none" stroke="#6FA6E6" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="32" cy="34" r="19.5" fill="#245A99" />
    <circle cx="32" cy="35" r="16.5" fill="#FFE0BD" stroke={INK} strokeWidth="3" />
    {/* face */}
    <circle cx="26.5" cy="33.5" r="2.6" fill={INK} />
    <circle cx="37.5" cy="33.5" r="2.6" fill={INK} />
    <path d="M26.5 40.5Q32 45 37.5 40.5" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <circle cx="23" cy="39" r="2" fill="#F4A6A0" opacity="0.8" />
    <circle cx="41" cy="39" r="2" fill="#F4A6A0" opacity="0.8" />
  </svg>
);

export const ZombieMark = ({ size = 40, className }: Props) => {
  const bite = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <mask id={bite}>
          <rect width="64" height="64" fill="#FFFFFF" />
          <circle cx="54" cy="9" r="7" fill="#000000" />
          <circle cx="60" cy="18" r="6" fill="#000000" />
        </mask>
      </defs>
      <g mask={`url(#${bite})`}>
        <circle cx="32" cy="32" r="29" fill={HVZ.zombie} stroke={INK} strokeWidth="3.5" />
        <ellipse cx="18" cy="46" rx="6" ry="4" fill={HVZ.zombieDeep} opacity="0.55" />
        <ellipse cx="45" cy="50" rx="3.5" ry="2.5" fill={HVZ.zombieDeep} opacity="0.55" />
      </g>
      {/* forehead stitches */}
      <path d="M26 9L33 17M27 14L30 11.5M30 17L33 14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* X eye, and the other one too wide */}
      <path d="M18 25L27 34M27 25L18 34" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="42" cy="29" r="7" fill="#F4F7D9" />
      <circle cx="44" cy="32" r="2.4" fill={INK} />
      {/* mouth sewn shut */}
      <path d="M19 45L45 42" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M24 41.5V47.5M30 41V47M36 40.5V46.5M41.5 40V46" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};
