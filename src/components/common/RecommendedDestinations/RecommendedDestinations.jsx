import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, ArrowRight, Star } from "lucide-react";
import API from "../../../services/api";
import { destinations as fallbackDestinations } from "../../../data/destinations";
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

        const responseData = res.data;

        let list = [];

        if (Array.isArray(responseData)) {
          list = responseData;
        } else if (
          responseData &&
          Array.isArray(responseData.data)
        ) {
          list = responseData.data;
        } else if (
          responseData &&
          Array.isArray(responseData.destinations)
        ) {
          list = responseData.destinations;
        } else if (Array.isArray(fallbackDestinations)) {
          list = fallbackDestinations;
        }

        setDestinations(list);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;

        console.error(
          "Error fetching destinations, using fallback:",
          err,
        );

        setDestinations(
          Array.isArray(fallbackDestinations)
            ? fallbackDestinations
            : [],
        );

        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading destinations...
      </div>
    );
  }

  const safeDestinations = Array.isArray(destinations)
    ? destinations
    : [];

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
            safeDestinations
              .slice(0, 8)
              .map((destination) => {
                const destinationId =
                  destination.slug ||
                  destination.id ||
                  destination._id ||
                  destination.name;

                const destinationImage =
                  destination.heroImage ||
                  destination.imageUrl ||
                  destination.image ||
                  "";

                const destinationPrice =
                  destination.price ||
                  destination.pricePerDay;

                return (
                  <article
                    className="destination-card"
                    key={destinationId}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/destinations/${destination.slug || destinationId}`,
                      )
                    }
                  >
                    <div className="destination-image-wrapper">
                      {destinationImage ? (
                        <img
                          src={destinationImage}
                          alt={
                            destination.name ||
                            destination.title ||
                            "Destination"
                          }
                          className="destination-image"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="destination-image-placeholder">
                          No image available
                        </div>
                      )}

                      <button
                        className="destination-favorite"
                        aria-label={`Save ${
                          destination.name || "destination"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart
                          size={17}
                          strokeWidth={1.8}
                        />
                      </button>

                      <div className="destination-rating">
                        <Star
                          size={12}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                        <span>
                          {destination.rating || 0}
                        </span>
                      </div>
                    </div>

                    <div className="destination-content">
                      <div className="destination-info">
                        <h3>
                          {destination.name ||
                            destination.title}
                        </h3>

                        <div className="destination-location">
                          <MapPin
                            size={13}
                            strokeWidth={1.8}
                          />

                          <span>
                            {destination.category ||
                              destination.location ||
                              destination.region ||
                              "Algeria"}
                          </span>
                        </div>
                      </div>

                      <div className="destination-price">
                        <span>
                          {t("recommended.from")}
                        </span>

                        <strong>
                          ${destinationPrice || 0}
                        </strong>

                        <small>
                          {t("recommended.perPerson")}
                        </small>
                      </div>
                    </div>
                  </article>
                );
              })
          ) : (
            <p>No destinations found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecommendedDestinations;