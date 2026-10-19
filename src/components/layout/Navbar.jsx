import { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  ShieldCheck,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRole = user?.role || user?.roles || user?.userType || user?.type;

  const isAdmin =
    Boolean(user?.isAdmin) ||
    Boolean(user?.is_admin) ||
    Boolean(user?.user?.isAdmin) ||
    (typeof userRole === "string" && userRole.toLowerCase() === "admin") ||
    (Array.isArray(userRole) &&
      userRole.some((r) => String(r).toLowerCase() === "admin"));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdown(false);
    setMobileOpen(false);
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
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => setMobileOpen(false)}
        >
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
              {/* زر الأدمن للشاشات الكبيرة */}
              {isAdmin && (
                <Link to="/admin" className="admin-nav-button">
                  <ShieldCheck size={17} strokeWidth={1.8} />
                  <span>Admin</span>
                </Link>
              )}

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
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-menu-actions">
            <Link to="/trips" onClick={() => setMobileOpen(false)}>
              <Heart size={18} />
              <span>Favorites</span>
            </Link>

            <button
              onClick={() =>
                changeLanguage(i18n.language === "ar" ? "en" : "ar")
              }
            >
              <Globe2 size={18} />
              <span>
                {i18n.language === "ar" ? "English (EN)" : "العربية (AR)"}
              </span>
            </button>

            {user ? (
              <>
                {/* زر الأدمن للهاتف */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="mobile-admin-button"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShieldCheck size={18} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="mobile-sign-in"
                  onClick={() => setMobileOpen(false)}
                >
                  <UserRound size={18} />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="mobile-logout-button"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="mobile-sign-in"
                onClick={() => setMobileOpen(false)}
              >
                <UserRound size={18} />
                <span>{t("nav.signIn")}</span>
              </Link>
            )}
          </div>
        </div>
      )}

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
