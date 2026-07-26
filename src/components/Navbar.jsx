import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
            <Link to="/" className="logo-mark">

                <span className="logo-dot"></span>

                LaunchCraft

                <span className="logo-ai">AI</span>

            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">

                {links.map((link) => (

                    <a
                        key={link.name}
                        href={link.path}
                    >
                        {link.name}
                    </a>

                ))}

            </nav>

            {/* Desktop Buttons */}
            <div className="nav-buttons">

                <Link to="/login">
                    <button className="login-btn">
                        Login
                    </button>
                </Link>

                <Link to="/signup">
                    <button className="start-btn">
                        Get Started
                    </button>
                </Link>

            </div>

            {/* Hamburger */}
            <button
                className={`hamburger ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >

                <span></span>
                <span></span>
                <span></span>

            </button>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? "show" : ""}`}>

                {links.map((link) => (

                    <a
                        key={link.name}
                        href={link.path}
                        onClick={closeMenu}
                    >
                        {link.name}
                    </a>

                ))}

                <Link
                    to="/login"
                    onClick={closeMenu}
                >
                    <button className="Login-btn">
                        Login
                    </button>
                </Link>

                <Link
                    to="/signup"
                    onClick={closeMenu}
                >
                    <button className="start-btn">
                        Get Started
                    </button>
                </Link>

            </div>

        </header>
    );
}

export default Navbar;