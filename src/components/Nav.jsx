import { useState, useEffect } from "react";

function Nav() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = scrollY > 60;

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "12px 48px" : "20px 48px",
        background: scrolled ? "rgba(8,11,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#00e5c3",
        }}
      >
        ✈️ JHJ.DEV
      </span>

      {/* Links */}
      <div style={{ display: "flex", gap: 20 }}>
        {["about", "experience", "projects", "skills", "extras", "contact"].map(
          (s) => (
            <button
              key={s}
              onClick={() => go(s)}
              style={{
                background: "none",
                border: "none",
                color: "#6b7491",
                cursor: "pointer",
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
            >
              {s}
            </button>
          )
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() => go("contact")}
        style={{
          background: "#00e5c3",
          border: "none",
          padding: "8px 16px",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        Hire Me
      </button>
    </nav>
  );
}

export default Nav;