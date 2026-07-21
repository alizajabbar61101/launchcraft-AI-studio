onst steps = [
  {
    number: "1",
    title: "Describe Your Idea",
    desc: "Enter your product concept in plain language — no forms, no templates, just your idea.",
  },
  {
    number: "2",
    title: "AI Generates Blueprint",
    desc: "LaunchCraft AI analyzes the idea and produces features, design suggestions, tech stack, and a roadmap.",
  },
  {
    number: "3",
    title: "Start Building",
    desc: "Follow your generated product strategy step by step, from MVP to full launch.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How LaunchCraft AI Works</h2>
        <p>Three simple steps take you from a raw idea to a structured, buildable plan.</p>
      </div>

      <div className="timeline">
        {steps.map((step) => (
          <div className="timeline-step" key={step.number}>
            <div className="step-marker">{step.number}</div>
            <div className="step-body">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;