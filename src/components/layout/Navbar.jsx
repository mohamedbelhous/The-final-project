import { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 👈 Import Translation Hook
import {
  Heart,
  Globe2,
  ChevronDown,
  UserRound,
  Menu,
  X,
  Mountain,
  LogOut,
  AlertCircle,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation(); // Translation hook
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false); // Dropdown toggle state

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to change app language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdown(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.destinations"), path: "/destinations" },
    { label: t("nav.activities"), path: "/activities" },
    { label: t("nav.travelGuide"), path: "/travel-guide" },
    { label: t("nav.deals"), path: "/deals" },
    { label: t("nav.about"), path: "/about" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">
            <Mountain size={31} strokeWidth={2.2} />
          </span>
          <span className="logo-text">Rahla</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link
            to="/trips"
            className="navbar-action-icon"
            aria-label="Favorites"
          >
            <Heart size={21} strokeWidth={1.8} />
          </Link>

          {/* Dynamic Language Selector with Dropdown */}
          <div className="language-selector-wrapper">
            <button
              className="language-selector"
              onClick={() => setLangDropdown(!langDropdown)}
            >
              <Globe2 size={19} strokeWidth={1.8} />
              <span>{i18n.language.toUpperCase().slice(0, 2)}</span>
              <ChevronDown size={14} strokeWidth={2} />
            </button>

            {langDropdown && (
              <div className="language-dropdown">
                <button onClick={() => changeLanguage("en")}>
                  English (EN)
                </button>
                <button onClick={() => changeLanguage("ar")}>
                  العربية (AR)
                </button>
              </div>
            )}
          </div>

          {/* Conditional Auth Button */}
          {user ? (
            <div className="user-action-group">
              <Link to="/profile" className="sign-in-button profile-mode">
                <UserRound size={17} strokeWidth={1.8} />
                <span className="user-name-text">{user.name}</span>
              </Link>
              <button onClick={handleLogoutClick} className="navbar-logout-btn">
                <LogOut size={16} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="sign-in-button">
              <UserRound size={17} strokeWidth={1.8} />
              <span>{t("nav.signIn")}</span>
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal">
            <div className="modal-icon">
              <AlertCircle size={32} />
            </div>
            <h3>{t("logoutModal.title")}</h3>
            <p>{t("logoutModal.message")}</p>
            <div className="modal-actions">
              <button
                className="modal-btn cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                {t("logoutModal.cancel")}
              </button>
              <button className="modal-btn confirm" onClick={confirmLogout}>
                {t("logoutModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
