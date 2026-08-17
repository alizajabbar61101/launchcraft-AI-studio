import { useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";

function Hero() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTilting, setIsTilting] = useState(false);

  const [trustRef, trustVisible] = useReveal();
  const founderCount = useCountUp(4000, trustVisible);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    // Small max angle keeps it feeling premium, not gimmicky
    setTilt({ x: relY * -8, y: relX * 10 });
  }

  function handleMouseLeave() {
    setIsTilting(false);
    setTilt({ x: 0, y: 0 });
  }

  // Magnetic hover — button nudges a few px toward the cursor, then
  // snaps back on mouseleave.
  function magnetProps(strength = 14) {
    return {
      onMouseMove: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        e.currentTarget.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "translate(0px, 0px)";
      },
    };
  }

  return (
    <section className="hero" id="home">
      <div className="aurora">
        <span className="aurora-blob blob-1"></span>
        <span className="aurora-blob blob-2"></span>
        <span className="aurora-blob blob-3"></span>
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <span className="eyebrow">AI Product Intelligence</span>

          <h1>
            Transform Your Ideas Into
            <br />
            Complete <span className="text-gradient">Products With AI</span>
          </h1>

          <p className="hero-desc">
            LaunchCraft AI Studio helps founders, developers, and innovators turn
            raw ideas into structured product plans using AI-powered analysis,
            feature planning, UI/UX recommendations, technology suggestions, and
            development roadmaps.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" {...magnetProps(10)}>Start Building Free</button>
            <button className="btn-secondary" {...magnetProps(8)}>
              <span className="play-icon">▶</span>
              Watch Demo
            </button>
          </div>

          <p className={`hero-trust reveal ${trustVisible ? "visible" : ""}`} ref={trustRef}>
            Trusted by {founderCount.toLocaleString()}+ founders and product teams
          </p>
        </div>

        <div className="ai-card-glow">
          <div
            ref={cardRef}
            className={`ai-card floating-card ${isTilting ? "tilting" : ""}`}
            id="dashboard"
            onMouseEnter={() => setIsTilting(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isTilting
                ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                : undefined,
            }}
          >
            <div className="ai-card-header">
              <span className="ai-dot"></span>
              AI Product Analyzer
            </div>

            <div className="idea-box">
              <span className="idea-label">Product Idea</span>
              <p>AI Fitness Assistant</p>
            </div>

            <div className="scan-line"></div>

            <div className="analysis-list">
              <p style={{ animationDelay: "0.2s" }}>Market Opportunity</p>
              <p style={{ animationDelay: "0.5s" }}>Core Features</p>
              <p style={{ animationDelay: "0.8s" }}>Recommended Tech Stack</p>
              <p style={{ animationDelay: "1.1s" }}>UI/UX Suggestions</p>
              <p style={{ animationDelay: "1.4s" }}>Development Timeline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;