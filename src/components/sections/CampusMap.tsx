"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const buildings = [
  {
    id: "sec",
    name: "SEC Building",
    short: "SEC",
    x: 200,
    y: 150,
    width: 120,
    height: 80,
    college: "School of Engineering",
    rooms: [
      { id: "SEC-301", name: "SEC 301", capacity: 40, schedule: [
        { time: "7:30 AM", subject: "CSCI 101", status: "occupied" },
        { time: "9:00 AM", subject: "CSCI 203", status: "occupied" },
        { time: "10:30 AM", subject: "", status: "free" },
        { time: "1:00 PM", subject: "CSCI 310", status: "occupied" },
        { time: "2:30 PM", subject: "", status: "free" },
      ]},
      { id: "SEC-302", name: "SEC 302", capacity: 35, schedule: [
        { time: "7:30 AM", subject: "", status: "free" },
        { time: "9:00 AM", subject: "MATH 101", status: "occupied" },
        { time: "10:30 AM", subject: "MATH 203", status: "occupied" },
        { time: "1:00 PM", subject: "", status: "free" },
        { time: "2:30 PM", subject: "PHYS 101", status: "occupied" },
      ]},
      { id: "SEC-305", name: "SEC 305", capacity: 50, schedule: [
        { time: "7:30 AM", subject: "ENGG 401", status: "occupied" },
        { time: "9:00 AM", subject: "", status: "free" },
        { time: "10:30 AM", subject: "", status: "free" },
        { time: "1:00 PM", subject: "ENGG 301", status: "occupied" },
        { time: "2:30 PM", subject: "", status: "free" },
      ]},
    ],
  },
  {
    id: "ls",
    name: "Leong Hall",
    short: "LS",
    x: 420,
    y: 120,
    width: 100,
    height: 90,
    college: "School of Management",
    rooms: [
      { id: "LS-101", name: "LS 101", capacity: 45, schedule: [
        { time: "7:30 AM", subject: "MIS 101", status: "occupied" },
        { time: "9:00 AM", subject: "MGT 201", status: "occupied" },
        { time: "10:30 AM", subject: "", status: "free" },
        { time: "1:00 PM", subject: "MIS 301", status: "occupied" },
        { time: "2:30 PM", subject: "ACCT 101", status: "occupied" },
      ]},
      { id: "LS-203", name: "LS 203", capacity: 30, schedule: [
        { time: "7:30 AM", subject: "", status: "free" },
        { time: "9:00 AM", subject: "", status: "free" },
        { time: "10:30 AM", subject: "FIN 301", status: "occupied" },
        { time: "1:00 PM", subject: "MIS 401", status: "occupied" },
        { time: "2:30 PM", subject: "", status: "free" },
      ]},
    ],
  },
  {
    id: "faura",
    name: "Faura Hall",
    short: "F",
    x: 340,
    y: 280,
    width: 90,
    height: 70,
    college: "School of Humanities",
    rooms: [
      { id: "F-201", name: "F 201", capacity: 55, schedule: [
        { time: "7:30 AM", subject: "PHILO 101", status: "occupied" },
        { time: "9:00 AM", subject: "", status: "free" },
        { time: "10:30 AM", subject: "THEO 141", status: "occupied" },
        { time: "1:00 PM", subject: "", status: "free" },
        { time: "2:30 PM", subject: "PHILO 301", status: "occupied" },
      ]},
      { id: "F-205", name: "F 205", capacity: 40, schedule: [
        { time: "7:30 AM", subject: "", status: "free" },
        { time: "9:00 AM", subject: "ENGL 101", status: "occupied" },
        { time: "10:30 AM", subject: "", status: "free" },
        { time: "1:00 PM", subject: "ENGL 201", status: "occupied" },
        { time: "2:30 PM", subject: "", status: "free" },
      ]},
    ],
  },
  {
    id: "rizal",
    name: "Rizal Library",
    short: "RL",
    x: 580,
    y: 240,
    width: 110,
    height: 95,
    college: "University Library",
    rooms: [
      { id: "RL-DSR", name: "Discussion Room A", capacity: 15, schedule: [
        { time: "7:30 AM", subject: "", status: "free" },
        { time: "9:00 AM", subject: "Reserved", status: "occupied" },
        { time: "10:30 AM", subject: "", status: "free" },
        { time: "1:00 PM", subject: "", status: "free" },
        { time: "2:30 PM", subject: "Reserved", status: "occupied" },
      ]},
      { id: "RL-DSB", name: "Discussion Room B", capacity: 15, schedule: [
        { time: "7:30 AM", subject: "Reserved", status: "occupied" },
        { time: "9:00 AM", subject: "", status: "free" },
        { time: "10:30 AM", subject: "Reserved", status: "occupied" },
        { time: "1:00 PM", subject: "Reserved", status: "occupied" },
        { time: "2:30 PM", subject: "", status: "free" },
      ]},
    ],
  },
  {
    id: "mvp",
    name: "MVP Sports Center",
    short: "MVP",
    x: 160,
    y: 300,
    width: 130,
    height: 85,
    college: "Athletics",
    rooms: [
      { id: "MVP-GYM", name: "Main Gymnasium", capacity: 500, schedule: [
        { time: "7:30 AM", subject: "PHED Class", status: "occupied" },
        { time: "9:00 AM", subject: "", status: "free" },
        { time: "10:30 AM", subject: "PHED Class", status: "occupied" },
        { time: "1:00 PM", subject: "Intramurals", status: "occupied" },
        { time: "2:30 PM", subject: "Intramurals", status: "occupied" },
      ]},
    ],
  },
];

type Building = typeof buildings[0];
type Room = typeof buildings[0]["rooms"][0];

export default function CampusMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [booked, setBooked] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    setSelectedRoom(null);
    setBooked(null);
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setBooked(null);
    gsap.fromTo(
      ".room-detail",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  };

  const handleBook = (slotTime: string) => {
    setBooked(slotTime);
    gsap.fromTo(
      ".book-confirm",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  const freeCount = selectedBuilding
    ? selectedBuilding.rooms.reduce(
        (acc, r) => acc + r.schedule.filter((s) => s.status === "free").length, 0
      )
    : 0;

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--background)", padding: "120px 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "60px", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--accent)" }} />
            <span style={{
              fontFamily: "var(--font-syne)", fontSize: "11px",
              letterSpacing: "0.3em", color: "var(--accent)", textTransform: "uppercase",
            }}>
              Interactive Campus Map
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300, color: "var(--foreground)", lineHeight: 1.1,
          }}>
            Find your space.<br />
            <em style={{ color: "var(--accent)" }}>Book it instantly.</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-syne)", fontSize: "13px", color: "rgba(240,237,230,0.4)",
            marginTop: "1rem", letterSpacing: "0.05em",
          }}>
            Click a building to explore rooms and availability.
          </p>
        </div>

        {/* Map + Panel */}
        <div style={{ display: "grid", gridTemplateColumns: selectedBuilding ? "1fr 380px" : "1fr", gap: "2rem", transition: "all 0.4s ease" }}>
          {/* SVG Map */}
          <div style={{
            border: "1px solid rgba(201,185,154,0.15)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
            background: "rgba(201,185,154,0.02)",
          }}>
            <svg
              ref={mapRef}
              viewBox="0 0 800 480"
              style={{ width: "100%", height: "auto", opacity: 0 }}
            >
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,185,154,0.06)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="480" fill="url(#grid)" />

              {/* Paths / roads */}
              <path d="M 0 220 Q 400 200 800 220" stroke="rgba(201,185,154,0.08)" strokeWidth="20" fill="none" />
              <path d="M 380 0 Q 370 240 380 480" stroke="rgba(201,185,154,0.08)" strokeWidth="16" fill="none" />

              {/* Green areas */}
              <ellipse cx="400" cy="230" rx="60" ry="40" fill="rgba(100,140,100,0.08)" />
              <ellipse cx="500" cy="380" rx="45" ry="30" fill="rgba(100,140,100,0.06)" />
              <ellipse cx="260" cy="200" rx="35" ry="25" fill="rgba(100,140,100,0.06)" />

              {/* Buildings */}
              {buildings.map((b) => {
                const isSelected = selectedBuilding?.id === b.id;
                const isHovered = hoveredBuilding === b.id;
                return (
                  <g
                    key={b.id}
                    onClick={() => handleBuildingClick(b)}
                    onMouseEnter={() => setHoveredBuilding(b.id)}
                    onMouseLeave={() => setHoveredBuilding(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Shadow */}
                    <rect
                      x={b.x + 4} y={b.y + 4}
                      width={b.width} height={b.height}
                      fill="rgba(0,0,0,0.3)" rx="2"
                    />
                    {/* Building body */}
                    <rect
                      x={b.x} y={b.y}
                      width={b.width} height={b.height}
                      fill={isSelected ? "rgba(201,185,154,0.25)" : isHovered ? "rgba(201,185,154,0.15)" : "rgba(201,185,154,0.07)"}
                      stroke={isSelected ? "rgba(201,185,154,0.9)" : isHovered ? "rgba(201,185,154,0.6)" : "rgba(201,185,154,0.25)"}
                      strokeWidth={isSelected ? 1.5 : 1}
                      rx="2"
                      style={{ transition: "all 0.2s ease" }}
                    />
                    {/* Building label */}
                    <text
                      x={b.x + b.width / 2}
                      y={b.y + b.height / 2 - 6}
                      textAnchor="middle"
                      fill={isSelected ? "rgba(201,185,154,1)" : "rgba(240,237,230,0.7)"}
                      fontSize="11"
                      fontFamily="var(--font-syne)"
                      fontWeight="700"
                      letterSpacing="0.15em"
                    >
                      {b.short}
                    </text>
                    <text
                      x={b.x + b.width / 2}
                      y={b.y + b.height / 2 + 10}
                      textAnchor="middle"
                      fill="rgba(240,237,230,0.35)"
                      fontSize="8"
                      fontFamily="var(--font-syne)"
                      letterSpacing="0.05em"
                    >
                      {b.rooms.length} rooms
                    </text>
                    {/* Selection dot */}
                    {isSelected && (
                      <circle
                        cx={b.x + b.width / 2}
                        cy={b.y - 10}
                        r="4"
                        fill="var(--accent)"
                      />
                    )}
                  </g>
                );
              })}

              {/* Compass */}
              <g transform="translate(750, 430)">
                <circle cx="0" cy="0" r="16" fill="rgba(10,10,10,0.8)" stroke="rgba(201,185,154,0.2)" strokeWidth="1" />
                <text x="0" y="-6" textAnchor="middle" fill="rgba(201,185,154,0.8)" fontSize="7" fontFamily="var(--font-syne)" fontWeight="700">N</text>
                <path d="M 0 -4 L 3 4 L 0 2 L -3 4 Z" fill="rgba(201,185,154,0.6)" />
              </g>

              {/* Legend */}
              <g transform="translate(20, 440)">
                <rect width="8" height="8" fill="rgba(201,185,154,0.25)" stroke="rgba(201,185,154,0.9)" strokeWidth="1" rx="1" />
                <text x="14" y="7" fill="rgba(240,237,230,0.4)" fontSize="8" fontFamily="var(--font-syne)">Selected</text>
                <rect x="80" width="8" height="8" fill="rgba(201,185,154,0.07)" stroke="rgba(201,185,154,0.25)" strokeWidth="1" rx="1" />
                <text x="94" y="7" fill="rgba(240,237,230,0.4)" fontSize="8" fontFamily="var(--font-syne)">Available</text>
              </g>
            </svg>
          </div>

          {/* Side Panel */}
          {selectedBuilding && (
            <div
              ref={panelRef}
              style={{
                border: "1px solid rgba(201,185,154,0.15)",
                padding: "32px 28px",
                overflowY: "auto",
                maxHeight: "520px",
                background: "rgba(201,185,154,0.02)",
              }}
            >
              {!selectedRoom ? (
                <>
                  {/* Building info */}
                  <div style={{ marginBottom: "28px" }}>
                    <span style={{
                      fontFamily: "var(--font-syne)", fontSize: "10px",
                      letterSpacing: "0.25em", color: "var(--accent)",
                      textTransform: "uppercase",
                    }}>
                      {selectedBuilding.college}
                    </span>
                    <h3 style={{
                      fontFamily: "var(--font-cormorant)", fontSize: "2rem",
                      fontWeight: 400, color: "var(--foreground)", marginTop: "6px",
                    }}>
                      {selectedBuilding.name}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-syne)", fontSize: "11px",
                      color: "rgba(240,237,230,0.4)", marginTop: "6px",
                    }}>
                      {freeCount} free slots available today
                    </p>
                  </div>

                  <div style={{ height: "1px", background: "rgba(201,185,154,0.1)", marginBottom: "24px" }} />

                  {/* Room list */}
                  <p style={{
                    fontFamily: "var(--font-syne)", fontSize: "10px",
                    letterSpacing: "0.2em", color: "rgba(240,237,230,0.3)",
                    textTransform: "uppercase", marginBottom: "16px",
                  }}>
                    Select a Room
                  </p>
                  {selectedBuilding.rooms.map((room) => {
                    const freeSlots = room.schedule.filter(s => s.status === "free").length;
                    return (
                      <div
                        key={room.id}
                        onClick={() => handleRoomClick(room)}
                        style={{
                          padding: "16px",
                          border: "1px solid rgba(201,185,154,0.1)",
                          marginBottom: "8px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,185,154,0.4)";
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(201,185,154,0.04)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,185,154,0.1)";
                          (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                      >
                        <div>
                          <p style={{
                            fontFamily: "var(--font-syne)", fontSize: "13px",
                            color: "var(--foreground)", fontWeight: 500,
                          }}>
                            {room.name}
                          </p>
                          <p style={{
                            fontFamily: "var(--font-syne)", fontSize: "11px",
                            color: "rgba(240,237,230,0.35)", marginTop: "3px",
                          }}>
                            Capacity: {room.capacity}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{
                            fontFamily: "var(--font-syne)", fontSize: "11px",
                            color: freeSlots > 0 ? "#7db87d" : "rgba(240,237,230,0.3)",
                          }}>
                            {freeSlots} free
                          </span>
                          <p style={{
                            fontFamily: "var(--font-syne)", fontSize: "10px",
                            color: "rgba(201,185,154,0.5)", marginTop: "3px",
                          }}>
                            View →
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="room-detail" style={{ opacity: 0 }}>
                  {/* Back button */}
                  <button
                    onClick={() => { setSelectedRoom(null); setBooked(null); }}
                    style={{
                      fontFamily: "var(--font-syne)", fontSize: "10px",
                      letterSpacing: "0.2em", color: "var(--accent)",
                      textTransform: "uppercase", background: "transparent",
                      border: "none", cursor: "pointer", marginBottom: "20px",
                      padding: 0,
                    }}
                  >
                    ← Back to {selectedBuilding.name}
                  </button>

                  <h3 style={{
                    fontFamily: "var(--font-cormorant)", fontSize: "1.8rem",
                    fontWeight: 400, color: "var(--foreground)", marginBottom: "4px",
                  }}>
                    {selectedRoom.name}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-syne)", fontSize: "11px",
                    color: "rgba(240,237,230,0.35)", marginBottom: "24px",
                  }}>
                    Capacity: {selectedRoom.capacity} people
                  </p>

                  <div style={{ height: "1px", background: "rgba(201,185,154,0.1)", marginBottom: "20px" }} />

                  <p style={{
                    fontFamily: "var(--font-syne)", fontSize: "10px",
                    letterSpacing: "0.2em", color: "rgba(240,237,230,0.3)",
                    textTransform: "uppercase", marginBottom: "14px",
                  }}>
                    Today's Schedule
                  </p>

                  {/* Schedule */}
                  {selectedRoom.schedule.map((slot) => {
                    const isFree = slot.status === "free";
                    const isBooked = booked === slot.time;
                    return (
                      <div
                        key={slot.time}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 14px",
                          marginBottom: "6px",
                          border: `1px solid ${isBooked ? "rgba(201,185,154,0.6)" : isFree ? "rgba(125,184,125,0.2)" : "rgba(240,237,230,0.06)"}`,
                          background: isBooked ? "rgba(201,185,154,0.08)" : "transparent",
                          borderRadius: "1px",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div>
                          <span style={{
                            fontFamily: "var(--font-syne)", fontSize: "11px",
                            color: "rgba(240,237,230,0.5)",
                          }}>
                            {slot.time}
                          </span>
                          <p style={{
                            fontFamily: "var(--font-syne)", fontSize: "12px",
                            color: isFree ? "#7db87d" : "rgba(240,237,230,0.6)",
                            marginTop: "2px",
                          }}>
                            {isFree ? "Available" : slot.subject}
                          </p>
                        </div>
                        {isFree && !isBooked && (
                          <button
                            onClick={() => handleBook(slot.time)}
                            style={{
                              fontFamily: "var(--font-syne)", fontSize: "10px",
                              letterSpacing: "0.15em", textTransform: "uppercase",
                              padding: "6px 14px", background: "transparent",
                              border: "1px solid rgba(125,184,125,0.4)",
                              color: "#7db87d", cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={e => {
                              (e.target as HTMLButtonElement).style.background = "rgba(125,184,125,0.1)";
                            }}
                            onMouseLeave={e => {
                              (e.target as HTMLButtonElement).style.background = "transparent";
                            }}
                          >
                            Reserve
                          </button>
                        )}
                        {isBooked && (
                          <span style={{
                            fontFamily: "var(--font-syne)", fontSize: "10px",
                            letterSpacing: "0.15em", textTransform: "uppercase",
                            color: "var(--accent)",
                          }}>
                            ✓ Reserved
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {/* Booking confirmation */}
                  {booked && (
                    <div
                      className="book-confirm"
                      style={{
                        marginTop: "20px",
                        padding: "16px",
                        border: "1px solid rgba(201,185,154,0.3)",
                        background: "rgba(201,185,154,0.05)",
                        opacity: 0,
                      }}
                    >
                      <p style={{
                        fontFamily: "var(--font-cormorant)", fontSize: "1.1rem",
                        fontStyle: "italic", color: "var(--accent)", marginBottom: "4px",
                      }}>
                        Reservation confirmed.
                      </p>
                      <p style={{
                        fontFamily: "var(--font-syne)", fontSize: "11px",
                        color: "rgba(240,237,230,0.4)",
                      }}>
                        {selectedRoom.name} · {booked} · {selectedBuilding.name}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Close panel */}
              <button
                onClick={() => { setSelectedBuilding(null); setSelectedRoom(null); setBooked(null); }}
                style={{
                  marginTop: "24px",
                  fontFamily: "var(--font-syne)", fontSize: "10px",
                  letterSpacing: "0.2em", color: "rgba(240,237,230,0.25)",
                  textTransform: "uppercase", background: "transparent",
                  border: "none", cursor: "pointer", padding: 0,
                }}
              >
                Close ×
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}