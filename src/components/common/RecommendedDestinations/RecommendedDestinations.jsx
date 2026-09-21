import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, ArrowRight, Star } from "lucide-react";
import API from "../../../services/api";
import "./RecommendedDestinations.css";

function RecommendedDestinations() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    API.get("/destinations")
      .then((res) => {
        if (!isMounted) return;

        // Validation to ensure setDestinations always receives an Array
        const responseData = res.data;
        if (Array.isArray(responseData)) {
          setDestinations(responseData);
        } else if (responseData && Array.isArray(responseData.data)) {
          setDestinations(responseData.data);
        } else {
          setDestinations([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching destinations:", err);
        setDestinations([]); // Fallback to empty array on error
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="text-center py-10">...</div>;
  }

  // Guard clause to guarantee destinations is an array before .map()
  const safeDestinations = Array.isArray(destinations) ? destinations : [];

  return (
    <section className="recommended-destinations">
      <div className="recommended-container">
        <div className="recommended-header">
          <div>
            <h2>{t("recommended.title")}</h2>
            <span className="recommended-title-line" />
          </div>

          <button
            className="recommended-view-all"
            onClick={() => navigate("/destinations")}
          >
            <span>{t("recommended.viewAll")}</span>
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="destinations-grid">
          {safeDestinations.length > 0 ? (
            safeDestinations.map((destination) => (
              <article
                className="destination-card"
                key={destination._id || destination.id || destination.name}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/destinations/${
                      destination._id || destination.slug || destination.name
                    }`,
                  )
                }
              >
                <div className="destination-image-wrapper">
                  <img
                    src={destination.image || destination.heroImage}
                    alt={destination.name || destination.title}
                    className="destination-image"
                  />
                  <button
                    className="destination-favorite"
                    aria-label={`Save ${destination.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Heart size={17} strokeWidth={1.8} />
                  </button>
                  <div className="destination-rating">
                    <Star size={12} fill="currentColor" strokeWidth={1.5} />
                    <span>{destination.rating || 0}</span>
                  </div>
                </div>

                <div className="destination-content">
                  <div className="destination-info">
                    <h3>{destination.name || destination.title}</h3>
                    <div className="destination-location">
                      <MapPin size={13} strokeWidth={1.8} />
                      <span>
                        {destination.category || destination.location}
                      </span>
                    </div>
                  </div>

                  <div className="destination-price">
                    <span>{t("recommended.from")}</span>
                    <strong>{destination.price}</strong>
                    <small>{t("recommended.perPerson")}</small>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No destinations found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecommendedDestinations;
