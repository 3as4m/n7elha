import { useEffect, useRef, useState } from "react";
import { Layers } from "lucide-react";
import { GainChip } from "@/components/game/GameFeedback";

// ── Lava Floor — phone pieces ────────────────────────────────────────────────
// The phone only asks questions (the towers are on the projector), but it
// should still feel like the same game: the lava glows along the bottom of the
// screen, the answers are the same stone bricks the towers are built from, and
// a wrong answer floods the screen with lava instead of a plain red card.

export const LAVA = {
  bg: "#160C22", slab: "#24122B", slabLine: "#4A2A50", text: "#F5EBD2", dim: "rgba(245,235,210,0.55)",
  stone: "#E6D4AF", stoneShade: "#A08862", stoneLight: "#F5EBD2", ink: "#2A1622",
  lime: "#C6F04A", limeShade: "#7FA023",
};

const font = { fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif" };

/** A strip of molten wave, `height` px tall, sliding sideways. Two copies wide so the loop never seams. */
const LavaWave = ({ height, top, color, speed, phase = 0 }: { height: number; top: number; color: string; speed: number; phase?: number }) => (
  <div className="absolute inset-x-0 overflow-hidden" style={{ top, height }}>
    <svg viewBox="0 0 800 40" preserveAspectRatio="none" className="lf-wave absolute top-0 left-0 h-full w-[200%]"
      style={{ animation: `lf-wave ${speed}s linear infinite`, animationDelay: `${-phase}s` }}>
      <path fill={color} d="M0 22 C 50 10 100 10 150 22 S 250 34 300 22 S 400 10 450 22 S 550 34 600 22 S 700 10 750 22 S 800 26 800 22 V40 H0 Z" />
    </svg>
  </div>
);

/** The page behind the question: night, and the lava glowing up from the bottom. */
export const LavaBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: LAVA.bg }}>
    <div className="absolute inset-x-0 bottom-0 h-[45%]" style={{ background: "linear-gradient(to top, rgba(255,110,40,0.28), rgba(220,60,40,0.08) 55%, transparent)" }} />
    <div className="absolute inset-x-0 bottom-0 h-[64px]">
      <LavaWave height={26} top={0} color="#B72A1E" speed={9} phase={3} />
      <LavaWave height={26} top={8} color="#F2561C" speed={6} />
      <div className="absolute inset-x-0 top-[30px] bottom-0" style={{ background: "linear-gradient(#F2561C, #C9261B 60%, #8E1518)" }} />
    </div>
    {[8, 22, 37, 55, 71, 86].map((left, i) => (
      <span key={left} className="absolute rounded-full"
        style={{
          left: `${left}%`, bottom: 44, width: i % 2 ? 3 : 4, height: i % 2 ? 3 : 4,
          background: i % 2 ? "#FFD04A" : "#FF9A3C", boxShadow: "0 0 6px #FF7A1F",
          animation: `ember-float ${2 + (i % 3) * 0.6}s ease-out ${i * 0.45}s infinite`,
        }} />
    ))}
  </div>
);

type Q = { text: string; options: string[]; correct_index: number; image_url?: string };

/**
 * The question as big plain text over the lava, and the four answers as stone
 * bricks. The brick you pick for a right answer turns white and lifts, and the
 * bricks-laid count at the top takes the "+1".
 */
export const LavaQuestionView = ({ q, picked, correct, onAnswer, timerFrac, ar, bricks, note }: {
  q: Q; picked: number | null; correct: boolean; onAnswer: (i: number) => void; timerFrac?: number | null; ar: boolean;
  /** Bricks this player has laid; omitted, the count isn't shown. */
  bricks?: number | null;
  /** A line at the top, e.g. why the answers now heat the lava. */
  note?: string;
}) => (
  <div className="relative z-[1] flex-1 min-h-0 flex flex-col gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(76px+env(safe-area-inset-bottom))] overflow-y-auto" style={font}>
    {note && (
      <div className="rounded-full px-4 py-2 text-center text-sm font-bold" style={{ background: "#FF5A3C", color: "#FFFFFF" }}>{note}</div>
    )}
    {bricks !== undefined && !note && (
      <div className="flex justify-end">
        <GainChip value={bricks} className="flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[15px] font-extrabold tabular-nums overflow-hidden"
          style={{ background: LAVA.slab, color: LAVA.text, border: `2px solid ${LAVA.slabLine}` }}
          popStyle={{ background: "#FFFFFF", color: LAVA.ink, borderColor: "#FFFFFF" }}>
          <Layers className="h-4 w-4" />
          <span>{bricks ?? 0}</span>
          <span className="text-xs font-bold opacity-70">{ar ? "مكعب" : "bricks"}</span>
        </GainChip>
      </div>
    )}
    {/* the question, plain on the dark, no box */}
    <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-2">
      {q.image_url && <img src={q.image_url} alt="" className="max-h-[24vh] w-auto object-contain mb-4 rounded-xl" />}
      <p className="max-w-md text-[25px] font-extrabold leading-[1.35]" style={{ color: LAVA.text }} dir="auto">{q.text}</p>
      {timerFrac != null && (
        <div className="mt-5 h-[3px] w-40 rounded-full overflow-hidden" style={{ background: "rgba(245,235,210,0.15)" }}>
          <div className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${Math.max(0, timerFrac) * 100}%`, background: "#FF9A3C" }} />
        </div>
      )}
    </div>

    {/* the answers stack up from the lava like the towers do */}
    <div className="grid grid-cols-2 gap-3">
      {q.options.map((opt, i) => {
        const won = correct && picked === i;
        const faded = picked !== null && !won;
        return (
          <button key={i} type="button" disabled={picked !== null} onClick={() => onAnswer(i)} dir="auto"
            className="relative min-h-[104px] rounded-[14px] px-3 pt-3 pb-4 text-[19px] font-extrabold leading-snug transition-all duration-150 active:translate-y-[3px] active:[box-shadow:0_2px_0_var(--sh)]"
            style={{
              background: won ? "#FFFFFF" : LAVA.stone,
              color: LAVA.ink,
              ["--sh" as string]: won ? "#CDBF9F" : LAVA.stoneShade,
              boxShadow: `inset 0 3px 0 ${won ? "#FFFFFF" : LAVA.stoneLight}, 0 5px 0 ${won ? "#CDBF9F" : LAVA.stoneShade}, 0 7px 0 #0D0612`,
              transform: won ? "translateY(-4px)" : undefined,
              opacity: faded ? 0.35 : 1,
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

/**
 * Wrong answer: the lava floods up over the screen and shows the right answer
 * on a brick, then drains away on its own. Taps in the first moment are
 * ignored so the tap that picked the answer can't skip it.
 */
export const LavaWrongScreen = ({ ar, answer, timedOut, onDone, holdMs = 2200 }: {
  ar: boolean; answer: string; timedOut?: boolean; onDone: () => void; holdMs?: number;
}) => {
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);
  const openedAt = useRef(Date.now());
  const leave = () => {
    if (done.current || Date.now() - openedAt.current < 700) return;
    done.current = true;
    setLeaving(true);
    setTimeout(onDone, 380);
  };
  useEffect(() => {
    if (!holdMs) return;
    const t = setTimeout(() => { openedAt.current = 0; leave(); }, holdMs);
    return () => clearTimeout(t);
  }, [holdMs]);

  return (
    <button type="button" onClick={leave} dir={ar ? "rtl" : "ltr"}
      className="fixed inset-0 z-[15] overflow-hidden text-center transition-[transform] duration-[380ms] ease-in"
      style={{ ...font, transform: leaving ? "translateY(100%)" : "none" }}>
      <div className="lf-flood absolute inset-0" style={{ animation: "lf-flood 0.38s cubic-bezier(0.2,0.8,0.3,1) both" }}>
        <div className="absolute inset-x-0 top-[22px] bottom-0 overflow-hidden"
          style={{ background: "linear-gradient(#F2561C 0%, #D9361C 25%, #B4221B 60%, #6E0E16 100%)" }}>
          {/* cooling crust drifting on the surface, and hot veins between */}
          {[[12, 18, 120, 0.35], [68, 30, 150, 0.3], [30, 52, 170, 0.28], [80, 64, 110, 0.3], [18, 80, 140, 0.32]].map(([x, y, w, o], k) => (
            <span key={k} className="absolute rounded-[50%]"
              style={{ left: `${x}%`, top: `${y}%`, width: w, height: w * 0.16, background: "#5C0D14", opacity: o, transform: `translateX(-50%) rotate(${k % 2 ? -6 : 5}deg)` }} />
          ))}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
            {[24, 46, 70].map(y => (
              <path key={y} d={`M0 ${y} C 20 ${y - 4} 35 ${y + 4} 55 ${y} S 85 ${y - 3} 100 ${y + 1}`} fill="none" stroke="#FFC85A" strokeOpacity="0.35" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>
        <div className="absolute inset-x-0 top-0 h-[44px]">
          <LavaWave height={30} top={0} color="#FFB347" speed={5} />
          <LavaWave height={32} top={8} color="#F2561C" speed={7} phase={2} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6">
          <h2 className="text-[clamp(34px,11vw,52px)] font-black text-white leading-none" style={{ textShadow: "0 4px 0 #6E0E16" }}>
            {timedOut ? (ar ? "انتهى الوقت" : "Time's up") : (ar ? "إجابة خاطئة" : "Wrong")}
          </h2>
          <div>
            <div className="text-sm font-bold text-white/80 mb-2.5">{ar ? "الإجابة الصحيحة" : "The right answer"}</div>
            <div className="inline-block max-w-[85vw] rounded-[14px] px-6 pt-3 pb-4 text-xl font-extrabold leading-snug break-words" dir="auto"
              style={{ background: LAVA.stone, color: LAVA.ink, boxShadow: `inset 0 3px 0 ${LAVA.stoneLight}, 0 5px 0 ${LAVA.stoneShade}, 0 8px 0 #4A0A10` }}>
              {answer}
            </div>
          </div>
          <div className="text-sm font-semibold text-white/75">{ar ? "لا مكعب هذه المرة" : "No brick this time"}</div>
        </div>
      </div>
    </button>
  );
};
