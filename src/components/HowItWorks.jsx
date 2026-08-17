import { useReveal } from "../hooks/useReveal";

const steps = [
  {
    number: "1",
    title: "Describe Your Idea",
    desc: "Enter your product concept in plain language — no forms, no templates, just your idea.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" /><path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "AI Generates Blueprint",
    desc: "LaunchCraft AI analyzes the idea and produces features, design suggestions, tech stack, and a roadmap.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 4.3L6 9l4.1 1.7L12 15l1.9-4.3L18 9l-4.1-1.7L12 3Z" />
        <path d="M19 15v4" /><path d="M17 17h4" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Start Building",
    desc: "Follow your generated product strategy step by step, from MVP to full launch.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

function TimelineStep({ step, index }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`timeline-step reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      <div className="step-marker">{step.number}</div>

      <div className="step-card">
        <div className="step-card-top">
          <div className="step-icon">{step.icon}</div>
          <span className="step-number">Step {step.number}</span>
        </div>
        <div className="step-body">
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How LaunchCraft AI Works</h2>
        <p>Three simple steps take you from a raw idea to a structured, buildable plan.</p>
      </div>

      <div className="timeline">
        <div className="timeline-line">
          <span className="timeline-pulse"></span>
        </div>

        {steps.map((step, index) => (
          <TimelineStep step={step} index={index} key={step.number} />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;