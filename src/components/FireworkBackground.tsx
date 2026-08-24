const sparks = [
  { left: "6%", top: "18%", size: 5, delay: "0s" },
  { left: "18%", top: "62%", size: 3, delay: "1.4s" },
  { left: "32%", top: "12%", size: 4, delay: "2.6s" },
  { left: "47%", top: "78%", size: 3, delay: "0.8s" },
  { left: "61%", top: "26%", size: 5, delay: "3.2s" },
  { left: "74%", top: "58%", size: 4, delay: "1.9s" },
  { left: "86%", top: "16%", size: 3, delay: "2.2s" },
  { left: "93%", top: "70%", size: 5, delay: "0.4s" },
];

const bursts = [
  { left: "12%", top: "22%", size: 180, delay: "0s" },
  { left: "78%", top: "12%", size: 240, delay: "1.8s" },
  { left: "58%", top: "72%", size: 160, delay: "3.4s" },
];

export function FireworkBackground({ dense = false }: { dense?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--spark) 45%, transparent), transparent 70%)",
        }}
      />
      {bursts.slice(0, dense ? 3 : 2).map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-burst"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)",
            boxShadow: "0 0 40px color-mix(in oklab, var(--spark) 40%, transparent)",
          }}
        />
      ))}
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float-spark"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            background: "var(--spark)",
            boxShadow: "0 0 12px var(--spark)",
          }}
        />
      ))}
    </div>
  );
}
