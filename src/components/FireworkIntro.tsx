import { useEffect, useRef, useState } from "react";
import logoImg from "../assets/sparklefire-logo.png";

export function FireworkIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<
    "idle" | "spark" | "shoot" | "burst" | "logo" | "shimmer" | "fadeout" | "hidden"
  >("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Particle systems
  const particlesRef = useRef<any[]>([]);
  const sparkRef = useRef<{ x: number; y: number; vy: number; brightness: number } | null>(null);
  const bgParticlesRef = useRef<any[]>([]);

  // Setup localStorage check and prefers-reduced-motion
  useEffect(() => {
    // Check if development reset is requested or if it's the first visit
    const seen = localStorage.getItem("sparklefire_intro_seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!seen) {
      setShow(true);
      if (prefersReducedMotion) {
        // Reduced motion sequence: skip canvas, just fade in logo for 1.5s
        setPhase("logo");
        setTimeout(() => {
          setPhase("fadeout");
          setTimeout(() => {
            setPhase("hidden");
            setShow(false);
            localStorage.setItem("sparklefire_intro_seen", "true");
          }, 1000);
        }, 1500);
      } else {
        setPhase("spark");
      }
    } else {
      setPhase("hidden");
    }
  }, []);

  const handleSkip = () => {
    setPhase("fadeout");
    localStorage.setItem("sparklefire_intro_seen", "true");
    setTimeout(() => {
      setPhase("hidden");
      setShow(false);
    }, 800);
  };

  // Main animation sequence timing (for normal motion)
  useEffect(() => {
    if (!show) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 0.0s - 0.8s: Spark flickering (already set as initial phase "spark" when seen is false)
    const shootTimeout = setTimeout(() => {
      setPhase("shoot");
    }, 800);

    // 0.8s - 1.8s: Shoot up + burst
    const burstTimeout = setTimeout(() => {
      setPhase("burst");
    }, 1400);

    // 1.8s - 3.2s: Logo reveals
    const logoTimeout = setTimeout(() => {
      setPhase("logo");
    }, 1800);

    // 3.2s - 4.2s: Shimmer + small burst
    const shimmerTimeout = setTimeout(() => {
      setPhase("shimmer");
    }, 3200);

    // 4.2s - 5.5s: Hold and transition out
    const fadeoutTimeout = setTimeout(() => {
      setPhase("fadeout");
    }, 4500);

    const endTimeout = setTimeout(() => {
      setPhase("hidden");
      setShow(false);
      localStorage.setItem("sparklefire_intro_seen", "true");
    }, 5700);

    return () => {
      clearTimeout(shootTimeout);
      clearTimeout(burstTimeout);
      clearTimeout(logoTimeout);
      clearTimeout(shimmerTimeout);
      clearTimeout(fadeoutTimeout);
      clearTimeout(endTimeout);
    };
  }, [show]);

  // Canvas drawing loop
  useEffect(() => {
    if (!show || phase === "hidden") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize background floating dust particles
    const bgParticles: any[] = [];
    for (let i = 0; i < 25; i++) {
      bgParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.2 - 0.05,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    bgParticlesRef.current = bgParticles;

    // Initialize main spark in center
    sparkRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vy: 0,
      brightness: 1,
    };

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // 1. Draw subtle floating dust particles
      bgParticlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 154, 0, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#FFD75A";
        ctx.fill();
      });
      ctx.shadowBlur = 0; // Reset shadow

      // 2. Spark phase (0.0s - 0.8s)
      if (phase === "spark" && sparkRef.current) {
        const s = sparkRef.current;
        s.brightness = 0.8 + Math.random() * 0.4; // Flicker

        // Draw glowing golden spark
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 16);
        grad.addColorStop(0, "#FFF");
        grad.addColorStop(0.2, "#FFD75A");
        grad.addColorStop(0.6, "rgba(217, 154, 0, 0.4)");
        grad.addColorStop(1, "rgba(217, 154, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 16, 0, Math.PI * 2);
        ctx.fill();

        // Draw cross flares
        ctx.strokeStyle = "rgba(255, 215, 90, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x - 10, s.y);
        ctx.lineTo(s.x + 10, s.y);
        ctx.moveTo(s.x, s.y - 10);
        ctx.lineTo(s.x, s.y + 10);
        ctx.stroke();
      }

      // 3. Shoot phase (0.8s - 1.4s)
      if (phase === "shoot" && sparkRef.current) {
        const s = sparkRef.current;
        if (s.vy === 0) {
          s.vy = -6; // Initial velocity upward
        }
        s.y += s.vy;
        s.vy += 0.08; // Gravity decel

        // Draw spark head
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 12);
        grad.addColorStop(0, "#FFF");
        grad.addColorStop(0.3, "#FFD75A");
        grad.addColorStop(1, "rgba(217, 154, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw thin spark trail
        ctx.beginPath();
        const trailGrad = ctx.createLinearGradient(s.x, s.y, s.x, s.y - s.vy * 4);
        trailGrad.addColorStop(0, "rgba(255, 215, 90, 0.8)");
        trailGrad.addColorStop(1, "rgba(217, 154, 0, 0)");
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - s.vy * 4);
        ctx.stroke();
      }

      // 4. Burst & Logo phases (1.4s onwards)
      // Trigger particles on entering burst phase
      if (phase === "burst" && particlesRef.current.length === 0 && sparkRef.current) {
        const s = sparkRef.current;
        const count = 75;
        const tempParticles = [];

        // Elegant fireworks trails using angle and velocity
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4.5 + 1.5;
          tempParticles.push({
            x: s.x,
            y: s.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            history: [{ x: s.x, y: s.y }],
            color: Math.random() > 0.3 ? "#FFD75A" : "#FFF",
            alpha: 1,
            decay: Math.random() * 0.015 + 0.012,
            gravity: 0.04,
            friction: 0.98,
          });
        }
        particlesRef.current = tempParticles;
      }

      // Render secondary burst above logo in Shimmer phase
      if (phase === "shimmer" && particlesRef.current.length < 15) {
        // Trigger a smaller elegant burst slightly above the logo
        const count = 35;
        const bx = cx;
        const by = cy - 140;
        const tempParticles = [...particlesRef.current];
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 1;
          tempParticles.push({
            x: bx,
            y: by,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            history: [{ x: bx, y: by }],
            color: i % 3 === 0 ? "#FFF" : "#D99A00",
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015,
            gravity: 0.03,
            friction: 0.97,
          });
        }
        particlesRef.current = tempParticles;
      }

      // Update and draw active firework particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 10) {
          p.history.shift();
        }

        if (p.alpha <= 0) return false;

        // Draw particle trail
        ctx.beginPath();
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let i = 1; i < p.history.length; i++) {
          ctx.lineTo(p.history[i].x, p.history[i].y);
        }
        ctx.strokeStyle =
          p.color === "#FFF" ? `rgba(255,255,255,${p.alpha})` : `rgba(255, 215, 90, ${p.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "#FFD75A";
        ctx.stroke();
        ctx.shadowBlur = 0;

        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [show, phase]);

  if (!show || phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFDF5] to-[#FFF8E8] transition-all duration-1000 ${
        phase === "fadeout" ? "pointer-events-none scale-105 opacity-0" : "opacity-100"
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,90,0.15)_0%,transparent_60%)] pointer-events-none" />

      {/* Canvas for fireworks */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main Logo Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-[1200ms] ease-out ${
          phase === "logo" || phase === "shimmer"
            ? "translate-y-0 scale-100 opacity-100"
            : phase === "spark" || phase === "shoot" || phase === "burst"
              ? "translate-y-8 scale-95 opacity-0"
              : ""
        }`}
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div className="relative overflow-hidden w-[290px] sm:w-[390px] md:w-[480px] aspect-[2/3] px-4 flex items-center justify-center">
          {/* Logo image with progressive clip-path reveals */}
          <img
            src={logoImg}
            alt="SparkleFire Logo"
            className="w-full h-auto object-contain transition-all duration-1000 ease-out"
            style={{
              clipPath:
                phase === "logo" || phase === "shimmer"
                  ? "inset(0 0 0% 0)" // Fully revealed
                  : "inset(0 0 100% 0)", // Starts hidden
            }}
          />

          {/* Shimmer Sweep Overlay */}
          {phase === "shimmer" && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge animate-logo-shimmer"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,223,120,0.6) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          )}
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-20 rounded-full border border-gold/40 bg-ivory/40 px-5 py-1.5 font-sans text-xs font-semibold tracking-wider text-gold-deep backdrop-blur transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
      >
        SKIP
      </button>

      {/* Style injects for custom timing animations */}
      <style>{`
        @keyframes shimmerSweep {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-logo-shimmer {
          animation: shimmerSweep 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
}
