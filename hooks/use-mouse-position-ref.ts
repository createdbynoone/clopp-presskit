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

    // ── Touch drag (all mobile) ──────────────────────────────────────────────
    let touching = false;
    const handleTouchStart = () => { touching = true; };
    const handleTouchEnd   = () => { touching = false; };
    const handleTouchMove  = (ev: TouchEvent) => {
      const t = ev.touches[0];
      updatePosition(t.clientX, t.clientY);
    };

    // ── Auto-float for touch devices (no permission needed) ──────────────────
    // Uses two independent sine waves so the path feels organic, not mechanical.
    let rafId: number;
    const startTime = Date.now();
    const autoFloat = () => {
      if (!touching) {
        const el = containerRef?.current as HTMLElement | null;
        const rect = el?.getBoundingClientRect();
        if (rect) {
          const t = (Date.now() - startTime) / 1000;
          positionRef.current = {
            x: rect.width  / 2 + Math.sin(t * 0.22)          * rect.width  * 0.3,
            y: rect.height / 2 + Math.sin(t * 0.17 + Math.PI / 2) * rect.height * 0.22,
          };
        }
      }
      rafId = requestAnimationFrame(autoFloat);
    };

    // ── Device orientation (Android gyroscope, no permission required) ────────
    const handleOrientation = (ev: DeviceOrientationEvent) => {
      if (touching) return;
      const el = containerRef?.current as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gamma = ev.gamma ?? 0;
      const beta  = (ev.beta ?? 60) - 60;
      positionRef.current = {
        x: Math.max(0, Math.min(rect.width,  rect.width  / 2 + (gamma / 25) * rect.width  * 0.5)),
        y: Math.max(0, Math.min(rect.height, rect.height / 2 + (beta  / 25) * rect.height * 0.4)),
      };
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
        // Android — gyroscope fires without permission
        window.addEventListener("deviceorientation", handleOrientation);
      } else {
        // iOS — listen for grant event dispatched by MotionPermission component
        const onGranted = () => window.addEventListener("deviceorientation", handleOrientation);
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
