import { Link } from "react-router-dom";
import { ArrowRight, Heart, MapPin, Compass } from "lucide-react";
import { activitiesData } from "../../data/activitiesData";
import { useContent } from "../../context/ContentContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./Favorites.css";

function Favorites() {
  const { destinations, guides } = useContent();
  const {
    destinationFavorites,
    activityFavorites,
    savedGuides,
    toggleFavorite,
  } = useFavorites();

  const savedDestinations = destinationFavorites
    .map((id) =>
      destinations.find(
        (destination) =>
          String(destination.slug) === id || String(destination.id) === id,
      ),
    )
    .filter(Boolean);

  const savedActivities = activityFavorites
    .map((id) =>
      activitiesData.find((activity) => String(activity.id) === id),
    )
    .filter(Boolean);

  const savedArticles = savedGuides
    .map((id) =>
      guides.find(
        (guide) =>
          String(guide.id) === id || String(guide._id) === id,
      ),
    )
    .filter(Boolean);

  const isEmpty =
    savedDestinations.length === 0 &&
    savedActivities.length === 0 &&
    savedArticles.length === 0;

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <header className="favorites-header">
          <span className="favorites-eyebrow">
            <Heart size={14} /> Your shortlist
          </span>
          <h1>
            My <span>Favorites</span>
          </h1>
          <p>
            Everything you saved while exploring Algeria, in one place.
          </p>
        </header>

        {isEmpty ? (
          <div className="favorites-empty">
            <Heart size={48} />
            <h3>Nothing saved yet</h3>
            <p>
              Tap the heart on any destination or experience to keep it here.
            </p>
            <div className="favorites-empty-actions">
              <Link to="/destinations" className="favorites-cta">
                Explore Destinations <ArrowRight size={16} />
              </Link>
              <Link
                to="/activities"
                className="favorites-cta secondary"
              >
                Browse Activities
              </Link>
            </div>
          </div>
        ) : (
          <>
            {savedDestinations.length > 0 && (
              <section className="favorites-section">
                <div className="favorites-section-head">
                  <h2>Saved destinations</h2>
                  <span>{savedDestinations.length}</span>
                </div>

                <div className="favorites-grid">
                  {savedDestinations.map((destination) => {
                    const id = destination.slug || destination.id;
                    return (
                      <Link
                        to={`/destinations/${id}`}
                        className="favorite-card"
                        key={id}
                      >
                        <div className="favorite-image">
                          {destination.image ? (
                            <img
                              src={destination.image}
                              alt={destination.name}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="favorite-image-placeholder">
                              <Compass size={24} />
                            </div>
                          )}
                          <button
                            className="favorite-remove"
                            aria-label={`Remove ${destination.name} from favorites`}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              toggleFavorite("destinations", id);
                            }}
                          >
                            <Heart size={16} fill="currentColor" />
                          </button>
                        </div>

                        <div className="favorite-body">
                          <h3>{destination.name}</h3>
                          <p>
                            <MapPin size={13} />
                            {destination.region || destination.location}
                          </p>
                          <div className="favorite-meta">
                            <span>{destination.category}</span>
                            <strong>
                              ${destination.pricePerDay || destination.price}
                              <small> / day</small>
                            </strong>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {savedArticles.length > 0 && (
              <section className="favorites-section">
                <div className="favorites-section-head">
                  <h2>Saved articles</h2>
                  <span>{savedArticles.length}</span>
                </div>

                <div className="favorites-grid">
                  {savedArticles.map((article) => (
                    <Link
                      to={`/guide/${article.slug}`}
                      className="favorite-card"
                      key={article.id}
                    >
                      <div className="favorite-image">
                        {article.image ? (
                          <img src={article.image} alt={article.title} />
                        ) : (
                          <div className="favorite-image-placeholder">
                            <Compass size={24} />
                          </div>
                        )}
                        <button
                          className="favorite-remove"
                          aria-label={`Remove ${article.title} from saved articles`}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleFavorite("guides", article.id);
                          }}
                        >
                          <Heart size={16} fill="currentColor" />
                        </button>
                      </div>

                      <div className="favorite-body">
                        <h3>{article.title}</h3>
                        <p>
                          <Compass size={13} />
                          {article.category}
                        </p>
                        <div className="favorite-meta">
                          <span>{article.readTime}</span>
                          <strong>Read</strong>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {savedActivities.length > 0 && (
              <section className="favorites-section">
                <div className="favorites-section-head">
                  <h2>Saved experiences</h2>
                  <span>{savedActivities.length}</span>
                </div>

                <div className="favorites-grid">
                  {savedActivities.map((activity) => (
                    <article className="favorite-card" key={activity.id}>
                      <div className="favorite-image">
                        <img
                          src={activity.image}
                          alt={activity.title}
                        />
                        <button
                          className="favorite-remove"
                          aria-label={`Remove ${activity.title} from favorites`}
                          onClick={() =>
                            toggleFavorite("activities", activity.id)
                          }
                        >
                          <Heart size={16} fill="currentColor" />
                        </button>
                      </div>

                      <div className="favorite-body">
                        <h3>{activity.title}</h3>
                        <p>
                          <MapPin size={13} />
                          {activity.location}
                        </p>
                        <div className="favorite-meta">
                          <span>{activity.duration}</span>
                          <strong>
                            ${activity.price}
                            <small> / person</small>
                          </strong>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div className="favorites-footer">
              <Link to="/destinations" className="favorites-cta">
                Find more destinations <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;
