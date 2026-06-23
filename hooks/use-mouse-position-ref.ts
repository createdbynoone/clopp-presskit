import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    // Device orientation (gyroscope) — mobile parallax
    const handleOrientation = (ev: DeviceOrientationEvent) => {
      const el = containerRef?.current as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gamma = ev.gamma ?? 0;       // left-right tilt: -90 to 90, neutral = 0
      const beta  = (ev.beta ?? 60) - 60; // front-back offset from ~natural hold angle

      const x = rect.width  / 2 + (gamma / 25) * rect.width  * 0.5;
      const y = rect.height / 2 + (beta  / 25) * rect.height * 0.4;

      positionRef.current = {
        x: Math.max(0, Math.min(rect.width,  x)),
        y: Math.max(0, Math.min(rect.height, y)),
      };
    };

    // iOS 13+ requires explicit permission for DeviceOrientationEvent
    const addOrientationListener = () => {
      if (typeof DeviceOrientationEvent !== "undefined" &&
          typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        (DeviceOrientationEvent as any).requestPermission()
          .then((state: string) => {
            if (state === "granted")
              window.addEventListener("deviceorientation", handleOrientation);
          })
          .catch(() => {});
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    addOrientationListener();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [containerRef]);

  return positionRef;
};
