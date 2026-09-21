import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Compass, Heart, Sparkles } from "lucide-react";
import "./Intro.css";

function Intro() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="intro">
      <div className="intro-container">
        {/* Label Badge */}
        <div className="intro-label">
          <span className="intro-label-line" />
          <span>{t("intro.badge")}</span>
          <span className="intro-label-line" />
        </div>

        {/* Header & Description */}
        <div className="intro-content">
          <div className="intro-heading">
            <h2>
              {t("intro.titlePart1")}
              <br />
              <span>{t("intro.titlePart2")}</span>
            </h2>
          </div>

          <div className="intro-description">
            <p>{t("intro.description")}</p>
            <button
              className="intro-button"
              onClick={() => navigate("/destinations")}
            >
              <span>{t("intro.button")}</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="intro-btn-icon"
              />
            </button>
          </div>
        </div>

        {/* Features Cards */}
        <div className="intro-features">
          <div className="intro-feature">
            <div className="intro-feature-icon">
              <Compass size={20} strokeWidth={1.8} />
            </div>
            <div className="intro-feature-text">
              <span className="intro-feature-number">01</span>
              <h3>{t("intro.feature1Title")}</h3>
              <p>{t("intro.feature1Desc")}</p>
            </div>
          </div>

          <div className="intro-feature">
            <div className="intro-feature-icon">
              <Sparkles size={20} strokeWidth={1.8} />
            </div>
            <div className="intro-feature-text">
              <span className="intro-feature-number">02</span>
              <h3>{t("intro.feature2Title")}</h3>
              <p>{t("intro.feature2Desc")}</p>
            </div>
          </div>

          <div className="intro-feature">
            <div className="intro-feature-icon">
              <Heart size={20} strokeWidth={1.8} />
            </div>
            <div className="intro-feature-text">
              <span className="intro-feature-number">03</span>
              <h3>{t("intro.feature3Title")}</h3>
              <p>{t("intro.feature3Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
