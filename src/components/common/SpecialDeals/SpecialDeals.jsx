import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock3, MapPin, Percent } from "lucide-react";
import { dealsList, featuredFlashDeal } from "../../../data/dealsData";
import "./SpecialDeals.css";

function SpecialDeals() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const deals = [featuredFlashDeal, ...dealsList];

  if (deals.length === 0) {
    return null;
  }

  const featuredDeal = deals[0];
  const secondaryDeals = deals.slice(1, 4);

  return (
    <section className="special-deals">
      <div className="special-deals-container">
        <div className="special-deals-header">
          <div className="special-heading">
            <span className="special-icon">
              <Percent size={16} strokeWidth={2} />
            </span>
            <div>
              <h2>{t("specialDeals.title")}</h2>
              <span className="special-title-line" />
              <p>{t("specialDeals.subtitle")}</p>
            </div>
          </div>

          <button
            className="special-view-all"
            onClick={() => navigate("/deals")}
          >
            <span>{t("specialDeals.viewAll")}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="special-deals-layout">
          {featuredDeal && (
            <article className="featured-deal">
              <div className="featured-image">
                <img
                  src={featuredDeal.image}
                  alt={featuredDeal.title}
                  referrerPolicy="no-referrer"
                />
                <span className="featured-discount">
                  {featuredDeal.discountPercentage}
                </span>
                <span className="featured-duration">
                  <Clock3 size={13} />
                  {featuredDeal.expiresIn ||
                    featuredDeal.validTill ||
                    "Limited time"}
                </span>
                <div className="featured-overlay" />

                <div className="featured-content">
                  <div className="featured-location">
                    <MapPin size={13} />
                    <span>{featuredDeal.location}</span>
                  </div>

                  <h3>{featuredDeal.title}</h3>
                  <p>{featuredDeal.description}</p>

                  <div className="featured-bottom">
                    <div className="featured-price">
                      <span>{t("specialDeals.from")}</span>
                      <strong>${featuredDeal.discountedPrice}</strong>
                      <small>{t("specialDeals.perPerson")}</small>
                      <del>${featuredDeal.originalPrice}</del>
                    </div>

                    <button
                      className="featured-button"
                      onClick={() => navigate(`/deal/${featuredDeal.id}`)}
                    >
                      <span>{t("specialDeals.exploreBtn")}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}

          <div className="secondary-deals">
            {secondaryDeals.map((deal) => (
              <article className="secondary-deal" key={deal.id}>
                <div className="secondary-image">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    referrerPolicy="no-referrer"
                  />
                  <span className="secondary-discount">
                    {deal.discountPercentage}
                  </span>
                </div>

                <div className="secondary-content">
                  <div className="secondary-top">
                    <div>
                      <span className="secondary-location">
                        <MapPin size={12} />
                        {deal.location}
                      </span>
                      <h3>{deal.title}</h3>
                    </div>

                    <span className="secondary-duration">
                      <Clock3 size={12} />
                      {deal.validTill || "Limited time"}
                    </span>
                  </div>

                  <p>{deal.description}</p>

                  <div className="secondary-bottom">
                    <div className="secondary-price">
                      <del>${deal.originalPrice}</del>
                      <strong>${deal.discountedPrice}</strong>
                      <small>{t("specialDeals.perPerson")}</small>
                    </div>

                    <button
                      className="secondary-button"
                      aria-label={`Explore ${deal.title}`}
                      onClick={() => navigate(`/deal/${deal.id}`)}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialDeals;
