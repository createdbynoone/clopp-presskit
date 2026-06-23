import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;

    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);

    // ── Touch drag ────────────────────────────────────────────────────────────
    let touching = false;
    const handleTouchStart = () => { touching = true; };
    const handleTouchEnd   = () => { touching = false; };
    const handleTouchMove  = (ev: TouchEvent) => {
      const t = ev.touches[0];
      updatePosition(t.clientX, t.clientY);
    };

    // ── Device orientation (gyroscope) ────────────────────────────────────────
    // Position is relative to neutral (0,0) so images rest at their CSS positions.
    const handleOrientation = (ev: DeviceOrientationEvent) => {
      if (touching) return;
      const el = containerRef?.current as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gamma = ev.gamma ?? 0;       // left-right: neutral = 0
      const beta  = (ev.beta ?? 60) - 60; // front-back: normalize to 0 at hold angle
      positionRef.current = {
        x: (gamma / 25) * rect.width  * 0.5,
        y: (beta  / 25) * rect.height * 0.4,
      };
    };

    // ── Auto-float: two sine waves for organic motion (no permission needed) ──
    // Oscillates around 0 so images rest at their CSS positions when neutral.
    let rafId: number;
    let orientationActive = false;
    const startTime = Date.now();

    const autoFloat = () => {
      if (!touching && !orientationActive) {
        const el = containerRef?.current as HTMLElement | null;
        const rect = el?.getBoundingClientRect();
        if (rect) {
          const t = (Date.now() - startTime) / 1000;
          positionRef.current = {
            x: Math.sin(t * 0.22)                 * rect.width  * 0.25,
            y: Math.sin(t * 0.17 + Math.PI / 2)   * rect.height * 0.18,
          };
        }
      }
      rafId = requestAnimationFrame(autoFloat);
    };

    window.addEventListener("mousemove", handleMouseMove);

    if (isTouchDevice) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend",   handleTouchEnd);
      window.addEventListener("touchmove",  handleTouchMove);
      rafId = requestAnimationFrame(autoFloat);

      const isIOS =
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function";

      if (!isIOS) {
        // Android — gyroscope fires without permission, overrides auto-float
        orientationActive = true;
        window.addEventListener("deviceorientation", handleOrientation);
      } else {
        // iOS — activate gyroscope when MotionPermission component grants access
        const onGranted = () => {
          orientationActive = true;
          window.addEventListener("deviceorientation", handleOrientation);
        };
        window.addEventListener("motion-permission-granted", onGranted, { once: true });
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (isTouchDevice) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend",   handleTouchEnd);
        window.removeEventListener("touchmove",  handleTouchMove);
        window.removeEventListener("deviceorientation", handleOrientation);
        cancelAnimationFrame(rafId);
      }
    };
  }, [containerRef]);

  return positionRef;
};
