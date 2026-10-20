/* Lifts the first-load intro (the teal screen in index.html) once the app has
   mounted. The full intro gets time to play out (the drawn logo finishes
   around 3s) and a moment for fonts, never more than a hard cap; the
   quick version only waits for the mount. */

const FULL_MIN_MS = 3400;  // the drawn logo finishes at ~3.05s
const QUICK_MIN_MS = 250;
const FONT_WAIT_CAP_MS = 1200;
const LIFT_MS = 950;

let done = false;

export const liftIntro = () => {
  if (done) return;
  done = true;
  const el = document.getElementById("intro");
  if (!el) return;

  const start = (window as unknown as { __introStart?: number }).__introStart ?? Date.now();
  const min = el.classList.contains("quick") ? QUICK_MIN_MS : FULL_MIN_MS;
  const fonts = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, FONT_WAIT_CAP_MS)),
  ]);

  fonts.then(() => {
    const wait = Math.max(0, min - (Date.now() - start));
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), LIFT_MS + 50);
    }, wait);
  });
};
