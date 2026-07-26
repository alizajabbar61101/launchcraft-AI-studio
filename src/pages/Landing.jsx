import heroBackground from "../assets/hero-background.svg";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

import "../styles/landing.css";

function Landing() {
  return (
    <div className="app">

      <div
        className="global-bg"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>

      <Navbar />

      <Hero />

      <Trusted />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer />

    </div>
  );
}

export default Landing;