import { useTranslation } from "react-i18next";
import { Map, Mail, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

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

          <form
            className="footer-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              aria-label="Email address"
            />

            <button type="submit">
              <span>{t("footer.subscribeBtn")}</span>
              <ArrowRight size={16} />
            </button>
          </form>
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
              <a href="#" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="#" aria-label="TikTok">
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>{t("footer.colCompany")}</h3>
            <Link to="/about">{t("footer.aboutUs")}</Link>
            <Link to="/careers">{t("footer.careers")}</Link>
            <Link to="/press">{t("footer.press")}</Link>
            <Link to="/contact">{t("footer.contactUs")}</Link>
          </div>

          <div className="footer-column">
            <h3>{t("footer.colSupport")}</h3>
            <Link to="/help">{t("footer.helpCenter")}</Link>
            <Link to="/faq">{t("footer.faqs")}</Link>
            <Link to="/terms">{t("footer.terms")}</Link>
            <Link to="/privacy">{t("footer.privacy")}</Link>
          </div>

          <div className="footer-column">
            <h3>{t("footer.colResources")}</h3>
            <Link to="/travel-guide">{t("footer.travelGuide")}</Link>
            <Link to="/blog">{t("footer.blog")}</Link>
            <Link to="/destinations">{t("footer.destinations")}</Link>
            <Link to="/activities">{t("footer.activities")}</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright")}</p>

          <div className="footer-bottom-links">
            <button type="button">English</button>
            <button type="button">DZD</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
