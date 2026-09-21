import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, LogIn } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/destinations");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to login. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t("loginPage.title")}</h2>
          <p>{t("loginPage.subtitle")}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t("loginPage.emailLabel")}</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("loginPage.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("loginPage.passwordLabel")}</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              t("loginPage.submittingBtn")
            ) : (
              <>
                {t("loginPage.submitBtn")} <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {t("loginPage.footerText")}{" "}
          <Link to="/register">{t("loginPage.footerLink")}</Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
