import { useState, useEffect } from "react";

export default function useCounter(target, started) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) return;

    let step = 0;
    const steps = 50;

    const iv = setInterval(() => {
      step++;
      const p = 1 - Math.pow(1 - step / steps, 3);
      setVal(Math.round(target * p));

      if (step >= steps) clearInterval(iv);
    }, 1400 / steps);

    return () => clearInterval(iv);
  }, [started, target]);

  return val;
}