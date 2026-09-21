import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  CalendarDays,
  UsersRound,
  WalletCards,
  Search,
  Send,
} from "lucide-react";

import heroImage from "../../assets/images/rahla-hero-photo.jpg";
import "./Hero.css";

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 1. حالات تخزين قيم البحث
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState("");

  // 2. دالة تنفيذ البحث والتوجيه
  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    if (destination) queryParams.append("search", destination);
    if (dates) queryParams.append("dates", dates);
    if (travelers) queryParams.append("travelers", travelers);
    if (budget) queryParams.append("budget", budget);

    navigate(`/destinations?${queryParams.toString()}`);
  };

  return (
    <section className="hero">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t("hero.titlePart1")}
            <br />
            <span>{t("hero.titlePart2")}</span>
          </h1>

          <p className="hero-description">
            {t("hero.descPart1")}
            <br />
            {t("hero.descPart2")}
            <br />
            {t("hero.descPart3")}
          </p>

          <button
            className="hero-cta"
            onClick={() => navigate("/destinations")}
          >
            <span>{t("hero.cta")}</span>
            <span className="hero-cta-icon">
              <ArrowRight size={17} strokeWidth={2.5} />
            </span>
          </button>
        </div>

        <form className="hero-search-card" onSubmit={handleSearch}>
          <div className="search-card-header">
            <h2>{t("hero.searchCardTitle")}</h2>
            <div className="travel-path">
              <span />
              <span />
              <span />
              <Send size={19} />
            </div>
          </div>

          <div className="search-fields">
            {/* الوجهة */}
            <div className="search-field">
              <div className="search-field-icon">
                <MapPin size={22} strokeWidth={1.8} />
              </div>
              <div className="search-field-content">
                <span className="search-field-label">
                  {t("hero.destinationLabel")}
                </span>
                <input
                  type="text"
                  className="search-field-input"
                  placeholder={t("hero.destinationValue")}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* التواريخ */}
            <div className="search-field">
              <div className="search-field-icon">
                <CalendarDays size={22} strokeWidth={1.8} />
              </div>
              <div className="search-field-content">
                <span className="search-field-label">
                  {t("hero.datesLabel")}
                </span>
                <input
                  type="text"
                  className="search-field-input"
                  placeholder={t("hero.datesValue")}
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                />
              </div>
            </div>

            {/* عدد المسافرين */}
            <div className="search-field">
              <div className="search-field-icon">
                <UsersRound size={22} strokeWidth={1.8} />
              </div>
              <div className="search-field-content">
                <span className="search-field-label">
                  {t("hero.travelersLabel")}
                </span>
                <input
                  type="text"
                  className="search-field-input"
                  placeholder={t("hero.travelersValue")}
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                />
              </div>
            </div>

            {/* الميزانية */}
            <div className="search-field">
              <div className="search-field-icon">
                <WalletCards size={22} strokeWidth={1.8} />
              </div>
              <div className="search-field-content">
                <span className="search-field-label">
                  {t("hero.budgetLabel")}
                </span>
                <input
                  type="text"
                  className="search-field-input"
                  placeholder={t("hero.budgetValue")}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="search-button">
              <span>{t("hero.searchBtn")}</span>
              <Search size={19} strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Hero;
