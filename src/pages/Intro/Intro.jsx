import { ArrowRight, MapPin, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

import introImage from "../../assets/images/rahla-hero-photo.jpg";

import "./Intro.css";

function Intro() {
  const navigate = useNavigate();

  const handleStart = () => {
    document.querySelector(".intro-page")?.classList.add("intro-exit");

    setTimeout(() => {
      navigate("/app");
    }, 850);
  };

  return (
    <main
      className="intro-page"
      style={{ "--intro-image": `url(${introImage})` }}
    >
      {/* Background */}
      <div className="intro-background" />
      <div className="intro-overlay" />

      {/* Decorative Elements */}
      <div className="intro-orbit intro-orbit-one" />
      <div className="intro-orbit intro-orbit-two" />

      <span className="intro-dot intro-dot-one" />
      <span className="intro-dot intro-dot-two" />
      <span className="intro-dot intro-dot-three" />

      {/* Top */}
      <header className="intro-header">
        <div className="intro-logo">
          <span className="intro-logo-mark">
            <Compass size={19} strokeWidth={2} />
          </span>

          <span>Rahla</span>
        </div>

        <span className="intro-location">
          <MapPin size={13} strokeWidth={1.8} />
          Algeria
        </span>
      </header>

      {/* Main */}
      <div className="intro-main">

        <div className="intro-eyebrow">
          <span className="intro-eyebrow-line" />
          <span>YOUR JOURNEY STARTS HERE</span>
          <span className="intro-eyebrow-line" />
        </div>

        <h1 className="intro-title">
          <span className="intro-title-line">
            Discover
          </span>

          <span className="intro-title-line intro-title-highlight">
            Algeria.
          </span>

          <span className="intro-title-line intro-title-small">
            Your way.
          </span>
        </h1>

        <p className="intro-description">
          Discover places, experiences and hidden gems
          <br />
          made for the way you love to travel.
        </p>

        <button
          className="intro-start"
          onClick={handleStart}
        >
          <span>Start Exploring</span>

          <span className="intro-start-icon">
            <ArrowRight size={17} strokeWidth={2.4} />
          </span>
        </button>
      </div>

      {/* Bottom */}
      <div className="intro-bottom">
        <span>EXPLORE</span>

        <div className="intro-scroll">
          <span />
        </div>

        <span>01</span>
      </div>

      {/* Transition */}
      <div className="intro-transition" />
    </main>
  );
}

export default Intro;