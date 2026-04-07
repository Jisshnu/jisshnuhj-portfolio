function Projects() {
  const projects = [
    {
      title: "Predictive Health Risk Detection",
      desc: "Built ML models using wearable sensor data to detect early health risks. Used Random Forest, XGBoost, and LSTM.",
      tags: ["Python", "XGBoost", "LSTM", "Pandas"],
    },
    {
      title: "Melbourne Metro Commuter Analysis",
      desc: "Analysed transport data to identify peak congestion patterns and commuter trends using real datasets.",
      tags: ["Python", "Pandas", "Tableau"],
    },
  ];

  return (
    <section
      id="projects"
      style={{
        padding: "100px 48px",
        background: "#0d1117",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>Projects</h2>

      <div style={{ display: "grid", gap: "20px" }}>
        {projects.map((p, i) => (
          <div
            key={i}
            style={{
              padding: "20px",
              background: "#141824",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3>{p.title}</h3>
            <p style={{ color: "#6b7491" }}>{p.desc}</p>

            <div style={{ marginTop: "10px" }}>
              {p.tags.map((t) => (
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
        ))}
      </div>
    </section>
  );
}

export default Projects;