import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Register() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/destinations");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t("registerPage.title")}</h2>
          <p>{t("registerPage.subtitle")}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t("registerPage.nameLabel")}</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t("registerPage.namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("registerPage.emailLabel")}</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("registerPage.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("registerPage.passwordLabel")}</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("registerPage.passwordPlaceholder")}
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              t("registerPage.submittingBtn")
            ) : (
              <>
                {t("registerPage.submitBtn")} <UserPlus size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {t("registerPage.footerText")}{" "}
          <Link to="/login">{t("registerPage.footerLink")}</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
