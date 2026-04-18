"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.out", transformOrigin: "left" }
      )
      .fromTo(textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 2rem",
        position: "relative",
        borderTop: "1px solid rgba(201,185,154,0.1)",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(201,185,154,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* Animated line */}
        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(201,185,154,0.3)",
            marginBottom: "60px",
            transformOrigin: "left",
          }}
        />

        {/* Main text */}
        <div ref={textRef} style={{ opacity: 0 }}>
          <span style={{
            fontFamily: "var(--font-syne)",
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "var(--accent)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "2rem",
          }}>
            Built for Ateneo. Designed for everyone.
          </span>

          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 9vw, 8rem)",
            fontWeight: 300,
            color: "var(--foreground)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            maxWidth: "900px",
          }}>
            Your campus,<br />
            <em style={{ color: "var(--accent)" }}>finally</em> at your<br />
            fingertips.
          </h2>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            marginTop: "60px",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "16px 42px",
              border: "1px solid var(--accent)",
              color: "var(--background)",
              background: "var(--accent)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.background = "transparent";
              (e.target as HTMLButtonElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.background = "var(--accent)";
              (e.target as HTMLButtonElement).style.color = "var(--background)";
            }}
          >
            Get Early Access
          </button>

          <span style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "rgba(240,237,230,0.3)",
          }}>
            Free for all Ateneo students.
          </span>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          style={{
            opacity: 0,
            marginTop: "120px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "2rem",
              fontWeight: 300,
              color: "var(--foreground)",
              letterSpacing: "0.1em",
            }}>
              ARM
            </p>
            <p style={{
              fontFamily: "var(--font-syne)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(240,237,230,0.25)",
              textTransform: "uppercase",
              marginTop: "4px",
            }}>
              Ateneo Smart Campus Platform
            </p>
          </div>

          <div style={{ display: "flex", gap: "3rem" }}>
            {["About", "Features", "Campus Map", "Contact"].map((link) => (
              <span
                key={link}
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "rgba(240,237,230,0.25)",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,230,0.25)")}
              >
                {link}
              </span>
            ))}
          </div>

          <p style={{
            fontFamily: "var(--font-syne)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "rgba(240,237,230,0.15)",
            textTransform: "uppercase",
          }}>
            © 2026 ARETE · Ateneo de Manila University
          </p>
        </div>
      </div>
    </section>
  );
}