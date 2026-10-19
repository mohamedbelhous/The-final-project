import React, { useState, useEffect, useMemo } from "react";
import API from "../../services/api";
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
import "./TravelGuide.css";

const categories = [
  "All Articles",
  "Destinations",
  "Travel Tips",
  "Culture",
  "Food",
  "Adventure",
];

function TravelGuide() {
  const [guides, setGuides] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/guides");
        const result = response.data;

        if (!result.success) {
          throw new Error(result.message || "Failed to load articles.");
        }

        setGuides(result.data || []);
      } catch (err) {
        console.error("Error loading travel guides:", err);
        setError(
          "Unable to load travel guides. Please check that the server is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const toggleSave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredGuides = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return guides.filter((item) => {
      const matchesCat =
        activeCategory === "All Articles" || item.category === activeCategory;

      const matchesSearch =
        !term ||
        item.title?.toLowerCase().includes(term) ||
        item.excerpt?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term);

      return matchesCat && matchesSearch;
    });
  }, [guides, activeCategory, searchTerm]);

  const featuredGuide = guides[0];

  const formatDate = (date) => {
    if (!date) return "Recently published";

    return new Date(date).toLocaleDateString("en", {
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
        {loading ? (
          <div className="empty-state">
            <p>Loading travel guides...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <BookOpen size={48} />
            <h3>Unable to Load Articles</h3>
            <p>{error}</p>
            <button
              className="reset-search-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {featuredGuide && (
              <section className="featured-hero-section">
                <Link
                  to={`/guide/${featuredGuide.slug}`}
                  className="hero-article-card"
                >
                  <div className="hero-article-image">
                    <img src={featuredGuide.image} alt={featuredGuide.title} />
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

            <section className="articles-section">
              {filteredGuides.length > 0 ? (
                <div className="articles-grid">
                  {filteredGuides.map((item) => {
                    const isSaved = savedIds.includes(item._id);

                    return (
                      <Link
                        key={item._id}
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
                            onClick={(e) => toggleSave(e, item._id)}
                            aria-label="Save Article"
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
                    {guides.length === 0
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
          </>
        )}
      </main>
    </div>
  );
}

export default TravelGuide;
