"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Campus Map", href: "/map" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        opacity: 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 48px",
        height: "68px",
        background: scrolled ? "rgba(245,243,238,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,61,165,0.08)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "var(--primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ color: "white", fontFamily: "var(--font-serif)", fontSize: "14px" }}>A</span>
        </div>
        <span style={{
          fontFamily: "var(--font-jakarta)", fontWeight: 700,
          fontSize: "18px", color: "var(--foreground)", letterSpacing: "-0.02em",
        }}>
          ARM
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                fontFamily: "var(--font-jakarta)",
                fontSize: "14px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--primary)" : "var(--muted)",
                transition: "color 0.2s",
                position: "relative",
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)";
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
              }}
            >
              {link.label}
              {isActive && (
                <span style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "var(--primary)",
                  borderRadius: "2px",
                }} />
              )}
            </Link>
          );
        })}

        <Link href="/map" style={{ textDecoration: "none" }}>
          <button style={{
            fontFamily: "var(--font-jakarta)", fontSize: "14px", fontWeight: 600,
            padding: "10px 24px", borderRadius: "8px",
            background: "var(--primary)", color: "white", border: "none",
            cursor: "pointer", transition: "all 0.2s ease",
            letterSpacing: "-0.01em",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--primary-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--primary)")}
          >
            Get Access
          </button>
        </Link>
      </div>
    </nav>
  );
}