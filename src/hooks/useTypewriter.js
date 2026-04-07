import { useState, useEffect } from "react";

export default function useTypewriter(words) {
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