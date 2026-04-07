const ROLES = ["Data Scientist", "ML Engineer", "Analytics Dev", "BI Specialist", "Data Storyteller"];

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