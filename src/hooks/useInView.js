import { useState, useEffect } from "react";

export default function useInView(ref, threshold = 0.15) {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [ref, threshold]);

  return vis;
}