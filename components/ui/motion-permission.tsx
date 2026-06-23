"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "clopp-motion-permission";

export function MotionPermission() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only relevant on iOS 13+
    if (
      typeof DeviceOrientationEvent === "undefined" ||
      typeof (DeviceOrientationEvent as any).requestPermission !== "function"
    ) return;

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "granted") {
      // Already granted — re-request silently (returns immediately, no dialog)
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((s: string) => { if (s === "granted") dispatchGranted(); })
        .catch(() => {});
      return;
    }

    if (stored === "denied") return;

    // First visit — show popup after preloader
    const t = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const dispatchGranted = () =>
    window.dispatchEvent(new Event("motion-permission-granted"));

  const allow = () => {
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((state: string) => {
        localStorage.setItem(STORAGE_KEY, state);
        if (state === "granted") dispatchGranted();
        setVisible(false);
      })
      .catch(() => setVisible(false));
  };

  const skip = () => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
        padding: "0 0 40px",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={skip}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          background: "#111",
          borderTop: "1px solid rgba(168,204,16,0.25)",
          padding: "32px 28px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Icon */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="14" y="2" width="12" height="36" rx="4" stroke="#A8CC10" strokeWidth="1.5"/>
          <circle cx="20" cy="32" r="2" fill="#A8CC10"/>
          <path d="M6 14 C2 14 2 26 6 26" stroke="#A8CC10" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M34 14 C38 14 38 26 34 26" stroke="#A8CC10" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 10 C-2 10 -2 30 2 30" stroke="rgba(168,204,16,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M38 10 C42 10 42 30 38 30" stroke="rgba(168,204,16,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "NeueHaasDisplay, Helvetica Neue, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "17px",
            letterSpacing: "0.06em",
            color: "#fff",
            marginBottom: "8px",
            textTransform: "uppercase",
          }}>
            Motion Access
          </p>
          <p style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
          }}>
            Allow device motion to enable<br />
            the interactive gallery experience.
          </p>
        </div>

        {/* Allow button */}
        <button
          onClick={allow}
          style={{
            width: "100%",
            padding: "14px",
            background: "#A8CC10",
            border: "none",
            color: "#000",
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Allow Permission
        </button>

        {/* Skip */}
        <button
          onClick={skip}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            cursor: "pointer",
            textTransform: "uppercase",
            padding: "4px",
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
