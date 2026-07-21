import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Product Dashboard", href: "#dashboard" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <header className="glass-header">
        <div className="logo-mark">
          <span className="logo-dot"></span>
          LaunchCraft <span className="logo-ai">AI</span>
        </div>

        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div
        className={`drawer-overlay ${isOpen ? "active" : ""}`}
        onClick={close}
      ></div>

      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-top">
          <div className="logo-mark">
            <span className="logo-dot"></span>
            LaunchCraft <span className="logo-ai">AI</span>
          </div>
          <button className="drawer-close" onClick={close} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="drawer-links">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}

          <div className="drawer-divider"></div>

          <a href="#login" className="drawer-login" onClick={close}>
            Login
          </a>
          <a href="#signup" className="drawer-signup" onClick={close}>
            Sign Up
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
