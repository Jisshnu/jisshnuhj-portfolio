import { useState } from "react";
import { EXPERIENCES } from "../data/data";

function Experience() {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCES[active];

  return (
    <section
      id="experience"
      style={{
        padding: "100px 48px",
        background: "#080b12",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>Experience</h2>

      <div style={{ display: "flex", gap: "30px" }}>
        
        {/* LEFT SIDE (list) */}
        <div style={{ minWidth: "250px" }}>
          {EXPERIENCES.map((e, i) => (
            <div
              key={e.id}
              onClick={() => setActive(i)}
              style={{
                padding: "15px",
                cursor: "pointer",
                borderLeft:
                  active === i
                    ? `3px solid ${e.color}`
                    : "3px solid transparent",
                background:
                  active === i ? "rgba(255,255,255,0.05)" : "transparent",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{e.company}</div>
              <div style={{ fontSize: "0.8rem", color: "#6b7491" }}>
                {e.role}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE (details) */}
        <div>
          <h3>{exp.company}</h3>
          <p style={{ color: "#00e5c3" }}>{exp.role}</p>
          <p style={{ color: "#6b7491" }}>{exp.period}</p>

          <ul>
            {exp.points.map((p, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                {p}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "20px" }}>
            {exp.tags.map((t) => (
              <span
                key={t}
                style={{
                  marginRight: "8px",
                  padding: "4px 10px",
                  border: "1px solid #00e5c3",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;