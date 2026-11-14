import { useEffect, useRef, useState } from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";

/* The 30-second games explainer, hosted on the nefelha-media R2 bucket. It
   plays muted, once, while it's on screen (so it costs nothing until someone
   scrolls to it); one button turns the sound on, and when it ends a replay
   button takes its place in the middle. */

const R2 = "https://pub-14fafac9de3844818501f61eba8c8b56.r2.dev";

export const ExplainerVideo = ({ soundOn, soundOff, replay }: { soundOn: string; soundOff: string; replay: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!v.ended) v.play().catch(() => {}); }
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const again = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setEnded(false);
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !muted;
    if (muted) { v.currentTime = 0; v.play().catch(() => {}); setEnded(false); }
    setMuted(!muted);
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={`${R2}/video/platform.mp4`}
        poster={`${R2}/video/platform-poster.jpg`}
        muted
        playsInline
        onEnded={() => setEnded(true)}
        preload="none"
        className="block w-full aspect-video rounded-xl bg-[#E9DFC8]"
      />
      {ended && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#12262B]/35">
          <button
            type="button"
            onClick={again}
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-[hsl(var(--nb-border))] bg-[#A9CB1E] text-[#12262B] ps-4 pe-6 py-3 text-[16px] font-semibold shadow-[4px_4px_0_0_hsl(var(--nb-border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_hsl(var(--nb-border))] transition-all"
          >
            <RotateCcw className="h-5 w-5" strokeWidth={2.5} />
            {replay}
          </button>
        </div>
      )}
      {!ended && <button
        type="button"
        onClick={toggle}
        aria-label={muted ? soundOn : soundOff}
        className="absolute bottom-3 end-3 sm:bottom-4 sm:end-4 inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--nb-border))] bg-[#A9CB1E] text-[#12262B] ps-3 pe-4 py-1.5 text-[13px] font-semibold shadow-[3px_3px_0_0_hsl(var(--nb-border))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_hsl(var(--nb-border))] transition-all"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {muted ? soundOn : soundOff}
      </button>}
    </div>
  );
};
