import { useState, useEffect } from "react";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
    };

    const links = [
        { name: "Home", path: "#home" },
        { name: "Features", path: "#features" },
        { name: "How It Works", path: "#how-it-works" },
        { name: "Create Workspace", path: "#workspace" }
    ];

    return (
        <header className="glass-header">

            {/* Logo */}
            <div className="logo-mark">
                <span className="logo-dot"></span>
                LaunchCraft
                <span className="logo-ai">AI</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
                {links.map((link) => (
                    <a key={link.name} href={link.path}>
                        {link.name}
                    </a>
                ))}
            </nav>

            {/* Action Buttons */}
            <div className="nav-buttons">
                <button className="login-btn">Login</button>
                <button className="start-btn">Get Started</button>
            </div>

            {/* Mobile Menu Button */}
            <button
                className={`hamburger ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Mobile Drawer */}
            <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
                {links.map((link) => (
                    <a key={link.name} href={link.path} onClick={closeMenu}>
                        {link.name}
                    </a>
                ))}

                <button className="login-btn">Login</button>
                <button className="start-btn">Get Started</button>
            </div>

        </header>
    );
}

export default Navbar;