import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LIME, SAND, TEAL } from "@/components/teacher/DashboardAccents";
import logoMark from "@/assets/logo-mark.png";

/* Page change on the public site: a teal curtain with a wavy edge rises over
   the screen, the route swaps underneath it, then the curtain carries on up
   and off. The page never goes blank, and the swap (lazy chunk, scroll reset)
   happens out of sight.

   Clicks on internal links are caught in the capture phase, before React
   Router's <Link> handler; preventDefault makes the Link skip its own
   navigation, and we navigate once the curtain is closed. Navigations run as
   transitions (BrowserRouter future flag), so useLocation only reports the new
   path once the new page can render, which is the cue to lift the curtain.

   Only between marketing pages: the teacher app, the student game and the
   projector stay instant. Back/forward and reduced motion stay instant too. */

const SITE = /^\/(services|about|partners|contact|schools|blog(\/.*)?)?$/;
const isSite = (path: string) => SITE.test(path);

const COVER_MS = 380;
const REVEAL_MS = 520;
const MAX_WAIT_MS = 4000;

type Phase = "idle" | "covering" | "covered" | "revealing";

export const PageCurtain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const targetRef = useRef<string | null>(null);
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  const go = (p: Phase) => { phaseRef.current = p; setPhase(p); };

  // catch internal link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (phaseRef.current !== "idle") { e.preventDefault(); return; }
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathRef.current) return; // same page, hash links etc.
      if (!isSite(pathRef.current) || !isSite(url.pathname)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      targetRef.current = url.pathname + url.search + url.hash;
      go("covering");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  // curtain closed: swap the page underneath
  useEffect(() => {
    if (phase === "covering") {
      const t = window.setTimeout(() => {
        go("covered");
        if (targetRef.current) navigate(targetRef.current);
      }, COVER_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "covered") {
      // never leave the curtain stuck if the page takes too long
      const t = window.setTimeout(() => go("revealing"), MAX_WAIT_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "revealing") {
      const t = window.setTimeout(() => { targetRef.current = null; go("idle"); }, REVEAL_MS);
      return () => window.clearTimeout(t);
    }
  }, [phase, navigate]);

  // the new page rendered: give it a beat to paint, then lift the curtain
  // (a timer, not rAF, which stalls in a background tab)
  useEffect(() => {
    if (phaseRef.current !== "covered") return;
    const t = window.setTimeout(() => go("revealing"), 60);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  if (phase === "idle") return null;

  // below the screen -> covering it -> above the screen
  const y = phase === "covering" ? "0%" : phase === "covered" ? "0%" : "-100%";
  const ms = phase === "revealing" ? REVEAL_MS : COVER_MS;

  return (
    <div aria-hidden className="fixed inset-0 z-[200] pointer-events-auto overflow-hidden">
      <div
        className="absolute inset-x-0 -top-[90px] -bottom-[90px] flex flex-col"
        style={{
          transform: `translateY(${y})`,
          transition: `transform ${ms}ms cubic-bezier(0.77, 0, 0.18, 1)`,
          animation: phase === "covering" ? `curtain-in ${COVER_MS}ms cubic-bezier(0.77, 0, 0.18, 1) both` : undefined,
        }}
      >
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block w-full h-[90px] -mb-px shrink-0">
          <path fill={TEAL} d="M0 50C220 8 470 76 760 36C1010 4 1240 10 1440 30V90H0Z" />
        </svg>
        <div className="relative flex-1 flex items-center justify-center" style={{ background: TEAL }}>
          <svg viewBox="0 0 120 120" className="absolute w-[120px] top-[18%] start-[12%] opacity-90">
            <path fill={LIME} d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
          </svg>
          <svg viewBox="0 0 120 120" className="absolute w-[200px] bottom-[14%] end-[8%] opacity-25">
            <path fill={SAND} d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
          </svg>
          <img src={logoMark} alt="" className="relative h-16 w-16 object-contain brightness-0 invert" />
        </div>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block w-full h-[90px] -mt-px shrink-0">
          <path fill={TEAL} d="M0 0H1440V44C1200 84 960 18 690 56C430 88 200 76 0 36Z" />
        </svg>
      </div>
    </div>
  );
};
