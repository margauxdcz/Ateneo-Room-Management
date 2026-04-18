"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const features = [
  {
    number: "01",
    title: "Campus Map",
    subtitle: "See everything, instantly.",
    description:
      "A live, interactive map of the entire Ateneo campus. Every building, every floor, every room — visualized in real time. Know what's occupied and what's free before you even leave your dorm.",
    tag: "Spatial Intelligence",
  },
  {
    number: "02",
    title: "Room Booking",
    subtitle: "Reserve in three taps.",
    description:
      "Browse available rooms by building, capacity, or time slot. See the full schedule at a glance and lock in your reservation instantly. No more group chats. No more guessing.",
    tag: "Reservation System",
  },
  {
    number: "03",
    title: "Campus Analytics",
    subtitle: "Data that drives decisions.",
    description:
      "Administrators get a live dashboard of campus utilization — which rooms are overbooked, which are underused, and where to invest next. MIS meets infrastructure.",
    tag: "Data & Insights",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--background)",
        padding: "120px 2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--accent)" }} />
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: "var(--accent)",
                textTransform: "uppercase",
              }}
            >
              What ARETE does
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "var(--foreground)",
              lineHeight: 1.1,
              maxWidth: "600px",
            }}
          >
            One platform.
            <br />
            <em style={{ color: "var(--accent)" }}>Every space.</em>
          </h2>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={feature.number}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              style={{
                opacity: 0,
                padding: "48px 36px",
                border: "1px solid rgba(201,185,154,0.1)",
                position: "relative",
                cursor: "default",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,185,154,0.4)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(201,185,154,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,185,154,0.1)";
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "5rem",
                  fontWeight: 300,
                  color: "rgba(0, 61, 165, 0.1)",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "1.5rem",
                }}
              >
                {feature.number}
              </span>

              {/* Tag */}
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {feature.tag}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                {feature.title}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "var(--accent)",
                  marginBottom: "1.5rem",
                }}
              >
                {feature.subtitle}
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "rgba(201,185,154,0.3)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "rgba(240,237,230,0.5)",
                  fontWeight: 400,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}