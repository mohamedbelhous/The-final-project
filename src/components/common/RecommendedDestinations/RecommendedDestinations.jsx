import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, ArrowRight, Star } from "lucide-react";
import { useContent } from "../../../context/ContentContext";
import { useFavorites } from "../../../context/FavoritesContext";
import "./RecommendedDestinations.css";

function RecommendedDestinations() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { destinations } = useContent();
  const { isFavorite, toggleFavorite } = useFavorites();

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
          {destinations.length > 0 ? (
            destinations.slice(0, 8).map((destination) => {
              const destinationId =
                destination.slug || destination.id || destination.name;

              const destinationImage =
                destination.heroImage ||
                destination.imageUrl ||
                destination.image ||
                "";

              const destinationPrice =
                destination.pricePerDay || destination.price || 0;

              const favorite = isFavorite("destinations", destinationId);

              return (
                <article
                  className="destination-card"
                  key={destinationId}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/destinations/${destinationId}`)}
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
                      className={`destination-favorite ${
                        favorite ? "active" : ""
                      }`}
                      aria-label={
                        favorite
                          ? `Remove ${destination.name} from favorites`
                          : `Save ${destination.name} to favorites`
                      }
                      aria-pressed={favorite}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite("destinations", destinationId);
                      }}
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.8}
                        fill={favorite ? "currentColor" : "none"}
                      />
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
                          {destination.region ||
                            destination.location ||
                            "Algeria"}
                        </span>
                      </div>
                    </div>

                    <div className="destination-price">
                      <span>{t("recommended.from")}</span>

                      <strong>${destinationPrice}</strong>

                      <small>{t("recommended.perPerson")}</small>
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
