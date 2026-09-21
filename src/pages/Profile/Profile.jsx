import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { User, Mail, Shield, MapPin } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="profile-loading">{t("profilePage.loading")}</div>;
  }

  return (
    <main className="profile-container">
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="avatar-circle">
            <User size={48} />
          </div>
          <h2 className="user-title-name">{user.name}</h2>
          <span className="user-role-badge">
            {user.role || t("profilePage.defaultRole")}
          </span>
        </div>

        {/* User Details */}
        <div className="profile-body">
          <h3 className="section-title">{t("profilePage.title")}</h3>

          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <User size={18} />
              </div>
              <div className="info-content">
                <label>{t("profilePage.fullName")}</label>
                <p>{user.name}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={18} />
              </div>
              <div className="info-content">
                <label>{t("profilePage.email")}</label>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Shield size={18} />
              </div>
              <div className="info-content">
                <label>{t("profilePage.role")}</label>
                <p>{user.role || t("profilePage.defaultUserRole")}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <MapPin size={18} />
              </div>
              <div className="info-content">
                <label>{t("profilePage.country")}</label>
                <p>{t("profilePage.countryValue")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
