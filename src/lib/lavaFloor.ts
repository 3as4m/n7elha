// ── Lava Floor — rules ───────────────────────────────────────────────────────
// Every correct answer lays one brick on your tower. The lava rises under all
// the towers; when it passes a tower's top, everyone standing on it is dunked
// and floats in it until they answer their way back out.
//
// The teacher picks how towers are shared (settings.lfMode):
//   class — one tower for the whole class
//   teams — one per team (settings.lfTeams, 2 to 4)
//   solo  — one per student
// A tower is `width` bricks wide, its member count at the start, and a course
// only completes once that many bricks are in. In class mode that means a
// 30-wide wall rises at about the pace of one student's pillar. In team mode a
// right answer lays a whole course at once (`bricksPerAnswer`), so the team
// visibly steps up on every answer; the lava paces itself to the towers'
// growth, so it keeps up either way.
//
// Every tower has LIVES. Falling in costs one, and the members answer their way
// back out; a tower that falls in with none left is out for the rest of the
// game and stays in the lava. Its members keep getting questions, and every
// right answer they give heats the lava for everyone still standing
// (HEAT_PER_ANSWER), so nobody sits idle. The game ends early once one tower is
// left standing, or when every tower is out.
//
// The projector owns the lava (lava_state) and referees dunks and rescues
// (lava_floor_referee); phones only ever add their own answers
// (lava_floor_answer). See the 20261004120000 migration.

export type LfMode = "class" | "teams" | "solo";

export const LF_MODES: { id: LfMode; nameAr: string; nameEn: string; descAr: string; descEn: string }[] = [
  {
    id: "class", nameAr: "الفصل كله", nameEn: "Whole class",
    descAr: "منصة واحدة يبنيها الجميع معًا. إن وصلتها الحمم فالكل يجاوب ليرفعها.",
    descEn: "One platform everyone builds together. If the lava reaches it, everyone answers to lift it out.",
  },
  {
    id: "teams", nameAr: "فرق", nameEn: "Teams",
    descAr: "كل فريق يبني برجه. أعلى برج عند انتهاء الوقت يفوز.",
    descEn: "Each team builds its own tower. Tallest tower when time runs out wins.",
  },
  {
    id: "solo", nameAr: "فردي", nameEn: "Solo",
    descAr: "كل طالب يبني برجه. من تلحقه الحمم يجاوب ليخرج منها.",
    descEn: "Every student builds their own tower. Whoever the lava catches answers to climb out.",
  },
];

export const TEAM_STYLE = [
  { color: "#8FC44A", nameAr: "الأخضر", nameEn: "Green" },
  { color: "#7FB3C4", nameAr: "الأزرق", nameEn: "Blue" },
  { color: "#F08A8A", nameAr: "الأحمر", nameEn: "Red" },
  { color: "#F5C64E", nameAr: "الأصفر", nameEn: "Yellow" },
];
export const CLASS_COLOR = "#8FC44A";

export type Tower = {
  id: string;
  idx: number;
  name: string | null;
  width: number;
  bricks: number;
  base: number;
  dunked: boolean;
  climb: number;
  dunks: number;
};

/** Falls a tower can take. The fall that uses the last one puts it out. */
export const LIVES = 3;
export const livesLeft = (t: Pick<Tower, "dunks">) => Math.max(0, LIVES - t.dunks);
/** In the lava with no lives left: never rescued, out of the game. */
export const isOut = (t: Pick<Tower, "dunks" | "dunked">) => t.dunked && t.dunks >= LIVES;

/** Meters a right answer from a tower that is out pushes the lava up. */
export const HEAT_PER_ANSWER = 0.25;

/** How far the lava may trail the lowest tower still standing before it is pulled up. */
export const LAG_MAX = 6;
/** The steady speed, plus a pull when the lava has fallen far behind the race. */
export const catchUpRate = (rate: number, lava: number, lowestTop: number | null) =>
  lowestTop == null || lowestTop - lava <= LAG_MAX ? rate : rate + (lowestTop - lava - LAG_MAX) * 0.2;

/** Final order: towers still standing first, then the higher builders, then fewer falls. */
export const rankTowers = <T extends Pick<Tower, "bricks" | "width" | "dunks" | "dunked">>(towers: T[]) =>
  [...towers].sort((a, b) => Number(isOut(a)) - Number(isOut(b)) || builtHeight(b) - builtHeight(a) || a.dunks - b.dunks);

/** Whether the game is decided before the clock: one tower left, or the class wall out. */
export const decidedEarly = (towers: Pick<Tower, "dunks" | "dunked">[]) => {
  if (!towers.length) return false;
  const standing = towers.filter(t => !isOut(t)).length;
  return towers.length === 1 ? standing === 0 : standing <= 1;
};

export type LavaState = { level: number; at: string; rate: number; erupt_at: string | null };

/** Bricks one right answer lays: a whole course in team mode, one brick otherwise. */
export const bricksPerAnswer = (mode: LfMode, width: number) => (mode === "teams" ? Math.max(1, width) : 1);

/** Completed courses above the floor, in meters. What the lava is compared against. */
export const towerHeight = (t: Pick<Tower, "base" | "bricks" | "width">) =>
  t.base + Math.floor(t.bricks / Math.max(1, t.width));

/**
 * Courses the tower's own members have built. This, not towerHeight, decides
 * who wins: a rescue lifts a tower back above the lava (base jumps), and that
 * lift must never beat a team that simply stayed out of it. Answers spent
 * climbing out lay no bricks, so falling in costs exactly those answers.
 */
export const builtHeight = (t: Pick<Tower, "bricks" | "width">) => Math.floor(t.bricks / Math.max(1, t.width));

/** Bricks laid in the course that isn't finished yet. */
export const partialCourse = (t: Pick<Tower, "bricks" | "width">) => t.bricks % Math.max(1, t.width);

/** Correct answers a dunked tower needs to climb out: two for one student, one each for a group. */
export const climbNeed = (width: number) => (width <= 1 ? 2 : width);

export const LAVA_START = -1.5;
export const ERUPT_EVERY = 45;   // seconds between eruptions
export const ERUPT_RISE = 2;     // meters an eruption adds
export const ERUPT_SECS = 2.5;   // how long the surge takes
export const MIN_RATE = 0.03;    // m/s, so the lava never stands still
export const MAX_RATE = 3;      // team towers grow a course per answer, so the cap sits high
export const PACE = 0.4;         // the lava rises at this share of the typical tower's growth
// With the eruptions on top (ERUPT_RISE every ERUPT_EVERY), the lava keeps up
// with a tower answering correctly about every 14 seconds per student: a
// normal class stays just ahead, and the eruptions catch whoever lags.
// Team towers climb a whole course per answer, so in team mode the lava runs
// closer behind them and its eruptions grow with the team's size; with the
// class pace a team would simply out-build it.
export const PACE_TEAMS = 0.9;
export const PACE_WINDOW = 60;   // seconds of growth the pace looks at

/** Meters one eruption adds: more for team towers, which grow faster. */
export const eruptRise = (mode: LfMode, widths: number[]) =>
  mode === "teams" ? ERUPT_RISE * Math.max(1, Math.round(median(widths) / 2)) : ERUPT_RISE;

/** Lava level now, from the last snapshot the projector wrote. */
export const lavaNow = (s: Pick<LavaState, "level" | "at" | "rate">, now = Date.now()) =>
  s.level + s.rate * Math.max(0, (now - new Date(s.at).getTime()) / 1000);

const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const a = [...xs].sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

/**
 * Steady lava speed from how fast the towers have actually been growing
 * (m/s each over the last PACE_WINDOW). Pegged to the typical tower, not the
 * best, so a slow class and a fast class both get a close race; eruptions on
 * top are what catch the ones falling behind.
 */
export const paceRate = (growths: number[], mode: LfMode = "class") =>
  Math.min(MAX_RATE, Math.max(MIN_RATE, median(growths) * (mode === "teams" ? PACE_TEAMS : PACE)));

/** Tower color for the board: the team's, the class's, or the one student's avatar color. */
export const towerColor = (mode: LfMode, t: Pick<Tower, "idx">, soloColor?: string) =>
  mode === "teams" ? TEAM_STYLE[t.idx % TEAM_STYLE.length].color : mode === "class" ? CLASS_COLOR : soloColor ?? CLASS_COLOR;

export const towerName = (mode: LfMode, t: Pick<Tower, "idx" | "name">, ar: boolean) =>
  mode === "teams"
    ? (ar ? `فريق ${TEAM_STYLE[t.idx % TEAM_STYLE.length].nameAr}` : `${TEAM_STYLE[t.idx % TEAM_STYLE.length].nameEn} team`)
    : mode === "class" ? (ar ? "الفصل" : "The class") : t.name ?? "";
