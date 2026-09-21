import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Compass,
  Target,
  Heart,
  Globe,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import "./About.css";

function About() {
  const { t } = useTranslation();

  const stats = [
    { number: "+50", label: t("aboutPage.stat1Label") },
    { number: "+10k", label: t("aboutPage.stat2Label") },
    { number: "58", label: t("aboutPage.stat3Label") },
    { number: "100%", label: t("aboutPage.stat4Label") },
  ];

  const values = [
    {
      icon: <Globe size={22} />,
      title: t("aboutPage.val1Title"),
      desc: t("aboutPage.val1Desc"),
    },
    {
      icon: <ShieldCheck size={22} />,
      title: t("aboutPage.val2Title"),
      desc: t("aboutPage.val2Desc"),
    },
    {
      icon: <Heart size={22} />,
      title: t("aboutPage.val3Title"),
      desc: t("aboutPage.val3Desc"),
    },
    {
      icon: <Users size={22} />,
      title: t("aboutPage.val4Title"),
      desc: t("aboutPage.val4Desc"),
    },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            <Compass size={14} /> {t("aboutPage.eyebrow")}
          </span>
          <h1>{t("aboutPage.heroTitle")}</h1>
          <p>{t("aboutPage.heroSubtitle")}</p>
        </div>
      </section>

      <div className="about-container">
        {/* Stats Grid */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Mission & Vision Grid */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">
              <Target size={24} />
            </div>
            <h3>{t("aboutPage.missionTitle")}</h3>
            <p>{t("aboutPage.missionDesc")}</p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">
              <Sparkles size={24} />
            </div>
            <h3>{t("aboutPage.visionTitle")}</h3>
            <p>{t("aboutPage.visionDesc")}</p>
          </div>
        </div>

        {/* Our Core Values */}
        <div className="about-values">
          <div className="about-values-header">
            <h2>{t("aboutPage.whyTitle")}</h2>
          </div>
          <div className="values-grid">
            {values.map((val, index) => (
              <div key={index} className="value-item">
                <div className="value-icon">{val.icon}</div>
                <div>
                  <h4>{val.title}</h4>
                  <p>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <h2>{t("aboutPage.ctaTitle")}</h2>
          <p>{t("aboutPage.ctaSubtitle")}</p>
          <Link to="/destinations" className="cta-button">
            {t("aboutPage.ctaBtn")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default About;
