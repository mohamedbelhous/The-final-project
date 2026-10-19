import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { interests } from "../../../data/interests";
import "./ExploreInterests.css";

function ExploreInterests() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleInterestClick = (category) => {
    // التوجيه إلى صفحة الوجهات مع تمرير التصنيف في الرابط
    navigate(`/destinations?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="explore-interests">
      <div className="explore-interests-container">
        <div className="explore-interests-header">
          <div>
            <h2>{t("exploreInterests.title")}</h2>
            <span className="section-title-line" />
          </div>

          <button
            className="explore-view-all"
            onClick={() => navigate("/destinations")}
          >
            <span>{t("exploreInterests.viewAll")}</span>
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="interests-grid">
          {interests.map((interest) => {
            const Icon = interest.icon;
            return (
              <button
                key={interest.title}
                className={`interest-card ${interest.className}`}
                onClick={() =>
                  handleInterestClick(interest.category || interest.title)
                }
              >
                <span className="interest-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </span>
                <span className="interest-title">{interest.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExploreInterests;
