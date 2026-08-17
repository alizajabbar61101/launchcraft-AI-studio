import { useReveal } from "../hooks/useReveal";

const features = [
  {
    title: "AI Idea Analysis",
    text: "Analyze your product idea and discover opportunities.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    title: "Feature Planning",
    text: "Generate MVP features and product requirements.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6h11" /><path d="M9 12h11" /><path d="M9 18h11" />
        <path d="m4 6 1 1 2-2" /><path d="m4 12 1 1 2-2" /><path d="m4 18 1 1 2-2" />
      </svg>
    ),
  },
  {
    title: "UI/UX Suggestions",
    text: "Get AI generated interface recommendations.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" /><path d="M9 9v11" />
      </svg>
    ),
  },
  {
    title: "Technology Advisor",
    text: "Choose the right technology stack.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <path d="M12 2v3" /><path d="M12 19v3" /><path d="M2 12h3" /><path d="M19 12h3" />
        <path d="M4.9 4.9l2 2" /><path d="M17 17l2 2" /><path d="M4.9 19.1l2-2" /><path d="M17 7l2-2" />
      </svg>
    ),
  },
  {
    title: "Development Roadmap",
    text: "Create a step-by-step development plan.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19V5a2 2 0 0 1 2-2h12l2 2v14l-2-2H6a2 2 0 0 0-2 2Z" />
        <path d="M8 8h8" /><path d="M8 12h5" />
      </svg>
    ),
  },
  {
    title: "AI Product Assistant",
    text: "Chat with your AI product strategist.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
    ),
  },
];

function FeatureCard({ item, index }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`feature-card reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div className="feature-icon">{item.icon}</div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="features" id="features">
      <div className="section-header">
        <h2>Powerful AI Product Tools</h2>
      </div>

      <div
        className="feature-grid"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty("--mx", `${x}%`);
          e.currentTarget.style.setProperty("--my", `${y}%`);
        }}
      >
        {features.map((item, index) => (
          <FeatureCard item={item} index={index} key={item.title} />
        ))}
      </div>
    </section>
  );
}

export default Features;