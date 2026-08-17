const companies = ["Nova", "Vertex", "Orbit", "PixelLabs"];
// Duplicated once so the marquee can loop seamlessly (translateX(-50%)
// lands exactly on the start of the second copy).
const marqueeItems = [...companies, ...companies];

function Trusted() {
  return (
    <section className="trusted">
      <h3>Trusted by developers, founders and innovators</h3>

      <div className="trusted-marquee">
        <div className="marquee-track">
          {marqueeItems.map((name, index) => (
            <span key={`${name}-${index}`}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trusted;