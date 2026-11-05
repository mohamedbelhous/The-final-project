import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Clock,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  Bookmark,
  Compass,
} from "lucide-react";
import { categories } from "../../data/travelGuideData";
import { useContent } from "../../context/ContentContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./TravelGuide.css";

function TravelGuide() {
  const { publishedGuides } = useContent();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite("guides", id);
  };

  const filteredGuides = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return publishedGuides.filter((item) => {
      const matchesCat =
        activeCategory === "All Articles" || item.category === activeCategory;

      const matchesSearch =
        !term ||
        item.title?.toLowerCase().includes(term) ||
        item.excerpt?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term);

      return matchesCat && matchesSearch;
    });
  }, [publishedGuides, activeCategory, searchTerm]);

  const showFeatured =
    activeCategory === "All Articles" && !searchTerm.trim();
  const featuredGuide = showFeatured ? publishedGuides[0] : null;

  const formatDate = (date) => {
    if (!date) return "Recently published";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Recently published";

    return parsed.toLocaleDateString("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="travel-guide-page">
      <header className="guide-hero-header">
        <div className="guide-hero-container">
          <div className="hero-badge">
            <Compass size={14} />
            <span>Rahla Travel Insights</span>
          </div>

          <h1>Travel Guides & Local Tips</h1>

          <p>
            Curated advice, travel stories, and practical guides to help you
            explore Algeria with confidence.
          </p>

          <div className="guide-search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search guides, destinations, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="guide-main-layout">
        <section className="guide-filter-section">
          <div className="filter-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {featuredGuide && (
          <section className="featured-hero-section">
            <Link
              to={`/guide/${featuredGuide.slug}`}
              className="hero-article-card"
            >
              <div className="hero-article-image">
                {featuredGuide.image ? (
                  <img
                    src={featuredGuide.image}
                    alt={featuredGuide.title}
                  />
                ) : (
                  <div className="card-image-placeholder">Rahla</div>
                )}
                <div className="hero-overlay-badge">
                  <Sparkles size={13} /> Featured Master Guide
                </div>
              </div>

              <div className="hero-article-info">
                <div className="article-meta">
                  <span className="category-pill">
                    {featuredGuide.category}
                  </span>
                  <span className="read-time">
                    <Clock size={13} /> {featuredGuide.readTime}
                  </span>
                </div>

                <h2>{featuredGuide.title}</h2>
                <p>{featuredGuide.excerpt}</p>

                <div className="hero-action">
                  <span>Read Full Article</span>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>
          </section>
        )}

        <section className="articles-section">
          {filteredGuides.length > 0 ? (
            <div className="articles-grid">
              {filteredGuides.map((item) => {
                const isSaved = isFavorite("guides", item.id);

                return (
                  <Link
                    key={item.id}
                    to={`/guide/${item.slug}`}
                    className="article-card"
                  >
                    <div className="card-thumb">
                      {item.image ? (
                        <img src={item.image} alt={item.title} />
                      ) : (
                        <div className="card-image-placeholder">Rahla</div>
                      )}

                      <button
                        className={`save-btn ${isSaved ? "saved" : ""}`}
                        onClick={(e) => toggleSave(e, item.id)}
                        aria-label={
                          isSaved ? "Remove bookmark" : "Save article"
                        }
                        aria-pressed={isSaved}
                      >
                        <Bookmark
                          size={14}
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="card-content">
                      <div className="card-meta">
                        <span className="card-cat">{item.category}</span>
                        <span className="dot">•</span>
                        <span className="card-time">
                          <Clock size={12} /> {item.readTime}
                        </span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>

                      <div className="card-footer">
                        <span className="card-date">
                          {formatDate(item.publishedAt)}
                        </span>
                        <span className="read-btn">
                          Read More <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} />
              <h3>No Travel Guides Found</h3>
              <p>
                {publishedGuides.length === 0
                  ? "No published articles yet. Check back soon!"
                  : "We couldn't find any guides matching your criteria."}
              </p>

              <button
                className="reset-search-btn"
                onClick={() => {
                  setActiveCategory("All Articles");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TravelGuide;
