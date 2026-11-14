import { LIME, SAND } from "@/components/teacher/DashboardAccents";
import { ShapeField } from "@/components/site/Buddy";

/* The home page's look for the inner pages (About, Features, Schools, Blog,
   Contact...): the sand and lime corner coming in behind the nav and hero,
   and the faceless cut-paper shapes scattered down both page edges below it,
   the same pattern as the home page. The corner is drawn for the end side and
   mirrored in Arabic, so it always sits away from the text. Place it as the
   first child of a page root that is `relative isolate`. It sits behind
   everything, ignores the pointer and never scrolls sideways. */
export const PageShapes = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-12 -end-16 w-[230px] md:w-[460px] rtl:-scale-x-100">
      <svg viewBox="0 0 400 400" className="w-full">
        <path fill={SAND} d="M400 0H70C20 40 48 118 100 172C154 228 132 300 204 356C254 396 338 404 400 392Z" />
        <path fill={LIME} d="M400 0H154C102 34 130 104 174 150C222 200 202 262 266 310C308 342 360 340 400 330Z" />
      </svg>
    </div>
    <div className="absolute inset-x-0 top-[520px] bottom-0">
      <ShapeField />
    </div>
  </div>
);
