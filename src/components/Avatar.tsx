import { cn } from "@/lib/utils";
import { resolveColor, resolveFace, shapeIndexForName } from "@/lib/avatarIdentity";
import { BUDDY_SHAPES, type BuddyShape } from "@/components/site/buddyShapes";

const SIZES = { sm: 32, md: 40, lg: 64, xl: 96 } as const;
const SHAPES = Object.keys(BUDDY_SHAPES) as BuddyShape[];

interface Props {
  name: string;
  size?: keyof typeof SIZES | number;
  className?: string;
  /** A student's stored choice, from game_students.avatar_color/avatar_face. Omit to fall back to the name hash. */
  colorIndex?: number | null;
  faceIndex?: number | null;
  /** Overrides the color, for a mode that paints the avatar its own color (Paint Fight's paint). */
  fill?: string;
}

/* A student is one of the site's cut-paper buddies: the shape comes from
   their name, the fill and the face are what they picked on the join screen.
   The face sits on the shape's roomiest spot, sized to the room it has, and
   the outline is the site's dark border so it reads as a sticker. */
export const Avatar = ({ name, size = "md", className, colorIndex, faceIndex, fill }: Props) => {
  const px = typeof size === "number" ? size : SIZES[size];
  const shape = BUDDY_SHAPES[SHAPES[shapeIndexForName(name, SHAPES.length)]];
  const bg = fill ?? resolveColor(name, colorIndex);
  const face = resolveFace(name, faceIndex);
  const w = Math.min(shape.fr * 2.7, 1.6);

  return (
    <svg
      viewBox="-1.12 -1.12 2.24 2.24"
      width={px}
      height={px}
      aria-hidden
      className={cn("shrink-0 select-none overflow-visible", className)}
    >
      <path d={shape.d} fill={bg} stroke="hsl(var(--nb-border))" strokeWidth={0.07} strokeLinejoin="round" />
      {face && <image href={face} x={shape.fx - w / 2} y={shape.fy - w / 2} width={w} height={w} />}
    </svg>
  );
};

export default Avatar;
