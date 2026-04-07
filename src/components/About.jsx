import { useRef } from "react";
import useInView from "../hooks/useInView";

function About() {
  const ref = useRef();
  const vis = useInView(ref);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 48px",
        background: "#0d1117",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>About Me</h2>

      <p style={{ maxWidth: "600px", lineHeight: "1.7", color: "#6b7491" }}>
        I'm a Data Science master's student at Monash University, Melbourne,
        with a strong foundation in machine learning, analytics, and data
        storytelling.
      </p>

      <p style={{ maxWidth: "600px", lineHeight: "1.7", color: "#6b7491" }}>
        I've worked on predictive models, dashboards, and real-time analytics
        systems across domains like water treatment, transportation, and health.
      </p>

      <p style={{ maxWidth: "600px", lineHeight: "1.7", color: "#6b7491" }}>
        Beyond tech — I’m an NCC cadet who has flown aircraft at 10,000ft,
        combining discipline, leadership, and curiosity in everything I do.
      </p>

      {vis && (
        <div style={{ marginTop: "30px", color: "#00e5c3" }}>
          🚀 Section in view (animation trigger ready)
        </div>
      )}
    </section>
  );
}

export default About;