import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock3, MapPin, Percent } from "lucide-react";
import API from "../../../services/api";
import { deals as fallbackDeals } from "../../../data/deals";
import "./SpecialDeals.css";

function SpecialDeals() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/deals")
      .then((res) => {
        const dealsData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        if (dealsData.length > 0) {
          setDeals(dealsData);
        } else {
          setDeals(fallbackDeals || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deals, using fallback:", err);
        setDeals(fallbackDeals || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading deals...</div>;
  }

  if (!Array.isArray(deals) || deals.length === 0) {
    return null;
  }

  const featuredDeal = deals[0];
  const secondaryDeals = deals.slice(1);

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
                  alt={featuredDeal.destination || featuredDeal.title}
                  referrerPolicy="no-referrer"
                />
                <span className="featured-discount">
                  {featuredDeal.discount}
                </span>
                <span className="featured-duration">
                  <Clock3 size={13} />
                  {featuredDeal.duration}
                </span>
                <div className="featured-overlay" />

                <div className="featured-content">
                  <div className="featured-location">
                    <MapPin size={13} />
                    <span>{featuredDeal.destination}</span>
                  </div>

                  <h3>{featuredDeal.title}</h3>
                  <p>{featuredDeal.description}</p>

                  <div className="featured-bottom">
                    <div className="featured-price">
                      <span>{t("specialDeals.from")}</span>
                      <strong>${featuredDeal.price}</strong>
                      <small>{t("specialDeals.perPerson")}</small>
                      <del>${featuredDeal.oldPrice}</del>
                    </div>

                    <button
                      className="featured-button"
                      onClick={() =>
                        navigate(`/deal/${featuredDeal._id || featuredDeal.id}`)
                      }
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
              <article
                className="secondary-deal"
                key={deal._id || deal.id || deal.title}
              >
                <div className="secondary-image">
                  <img
                    src={deal.image}
                    alt={deal.destination || deal.title}
                    referrerPolicy="no-referrer"
                  />
                  <span className="secondary-discount">{deal.discount}</span>
                </div>

                <div className="secondary-content">
                  <div className="secondary-top">
                    <div>
                      <span className="secondary-location">
                        <MapPin size={12} />
                        {deal.destination}
                      </span>
                      <h3>{deal.title}</h3>
                    </div>

                    <span className="secondary-duration">
                      <Clock3 size={12} />
                      {deal.duration}
                    </span>
                  </div>

                  <p>{deal.description}</p>

                  <div className="secondary-bottom">
                    <div className="secondary-price">
                      <del>${deal.oldPrice}</del>
                      <strong>${deal.price}</strong>
                      <small>{t("specialDeals.perPerson")}</small>
                    </div>

                    <button
                      className="secondary-button"
                      aria-label={`Explore ${deal.title}`}
                      onClick={() => navigate(`/deal/${deal._id || deal.id}`)}
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
