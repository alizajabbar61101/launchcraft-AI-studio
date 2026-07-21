import heroBackground from "../assets/hero-background.svg";

function Hero() {
  return (
    <section className="hero" id="home">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>

      <div className="hero-inner">
        <div className="hero-content">
          <span className="eyebrow">AI Product Intelligence</span>

          <h1>
            Transform Your Ideas Into
            <br />
            Complete <span className="text-gradient">Products With AI</span>
          </h1>

          <p>
            LaunchCraft AI Studio helps founders, developers, and innovators turn
            raw ideas into structured product plans using AI-powered analysis,
            feature planning, UI/UX recommendations, technology suggestions, and
            development roadmaps.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Start Building Free</button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span>
              Watch Demo
            </button>
          </div>

          <p className="hero-trust">Trusted by 4,000+ founders and product teams</p>
        </div>

        <div className="ai-card floating-card" id="dashboard">
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
    </section>
  );
}

export default Hero;
