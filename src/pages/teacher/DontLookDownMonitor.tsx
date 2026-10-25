import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Square, Maximize, Flag, Crown } from "lucide-react";
import { buildClimb, toMetres, type Climb } from "@/lib/dontLookDown";
import { Avatar } from "@/components/Avatar";
import { THEMES } from "@/lib/dldLevel";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { TEAL } from "@/components/teacher/DashboardAccents";

// ── Don't Look Down, projector ──────────────────────────────────────────────
// No game view up here: the climbing happens on the phones. The board is the
// race — the whole climb as one tall track, its bands in their own sky colors,
// every climber pinned at the best height they've reached — and the ranking
// beside it.

/** `demo` fills the board with made-up climbers for the dev preview; nothing is read or written. */
interface Props { session: any; sessionId: string; demo?: { students: any[] } }

const DontLookDownMonitor = ({ session, sessionId, demo }: Props) => {
  const nav = useNavigate();
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const { i18n } = useTranslation();
  const ar = (session?.settings?.lang ?? i18n.language) === "ar";
  const [students, setStudents] = useState<any[]>(demo?.students ?? []);
  const [now, setNow] = useState(Date.now());
  const [ending, setEnding] = useState(false);

  const minutes   = session?.settings?.minutes ?? 5;
  const startedAt = session?.started_at ? new Date(session.started_at).getTime() : 0;
  const elapsed   = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const left      = Math.max(0, minutes * 60 - elapsed);
  const mm        = String(Math.floor(left / 60)).padStart(2, "0");
  const ss        = String(left % 60).padStart(2, "0");
  // Same climb the students are on — it is built from the session's length.
  const climb = useMemo(() => buildClimb(session?.settings?.minutes ?? 5), [session?.settings?.minutes]);

  useEffect(() => {
    if (!sessionId || demo) return;
    const refresh = async () => {
      const { data } = await supabase.from("game_students").select("*")
        .eq("session_id", sessionId).order("height_reached", { ascending: false });
      setStudents(data ?? []);
    };
    refresh();
    const ch = supabase.channel(`dld-${sessionId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "game_sessions", filter: `id=eq.${sessionId}` }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "game_students", filter: `session_id=eq.${sessionId}` }, refresh)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [sessionId, demo]);

  const endNow = async () => {
    if (!session || !(await confirm(ar ? "إنهاء اللعبة الآن؟" : "End the game now?"))) return;
    await supabase.from("game_sessions").update({
      status: "finished", ended_at: new Date().toISOString(),
    }).eq("id", sessionId);
    nav(`/app/games/${session.id}/results`, { state: { justEnded: true } });
  };

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(tick);
  }, []);

  // Without this the climb ran forever: this mode had no clock at all.
  useEffect(() => {
    if (!session || session.status !== "running" || ending || demo) return;
    if (left > 0) return;
    setEnding(true);
    supabase.from("game_sessions").update({
      status: "finished", ended_at: new Date().toISOString(),
    }).eq("id", sessionId).then(
      () => nav(`/app/games/${sessionId}/results`, { replace: true, state: { justEnded: true } }),
      () => nav(`/app/games/${sessionId}/results`, { replace: true, state: { justEnded: true } }),
    );
  }, [left, session, ending, sessionId, nav, demo]);

  useEffect(() => {
    if (session?.status === "finished") nav(`/app/games/${session.id}/results`, { replace: true, state: { justEnded: true } });
  }, [session?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  const goFullscreen = () => {
    const el = document.documentElement as any;
    (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  const ranked = [...students].sort((a, b) => (b.height_reached ?? 0) - (a.height_reached ?? 0));
  const summitM = toMetres(climb.summitY);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{
      background: CREAM, color: INK,
      fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif",
    }}>
      {ConfirmDialog}
      <div className="h-full flex flex-col px-6 pt-4 pb-5 gap-4">
        {/* Top: code, clock, controls. */}
        <div dir="ltr" className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 shrink-0">
          <div className="flex items-baseline gap-5 text-sm font-bold" style={{ color: MUTED }}>
            <span className="flex items-baseline gap-2">
              {ar ? "الرمز" : "CODE"}
              <span className="text-2xl font-black tracking-[0.2em]" style={{ color: INK }}>{session?.code}</span>
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-xl font-black tabular-nums" style={{ color: INK }}>{students.length}</span>
              {ar ? "متسلق" : students.length === 1 ? "climber" : "climbers"}
            </span>
          </div>
          <div className="text-5xl font-black tabular-nums tracking-tight transition-colors" style={{ color: left <= 30 ? "#D64545" : INK }}>
            {mm}:{ss}
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={goFullscreen} className="text-[#2B3F45] hover:bg-[#2B3F45]/10 hover:text-[#2B3F45]">
              <Maximize className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={endNow} className="bg-destructive hover:bg-destructive/90 text-white font-bold">
              <Square className="h-4 w-4 me-1" />{ar ? "إنهاء" : "END"}
            </Button>
          </div>
        </div>

        <div dir="ltr" className="flex-1 min-h-0 grid grid-cols-[3fr_2fr] xl:grid-cols-[1fr_23rem] gap-8">
          <RaceTrack climb={climb} students={ranked} ar={ar} />

          {/* Who is highest. */}
          <div className="min-h-0 flex flex-col" dir={ar ? "rtl" : "ltr"}>
            <div className="pb-3 text-xs font-black tracking-[0.25em] shrink-0" style={{ color: MUTED }}>{ar ? "الأعلى" : "HIGHEST"}</div>
            {ranked.length === 0 && (
              <div className="py-10 text-center text-base font-bold" style={{ color: MUTED }}>
                {ar ? "بانتظار المتسلقين" : "Waiting for climbers"}
              </div>
            )}
            <div className="min-h-0 overflow-y-auto">
              {ranked.map((s, i) => {
                const m = toMetres(s.height_reached ?? 0);
                const top = i === 0;
                return (
                  <div key={s.id} className={`flex items-center gap-3 border-b border-[#2B3F45]/10 ${top ? "py-4" : "py-2.5"}`}>
                    <span className="w-6 text-center text-sm font-black tabular-nums" style={{ color: top ? INK : MUTED }}>{i + 1}</span>
                    <div className="relative shrink-0">
                      <Avatar name={s.name ?? "?"} colorIndex={s.avatar_color} faceIndex={s.avatar_face} size={top ? 48 : 36} />
                      {top && <Crown className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 h-5 w-5" style={{ color: INK, fill: GOLD }} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`truncate font-extrabold ${top ? "text-xl" : "text-base"}`}>{s.name}</div>
                      <div className="mt-1 h-1.5 rounded-full bg-[#2B3F45]/10 overflow-hidden">
                        <div className="h-full rounded-full transition-[width] duration-700" style={{
                          width: `${Math.min(100, (m / Math.max(1, summitM)) * 100)}%`,
                          background: top ? GOLD : TEAL,
                        }} />
                      </div>
                    </div>
                    <div dir="ltr" className={`shrink-0 font-black tabular-nums ${top ? "text-2xl" : "text-lg"}`} style={{ color: INK }}>
                      {m}<span className="text-sm ms-0.5" style={{ color: MUTED }}>m</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CREAM = "#F3E7C9";
const INK = "#14282D";
const MUTED = "rgba(43,63,69,0.6)";
const GOLD = "#FACC15";

const FACE = 46;      // avatar size on the track
const SLOT_H = 66;    // avatar + name: how close two climbers can sit before one steps aside
const LANE_W = 74;

/** The whole climb as one tall track from the ground to the summit, each band
    a stripe in its own sky colors, and every climber pinned at their best
    height. Climbers who'd land on top of each other step sideways into the
    next lane instead of stacking. */
const RaceTrack = ({ climb, students, ar }: { climb: Climb; students: any[]; ar: boolean }) => {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const summit = Math.max(1, climb.summitY);
  const at = (h: number) => Math.min(1, Math.max(0, h / summit));
  let prev = 0;
  const bands = climb.bandEdges.map(e => {
    const from = prev;
    prev = Math.min(e.upto, summit);
    return { band: e.band, from: at(from), to: at(prev), upto: prev };
  }).filter(b => b.to > b.from);

  // Lay the climbers out bottom to top, in lanes from the start edge.
  const lanes = Math.max(1, Math.floor((size.w - 52 - 70) / LANE_W) + 1);
  const near = SLOT_H / Math.max(1, size.h);
  const placed: { s: any; y: number; lane: number }[] = [];
  [...students].sort((a, b) => (a.height_reached ?? 0) - (b.height_reached ?? 0)).forEach(s => {
    const y = at(s.height_reached ?? 0);
    const taken = placed.filter(p => Math.abs(p.y - y) < near).map(p => p.lane);
    let lane = 0;
    while (taken.includes(lane)) lane++;
    placed.push({ s, y, lane: lane % lanes });
  });
  const leaderId = students[0]?.id;

  // Each zone's middle sky color at its center, the ground's horizon at the
  // bottom and the top of space at the summit, so nothing jumps at an edge.
  const themeOf = (id: string) => THEMES.find(th => th.id === id);
  const stops = bands.map(b => `${themeOf(b.band)?.sky[2]} ${(((b.from + b.to) / 2) * 100).toFixed(1)}%`);
  const sky = bands.length
    ? `linear-gradient(to top, ${themeOf(bands[0].band)?.sky[4]} 0%, ${stops.join(", ")}, ${themeOf(bands[bands.length - 1].band)?.sky[0]} 100%)`
    : undefined;

  return (
    <div className="min-h-0 flex flex-col">
      <div className="flex items-center justify-between pb-3 shrink-0" dir={ar ? "rtl" : "ltr"}>
        <div className="text-xs font-black tracking-[0.25em]" style={{ color: MUTED }}>{ar ? "السباق إلى القمة" : "RACE TO THE TOP"}</div>
        <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: MUTED }}>
          <Flag className="h-3.5 w-3.5" style={{ color: INK }} />{ar ? "القمة" : "Summit"}
          <span dir="ltr" className="tabular-nums" style={{ color: INK }}>{toMetres(climb.summitY)}m</span>
        </div>
      </div>
      <div className="relative flex-1 min-h-0 rounded-[28px] overflow-hidden border-2 border-[hsl(var(--nb-border))] shadow-[5px_5px_0_0_hsl(var(--nb-border))]">
        {/* one sky up the whole track, each zone's color fading into the next */}
        <div className="absolute inset-0" style={{ background: sky }} />
        {/* the zones, ground at the bottom */}
        <div className="absolute inset-0 flex flex-col-reverse">
          {bands.map(b => {
            const t = THEMES.find(th => th.id === b.band);
            return (
              <div key={b.band} className="relative border-t border-white/20" style={{ height: `${(b.to - b.from) * 100}%` }}>
                <div dir={ar ? "rtl" : "ltr"} className="absolute top-2 right-4 flex items-baseline gap-2 text-sm font-extrabold text-white whitespace-nowrap"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}>
                  {t ? (ar ? t.nameAr : t.nameEn) : ""}
                  <span dir="ltr" className="text-xs tabular-nums text-white/75">{toMetres(b.upto)}m</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* the track itself, a rail up the start edge */}
        <div className="absolute inset-y-4 left-6 w-1.5 rounded-full bg-white/60" />
        {/* the climbers */}
        <div ref={box} className="absolute top-12 bottom-11 left-0 right-0">
          {placed.map(({ s, y, lane }) => {
            const lead = s.id === leaderId;
            return (
              <div key={s.id} className="absolute flex flex-col items-center w-[70px] transition-[bottom,left] duration-700 ease-out"
                style={{ bottom: `calc(${y * 100}% - ${FACE / 2}px)`, left: `${52 + lane * LANE_W}px` }}>
                <div className="relative rounded-full" style={{ boxShadow: lead ? `0 0 0 3px ${GOLD}` : "0 0 0 2px #FFFFFF" }}>
                  <Avatar name={s.name ?? "?"} colorIndex={s.avatar_color} faceIndex={s.avatar_face} size={FACE} />
                  {lead && <Crown className="absolute -top-4 left-1/2 -translate-x-1/2 h-5 w-5" style={{ color: INK, fill: GOLD }} />}
                </div>
                <div className="mt-1 max-w-full truncate rounded-full px-1.5 text-xs font-extrabold" style={{ background: lead ? GOLD : "rgba(20,40,45,0.7)", color: lead ? INK : "#FFFFFF" }}>{s.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DontLookDownMonitor;
