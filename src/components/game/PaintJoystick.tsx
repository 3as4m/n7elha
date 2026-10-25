import { useEffect, useRef, useState, type MutableRefObject } from "react";

export type JoystickVector = { dx: number; dy: number; magnitude: number };

interface Props {
  /** Mutated directly on every pointer move — kept out of React state so the
   *  60fps physics loop reading it never triggers a re-render. */
  vectorRef: MutableRefObject<JoystickVector>;
  maxRadius?: number;
  deadzone?: number;
  className?: string;
}

/**
 * Touch-anywhere virtual joystick: appears centered on the touch point, follows
 * the finger 1:1 within a clamped radius, and vanishes on release.
 *
 * Drift guards, all of which were real bugs before:
 *  - the touch origin lives in a REF, not state. With it in state, a move event
 *    that arrived in the same frame as the pointerdown (very common on a fast
 *    swipe) saw `origin === null` and was dropped, so the first flick of a
 *    stroke was silently ignored.
 *  - pointer capture is taken on `currentTarget`, so the gesture keeps tracking
 *    even if the finger slides over the HUD or off the edge of the screen.
 *    `pointerleave` is therefore NOT treated as a release — with capture it can
 *    fire mid-gesture and used to zero the stick under the player's thumb.
 *  - the vector is zeroed on unmount. The parent unmounts this component while
 *    the quiz overlay is open; without the cleanup the last non-zero vector
 *    stayed in the ref and the player kept sliding (and burning paint) the
 *    whole time the quiz was up.
 */
const PaintJoystick = ({ vectorRef, maxRadius = 60, deadzone = 8, className }: Props) => {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const originRef = useRef<{ x: number; y: number } | null>(null);
  const activeId = useRef<number | null>(null);

  const zero = () => {
    vectorRef.current.dx = 0;
    vectorRef.current.dy = 0;
    vectorRef.current.magnitude = 0;
  };

  useEffect(() => zero, []); // eslint-disable-line react-hooks/exhaustive-deps

  const release = () => {
    activeId.current = null;
    originRef.current = null;
    setOrigin(null);
    setKnob({ x: 0, y: 0 });
    zero();
  };

  const update = (clientX: number, clientY: number) => {
    const o = originRef.current;
    if (!o) return;
    let dx = clientX - o.x, dy = clientY - o.y;
    const dist = Math.hypot(dx, dy);
    if (dist > maxRadius) { dx = (dx / dist) * maxRadius; dy = (dy / dist) * maxRadius; }
    setKnob({ x: dx, y: dy });

    const clamped = Math.min(dist, maxRadius);
    if (clamped < deadzone || dist === 0) { zero(); return; }
    vectorRef.current.dx = dx / clamped;
    vectorRef.current.dy = dy / clamped;
    vectorRef.current.magnitude = (clamped - deadzone) / (maxRadius - deadzone);
  };

  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, touchAction: "none" }}
      onPointerDown={e => {
        if (activeId.current !== null) return;
        activeId.current = e.pointerId;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        originRef.current = { x: e.clientX, y: e.clientY };
        setOrigin({ x: e.clientX, y: e.clientY });
        setKnob({ x: 0, y: 0 });
        zero();
      }}
      onPointerMove={e => { if (activeId.current === e.pointerId) update(e.clientX, e.clientY); }}
      onPointerUp={e => { if (activeId.current === e.pointerId) release(); }}
      onPointerCancel={e => { if (activeId.current === e.pointerId) release(); }}
      onLostPointerCapture={e => { if (activeId.current === e.pointerId) release(); }}
    >
      {origin && (() => {
        const R = maxRadius, K = 26;
        return (
          <div className="pointer-events-none absolute animate-scale-in" style={{ left: origin.x - R, top: origin.y - R, width: R * 2, height: R * 2 }}>
            {/* the pad: black, with a black rim */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "rgba(17,17,17,0.55)",
              border: "3px solid #111111",
              // a faint light hairline so the black pad still shows on a dark floor
              boxShadow: "0 0 0 1.5px rgba(255,255,255,0.35), 0 8px 22px rgba(0,0,0,0.3)",
            }} />
            {/* the knob: plain white */}
            <div className="absolute rounded-full" style={{
              left: R + knob.x - K, top: R + knob.y - K, width: K * 2, height: K * 2,
              background: "#FFFFFF",
              border: "3px solid #111111",
              boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
            }} />
          </div>
        );
      })()}
    </div>
  );
};

export default PaintJoystick;
