"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, headingRef.current, subRef.current, ctaRef.current, illustrationRef.current], {
        opacity: 0, y: 30,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(illustrationRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.6")
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        paddingTop: "68px",
      }}
    >
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,61,165,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Blue blob top right */}
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,61,165,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Gold blob bottom left */}
      <div style={{
        position: "absolute", bottom: "-80px", left: "-80px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Hero content */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        padding: "40px 48px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        position: "relative",
        zIndex: 10,
      }}>
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <div ref={badgeRef} style={{
            opacity: 0,
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,61,165,0.08)", borderRadius: "100px",
            padding: "6px 14px 6px 8px",
            marginBottom: "28px",
          }}>
            <span style={{
              background: "var(--primary)", color: "white",
              borderRadius: "100px", padding: "2px 10px",
              fontFamily: "var(--font-jakarta)", fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.05em",
            }}>NEW</span>
            <span style={{
              fontFamily: "var(--font-jakarta)", fontSize: "12px",
              color: "var(--primary)", fontWeight: 600,
            }}>
              Now live for Ateneo students
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef} style={{ opacity: 0 }}>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
              fontWeight: 400,
              color: "var(--foreground)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}>
              Find a room.<br />
              Book it in seconds.<br />
              <span style={{ color: "var(--primary)" }}>Make the most of</span>{" "}
              <em>campus life.</em>
            </h1>
          </div>

          {/* Subtext */}
          <p ref={subRef} style={{
            opacity: 0,
            fontFamily: "var(--font-jakarta)",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "var(--muted)",
            marginBottom: "36px",
            maxWidth: "480px",
            fontWeight: 400,
          }}>
            ARM (Ateneo Room Management) brings the entire campus into one platform—real-time room availability, seamless booking, and total control over your schedule.
          </p>

          {/* CTA */}
          <div ref={ctaRef} style={{
            opacity: 0,
            display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap",
          }}>
            <button style={{
              fontFamily: "var(--font-jakarta)", fontSize: "15px", fontWeight: 700,
              padding: "14px 32px", borderRadius: "10px",
              background: "var(--primary)", color: "white",
              border: "none", cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(0,61,165,0.25)",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-light)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,61,165,0.35)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,61,165,0.25)";
              }}
            >
              Explore the Campus →
            </button>
            <button style={{
              fontFamily: "var(--font-jakarta)", fontSize: "15px", fontWeight: 600,
              padding: "14px 28px", borderRadius: "10px",
              background: "transparent", color: "var(--foreground)",
              border: "1.5px solid rgba(0,61,165,0.15)", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,61,165,0.15)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
              }}
            >
              See how it works
            </button>
          </div>

          {/* Social proof */}
          <div style={{
            marginTop: "40px", display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{ display: "flex" }}>
              {["#003DA5", "#1a56c4", "#2d6fd4", "#4080e0"].map((color, i) => (
                <div key={i} style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: color, border: "2px solid var(--background)",
                  marginLeft: i === 0 ? 0 : "-8px",
                }} />
              ))}
            </div>
            <p style={{
              fontFamily: "var(--font-jakarta)", fontSize: "13px",
              color: "var(--muted)", fontWeight: 500,
            }}>
              <strong style={{ color: "var(--foreground)" }}>2,400+ students</strong> already using ARM
            </p>
          </div>
        </div>

        {/* Right: Illustration */}
        <div ref={illustrationRef} style={{ opacity: 0, position: "relative" }}>
          {/* Main card */}
          <div style={{
            background: "var(--surface)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 20px 60px rgba(0,61,165,0.12)",
            border: "1px solid rgba(0,61,165,0.08)",
            position: "relative",
          }}>
            {/* Card header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "20px",
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-jakarta)", fontSize: "12px",
                  color: "var(--muted)", fontWeight: 500, marginBottom: "4px",
                }}>
                  PLDT-CTC 205
                </p>
                <p style={{
                  fontFamily: "var(--font-serif)", fontSize: "20px",
                  color: "var(--foreground)",
                }}>
                  Available now
                </p>
              </div>
              <div style={{
                background: "rgba(0,200,100,0.1)", borderRadius: "8px",
                padding: "6px 12px",
              }}>
                <span style={{
                  fontFamily: "var(--font-jakarta)", fontSize: "12px",
                  color: "#00a855", fontWeight: 700,
                }}>● OPEN</span>
              </div>
            </div>

            {/* Mini schedule */}
            {[
              { time: "8:00 AM", label: "PHILO 13", free: false },
              { time: "9:30 AM", label: "Available", free: true },
              { time: "3:30 PM", label: "MSYS 60", free: false },
              { time: "5:00 PM", label: "Available", free: true },
            ].map((slot) => (
              <div key={slot.time} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px", borderRadius: "8px",
                background: slot.free ? "rgba(0,61,165,0.04)" : "transparent",
                border: `1px solid ${slot.free ? "rgba(0,61,165,0.1)" : "rgba(0,0,0,0.05)"}`,
                marginBottom: "6px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: slot.free ? "#00a855" : "rgba(0,0,0,0.15)",
                  }} />
                  <span style={{
                    fontFamily: "var(--font-jakarta)", fontSize: "13px",
                    color: slot.free ? "var(--foreground)" : "var(--muted)",
                    fontWeight: slot.free ? 600 : 400,
                  }}>
                    {slot.label}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    fontFamily: "var(--font-jakarta)", fontSize: "12px",
                    color: "var(--muted)",
                  }}>{slot.time}</span>
                  {slot.free && (
                    <button style={{
                      fontFamily: "var(--font-jakarta)", fontSize: "11px",
                      fontWeight: 700, padding: "4px 12px", borderRadius: "6px",
                      background: "var(--primary)", color: "white",
                      border: "none", cursor: "pointer",
                    }}>
                      Book
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Capacity badge */}
            <div style={{
              marginTop: "16px", padding: "12px 14px",
              background: "rgba(245,200,66,0.1)", borderRadius: "10px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(245,200,66,0.25)",
            }}>
              <span style={{
                fontFamily: "var(--font-jakarta)", fontSize: "13px",
                color: "var(--foreground)", fontWeight: 600,
              }}>
                Capacity: 45 people
              </span>
              <span style={{
                fontFamily: "var(--font-jakarta)", fontSize: "12px",
                color: "var(--accent-dark)", fontWeight: 600,
              }}>
                2 free slots today
              </span>
            </div>
          </div>

          {/* Floating badge top right */}
          <div style={{
            position: "absolute", top: "-16px", right: "-16px",
            background: "var(--accent)", borderRadius: "12px",
            padding: "10px 16px",
            boxShadow: "0 8px 24px rgba(245,200,66,0.35)",
          }}>
            <p style={{
              fontFamily: "var(--font-jakarta)", fontSize: "11px",
              fontWeight: 800, color: "var(--foreground)",
              letterSpacing: "-0.01em",
            }}>12 buildings</p>
            <p style={{
              fontFamily: "var(--font-jakarta)", fontSize: "11px",
              fontWeight: 500, color: "rgba(10,22,40,0.6)",
            }}>on campus</p>
          </div>

          {/* Floating badge bottom left */}
          <div style={{
            position: "absolute", bottom: "-16px", left: "-16px",
            background: "var(--surface)", borderRadius: "12px",
            padding: "10px 16px",
            boxShadow: "0 8px 24px rgba(0,61,165,0.12)",
            border: "1px solid rgba(0,61,165,0.08)",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "rgba(0,200,100,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px",
            }}>✓</div>
            <div>
              <p style={{
                fontFamily: "var(--font-jakarta)", fontSize: "12px",
                fontWeight: 700, color: "var(--foreground)",
              }}>Reserved!</p>
              <p style={{
                fontFamily: "var(--font-jakarta)", fontSize: "11px",
                color: "var(--muted)",
              }}>SEC 301 · 10:30 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}