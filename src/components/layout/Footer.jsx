import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Map, Mail, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    try {
      const stored = JSON.parse(
        localStorage.getItem("rahla_newsletter") || "[]",
      );
      const subscribers = Array.isArray(stored) ? stored : [];

      if (
        !subscribers.some(
          (item) => item.toLowerCase() === email.trim().toLowerCase(),
        )
      ) {
        subscribers.push(email.trim());
        localStorage.setItem(
          "rahla_newsletter",
          JSON.stringify(subscribers),
        );
      }
    } catch (error) {
      console.warn("Could not save newsletter subscription.", error);
    }

    setSubscribed(true);
    setEmail("");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith("ar") ? "en" : "ar");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-newsletter">
          <div className="footer-newsletter-content">
            <div className="footer-newsletter-icon">
              <Mail size={24} strokeWidth={1.8} />
            </div>

            <div>
              <h2>{t("footer.newsletterTitle")}</h2>
              <p>{t("footer.newsletterSubtitle")}</p>
            </div>
          </div>

          {subscribed ? (
            <p className="footer-newsletter-success" role="status">
              {t("footer.subscribeSuccess")}
            </p>
          ) : (
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                aria-label="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <button type="submit">
                <span>{t("footer.subscribeBtn")}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </section>

        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark">
                <Map size={19} strokeWidth={2.2} />
              </span>
              <span>Rahla</span>
            </Link>

            <p>
              {t("footer.brandDescPart1")}
              <br />
              {t("footer.brandDescPart2")}
            </p>

            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>{t("footer.colCompany")}</h3>
            <Link to="/about">{t("footer.aboutUs")}</Link>
            <Link to="/destinations">{t("footer.destinations")}</Link>
            <Link to="/activities">{t("footer.activities")}</Link>
          </div>

          <div className="footer-column">
            <h3>{t("footer.colSupport")}</h3>
            <a href="mailto:hello@rahla.dz">{t("footer.contactUs")}</a>
            <Link to="/trips">My Trips</Link>
            <Link to="/favorites">{t("nav.favorites")}</Link>
          </div>

          <div className="footer-column">
            <h3>{t("footer.colResources")}</h3>
            <Link to="/travel-guide">{t("footer.travelGuide")}</Link>
            <Link to="/deals">{t("nav.deals")}</Link>
            <Link to="/destinations">{t("footer.destinations")}</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright")}</p>

          <div className="footer-bottom-links">
            <button type="button" onClick={toggleLanguage}>
              {i18n.language.startsWith("ar") ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
