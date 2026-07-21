function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo-mark">
            <span className="logo-dot"></span>
            LaunchCraft <span className="logo-ai">AI</span>
          </div>
          <p>
            AI-powered product development platform helping founders turn ideas
            into structured, buildable plans.
          </p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#docs">Documentation</a>
          <a href="#blog">Blog</a>
          <a href="#support">Support</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LaunchCraft AI. All rights reserved.</span>
        <span>Built for founders, developers, and innovators.</span>
      </div>
    </footer>
  );
}

export default Footer;
