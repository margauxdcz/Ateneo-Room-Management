"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const buildings = [
  {
    id: "seca",
    name: "SEC A Building",
    short: "SEC A",
    x: 310,
    y: 300,
    width: 70,
    height: 50,
    college: "School of Engineering & Science",
    rooms: [
      {
        id: "SECA-301", name: "SEC A 301", capacity: 40, schedule: [
          { time: "7:30 AM", subject: "CSCI 101", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "10:30 AM", subject: "CSCI 203", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "CSCI 310", status: "occupied" },
        ]
      },
      {
        id: "SECA-302", name: "SEC A 302", capacity: 35, schedule: [
          { time: "7:30 AM", subject: "MATH 101", status: "occupied" },
          { time: "9:00 AM", subject: "MATH 203", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "PHYS 101", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "secb",
    name: "SEC B Building",
    short: "SEC B",
    x: 390,
    y: 300,
    width: 70,
    height: 50,
    college: "School of Engineering & Science",
    rooms: [
      {
        id: "SECB-101", name: "SEC B 101", capacity: 45, schedule: [
          { time: "7:30 AM", subject: "", status: "free" },
          { time: "9:00 AM", subject: "ENGG 201", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "ENGG 301", status: "occupied" },
          { time: "2:30 PM", subject: "", status: "free" },
        ]
      },
    ],
  },
  {
    id: "secc",
    name: "SEC C Building",
    short: "SEC C",
    x: 470,
    y: 300,
    width: 70,
    height: 50,
    college: "School of Engineering & Science",
    rooms: [
      {
        id: "SECC-201", name: "SEC C 201", capacity: 50, schedule: [
          { time: "7:30 AM", subject: "PHYS 101", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "10:30 AM", subject: "CHEM 101", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "BIO 101", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "ctc",
    name: "PLDT-CTC Building",
    short: "CTC",
    x: 370,
    y: 220,
    width: 65,
    height: 45,
    college: "Communication Technology Center",
    rooms: [
      {
        id: "CTC-L1", name: "CTC Lab 1", capacity: 30, schedule: [
          { time: "7:30 AM", subject: "MIS 201", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "10:30 AM", subject: "MIS 301", status: "occupied" },
          { time: "1:00 PM", subject: "MIS 401", status: "occupied" },
          { time: "2:30 PM", subject: "", status: "free" },
        ]
      },
      {
        id: "CTC-L2", name: "CTC Lab 2", capacity: 30, schedule: [
          { time: "7:30 AM", subject: "", status: "free" },
          { time: "9:00 AM", subject: "CS 101", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "CS 301", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "jgsom",
    name: "JGSOM Building",
    short: "SOM",
    x: 230,
    y: 210,
    width: 80,
    height: 60,
    college: "John Gokongwei School of Management",
    rooms: [
      {
        id: "SOM-101", name: "SOM 101", capacity: 55, schedule: [
          { time: "7:30 AM", subject: "MGT 101", status: "occupied" },
          { time: "9:00 AM", subject: "MGT 201", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "MIS 101", status: "occupied" },
          { time: "2:30 PM", subject: "", status: "free" },
        ]
      },
      {
        id: "SOM-201", name: "SOM 201", capacity: 40, schedule: [
          { time: "7:30 AM", subject: "", status: "free" },
          { time: "9:00 AM", subject: "ACCT 101", status: "occupied" },
          { time: "10:30 AM", subject: "FIN 201", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "MKT 101", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "gonzaga",
    name: "Gonzaga Hall",
    short: "GH",
    x: 310,
    y: 150,
    width: 65,
    height: 45,
    college: "College of Arts & Sciences",
    rooms: [
      {
        id: "GH-101", name: "GH 101", capacity: 45, schedule: [
          { time: "7:30 AM", subject: "PHILO 101", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "10:30 AM", subject: "ENGL 101", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "HIST 101", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "kostka",
    name: "Kostka Hall",
    short: "KH",
    x: 160,
    y: 160,
    width: 60,
    height: 45,
    college: "College of Arts & Sciences",
    rooms: [
      {
        id: "KH-101", name: "KH 101", capacity: 40, schedule: [
          { time: "7:30 AM", subject: "", status: "free" },
          { time: "9:00 AM", subject: "THEO 11", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "THEO 13", status: "occupied" },
          { time: "2:30 PM", subject: "", status: "free" },
        ]
      },
    ],
  },
  {
    id: "berchmans",
    name: "Berchmans Hall",
    short: "BH",
    x: 155,
    y: 240,
    width: 65,
    height: 50,
    college: "College of Arts & Sciences",
    rooms: [
      {
        id: "BH-101", name: "BH 101", capacity: 50, schedule: [
          { time: "7:30 AM", subject: "SOSC 101", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "10:30 AM", subject: "SOSC 102", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "SOSC 201", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "faura",
    name: "Faura Hall",
    short: "FH",
    x: 460,
    y: 180,
    width: 65,
    height: 50,
    college: "College of Arts & Sciences",
    rooms: [
      {
        id: "FH-201", name: "FH 201", capacity: 55, schedule: [
          { time: "11:00 AM", subject: "MSYS 51", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "3:30 PM", subject: "MSYS 42", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "6:30 PM", subject: "MSYS 60", status: "occupied" },
        ]
      },
      {
        id: "FH-205", name: "FH 205", capacity: 40, schedule: [
          { time: "7:30 AM", subject: "", status: "free" },
          { time: "9:00 AM", subject: "ENGL 101", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "ENGL 201", status: "occupied" },
          { time: "2:30 PM", subject: "", status: "free" },
        ]
      },
    ],
  },
  {
    id: "pipac",
    name: "PIPAC",
    short: "PAC",
    x: 560,
    y: 250,
    width: 70,
    height: 55,
    college: "Performance & Arts Center",
    rooms: [
      {
        id: "PAC-MAIN", name: "Main Hall", capacity: 200, schedule: [
          { time: "7:30 AM", subject: "", status: "free" },
          { time: "9:00 AM", subject: "Reserved", status: "occupied" },
          { time: "10:30 AM", subject: "", status: "free" },
          { time: "1:00 PM", subject: "Event", status: "occupied" },
          { time: "2:30 PM", subject: "Event", status: "occupied" },
        ]
      },
    ],
  },
  {
    id: "schmitt",
    name: "Schmitt Hall",
    short: "SH",
    x: 560,
    y: 160,
    width: 65,
    height: 45,
    college: "College of Arts & Sciences",
    rooms: [
      {
        id: "SH-101", name: "SH 101", capacity: 45, schedule: [
          { time: "7:30 AM", subject: "MATH 101", status: "occupied" },
          { time: "9:00 AM", subject: "", status: "free" },
          { time: "10:30 AM", subject: "MATH 201", status: "occupied" },
          { time: "1:00 PM", subject: "", status: "free" },
          { time: "2:30 PM", subject: "STAT 101", status: "occupied" },
        ]
      },
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
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(mapRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    setSelectedRoom(null);
    setBooked(null);
    setTimeout(() => {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
      );
    }, 10);
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setBooked(null);
    setTimeout(() => {
      gsap.fromTo(".room-detail",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }, 10);
  };

  const handleBook = (slotTime: string) => {
    setBooked(slotTime);
    setTimeout(() => {
      gsap.fromTo(".book-confirm",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" }
      );
    }, 10);
  };

  const freeCount = selectedBuilding
    ? selectedBuilding.rooms.reduce(
        (acc, r) => acc + r.schedule.filter(s => s.status === "free").length, 0
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
            <div style={{ width: "32px", height: "1px", background: "var(--primary)" }} />
            <span style={{
              fontFamily: "var(--font-jakarta)", fontSize: "11px",
              letterSpacing: "0.3em", color: "var(--primary)", textTransform: "uppercase", fontWeight: 600,
            }}>
              Interactive Campus Map
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 400, color: "var(--foreground)", lineHeight: 1.1,
          }}>
            Find your space.<br />
            <em style={{ color: "var(--primary)" }}>Book it instantly.</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-jakarta)", fontSize: "15px",
            color: "var(--muted)", marginTop: "1rem",
          }}>
            Click any building to explore rooms and check availability.
          </p>
        </div>

        {/* Map + Panel layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: selectedBuilding ? "1fr 360px" : "1fr",
          gap: "24px",
          transition: "grid-template-columns 0.4s ease",
          alignItems: "start",
        }}>

          {/* SVG Map */}
          <div style={{
            background: "var(--surface)",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,61,165,0.07)",
          }}>
            <svg
              ref={mapRef}
              viewBox="0 0 780 460"
              style={{ width: "100%", height: "auto", opacity: 0, display: "block" }}
            >
              <defs>
                <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,61,165,0.05)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Background */}
              <rect width="780" height="460" fill="#f0f4fb" />
              <rect width="780" height="460" fill="url(#mapgrid)" />

              {/* Green areas / grounds */}
              <ellipse cx="390" cy="390" rx="120" ry="40" fill="rgba(100,180,100,0.1)" />
              <ellipse cx="100" cy="350" rx="60" ry="35" fill="rgba(100,180,100,0.08)" />
              <ellipse cx="670" cy="360" rx="70" ry="40" fill="rgba(100,180,100,0.08)" />
              <rect x="240" y="360" width="300" height="60" rx="8" fill="rgba(100,180,100,0.07)" />

              {/* Roads */}
              {/* Main horizontal road */}
              <rect x="0" y="270" width="780" height="22" rx="0" fill="rgba(0,61,165,0.06)" />
              {/* Main vertical road */}
              <rect x="270" y="0" width="20" height="460" rx="0" fill="rgba(0,61,165,0.06)" />
              {/* Secondary road */}
              <rect x="530" y="0" width="16" height="460" rx="0" fill="rgba(0,61,165,0.04)" />

              {/* Road labels */}
              <text x="390" y="265" textAnchor="middle" fill="rgba(0,61,165,0.3)" fontSize="8" fontFamily="var(--font-jakarta)" letterSpacing="0.1em">KATIPUNAN AVENUE</text>

              {/* Buildings */}
              {buildings.map((b) => {
                const isSelected = selectedBuilding?.id === b.id;
                const isHovered = hoveredBuilding === b.id;
                const freeSlots = b.rooms.reduce((acc, r) => acc + r.schedule.filter(s => s.status === "free").length, 0);

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
                      x={b.x + 3} y={b.y + 3}
                      width={b.width} height={b.height}
                      rx="4" fill="rgba(0,61,165,0.08)"
                    />
                    {/* Body */}
                    <rect
                      x={b.x} y={b.y}
                      width={b.width} height={b.height}
                      rx="4"
                      fill={isSelected ? "#003DA5" : isHovered ? "#e8eef8" : "#ffffff"}
                      stroke={isSelected ? "#003DA5" : isHovered ? "#003DA5" : "rgba(0,61,165,0.25)"}
                      strokeWidth={isSelected ? 2 : 1.5}
                      style={{ transition: "all 0.2s ease" }}
                    />
                    {/* Short name */}
                    <text
                      x={b.x + b.width / 2}
                      y={b.y + b.height / 2 - 5}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : isHovered ? "#003DA5" : "#0a1628"}
                      fontSize="10"
                      fontFamily="var(--font-jakarta)"
                      fontWeight="700"
                      letterSpacing="0.05em"
                    >
                      {b.short}
                    </text>
                    {/* Free slots indicator */}
                    <text
                      x={b.x + b.width / 2}
                      y={b.y + b.height / 2 + 9}
                      textAnchor="middle"
                      fill={isSelected ? "rgba(255,255,255,0.7)" : freeSlots > 0 ? "#00a855" : "rgba(0,0,0,0.3)"}
                      fontSize="7.5"
                      fontFamily="var(--font-jakarta)"
                      fontWeight="600"
                    >
                      {freeSlots > 0 ? `${freeSlots} free` : "full"}
                    </text>

                    {/* Selected pin dot */}
                    {isSelected && (
                      <circle cx={b.x + b.width / 2} cy={b.y - 8} r="5" fill="#E8A800" />
                    )}
                  </g>
                );
              })}

              {/* Compass */}
              <g transform="translate(734, 420)">
                <circle cx="0" cy="0" r="18" fill="white" stroke="rgba(0,61,165,0.15)" strokeWidth="1" />
                <text x="0" y="-5" textAnchor="middle" fill="#003DA5" fontSize="8" fontFamily="var(--font-jakarta)" fontWeight="800">N</text>
                <polygon points="0,-4 2.5,4 0,2 -2.5,4" fill="#003DA5" />
              </g>

              {/* Legend */}
              <g transform="translate(16, 430)">
                <rect width="10" height="10" fill="#003DA5" rx="2" />
                <text x="14" y="8" fill="rgba(10,22,40,0.5)" fontSize="8" fontFamily="var(--font-jakarta)">Selected</text>
                <rect x="70" width="10" height="10" fill="white" stroke="rgba(0,61,165,0.3)" strokeWidth="1" rx="2" />
                <text x="84" y="8" fill="rgba(10,22,40,0.5)" fontSize="8" fontFamily="var(--font-jakarta)">Available</text>
                <circle cx="145" cy="5" r="4" fill="#00a855" />
                <text x="153" y="8" fill="rgba(10,22,40,0.5)" fontSize="8" fontFamily="var(--font-jakarta)">Free slots</text>
              </g>
            </svg>
          </div>

          {/* Side Panel */}
          {selectedBuilding && (
            <div
              ref={panelRef}
              style={{
                background: "var(--surface)",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 24px rgba(0,61,165,0.07)",
                overflow: "hidden",
                opacity: 0,
              }}
            >
              {!selectedRoom ? (
                <>
                  {/* Building header */}
                  <div style={{
                    padding: "24px 24px 20px",
                    background: "var(--primary)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-jakarta)", fontSize: "10px",
                      letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)",
                      textTransform: "uppercase", fontWeight: 600,
                    }}>
                      {selectedBuilding.college}
                    </span>
                    <h3 style={{
                      fontFamily: "var(--font-serif)", fontSize: "1.6rem",
                      color: "#ffffff", marginTop: "6px",
                    }}>
                      {selectedBuilding.name}
                    </h3>
                    <div style={{
                      marginTop: "10px", display: "inline-flex",
                      alignItems: "center", gap: "6px",
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "100px", padding: "4px 12px",
                    }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: freeCount > 0 ? "#4ade80" : "rgba(255,255,255,0.4)" }} />
                      <span style={{
                        fontFamily: "var(--font-jakarta)", fontSize: "12px",
                        color: "rgba(255,255,255,0.9)", fontWeight: 600,
                      }}>
                        {freeCount} free slots today
                      </span>
                    </div>
                  </div>

                  {/* Room list */}
                  <div style={{ padding: "20px 24px" }}>
                    <p style={{
                      fontFamily: "var(--font-jakarta)", fontSize: "10px",
                      letterSpacing: "0.2em", color: "var(--muted)",
                      textTransform: "uppercase", fontWeight: 600,
                      marginBottom: "12px",
                    }}>
                      Rooms
                    </p>
                    {selectedBuilding.rooms.map((room) => {
                      const freeSlots = room.schedule.filter(s => s.status === "free").length;
                      return (
                        <div
                          key={room.id}
                          onClick={() => handleRoomClick(room)}
                          style={{
                            padding: "14px 16px",
                            borderRadius: "10px",
                            border: "1px solid var(--border)",
                            marginBottom: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)";
                            (e.currentTarget as HTMLDivElement).style.background = "var(--primary-faint)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLDivElement).style.background = "transparent";
                          }}
                        >
                          <div>
                            <p style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "14px",
                              color: "var(--foreground)", fontWeight: 600,
                            }}>
                              {room.name}
                            </p>
                            <p style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "12px",
                              color: "var(--muted)", marginTop: "2px",
                            }}>
                              Capacity: {room.capacity}
                            </p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "12px",
                              color: freeSlots > 0 ? "#00a855" : "var(--muted)",
                              fontWeight: 600,
                            }}>
                              {freeSlots} free
                            </span>
                            <p style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "11px",
                              color: "var(--primary)", marginTop: "2px", fontWeight: 600,
                            }}>
                              View →
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="room-detail" style={{ opacity: 0 }}>
                  {/* Room header */}
                  <div style={{
                    padding: "24px 24px 20px",
                    background: "var(--primary-faint)",
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <button
                      onClick={() => { setSelectedRoom(null); setBooked(null); }}
                      style={{
                        fontFamily: "var(--font-jakarta)", fontSize: "12px",
                        color: "var(--primary)", background: "transparent",
                        border: "none", cursor: "pointer", padding: 0,
                        fontWeight: 600, marginBottom: "12px",
                      }}
                    >
                      ← {selectedBuilding.name}
                    </button>
                    <h3 style={{
                      fontFamily: "var(--font-serif)", fontSize: "1.5rem",
                      color: "var(--foreground)",
                    }}>
                      {selectedRoom.name}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-jakarta)", fontSize: "12px",
                      color: "var(--muted)", marginTop: "4px",
                    }}>
                      Capacity: {selectedRoom.capacity} people
                    </p>
                  </div>

                  {/* Schedule */}
                  <div style={{ padding: "20px 24px" }}>
                    <p style={{
                      fontFamily: "var(--font-jakarta)", fontSize: "10px",
                      letterSpacing: "0.2em", color: "var(--muted)",
                      textTransform: "uppercase", fontWeight: 600,
                      marginBottom: "12px",
                    }}>
                      Today's Schedule
                    </p>

                    {selectedRoom.schedule.map((slot) => {
                      const isFree = slot.status === "free";
                      const isBooked = booked === slot.time;
                      return (
                        <div
                          key={slot.time}
                          style={{
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 14px", borderRadius: "8px",
                            marginBottom: "6px",
                            background: isBooked ? "rgba(0,61,165,0.06)" : isFree ? "rgba(0,168,85,0.05)" : "transparent",
                            border: `1px solid ${isBooked ? "rgba(0,61,165,0.2)" : isFree ? "rgba(0,168,85,0.2)" : "var(--border)"}`,
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div>
                            <p style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "11px",
                              color: "var(--muted)",
                            }}>{slot.time}</p>
                            <p style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "13px",
                              color: isFree ? "#00a855" : "var(--foreground)",
                              fontWeight: isFree ? 600 : 400,
                            }}>
                              {isFree ? "Available" : slot.subject}
                            </p>
                          </div>
                          {isFree && !isBooked && (
                            <button
                              onClick={() => handleBook(slot.time)}
                              style={{
                                fontFamily: "var(--font-jakarta)", fontSize: "12px",
                                fontWeight: 700, padding: "6px 16px", borderRadius: "6px",
                                background: "var(--primary)", color: "white",
                                border: "none", cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.background = "var(--primary-light)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "var(--primary)")}
                            >
                              Reserve
                            </button>
                          )}
                          {isBooked && (
                            <span style={{
                              fontFamily: "var(--font-jakarta)", fontSize: "12px",
                              color: "var(--primary)", fontWeight: 700,
                            }}>✓ Reserved</span>
                          )}
                        </div>
                      );
                    })}

                    {/* Confirmation */}
                    {booked && (
                      <div
                        className="book-confirm"
                        style={{
                          marginTop: "16px", padding: "16px",
                          borderRadius: "10px", opacity: 0,
                          background: "var(--primary-faint)",
                          border: "1px solid rgba(0,61,165,0.15)",
                        }}
                      >
                        <p style={{
                          fontFamily: "var(--font-serif)", fontSize: "1.1rem",
                          fontStyle: "italic", color: "var(--primary)",
                        }}>
                          Reservation confirmed!
                        </p>
                        <p style={{
                          fontFamily: "var(--font-jakarta)", fontSize: "12px",
                          color: "var(--muted)", marginTop: "4px",
                        }}>
                          {selectedRoom.name} · {booked} · {selectedBuilding.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Close */}
              <div style={{ padding: "0 24px 20px" }}>
                <button
                  onClick={() => { setSelectedBuilding(null); setSelectedRoom(null); setBooked(null); }}
                  style={{
                    fontFamily: "var(--font-jakarta)", fontSize: "12px",
                    color: "var(--muted)", background: "transparent",
                    border: "none", cursor: "pointer", padding: 0, fontWeight: 500,
                  }}
                >
                  Close ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}