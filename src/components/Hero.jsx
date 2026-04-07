import { useRef, useState, useCallback } from "react";
import useTypewriter from "../hooks/useTypewriter";
import useInView from "../hooks/useInView";
import useCounter from "../hooks/useCounter";
import ParticleCanvas from "./ParticleCanvas";
import { ROLES } from "../data/data";

function Hero() {
  const role = useTypewriter(ROLES);

  const ref = useRef();
  const vis = useInView(ref, 0.05);

  const i3 = useCounter(3, vis);
  const i2 = useCounter(2, vis);
  const i26 = useCounter(26, vis);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  const handleMouse = useCallback((e) => {
    if (!cardRef.current) return;

    const r = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);

    setTilt({ x: dy * 12, y: -dx * 12 });
  }, []);

return (
  <section
    id="hero"
    ref={ref}
    onMouseMove={handleMouse}
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      padding: "0 48px",
      color: "white",
    }}
  >
    <ParticleCanvas />

    <div style={{ position: "relative", zIndex: 2 }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
        Jisshnu Hemakumar Jayanthi
      </h1>

      <p style={{ color: "#00e5c3" }}>
        {">"} {role}
      </p>

      <p style={{ marginTop: "10px" }}>
        Internships: {i3} | Projects: {i2} | Grad: 20{i26}
      </p>
    </div>
  </section>
);
}

export default Hero;