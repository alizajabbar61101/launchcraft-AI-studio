function CTA() {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }

  return (
    <section className="cta" id="workspace" onMouseMove={handleMouseMove}>
      <div className="cta-inner">
        <h2>Ready to Build Your Next Product?</h2>
        <p>Turn your ideas into reality with AI-powered product intelligence.</p>
        <button className="cta-btn">Create Your Free Workspace</button>
      </div>
    </section>
  );
}

export default CTA;