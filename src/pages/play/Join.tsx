import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { passwordChoices as cryptoPasswordChoices } from "@/lib/cryptoRush";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/logo-mark.png";
import { hueForJoinIndex } from "@/lib/paintFight";
import { Seo } from "@/components/Seo";
import { Avatar } from "@/components/Avatar";
import { CIRCLE_COLORS, FACES, colorIndexForName, faceIndexForName } from "@/lib/avatarIdentity";
import { ChevronLeft } from "lucide-react";
import { Buddy, ShapeField } from "@/components/site/Buddy";

// Small, quiet back control shared by the code and name screens — same muted
// chevron treatment as the avatar face arrows below, never a full button.
const BackButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="absolute top-6 left-6 z-20 h-9 w-9 flex items-center justify-center rounded-full text-[#2B3F45]/40 hover:text-[#2B3F45] hover:bg-black/[0.05] transition-all duration-150 active:scale-90"
  >
    <ChevronLeft className="h-5 w-5" />
  </button>
);

// The site's look: cream paper, slate ink, lime, the hard offset shadow.
const CREAM = "#F3E7C9";
const SLATE = "#2B3F45";
const HAND = "'ArslanWessam', 'Almarai', sans-serif";
const NB = "border-2 border-[hsl(var(--nb-border))] shadow-[4px_4px_0_0_hsl(var(--nb-border))]";

// Crypto Rush terminal theme (used by boot + launch stages only) — same green
// as the real in-session terminal (Game.tsx) and the teacher monitor, not an
// independently-invented shade.
const CR = { bg: "#06110d", accent: "hsl(120 100% 55%)", accentDim: "hsl(120 100% 55% / 0.14)", accentBorder: "hsl(120 100% 55% / 0.27)" };

type Stage = "code" | "name" | "boot" | "launch";

/**
 * Types out `lines` one character at a time while `active` is true, restarting
 * fresh each time `active` flips from false to true (not on every re-render —
 * `lines` is read through a ref so a parent re-render recreating the array
 * doesn't reset progress). Driven by a single setTimeout chain instead of an
 * async loop: the effect's cleanup clears the pending timer, so double-firing
 * the effect (React re-running effects) can't produce two overlapping chains.
 */
const useTypewriter = (lines: string[], active: boolean) => {
  const [committed, setCommitted] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const linesRef = useRef<string[]>(lines);
  linesRef.current = lines;

  useEffect(() => {
    if (!active) return;
    const script = linesRef.current;
    setCommitted([]);
    setCurrent("");
    let li = 0, ci = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (li >= script.length) return;
      const line = script[li];
      if (ci < line.length) {
        ci += 1;
        setCurrent(line.slice(0, ci));
        timer = setTimeout(tick, 58);
      } else {
        const finishedLine = line;
        li += 1; ci = 0;
        setCommitted(prev => [...prev, finishedLine]);
        setCurrent("");
        timer = setTimeout(tick, 408);
      }
    };
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, [active]);

  return { committed, current, done: committed.length > 0 && committed.length === lines.length };
};

// ─── Join ───────────────────────────────────────────────────────────────────
const Join = () => {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { i18n } = useTranslation();

  // 4-cell code input
  const [cells, setCells] = useState(["", "", "", ""]);
  const r0 = useRef<HTMLInputElement>(null);
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const cellRefs = [r0, r1, r2, r3];

  const [name, setName]       = useState("");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage]     = useState<Stage>("code");
  const [chosen, setChosen]   = useState<string | null>(null);

  // Avatar color/face follow the name hash until the student taps a swatch or
  // an arrow — after that this pair is what actually gets stored, not a
  // re-derived hash, so their pick sticks even if they keep editing the name.
  const [avatarColorIdx, setAvatarColorIdx] = useState(0);
  const [avatarFaceIdx, setAvatarFaceIdx]   = useState(0);
  const [colorTouched, setColorTouched] = useState(false);
  const [faceTouched, setFaceTouched]   = useState(false);
  useEffect(() => {
    const n = name.trim();
    if (!n) return;
    if (!colorTouched) setAvatarColorIdx(colorIndexForName(n));
    if (!faceTouched) setAvatarFaceIdx(faceIndexForName(n));
  }, [name]);

  // Paint body + html the page's cream so nothing else bleeds through on iOS edges
  useEffect(() => {
    const prev = document.body.style.background;
    document.documentElement.style.background = CREAM;
    document.body.style.background = CREAM;
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = prev;
    };
  }, []);

  // Keep join screen LTR regardless of language
  useEffect(() => {
    const prevDir = document.documentElement.dir;
    document.documentElement.dir = "ltr";
    return () => {
      document.documentElement.dir = prevDir;
    };
  }, []);

  const code  = cells.join("");
  const mode  = (session?.settings?.mode as string) ?? "crypto_rush";
  // teacher's language, once known; falls back to the browser's current language pre-session
  const ar = (session?.settings?.lang ?? i18n.language) === "ar";

  const passwordChoices = useMemo(() => cryptoPasswordChoices(ar), [ar]);

  // Pre-fill from URL ?code=XXXX
  useEffect(() => {
    const urlCode = (params.get("code") || "").replace(/\D/g, "").slice(0, 4);
    if (urlCode) setCells(urlCode.split("").concat(["", "", "", ""]).slice(0, 4));
  }, []);

  // Auto-submit when all 4 cells filled
  const submitting = useRef(false);
  useEffect(() => {
    if (code.length === 4 && stage === "code" && !submitting.current) {
      submitting.current = true;
      validateCode(code);
    }
  }, [code, stage]);

  const validateCode = async (c: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("game_sessions")
      .select("*")
      .eq("code", c)
      .in("status", ["lobby", "running"])
      .maybeSingle();
    setLoading(false);
    submitting.current = false;
    if (error || !data) {
      toast.error(ar ? "رمز غير صحيح" : "Invalid code");
      setCells(["", "", "", ""]);
      setTimeout(() => r0.current?.focus(), 50);
      return;
    }
    // Already in this game on this phone (tab closed, page reloaded, code
    // typed again): go back in as the same player, not a second one.
    const saved = localStorage.getItem(`hash_student_${data.id}`);
    if (saved) {
      const { data: row } = await supabase.from("game_students").select("id,approved").eq("id", saved).maybeSingle();
      if (row && row.approved !== false) { nav(`/join/${data.id}`); return; }
      localStorage.removeItem(`hash_student_${data.id}`);
    }
    setSession(data);
    setStage("name");
  };

  // Cell input handlers
  const handleCell = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...cells]; next[i] = v; setCells(next);
    if (v && i < 3) cellRefs[i + 1].current?.focus();
  };
  const handleCellKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !cells[i] && i > 0) {
      const next = [...cells]; next[i - 1] = ""; setCells(next);
      cellRefs[i - 1].current?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", ""] as string[];
    for (let i = 0; i < 4; i++) next[i] = text[i] ?? "";
    setCells(next);
    cellRefs[Math.min(text.length, 3)].current?.focus();
  };

  // ── Crypto Rush: boot typewriter, then launch typewriter ──────
  const BOOT_LINES = ar
    ? ["> تم اكتشاف مستخدم جديد!", "> أهلاً بك في بوابة اختراق الطرفية", "> اختر كلمة مرور:"]
    : ["> New User Detected!", "> Welcome to the Terminal Hacking Portal", "> Please select a password:"];
  const LAUNCH_LINES = ar
    ? ["> تم التحقق من الهوية", "> جارٍ تحميل برنامج تعدين الكريبتو...", ">", "> .......", "> .......", "> جارٍ الإطلاق..."]
    : ["> Authentication Complete", "> Loading Crypto Mining Software...", ">", "> .......", "> .......", "> Launching..."];

  const boot = useTypewriter(BOOT_LINES, stage === "boot");
  const launch = useTypewriter(LAUNCH_LINES, stage === "launch");
  const showPasswords = boot.done;

  // Boot + launch render as ONE continuous scrolling terminal — this ref
  // auto-scrolls to the bottom as lines append, same pattern as the real
  // in-session terminal's log in Game.tsx.
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [boot.committed, boot.current, launch.committed, chosen]);

  // Once the launch line-up finishes typing, actually join the game.
  useEffect(() => {
    if (!launch.done || !session) return;
    doInsert(session, name, chosen ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launch.done]);

  const doInsert = async (sess: any, playerName: string, password: string) => {
    try {
      // Same name already in the game: once it's running that's this student
      // on a new phone or a cleared browser, so hand them their player back
      // (score intact). In the lobby it's more likely two kids with one name.
      const { data: same } = await supabase.from("game_students").select("id,name,approved")
        .eq("session_id", sess.id).ilike("name", playerName.trim());
      const match = (same ?? []).find(s => s.approved !== false && s.name.trim().toLowerCase() === playerName.trim().toLowerCase());
      if (match) {
        const { data: fresh } = await supabase.from("game_sessions").select("status").eq("id", sess.id).maybeSingle();
        if (fresh?.status === "running") {
          localStorage.setItem(`hash_student_${sess.id}`, match.id);
          toast(ar ? "رجعت إلى اللعبة" : "Welcome back");
          nav(`/join/${sess.id}`);
          return;
        }
        toast.error(ar ? "هذا الاسم مستخدم، اختر اسمًا آخر" : "That name is taken, pick another");
        setStage("name");
        return;
      }
      const payload: any = {
        session_id: sess.id, name: playerName.trim(), password,
        avatar_color: avatarColorIdx, avatar_face: avatarFaceIdx,
      };
      if (sess.settings?.mode === "humansvszombies") {
        // Everyone joins human; the first zombies are drawn at Start.
        payload.team = "human";
      }
      if (sess.settings?.mode === "paintfight") {
        const { count } = await supabase.from("game_students").select("id", { count: "exact", head: true }).eq("session_id", sess.id);
        payload.fight_hue = hueForJoinIndex(count ?? 0);
      }
      const { data: student, error } = await supabase
        .from("game_students")
        .insert(payload)
        .select().single();
      if (error) throw error;
      localStorage.setItem(`hash_student_${sess.id}`, student.id);
      nav(`/join/${sess.id}`);
    } catch (err: any) {
      toast.error(err.message || (ar ? "تعذّر الانضمام" : "Could not join"));
      setStage("name");
    }
  };

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (mode === "crypto_rush") setStage("boot");
    else doInsert(session, name, "");
  };

  // ════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════

  // ── Code entry (mode-agnostic) ────────────────────────────────
  if (stage === "code") {
    return (
      <div className="fixed inset-0 isolate flex flex-col items-center justify-center p-6 safe-top safe-bottom overflow-hidden" style={{ background: CREAM }}>
        {/* A bare room-code entry form has no content worth ranking for —
            noindex avoids it reading as a thin/doorway page. */}
        <Seo
          path="/play"
          titleAr="انضم إلى لعبة"
          titleEn="Join a Game"
          descriptionAr="أدخل رمز الغرفة للانضمام إلى جلسة نفلها."
          descriptionEn="Enter your room code to join a live nefelha session."
          index={false}
        />
        <ShapeField />
        <BackButton onClick={() => nav("/")} label={ar ? "رجوع" : "Back"} />

        <div className="relative z-10 w-full max-w-xs text-center animate-fade-up">
          <img src={logoMark} alt="nefelha" className="mx-auto h-14 w-14 object-contain" />
          <h1 className="mt-6 text-[34px] leading-tight" style={{ fontFamily: HAND, color: SLATE }}>
            {ar ? "ادخل رمز اللعبة" : "Enter the game code"}
          </h1>

          {/* the class waiting for the code */}
          <div aria-hidden className="mt-6 flex items-end justify-center gap-1.5">
            <Buddy shape="splash" color="#A9CB1E" mood="grin" className="w-12 -rotate-6" />
            <Buddy shape="pebble" color="#0E7C7B" mood="happy" faceColor={CREAM} className="w-10" />
            <Buddy shape="coral" color="#E8794A" mood="oh" className="w-11 rotate-6" />
          </div>

          <div dir="ltr" className="mt-6 flex gap-3 justify-center" onPaste={handlePaste}>
            {cells.map((c, i) => (
              <input
                key={i}
                ref={cellRefs[i]}
                value={c}
                onChange={e => handleCell(i, e)}
                onKeyDown={e => handleCellKey(i, e)}
                maxLength={2}
                autoFocus={i === 0}
                inputMode="numeric"
                className={cn(
                  "w-[64px] h-[80px] text-center text-[34px] font-black rounded-2xl bg-white caret-transparent select-none",
                  NB, "focus:outline-none focus:-translate-y-1 focus:shadow-[4px_8px_0_0_hsl(var(--nb-border))] transition-all duration-150",
                  c && "bg-[#A9CB1E]"
                )}
                style={{ color: SLATE }}
              />
            ))}
          </div>
          <p className="mt-6 text-[13px] font-semibold" style={{ color: `${SLATE}99` }}>
            {loading ? (ar ? "جارٍ التحقق..." : "Checking...") : (ar ? "الرمز ٤ أرقام على شاشة المعلم" : "The 4-digit code on your teacher's screen")}
          </p>
        </div>
      </div>
    );
  }

  // ── Name entry (mode-agnostic — matches the code entry page) ──
  if (stage === "name") {
    return (
      <div className="fixed inset-0 isolate flex flex-col items-center justify-center p-6 safe-top safe-bottom overflow-hidden" style={{ background: CREAM }}>
        <ShapeField />
        <BackButton
          onClick={() => { setSession(null); setCells(["", "", "", ""]); setStage("code"); setTimeout(() => r0.current?.focus(), 50); }}
          label={ar ? "رجوع" : "Back"}
        />

        {/* Name first, then the look: a big preview of yourself (your shape
            comes from your name), the colors, and every face in a grid you can
            see at once and tap. */}
        <form onSubmit={submitName}
          className="relative z-10 w-full max-w-sm h-full flex flex-col items-center pt-8 pb-2 gap-4 animate-fade-up">
          <Avatar
            key={`${name.trim()}-${avatarColorIdx}-${avatarFaceIdx}`}
            name={name.trim() || "?"}
            colorIndex={avatarColorIdx}
            faceIndex={avatarFaceIdx}
            size={112}
            className="animate-scale-in"
          />
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={24}
            dir="auto"
            placeholder={ar ? "اسمك في اللعبة..." : "Your name..."}
            className={cn("w-full h-14 px-4 text-center text-lg font-bold rounded-2xl bg-white shrink-0 focus:outline-none placeholder:text-black/25", NB)}
            style={{ color: SLATE }}
          />

          <div className="flex justify-center gap-2.5 shrink-0">
            {CIRCLE_COLORS.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-label={ar ? `اللون ${i + 1}` : `Color ${i + 1}`}
                onClick={() => { setColorTouched(true); setAvatarColorIdx(i); }}
                className={cn(
                  "h-8 w-8 rounded-full border-2 border-[hsl(var(--nb-border))] transition-all duration-150",
                  avatarColorIdx === i ? "scale-110 -translate-y-0.5 shadow-[2px_3px_0_0_hsl(var(--nb-border))]" : "opacity-70 hover:opacity-100"
                )}
                style={{ background: c }}
              />
            ))}
          </div>

          <div className={cn("w-full flex-1 min-h-0 overflow-y-auto rounded-2xl bg-white p-2.5", NB)}>
            <div className="grid grid-cols-5 gap-1.5 pb-2">
              {FACES.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  aria-label={ar ? `الوجه ${i + 1}` : `Face ${i + 1}`}
                  onClick={() => { setFaceTouched(true); setAvatarFaceIdx(i); }}
                  className={cn(
                    "aspect-square rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90",
                    avatarFaceIdx === i ? "bg-[#A9CB1E]/35 ring-2 ring-[hsl(var(--nb-border))]" : "hover:bg-black/[0.04]"
                  )}
                >
                  <Avatar name={name.trim() || "?"} colorIndex={avatarColorIdx} faceIndex={i} size={44} />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className={cn(
              "w-full h-14 rounded-full font-black text-lg bg-[#A9CB1E] shrink-0", NB,
              "transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_hsl(var(--nb-border))]",
              "disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            )}
            style={{ color: SLATE }}
          >
            {ar ? "يلا ندخل" : "Let's go"}
          </button>
        </form>
      </div>
    );
  }

  // ── Crypto Rush: boot + password + launch, one continuous terminal ──────
  // Picking a password never swaps to a fresh screen — it keeps appending to
  // the same scrolling log, auto-scrolled to the bottom as new lines arrive.
  if (stage === "boot" || stage === "launch") {
    return (
      <div className="fixed inset-0 font-mono overflow-hidden terminal-screen" style={{ color: CR.accent }}>
        <div className="scan-sweep" style={{ "--sweep-color": CR.accent } as React.CSSProperties} />
        <div className="pointer-events-none fixed inset-0 terminal-scanlines z-20" />
        <div className="pointer-events-none fixed inset-0 terminal-vignette z-20" />
        <div className="relative z-10 flex flex-col h-full p-6 md:p-16 py-12 scan-sweep-fade">
          <h1
            className="shrink-0 font-pixel text-center leading-[1.7] mb-4 text-3xl md:text-5xl font-black tracking-wider"
            style={{ filter: `drop-shadow(0 0 18px ${CR.accent}70)` }}
          >
            {ar ? "أهلاً أيها المخترق" : "WELCOME HACKER"}
          </h1>

          <div ref={logRef} className="flex-1 min-h-0 overflow-y-auto space-y-2 text-base md:text-xl">
            {boot.committed.map((l, i) => <div key={`b${i}`}>{l}</div>)}
            {boot.current && <div>{boot.current}<span className="animate-pulse">▌</span></div>}
            {chosen && (
              <div className="opacity-60">{ar ? `> كلمة المرور: ${chosen}` : `> password: ${chosen}`}</div>
            )}
            {launch.committed.map((l, i) => <div key={`l${i}`}>{l}</div>)}
            {launch.current && <div>{launch.current}<span className="animate-pulse">▌</span></div>}
            {stage === "launch" && launch.done && <div className="animate-pulse">▌</div>}
          </div>

          {stage === "boot" && showPasswords && (
            <div className="shrink-0 mt-8 flex flex-wrap gap-3">
              {passwordChoices.map(p => (
                <button
                  key={p}
                  onClick={() => { setChosen(p); setStage("launch"); }}
                  className="px-4 py-2 border-2 rounded text-sm md:text-base break-all transition-all active:scale-[0.96]"
                  style={{ borderColor: CR.accentBorder, color: CR.accent }}
                  onMouseEnter={e => (e.currentTarget.style.background = CR.accentDim)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  [ {p} ]
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Join;
