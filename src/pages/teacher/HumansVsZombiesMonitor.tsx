import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Square, Maximize } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { HumanMark, ZombieMark } from "@/components/game/HvzMarks";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { HEAD_START_MS, POINTS } from "@/lib/humansVsZombies";
import { HVZ } from "@/lib/hvzRender";

// ── Humans vs Zombies, projector ────────────────────────────────────────────
// No map up here on purpose: the game is on the phones. The board is the
// score of the outbreak — who's still human, who's turned, and a live feed of
// every infection and stun, read off the same broadcast channel the phones
// use. Team counts come from game_students.team, which each phone flips for
// itself when it's tagged.
//
// This screen also referees the end: the game is over the moment one team has
// everybody (a zombie out of lives is cured, so humans can win by curing them
// all), and if the clock runs out first humans win as long as anyone is still
// human. Every survivor gets the survival bonus.

export type Row = { id: string; name: string; team: string | null; crypto: number | null; avatar_color: number | null; avatar_face: number | null };
export type Feed = { id: number; by: string; victim: string; kind: "infect" | "stun" | "ko" | "bite" | "cure" };

/** `demo` fills the board with made-up players for the dev preview; nothing is read or written. */
interface Props { session: any; sessionId: string; demo?: { students: Row[]; feed: Feed[] } }

// Declared out here, not inside the board: a component defined in render is a
// new type every render, so React remounted every avatar on each clock tick
// and their entrance animation replayed twice a second.
const Player = memo(({ s, zombie }: { s: Row; zombie: boolean }) => (
  <div className="flex flex-col items-center gap-1.5 w-[5.75rem] animate-scale-in">
    <div className="relative">
      <Avatar name={s.name} size={68} colorIndex={s.avatar_color} faceIndex={s.avatar_face} />
      {zombie && <div className="absolute inset-0 rounded-full mix-blend-multiply" style={{ background: "rgba(120,200,90,0.75)" }} />}
      {zombie && <ZombieMark size={26} className="absolute -bottom-1 -end-1" />}
    </div>
    <div className="max-w-full truncate text-[15px] font-extrabold">{s.name}</div>
    <div className="-mt-1 text-xs font-black tabular-nums" style={{ color: HVZ.bullet }}>{s.crypto ?? 0}</div>
  </div>
));

// Where the slime hangs off the zombie end of the bar, as a share of its width.
const DRIPS = [
  { at: 0.06, h: 22 }, { at: 0.17, h: 12 }, { at: 0.31, h: 28 }, { at: 0.46, h: 14 },
  { at: 0.58, h: 24 }, { at: 0.72, h: 10 }, { at: 0.84, h: 20 }, { at: 0.95, h: 13 },
];

const HumansVsZombiesMonitor = ({ session, sessionId, demo }: Props) => {
  const nav = useNavigate();
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const { i18n } = useTranslation();
  const ar = (session?.settings?.lang ?? i18n.language) === "ar";
  const [students, setStudents] = useState<Row[]>(demo?.students ?? []);
  const [feed, setFeed] = useState<Feed[]>(demo?.feed ?? []);
  const [now, setNow] = useState(Date.now());
  const endingRef = useRef(false);
  const studentsRef = useRef<Row[]>([]);
  studentsRef.current = students;
  const settingsRef = useRef<any>({});
  settingsRef.current = session?.settings ?? {};

  useEffect(() => {
    if (!sessionId || demo) return;
    const refresh = async () => {
      const { data } = await supabase.from("game_students")
        .select("id,name,team,crypto,avatar_color,avatar_face").eq("session_id", sessionId);
      setStudents((data ?? []) as Row[]);
    };
    refresh();
    const push = (kind: Feed["kind"]) => ({ payload }: any) => {
      if (!payload) return;
      const k: Feed["kind"] = kind === "stun" && payload.ko ? "ko" : kind;
      setFeed(f => [{ id: Date.now() + Math.random(), by: payload.byName ?? "?", victim: payload.victimName ?? "?", kind: k }, ...f].slice(0, 7));
    };
    const ch = supabase.channel(`hvz-${sessionId}`, { config: { broadcast: { self: false } } })
      .on("postgres_changes", { event: "*", schema: "public", table: "game_students", filter: `session_id=eq.${sessionId}` }, refresh)
      .on("broadcast", { event: "infect" }, push("infect"))
      .on("broadcast", { event: "stun" }, push("stun"))
      .on("broadcast", { event: "bite" }, push("bite"))
      .on("broadcast", { event: "cure" }, push("cure"))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [sessionId, demo]);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(tick);
  }, []);

  const startedAt = session?.started_at ? new Date(session.started_at).getTime() : 0;
  const minutes = Number(session?.settings?.minutes);
  const endsAt = startedAt && Number.isFinite(minutes) && minutes > 0 ? startedAt + minutes * 60_000 : null;
  const secsLeft = endsAt ? Math.max(0, Math.ceil((endsAt - now) / 1000)) : null;
  const releaseIn = startedAt ? Math.max(0, Math.ceil((startedAt + HEAD_START_MS - now) / 1000)) : 0;

  const finish = async (winner: "humans" | "zombies", winBy: "clock" | "cure" | "infect") => {
    if (endingRef.current) return;
    endingRef.current = true;
    if (winner === "humans") {
      // The survival bonus, paid by the referee so it lands even for a phone
      // that's asleep when the clock runs out.
      await Promise.all(studentsRef.current.filter(s => s.team === "human").map(s =>
        supabase.from("game_students").update({ crypto: (s.crypto ?? 0) + POINTS.survive }).eq("id", s.id)));
    }
    await supabase.from("game_sessions").update({
      status: "finished", ended_at: new Date().toISOString(),
      settings: { ...settingsRef.current, winner, winBy },
    }).eq("id", sessionId);
  };

  // Referee.
  useEffect(() => {
    if (session?.status !== "running" || !startedAt || demo) return;
    const t = setInterval(() => {
      const list = studentsRef.current;
      if (list.length === 0) return;
      const humans = list.filter(s => s.team !== "zombie").length;
      const settled = Date.now() > startedAt + 3000;
      if (humans === 0 && settled) { finish("zombies", "infect"); return; }
      if (humans === list.length && settled) { finish("humans", "cure"); return; }
      if (endsAt && Date.now() >= endsAt) finish(humans > 0 ? "humans" : "zombies", "clock");
    }, 500);
    return () => clearInterval(t);
  }, [session?.status, startedAt, endsAt]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (session?.status === "finished") nav(`/app/games/${session.id}/results`, { replace: true, state: { justEnded: true } });
  }, [session?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  const endNow = async () => {
    if (!session || !(await confirm(ar ? "إنهاء اللعبة الآن؟" : "End the game now?"))) return;
    await finish(humans.length > 0 ? "humans" : "zombies", "clock");
  };

  const goFullscreen = () => {
    const el = document.documentElement as any;
    (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  const byPoints = (a: Row, b: Row) => (b.crypto ?? 0) - (a.crypto ?? 0);
  const humans = students.filter(s => s.team !== "zombie").sort(byPoints);
  const zombies = students.filter(s => s.team === "zombie").sort(byPoints);
  const share = students.length ? humans.length / students.length : 1;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const hurry = secsLeft !== null && secsLeft <= 30;

  const verb = (k: Feed["kind"]) =>
    k === "infect" ? (ar ? "عدى" : "infected")
    : k === "bite" ? (ar ? "عضّ" : "bit")
    : k === "ko" ? (ar ? "أسقط" : "knocked out")
    : k === "cure" ? (ar ? "عالج" : "cured")
    : (ar ? "شلّ" : "stunned");

  return (
    <div className="fixed inset-0 overflow-hidden text-white" style={{
      background: `radial-gradient(60% 70% at 0% 0%, rgba(78,163,242,0.16), transparent 70%),
                   radial-gradient(60% 70% at 100% 0%, rgba(108,192,74,0.16), transparent 70%), ${HVZ.void}`,
      fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif",
    }}>
      {ConfirmDialog}
      <div className="h-full flex flex-col px-8 pt-5 pb-6 gap-5">
        {/* Top: code, clock, controls. */}
        <div dir="ltr" className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 shrink-0">
          <div className="flex items-baseline gap-2 text-sm font-bold text-white/50">
            {ar ? "الرمز" : "CODE"}
            <span className="text-2xl font-black tracking-[0.2em] text-white">{session?.code}</span>
          </div>
          {secsLeft !== null ? (
            <div className="text-5xl font-black tabular-nums tracking-tight transition-colors" style={{ color: hurry ? "#FF6B5E" : "#FFFFFF" }}>
              {fmt(secsLeft)}
            </div>
          ) : <div />}
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={goFullscreen} className="text-white/70 hover:bg-white/10 hover:text-white">
              <Maximize className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={endNow} className="bg-destructive hover:bg-destructive/90 text-white font-bold">
              <Square className="h-4 w-4 me-1" />{ar ? "إنهاء" : "END"}
            </Button>
          </div>
        </div>

        {/* The two sides and the front line between them. */}
        <div className="shrink-0">
          <div dir="ltr" className="flex items-end justify-between">
            <div className="flex items-center gap-5">
              <HumanMark size={92} />
              <div>
                <div className="text-[96px] font-black leading-[0.85] tabular-nums" style={{ color: HVZ.human }}>{humans.length}</div>
                <div className="mt-2 text-lg font-extrabold tracking-[0.2em] text-white/60">{ar ? "بشر" : "HUMANS"}</div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-end">
                <div className="text-[96px] font-black leading-[0.85] tabular-nums" style={{ color: HVZ.zombie }}>{zombies.length}</div>
                <div className="mt-2 text-lg font-extrabold tracking-[0.2em] text-white/60">{ar ? "زومبي" : "ZOMBIES"}</div>
              </div>
              <ZombieMark size={92} />
            </div>
          </div>

          <div dir="ltr" className="relative mt-5 h-4">
            <div className="absolute inset-0 rounded-full overflow-hidden" style={{ background: HVZ.zombie }}>
              <div className="h-full transition-[width] duration-700 ease-out" style={{
                width: `${share * 100}%`,
                background: `repeating-linear-gradient(-45deg, ${HVZ.human} 0 14px, #5FB0F6 14px 28px)`,
              }} />
            </div>
            {/* the front: the infection's ragged edge */}
            {share > 0 && share < 1 && (
              <svg viewBox="0 0 14 32" preserveAspectRatio="none" className="absolute -top-2 h-8 w-3.5 -translate-x-full transition-[left] duration-700 ease-out"
                style={{ left: `calc(${share * 100}% + 2px)` }}>
                <path d="M14 0L4 4L10 9L2 14L9 19L1 24L8 28L14 32Z" fill={HVZ.zombie} />
              </svg>
            )}
            {/* slime hanging off the zombie side */}
            {DRIPS.filter(d => d.at > share + 0.015).map(d => (
              <div key={d.at} className="absolute top-3 w-2.5 rounded-b-full transition-opacity" style={{ left: `${d.at * 100}%`, height: d.h, background: HVZ.zombie }} />
            ))}
          </div>
        </div>

        {releaseIn > 0 && (
          <div className="shrink-0 flex justify-center">
            <div className="flex items-center gap-3 rounded-full ps-3 pe-6 py-2 text-xl font-black" style={{ background: HVZ.zombie, color: HVZ.ink }}>
              <span className="grid place-items-center h-10 min-w-10 px-2 rounded-full text-2xl tabular-nums" style={{ background: HVZ.ink, color: HVZ.zombie }}>{releaseIn}</span>
              {ar ? "الزومبي يخرجون من المختبر" : "Zombies break out of the lab"}
            </div>
          </div>
        )}

        <div dir="ltr" className="flex-1 min-h-0 grid grid-cols-[1fr_minmax(17rem,24rem)_1fr] gap-10 pt-2">
          <div className="min-h-0 overflow-y-auto">
            <div className="flex flex-wrap content-start gap-x-4 gap-y-5">
              {humans.map(s => <Player key={s.id} s={s} zombie={false} />)}
            </div>
            {humans.length === 0 && students.length > 0 && (
              <div className="mt-8 text-lg font-bold text-white/35">{ar ? "لم يبقَ أحد" : "Nobody left"}</div>
            )}
          </div>

          <div className="min-h-0 flex flex-col">
            <div className="flex items-center justify-center gap-2 text-xs font-black tracking-[0.3em] text-white/45 pb-3">
              <span className="h-2 w-2 rounded-full bg-[#FF6B5E] animate-pulse" />
              {ar ? "ما يحدث الآن" : "LIVE"}
            </div>
            {feed.length === 0 && (
              <div className="text-center text-base font-bold text-white/35 mt-6">
                {ar ? "لم يُمسك أحد بعد" : "Nobody has been caught yet"}
              </div>
            )}
            <div className="flex flex-col">
              {feed.map((e, i) => {
                const zombieAct = e.kind === "infect" || e.kind === "bite";
                return (
                  <div key={e.id} dir={ar ? "rtl" : "ltr"}
                    className="flex items-center gap-3 py-3 border-b border-white/[0.07] animate-fade-up"
                    style={{ opacity: Math.max(0.3, 1 - i * 0.13) }}>
                    {zombieAct ? <ZombieMark size={i === 0 ? 34 : 26} className="shrink-0" /> : <HumanMark size={i === 0 ? 34 : 26} className="shrink-0" />}
                    <div className={`min-w-0 font-extrabold leading-snug ${i === 0 ? "text-xl" : "text-base"}`}>
                      <span style={{ color: zombieAct ? HVZ.zombie : HVZ.human }}>{e.by}</span>
                      <span className="text-white/55"> {verb(e.kind)} </span>
                      <span>{e.victim}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto">
            <div className="flex flex-wrap content-start justify-end gap-x-4 gap-y-5">
              {zombies.map(s => <Player key={s.id} s={s} zombie />)}
            </div>
            {zombies.length === 0 && (
              <div className="mt-8 text-end text-lg font-bold text-white/35">{ar ? "لا زومبي بعد" : "No zombies yet"}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumansVsZombiesMonitor;
