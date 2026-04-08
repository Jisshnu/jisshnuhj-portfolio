import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const ROLES = ["Data Science Graduate", "Aspiring Recreational Pilot", "Turning Data into Impact", "Aspiring Data Analyst", "Automotive Enthusiast"];

const EXPERIENCES = [
  {
    id: 0, company: "GP Outsourcing Asia", role: "Intern – TeaMWork Program",
    period: "Jun–Jul 2025", loc: "Malaysia 🇲🇾", color: "#ff6b9d", emoji: "🌏",
    points: ["Designed a market entry blueprint for international businesses expanding into Malaysia via EOR solutions.", "Compared EOR vs traditional entry models on compliance, efficiency & sustainability.", "Delivered a strategic report to industry mentors."],
    tags: ["Strategy", "EOR", "Market Analysis"],
  },
  {
    id: 1, company: "Larsen & Toubro", role: "Data Science & Analytics Intern",
    period: "Jun 2023 – Jun 2024", loc: "India 🇮🇳", color: "#00e5c3", emoji: "⚙️",
    points: ["Applied ML to sensor data from water treatment plants for process optimisation.", "Built predictive models (Python, Pandas, Scikit-Learn) for inflow, energy & maintenance forecasting.", "Created Tableau & Power BI dashboards for KPIs, downtime & water quality metrics.", "Integrated IoT, SCADA & ERP data into real-time analytics pipelines."],
    tags: ["Python", "Scikit-Learn", "Tableau", "Power BI", "IoT", "SCADA"],
  },
  {
    id: 2, company: "Hyundai Motors", role: "Web Development Intern",
    period: "Mar–May 2022", loc: "India 🇮🇳", color: "#ffb347", emoji: "🚗",
    points: ["Enhanced frontend of Hyundai's internal UI systems.", "Built responsive ReactJS + Bootstrap components.", "Integrated REST APIs and contributed to debugging & refactoring."],
    tags: ["ReactJS", "JavaScript", "Bootstrap", "REST APIs"],
  },
];

const EXTRAS = [
  { id: 0, emoji: "✈️", title: "NCC – National Cadet Corps", badge: "Outstanding NCC Cadet Award", color: "#00e5c3", desc: "Flew the Virus-SW80 aircraft at 10,000ft — the pinnacle of NCC service. Recognised with the prestigious Outstanding NCC Cadet award.", highlights: ["Virus-SW80 aircraft", "10,000ft altitude", "Outstanding Cadet Award"] },
  { id: 1, emoji: "🎓", title: "Peer Mentor – Faculty of IT", badge: "Monash University", color: "#ffb347", desc: "Guided new IT students through academic transitions, wellbeing check-ins, study skills and course planning. Built community via events and regular communication.", highlights: ["Academic transition", "Wellbeing check-ins", "Study skills & events"] },
  { id: 2, emoji: "🏛️", title: "Exec Committee – Student Council", badge: "SVCE, Chennai", color: "#ff6b9d", desc: "Managed budget approvals from college management, advocated for student issues with authorities, coordinated large-scale campus events.", highlights: ["Budget management", "Student advocacy", "Event coordination"] },
];

const SKILLS = [
  { name: "Python", cat: "Code", level: 90, color: "#00e5c3" },
  { name: "R", cat: "Code", level: 78, color: "#00e5c3" },
  { name: "SQL", cat: "Code", level: 82, color: "#00e5c3" },
  { name: "JavaScript", cat: "Code", level: 74, color: "#00e5c3" },
  { name: "Scikit-Learn", cat: "ML", level: 85, color: "#ff6b9d" },
  { name: "XGBoost", cat: "ML", level: 80, color: "#ff6b9d" },
  { name: "LSTM", cat: "ML", level: 72, color: "#ff6b9d" },
  { name: "Pandas", cat: "ML", level: 92, color: "#ff6b9d" },
  { name: "Tableau", cat: "Viz", level: 86, color: "#ffb347" },
  { name: "Power BI", cat: "Viz", level: 80, color: "#ffb347" },
  { name: "D3.js", cat: "Viz", level: 64, color: "#ffb347" },
  { name: "ReactJS", cat: "Web", level: 76, color: "#a78bfa" },
  { name: "HTML/CSS", cat: "Web", level: 83, color: "#a78bfa" },
  { name: "MongoDB", cat: "DB", level: 70, color: "#34d399" },
  { name: "Git", cat: "Tools", level: 85, color: "#94a3b8" },
  { name: "Docker", cat: "Tools", level: 60, color: "#94a3b8" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useTypewriter(words) {
  const [txt, setTxt] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(() => {
      if (!del && ci < w.length) { setTxt(w.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (!del && ci === w.length) setDel(true);
      else if (del && ci > 0) { setTxt(w.slice(0, ci - 1)); setCi(c => c - 1); }
      else { setDel(false); setWi(i => (i + 1) % words.length); }
    }, del ? 45 : ci === words[wi].length ? 1600 : 85);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return txt;
}

function useInView(ref, threshold = 0.15) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}

// ─── FLIGHT CURSOR ────────────────────────────────────────────────────────────
function FlightCursor() {
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });
  const angle = useRef(0);
  const trail = useRef([]);
  const planeRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      const dx = pos.current.x - cur.current.x;
      const dy = pos.current.y - cur.current.y;
      cur.current.x += dx * 0.13;
      cur.current.y += dy * 0.13;
      if (Math.hypot(dx, dy) > 1.5) angle.current = Math.atan2(dy, dx) * 180 / Math.PI + 45;
      trail.current = [{ ...cur.current, id: Date.now() }, ...trail.current.slice(0, 14)];
      if (planeRef.current) {
        planeRef.current.style.left = cur.current.x + "px";
        planeRef.current.style.top = cur.current.y + "px";
        planeRef.current.style.transform = `translate(-50%,-50%) rotate(${angle.current}deg)`;
      }
      // update trail dots
      const trailEls = document.querySelectorAll(".trail-dot");
      trail.current.forEach((pt, i) => {
        if (trailEls[i]) {
          trailEls[i].style.left = pt.x + "px";
          trailEls[i].style.top = pt.y + "px";
          trailEls[i].style.opacity = Math.max(0, 0.55 - i * 0.04);
          trailEls[i].style.width = trailEls[i].style.height = Math.max(2, 7 - i * 0.4) + "px";
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="trail-dot" style={{ position: "absolute", borderRadius: "50%", background: "#00e5c3", transform: "translate(-50%,-50%)", transition: "none", filter: `blur(${i * 0.25}px)` }} />
      ))}
      <div ref={planeRef} style={{ position: "absolute", fontSize: 26, lineHeight: 1, userSelect: "none", filter: "drop-shadow(0 0 6px #00e5c380)", transition: "transform 0.04s linear" }}>✈️</div>
    </div>
  );
}

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef();
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.3, a: Math.random() * 0.4 + 0.1, ph: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    const draw = () => {
      t += 0.01; ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        const pulse = 0.5 + 0.5 * Math.sin(t + p.ph);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,195,${p.a * pulse})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,229,195,${0.07 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

// ─── RADAR CHART ─────────────────────────────────────────────────────────────
function RadarChart({ visible }) {
  const ref = useRef();
  useEffect(() => {
    if (!visible) return;
    const c = ref.current; const ctx = c.getContext("2d");
    const cx = c.width / 2, cy = c.height / 2, r = 85;
    const data = [
      { label: "Python/ML", v: 0.87 }, { label: "Data Viz", v: 0.88 },
      { label: "SQL/DB", v: 0.8 }, { label: "React/Web", v: 0.76 },
      { label: "Stats", v: 0.82 }, { label: "Leadership", v: 0.79 },
    ];
    const n = data.length;
    const angles = data.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
    let prog = 0, raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        angles.forEach((a, i) => { const x = cx + r * (ring / 4) * Math.cos(a), y = cy + r * (ring / 4) * Math.sin(a); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
        ctx.closePath(); ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1; ctx.stroke();
      }
      angles.forEach(a => { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a)); ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1; ctx.stroke(); });
      ctx.beginPath();
      data.forEach((d, i) => { const v = d.v * prog, x = cx + r * v * Math.cos(angles[i]), y = cy + r * v * Math.sin(angles[i]); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
      ctx.closePath(); ctx.fillStyle = "rgba(0,229,195,0.1)"; ctx.fill(); ctx.strokeStyle = "#00e5c3"; ctx.lineWidth = 2; ctx.stroke();
      data.forEach((d, i) => {
        const v = d.v * prog, x = cx + r * v * Math.cos(angles[i]), y = cy + r * v * Math.sin(angles[i]);
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = "#00e5c3"; ctx.fill(); ctx.strokeStyle = "#080b12"; ctx.lineWidth = 2; ctx.stroke();
      });
      ctx.font = "10px 'DM Mono', monospace"; ctx.textAlign = "center"; ctx.fillStyle = "#6b7491";
      data.forEach((d, i) => { const x = cx + (r + 22) * Math.cos(angles[i]), y = cy + (r + 22) * Math.sin(angles[i]); ctx.fillText(d.label, x, y + 4); });
      prog = Math.min(1, prog + 0.028);
      if (prog < 1) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  return <canvas ref={ref} width={260} height={260} style={{ display: "block" }} />;
}

// ─── FLIGHT PATH CANVAS ───────────────────────────────────────────────────────
function FlightPathCanvas({ visible }) {
  const ref = useRef();
  useEffect(() => {
    if (!visible) return;
    const c = ref.current; const ctx = c.getContext("2d");
    c.width = c.offsetWidth; c.height = c.offsetHeight || 190;
    const W = c.width, H = c.height;
    const path = Array.from({ length: 201 }, (_, i) => {
      const t = i / 200;
      return { x: t * W * 0.9 + W * 0.05, y: H * 0.55 + Math.sin(t * Math.PI * 3) * H * 0.28 - t * H * 0.18 };
    });
    const clouds = Array.from({ length: 7 }, () => ({ x: Math.random() * W, y: Math.random() * H * 0.7 + H * 0.1, r: 18 + Math.random() * 28, spd: 0.15 + Math.random() * 0.25 }));
    let prog = 0, raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "rgba(0,15,35,0.85)"); sky.addColorStop(1, "rgba(0,8,18,0.5)");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
      // grid lines
      [0.2, 0.4, 0.6, 0.8].forEach((f, i) => {
        ctx.beginPath(); ctx.moveTo(0, f * H); ctx.lineTo(W, f * H);
        ctx.strokeStyle = "rgba(0,229,195,0.04)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = "rgba(0,229,195,0.18)"; ctx.font = "8px 'DM Mono',monospace";
        ctx.fillText(`${Math.round(12000 - f * 12000)}ft`, 6, f * H - 3);
      });
      clouds.forEach(cl => {
        cl.x -= cl.spd; if (cl.x < -cl.r * 2) cl.x = W + cl.r;
        ctx.beginPath(); ctx.arc(cl.x, cl.y, cl.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fill();
        ctx.beginPath(); ctx.arc(cl.x + cl.r * 0.5, cl.y - cl.r * 0.3, cl.r * 0.65, 0, Math.PI * 2); ctx.fill();
      });
      const vis = Math.round(prog * path.length);
      if (vis > 1) {
        ctx.beginPath(); path.slice(0, vis).forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        const g = ctx.createLinearGradient(0, 0, path[vis - 1].x, 0); g.addColorStop(0, "rgba(0,229,195,0)"); g.addColorStop(1, "rgba(0,229,195,0.65)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);
        for (let i = Math.max(0, vis - 20); i < vis - 1; i += 3) {
          const a = ((i - (vis - 20)) / 20) * 0.4;
          ctx.beginPath(); ctx.arc(path[i].x, path[i].y, 1.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,229,195,${a})`; ctx.fill();
        }
        const cur = path[vis - 1], prev = path[Math.max(0, vis - 4)];
        const ang = Math.atan2(cur.y - prev.y, cur.x - prev.x);
        ctx.save(); ctx.translate(cur.x, cur.y); ctx.rotate(ang); ctx.font = "16px serif"; ctx.fillText("✈️", -8, 6); ctx.restore();
        ctx.fillStyle = "rgba(0,229,195,0.7)"; ctx.font = "8px 'DM Mono',monospace";
        ctx.fillText(`ALT: ${Math.round(10000 - (cur.y / H) * 8000)}ft  SPD: ${Math.round(200 + Math.random() * 20)}kts`, cur.x + 12, cur.y - 8);
      }
      ctx.fillStyle = "rgba(0,229,195,0.12)"; ctx.strokeStyle = "rgba(0,229,195,0.28)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(W - 130, 8, 122, 22, 5); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#00e5c3"; ctx.font = "8px 'DM Mono',monospace"; ctx.fillText("MAX ALT: 10,000ft ✅", W - 123, 22);
      prog = Math.min(1, prog + 0.006);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  return <canvas ref={ref} style={{ width: "100%", height: 190, borderRadius: 12, border: "1px solid rgba(0,229,195,0.12)", display: "block" }} />;
}

// ─── MINI CHART ────────────────────────────────────────────────────────────────
function MiniLineChart({ color }) {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext("2d"); const W = c.width, H = c.height;
    const data = Array.from({ length: 24 }, (_, i) => 0.2 + 0.6 * Math.sin(i * 0.5) + Math.random() * 0.15);
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, color + "35"); g.addColorStop(1, color + "00");
    ctx.beginPath(); data.forEach((v, i) => { const x = (i / (data.length - 1)) * W, y = H - v * H; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); data.forEach((v, i) => { const x = (i / (data.length - 1)) * W, y = H - v * H; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  }, [color]);
  return <canvas ref={ref} width={240} height={56} style={{ display: "block", borderRadius: 6 }} />;
}

function MiniBarChart({ color }) {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext("2d"); const W = c.width, H = c.height;
    const data = [0.55, 0.82, 0.68, 0.91, 0.73, 0.87, 0.62, 0.78];
    const bw = W / data.length; ctx.clearRect(0, 0, W, H);
    data.forEach((v, i) => {
      const bh = v * (H - 6);
      ctx.fillStyle = color + (i % 2 === 0 ? "cc" : "66");
      ctx.beginPath(); ctx.roundRect(i * bw + 3, H - bh, bw - 6, bh, 3); ctx.fill();
    });
  }, [color]);
  return <canvas ref={ref} width={240} height={56} style={{ display: "block", borderRadius: 6 }} />;
}

// ─── MATRIX RAIN ──────────────────────────────────────────────────────────────
function MatrixRain({ visible }) {
  const ref = useRef();
  useEffect(() => {
    if (!visible) return;
    const c = ref.current; const ctx = c.getContext("2d");
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const W = c.width, H = c.height;
    const cols = Math.floor(W / 14); const drops = Array(cols).fill(1);
    const chars = "データサイエンスML01アイウ#$∑∫∂∇αβγ".split("");
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(8,11,18,0.07)"; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(0,229,195,0.17)"; ctx.font = "11px 'DM Mono',monospace";
      drops.forEach((y, i) => { const ch = chars[Math.floor(Math.random() * chars.length)]; ctx.fillText(ch, i * 14, y * 14); if (y * 14 > H && Math.random() > 0.975) drops[i] = 0; drops[i]++; });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }} />;
}

// ─── COUNTER ──────────────────────────────────────────────────────────────────
function useCounter(target, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let step = 0; const steps = 50;
    const iv = setInterval(() => {
      step++; const p = 1 - Math.pow(1 - step / steps, 3); setVal(Math.round(target * p));
      if (step >= steps) clearInterval(iv);
    }, 1400 / steps);
    return () => clearInterval(iv);
  }, [started, target]);
  return val;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ scrollY }) {
  const scrolled = scrollY > 60;
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: scrolled ? "12px 48px" : "20px 48px", background: scrolled ? "rgba(8,11,18,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", transition: "all 0.4s ease" }}>
      <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#00e5c3", letterSpacing: "0.2em" }}>✈️ JHJ.DEV</span>
      <div style={{ display: "flex", gap: 28 }}>
        {["about", "experience", "projects", "skills", "extras", "contact"].map(s => (
          <button key={s} onClick={() => go(s)} style={{ background: "none", border: "none", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7491", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#00e5c3"} onMouseLeave={e => e.target.style.color = "#6b7491"}>
            {s === "extras" ? "extracurricular" : s}
          </button>
        ))}
      </div>
      <button onClick={() => go("contact")} style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#080b12", background: "#00e5c3", padding: "9px 20px", borderRadius: 100, border: "none", cursor: "pointer", fontWeight: 600, letterSpacing: "0.08em" }}
        onMouseEnter={e => { e.target.style.background = "#00ffda"; e.target.style.transform = "scale(1.04)"; }}
        onMouseLeave={e => { e.target.style.background = "#00e5c3"; e.target.style.transform = "none"; }}>
        Hire Me ✈️
      </button>
    </nav>
  );
}
function ImageCarousel() {
  const images = [
    "/images/profile1.jpg",
    "/images/profile2.jpg",
    "/images/profile3.jpg",
    "/images/profile4.jpg",
    "/images/profile5.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: 320,
      height: 420,
      borderRadius: 20,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "#141824"
    }}>
      <img
        src={images[index]}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const role = useTypewriter(ROLES);
  const ref = useRef(); const vis = useInView(ref, 0.05);
  const i3 = useCounter(3, vis), i2 = useCounter(2, vis), i26 = useCounter(26, vis);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef();
  const handleMouse = useCallback(e => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ x: dy * 12, y: -dx * 12 });
  }, []);

  return (
    <section id="hero" ref={ref} onMouseMove={handleMouse} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 4px" }}>
      <ParticleCanvas />
      <div style={{ position: "absolute", top: "15%", left: "3%", width: 500, height: 500, background: "radial-gradient(circle, rgba(0,229,195,0.04),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(167,139,250,0.04),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, paddingTop: 90, flexWrap: "wrap" }}>
      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center"}}>

  {/* LEFT SIDE */}
  <div>

    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "monospace", fontSize: "0.7rem", color: "#00e5c3", border: "1px solid rgba(0,229,195,0.3)", borderRadius: 100, padding: "6px 14px", background: "rgba(0,229,195,0.07)", marginBottom: 24, animation: "tagpulse 3s ease infinite" }}>
      <span style={{ width: 6, height: 6, background: "#00e5c3", borderRadius: "50%", animation: "tagpulse 2s ease infinite" }} />
      Open to Full-Time Opportunities · Melbourne / Australia
    </div>

    <h1 style={{ fontSize: "clamp(3rem,7.5vw,6.8rem)", fontWeight: 800, lineHeight: 0.93, letterSpacing: "-0.03em", marginBottom: 18 }}>
      <span style={{ display: "block", fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3", lineHeight: 1.05 }}>Jisshnu</span>
      <span style={{ display: "block", color: "#e8eaf2" }}>Hemakumar</span>
      <span style={{ display: "block", color: "#e8eaf2" }}>Jayanthi</span>
    </h1>

    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: "1rem", color: "#6b7491", marginBottom: 18, minHeight: "1.7em" }}>
      <span style={{ color: "#00e5c3" }}>{">"}</span>
      <span>{role}</span>
      <span style={{ color: "#00e5c3", animation: "blink 1s infinite" }}>█</span>
    </div>

    <p style={{ fontSize: "0.97rem", fontFamily: "monospace", lineHeight: 1.82, color: "#6b7491", width: "100%", margin: "0", marginBottom: 36 }}>
      Graduate Data Scientist at Monash!! developing ML models and data visualization dashboards, <span style={{ color: "#00e5c3" }}> seeking full-time Data Scientist or Analyst roles </span>, with a hobbyist interest in aviation ✈️
    </p>

    <div style={{ display: "flex", gap: 12, marginBottom: 52, flexWrap: "wrap" }}>
      {[{ l: "View Projects →", h: "#projects", p: true }, { l: "LinkedIn ↗", h: "https://www.linkedin.com/in/jisshnuhj/", p: false }].map(({ l, h, p }) => (
        <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
          style={{ padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.04em", background: p ? "#00e5c3" : "rgba(255,255,255,0.04)", color: p ? "#080b12" : "#e8eaf2", border: p ? "none" : "1px solid rgba(255,255,255,0.08)", transition: "all 0.25s" }}>
          {l}
        </a>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, auto)", gap: 36, alignItems: "center" }}>
      {[{ n: `${i3} +`, l: "Industry Experiences" }, { n: `10 +`, l: "Hackathons & Events" }, { n: `50 +`, l: "Peers Mentored" }, { n: `20${i26}`, l: "MS Grad" }].map(({ n, l }, i) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {i > 0 && <div style={{ width: 1, height: 34, background: "rgba(255,255,255,0.08)" }} />}
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-0.04em", color: "#e8eaf2", lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "#3d4259", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{l}</div>
          </div>
        </div>
      ))}
    </div>

  </div>

  <div style={{ display: "flex", justifyContent: "center" }}>
    <ImageCarousel />
  </div>

</div>
</div> 

    </section>
  );
}
// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(); const vis = useInView(ref);
  return (
    <section id="about" ref={ref} style={{ background: "#0d1117", padding: "120px 0" }}>
      <div style={{ width: "100%", margin: "0 auto", padding: "0 48px" }}>
        <SectionHead tag="01 — About" title={<>The Story <em style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3" }}>Behind the Data</em></>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#e8eaf2", marginBottom: 18 }}>
              I'm a Data Science master's student at <span style={{ color: "#00e5c3", fontWeight: 700 }}>Monash University, Melbourne</span>, with a B.Tech in IT from Sri Venkateswara College of Engineering, Chennai.
            </p>
            <p style={{ fontSize: "0.94rem", lineHeight: 1.85, color: "#6b7491", marginBottom: 18 }}>
              My work bridges ML, data engineering, and storytelling. I've built predictive systems for water treatment plants at L&T, analysed Melbourne's metro commuter patterns, and developed health-risk models using wearable sensor data.
            </p>
            <p style={{ fontSize: "0.94rem", lineHeight: 1.85, color: "#6b7491", marginBottom: 32 }}>
              Beyond the terminal — I'm an NCC cadet who's <span style={{ color: "#ffb347" }}>flown aircraft at 10,000ft</span>, a peer mentor for IT students, an Exec Committee member of the Student Council, and a firm believer that good data storytelling changes how decisions get made.
            </p>
            <div style={{ background: "#141824", border: "none", borderRadius: 16, padding: 26 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>// proficiency</div>
              {[["Python / Pandas", 90, "#00e5c3"], ["ML Models", 85, "#ff6b9d"], ["Tableau / Power BI", 86, "#ffb347"], ["SQL / Databases", 82, "#00e5c3"], ["React / JS", 76, "#a78bfa"]].map(([lb, pct, col], i) => (
                <div key={lb} style={{ marginBottom: 13 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#6b7491" }}>{lb}</span>
                    <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: col }}>{pct}%</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: vis ? `${pct}%` : "0%", background: col, borderRadius: 2, transition: `width 1.1s ease ${i * 0.1}s`, boxShadow: `0 0 8px ${col}55` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#141824", border: "none", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, alignSelf: "flex-start" }}>// skill radar</div>
              <RadarChart visible={vis} />
            </div>
            {[{ school: "Monash University", deg: "MSc Data Science", period: "2024–2026", loc: "Melbourne", tag: "Current", c: "#00e5c3" }, { school: "SVCE, Chennai", deg: "B.Tech – IT", period: "2020–2024", loc: "India", tag: "Grad", c: "#ffb347" }].map(e => (
              <div key={e.school} style={{ background: "#141824", border: "none", borderLeft: `3px solid ${e.c}`, borderRadius: "3px 14px 14px 3px", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8eaf2", marginBottom: 3 }}>{e.school}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#6b7491" }}>{e.deg}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "#3d4259", marginTop: 3 }}>{e.period} · {e.loc}</div>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: "0.62rem", color: e.c, background: e.c + "15", border: `1px solid ${e.c}35`, borderRadius: 100, padding: "3px 10px" }}>{e.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const [active, setActive] = useState(1);
  const exp = EXPERIENCES[active];
  return (
    <section id="experience" style={{ background: "#080b12", padding: "120px 0" }}>
      <div style={{ width: "100%", margin: "0 auto", padding: "0 48px" }}>
        <SectionHead tag="02 — Experience" title={<>Where I've <em style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3" }}>Made an Impact</em></>} />
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EXPERIENCES.map((e, i) => (
              <div key={e.id} onClick={() => setActive(i)} style={{ background: active === i ? e.color + "0d" : "#141824", border: `1px solid ${active === i ? e.color + "45" : "rgba(255,255,255,0.06)"}`, borderLeft: `3px solid ${active === i ? e.color : "rgba(255,255,255,0.06)"}`, borderRadius: "3px 14px 14px 3px", padding: "18px 20px", cursor: "pointer", transition: "all 0.3s", transform: active === i ? "translateX(5px)" : "none" }}
                onMouseEnter={e2 => { if (active !== i) e2.currentTarget.style.borderColor = e.color + "25"; }}
                onMouseLeave={e2 => { if (active !== i) e2.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: "1.1rem" }}>{e.emoji}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8eaf2" }}>{e.company}</span>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: e.color, marginBottom: 2 }}>{e.role}</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259" }}>{e.period}</div>
              </div>
            ))}
          </div>
          <div key={active} style={{ background: "#141824", border: `1px solid ${exp.color}30`, borderRadius: 20, padding: 34, position: "relative", overflow: "hidden", animation: "slidein 0.35s ease" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle,${exp.color}12,transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "2rem" }}>{exp.emoji}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "#e8eaf2" }}>{exp.company}</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: exp.color }}>{exp.role}</div>
              </div>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#3d4259", marginBottom: 24 }}>{exp.period} · {exp.loc}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {exp.points.map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: exp.color, fontFamily: "monospace", fontSize: "0.78rem", marginTop: 2, flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: "0.87rem", lineHeight: 1.72, color: "#8891aa", margin: 0 }}>{pt}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {exp.tags.map(t => <span key={t} style={{ fontFamily: "monospace", fontSize: "0.65rem", color: exp.color, background: exp.color + "15", border: `1px solid ${exp.color}28`, borderRadius: 6, padding: "3px 11px" }}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    { num: "01", title: "Predictive Health Risk Detection via Wearables", sub: "Multi-sensor ML pipeline", desc: "Built early-detection models for physical & mental health risks using wearable sensor data. Implemented Random Forest, XGBoost, LSTM, and Logistic Regression with interpretable visualisations.", tags: ["Python", "XGBoost", "LSTM", "Random Forest", "Pandas"], color: "#00e5c3", emoji: "🧠", chart: "line", large: true },
    { num: "02", title: "Melbourne Metro Commuter Analysis", sub: "Transport data exploration", desc: "Analysed Melbourne's metro network using DoT datasets (2021–2023) and meteorological data to uncover overcrowding patterns and passenger flow by time and day type.", tags: ["Python", "Pandas", "Tableau", "EDA"], color: "#ffb347", emoji: "🚇", chart: "bar", large: false },
  ];

  return (
    <section id="projects" style={{ background: "#0d1117", padding: "120px 0" }}>
      <div style={{ width: "100%", margin: "0 auto", padding: "0 48px" }}>
        <SectionHead tag="03 — Projects" title={<>Things I've <em style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3" }}>Built & Explored</em></>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {projects.map(p => <ProjectCard key={p.num} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#141824", border: `1px solid ${hov ? p.color + "45" : "rgba(255,255,255,0.06)"}`, borderRadius: 22, padding: p.large ? 38 : 30, position: "relative", overflow: "hidden", transition: "all 0.3s", transform: hov ? "translateY(-6px)" : "none", boxShadow: hov ? `0 20px 55px ${p.color}12` : "none", gridColumn: p.large ? "1 / -1" : "auto", display: "flex", flexDirection: p.large ? "row" : "column", gap: p.large ? 44 : 18, alignItems: "flex-start" }}>
      <div style={{ position: "absolute", top: -70, right: -70, width: 240, height: 240, background: `radial-gradient(circle,${p.color}${hov ? "15" : "08"},transparent 70%)`, pointerEvents: "none", transition: "all 0.4s" }} />
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: "1.8rem" }}>{p.emoji}</span>
          <span style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "#3d4259", letterSpacing: "0.1em" }}>PROJECT {p.num}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {p.tags.slice(0, 4).map(t => <span key={t} style={{ fontFamily: "monospace", fontSize: "0.62rem", color: p.color, background: p.color + "15", border: `1px solid ${p.color}22`, borderRadius: 5, padding: "3px 9px" }}>{t}</span>)}
        </div>
        <h3 style={{ fontWeight: 800, fontSize: p.large ? "1.45rem" : "1.08rem", color: "#e8eaf2", letterSpacing: "-0.02em", marginBottom: 7, lineHeight: 1.25 }}>{p.title}</h3>
        <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: p.color, marginBottom: 14 }}>{p.sub}</div>
        <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "#6b7491", maxWidth: p.large ? 440 : "unset" }}>{p.desc}</p>
      </div>
      <div style={{ minWidth: 250, position: "relative", zIndex: 1 }}>
        <div style={{ background: "#0d1117", borderRadius: 12, padding: "16px 16px 12px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#3d4259", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>// {p.chart === "line" ? "model accuracy" : "commuter volume"}</div>
          {p.chart === "line" ? <MiniLineChart color={p.color} /> : <MiniBarChart color={p.color} />}
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const [filter, setFilter] = useState("All");
  const ref = useRef(); const vis = useInView(ref);
  const cats = ["All", "Code", "ML", "Viz", "Web", "DB", "Tools"];
  const shown = filter === "All" ? SKILLS : SKILLS.filter(s => s.cat === filter);

  return (
    <section id="skills" ref={ref} style={{ background: "#080b12", padding: "120px 0" }}>
      <div style={{ width: "100%", margin: "0 auto", padding: "0 48px" }}>
        <SectionHead tag="04 — Skills" title={<>Tools of <em style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3" }}>My Trade</em></>} />
        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ fontFamily: "monospace", fontSize: "0.7rem", padding: "7px 15px", borderRadius: 100, border: `1px solid ${filter === c ? "#00e5c3" : "rgba(255,255,255,0.08)"}`, background: filter === c ? "rgba(0,229,195,0.1)" : "transparent", color: filter === c ? "#00e5c3" : "#6b7491", cursor: "pointer", transition: "all 0.2s" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Bubble cloud */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 40 }}>
          {SKILLS.map(s => {
            const sz = 40 + (s.level / 100) * 34;
            const active = filter === "All" || s.cat === filter;
            return (
              <div key={s.name} style={{ width: sz, height: sz, borderRadius: "50%", border: `1px solid ${s.color}${active ? "55" : "22"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "default", transition: "all 0.3s", opacity: active ? 1 : 0.2, position: "relative" }}
                onMouseEnter={e => { e.currentTarget.style.background = s.color + "20"; e.currentTarget.style.borderWidth = "2px"; e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.boxShadow = `0 0 18px ${s.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderWidth = "1px"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#6b7491", textAlign: "center", lineHeight: 1.2 }}>{s.name}</span>
              </div>
            );
          })}
        </div>

        {/* Bar chart */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {shown.map((s, i) => (
            <div key={s.name} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#6b7491" }}>{s.name}</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: s.color }}>{s.level}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: vis ? `${s.level}%` : "0%", background: s.color, borderRadius: 2, transition: `width 1s ease ${i * 0.05}s`, boxShadow: `0 0 6px ${s.color}50` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXTRACURRICULAR ───────────────────────────────────────────────────────────
function Extracurricular() {
  const ref = useRef(); const vis = useInView(ref, 0.1);
  const [open, setOpen] = useState(0);

  return (
    <section id="extras" ref={ref} style={{ background: "#0d1117", padding: "120px 0" }}>
      <div style={{ width: "100%", margin: "0 auto", padding: "0 48px" }}>
        <SectionHead tag="05 — Extracurricular" title={<>Beyond the <em style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3" }}>Terminal</em></>} />

        {/* NCC HERO */}
        <div style={{ background: "linear-gradient(135deg,#080b12,#0d1117)", border: "1px solid rgba(0,229,195,0.18)", borderRadius: 24, padding: 34, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 50%, rgba(0,229,195,0.04),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: "2rem" }}>✈️</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "#e8eaf2" }}>NCC Cadet · Virus-SW80 Pilot</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#00e5c3" }}>Outstanding NCC Cadet Award · 10,000ft altitude</div>
              </div>
              <div style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259" }}>live flight simulation ↓</div>
            </div>
            <FlightPathCanvas visible={vis} />
          </div>
        </div>

        {/* Accordion cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {EXTRAS.map((item, i) => (
            <div key={item.id} onClick={() => setOpen(open === i ? -1 : i)} style={{ background: open === i ? item.color + "09" : "#141824", border: `1px solid ${open === i ? item.color + "38" : "rgba(255,255,255,0.06)"}`, borderRadius: 18, padding: "22px 26px", cursor: "pointer", transition: "all 0.3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: item.color + "15", border: `1px solid ${item.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.97rem", color: "#e8eaf2", marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "0.63rem", color: item.color }}>{item.badge}</div>
                  </div>
                </div>
                <span style={{ color: item.color, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none", fontSize: "0.9rem", marginTop: 3 }}>▾</span>
              </div>
              {open === i && (
                <div style={{ marginTop: 18, animation: "slidein 0.3s ease" }}>
                  <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "#6b7491", marginBottom: 14 }}>{item.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {item.highlights.map(h => <span key={h} style={{ fontFamily: "monospace", fontSize: "0.62rem", color: item.color, background: item.color + "12", border: `1px solid ${item.color}22`, borderRadius: 6, padding: "3px 10px" }}>{h}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ background: "#141824", border: "none", borderRadius: 18, padding: "24px 36px", display: "flex", gap: 28, justifyContent: "space-around", flexWrap: "wrap" }}>
          {[["✈️", "10K+", "Feet Altitude"], ["🏅", "1", "Cadet Award"], ["👥", "100+", "Mentored"], ["🏛️", "3", "Leadership Roles"]].map(([ic, val, lb]) => (
            <div key={lb} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>{ic}</div>
              <div style={{ fontWeight: 800, fontSize: "1.6rem", color: "#00e5c3", letterSpacing: "-0.04em" }}>{val}</div>
              <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", textTransform: "uppercase", letterSpacing: "0.08em" }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef(); const vis = useInView(ref, 0.1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const f = useCallback(k => e => setForm(p => ({ ...p, [k]: e.target.value })), []);
  const inp = { width: "100%", background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 15px", fontFamily: "inherit", fontSize: "0.85rem", color: "#e8eaf2", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };

  return (
    <section id="contact" ref={ref} style={{ background: "#080b12", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <MatrixRain visible={vis} />
      <div style={{ width: "100%", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <SectionHead tag="06 — Contact" title={<>Let's Build <em style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "#00e5c3" }}>Something</em></>} />
            <p style={{ fontSize: "0.94rem", lineHeight: 1.8, color: "#6b7491", marginBottom: 36 }}>Whether it's a data science role, a research collab, or just a great conversation about ML — I'm always open.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["✉️", "Email", "jisshnu2003@gmail.com", "mailto:jisshnu2003@gmail.com", "#00e5c3"], ["💼", "LinkedIn", "/in/jisshnuhj", "https://www.linkedin.com/in/jisshnuhj/", "#ffb347"], ["📱", "Phone", "+61 0421 643 356", "tel:+61421643356", "#ff6b9d"], ["📍", "Location", "Melbourne, VIC", null, "#a78bfa"]].map(([ic, lb, val, hr, col]) => (
                <a key={lb} href={hr || "#"} target={hr?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "#141824", border: "none", borderRadius: 13, padding: "14px 18px", transition: "all 0.25s", cursor: hr ? "pointer" : "default" }}
                  onMouseEnter={e => { if (hr) { e.currentTarget.style.borderColor = col + "40"; e.currentTarget.style.transform = "translateX(4px)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: col + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{ic}</div>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", letterSpacing: "0.1em", textTransform: "uppercase" }}>{lb}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "#e8eaf2" }}>{val}</div>
                  </div>
                  {hr && <span style={{ marginLeft: "auto", color: col, fontSize: "0.8rem" }}>↗</span>}
                </a>
              ))}
            </div>
          </div>
          <div style={{ background: "#141824", border: "none", borderRadius: 22, padding: 32 }}>
            <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", letterSpacing: "0.1em", marginBottom: 22 }}>// send a message</div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: 14 }}>✈️</div>
                <div style={{ fontWeight: 700, fontSize: "1.15rem", color: "#00e5c3", marginBottom: 7 }}>Message sent!</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#6b7491" }}>I'll get back to you soon.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["name", "Name", "Your name"], ["email", "Email", "your@email.com"]].map(([k, lb, ph]) => (
                  <div key={k}>
                    <label style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>{lb}</label>
                    <input value={form[k]} onChange={f(k)} placeholder={ph} style={inp} onFocus={e => e.target.style.borderColor = "rgba(0,229,195,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#3d4259", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Message</label>
                  <textarea value={form.msg} onChange={f("msg")} rows={5} placeholder="What's on your mind?" style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = "rgba(0,229,195,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                </div>
                <button onClick={() => { setSent(true); setTimeout(() => setSent(false), 4000); }} style={{ width: "100%", padding: 13, background: "#00e5c3", color: "#080b12", fontWeight: 700, fontSize: "0.88rem", border: "none", borderRadius: 10, cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.target.style.background = "#00ffda"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 28px rgba(0,229,195,0.3)"; }}
                  onMouseLeave={e => { e.target.style.background = "#00e5c3"; e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>
                  Send Message ✈️
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: 72, paddingTop: 26, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#3d4259" }}>✈️ Jisshnu HJ © 2025 · Built with React</span>
          <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#3d4259" }}>Data Science · Melbourne</span>
          <div style={{ display: "flex", gap: 18 }}>
            {[["LinkedIn", "https://www.linkedin.com/in/jisshnuhj/"], ["Email", "mailto:jisshnu2003@gmail.com"]].map(([l, h]) => (
              <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#3d4259", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#00e5c3"} onMouseLeave={e => e.target.style.color = "#3d4259"}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHead({ tag, title }) {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#00e5c3", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>
      <h2 style={{ fontSize: "clamp(2.1rem,4.5vw,3.7rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em" }}>{title}</h2>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#080b12", color: "#e8eaf2", fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #00e5c3; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: #080b12; }
        a { text-decoration: none; color: inherit; }
        ul { list-style: none; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes tagpulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes slidein { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:none} }
      `}</style>
      <FlightCursor />
      <Nav scrollY={scrollY} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Extracurricular />
      <Contact />
    </div>
  );
}