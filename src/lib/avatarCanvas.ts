// ── Avatars on a canvas ──────────────────────────────────────────────────────
// The canvas games (Lava Floor, Paint Fight, Humans vs Zombies, Don't Look
// Down) draw a student the same way the <Avatar> component does everywhere
// else: their cut-paper shape (from the name), their color, their face on the
// shape's roomiest spot, and a dark outline. A shape spans about the same
// -1..1 box as a unit circle, so `r` is used exactly where a radius was.
import { BUDDY_SHAPES, type BuddyShape } from "@/components/site/buddyShapes";
import { shapeIndexForName } from "./avatarIdentity";

const NAMES = Object.keys(BUDDY_SHAPES) as BuddyShape[];
const paths = new Map<BuddyShape, Path2D>();

export const shapeForName = (name: string) => {
  const key = NAMES[shapeIndexForName(name, NAMES.length)];
  if (!paths.has(key)) paths.set(key, new Path2D(BUDDY_SHAPES[key].d));
  return { ...BUDDY_SHAPES[key], path: paths.get(key)! };
};

export const drawAvatar = (
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  name: string, color: string, face: HTMLImageElement | null | undefined,
  opts: { stroke?: string; lineWidth?: number; alpha?: number } = {},
) => {
  const s = shapeForName(name);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(r, r);
  if (opts.alpha != null) ctx.globalAlpha *= opts.alpha;
  ctx.fillStyle = color;
  ctx.fill(s.path);
  if (face && face.complete && face.naturalWidth) {
    const w = Math.min(s.fr * 2.7, 1.6);
    ctx.drawImage(face, s.fx - w / 2, s.fy - w / 2, w, w);
  }
  if (opts.stroke) {
    ctx.lineJoin = "round";
    ctx.lineWidth = (opts.lineWidth ?? Math.max(2, r * 0.12)) / r;
    ctx.strokeStyle = opts.stroke;
    ctx.stroke(s.path);
  }
  ctx.restore();
};
