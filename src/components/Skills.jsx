import { useState } from "react";
import { SKILLS } from "../data/data";

function Skills() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Code", "ML", "Viz", "Web", "DB", "Tools"];

  const filteredSkills =
    filter === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.cat === filter);

  return (
    <section
      id="skills"
      style={{
        padding: "100px 48px",
        background: "#080b12",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Skills</h2>

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: "30px" }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              marginRight: "10px",
              marginBottom: "10px",
              padding: "6px 14px",
              borderRadius: "20px",
              border:
                filter === c
                  ? "1px solid #00e5c3"
                  : "1px solid rgba(255,255,255,0.1)",
              background:
                filter === c
                  ? "rgba(0,229,195,0.1)"
                  : "transparent",
              color: filter === c ? "#00e5c3" : "#6b7491",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* SKILL BARS */}
      <div style={{ display: "grid", gap: "15px" }}>
        {filteredSkills.map((s) => (
          <div key={s.name}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span>{s.name}</span>
              <span style={{ color: s.color }}>{s.level}%</span>
            </div>

            <div
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  width: `${s.level}%`,
                  height: "100%",
                  background: s.color,
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;