"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stats = [
  { value: 12, label: "Buildings", suffix: "" },
  { value: 200, label: "Rooms", suffix: "+" },
  { value: 0, label: "Scheduling Conflicts", suffix: "" },
  { value: 98, label: "Uptime", suffix: "%" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el, i) => {
        const target = stats[i].value;

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: function () {
              el.innerText = Math.round(parseFloat(el.innerText)).toString();
            },
          }
        );
      });

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        background: "var(--background)",
        borderTop: "1px solid rgba(201,185,154,0.15)",
        borderBottom: "1px solid rgba(201,185,154,0.15)",
        padding: "48px 0",
      }}
    >
      <div
        ref={containerRef}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          opacity: 0,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300,
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              <span
                ref={(el) => {
                  if (el) numbersRef.current[i] = el;
                }}
              >
                0
              </span>
              <span style={{ color: "var(--accent)" }}>{stat.suffix}</span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(240,237,230,0.4)",
                marginTop: "0.5rem",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}