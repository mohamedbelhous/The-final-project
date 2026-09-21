import React, { useState, useMemo } from "react";
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
import { categories, heroGuide, guidesList } from "../../data/travelGuideData";
import "./TravelGuide.css";

function TravelGuide() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredGuides = useMemo(() => {
    return guidesList.filter((item) => {
      const matchesCat =
        activeCategory === "All Articles" || item.category === activeCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="travel-guide-page">
      {/* Modern Header Banner */}
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
        {/* Featured Hero Article */}
        <section className="featured-hero-section">
          <Link to={`/guide/${heroGuide.id}`} className="hero-article-card">
            <div className="hero-article-image">
              <img src={heroGuide.image} alt={heroGuide.title} />
              <div className="hero-overlay-badge">
                <Sparkles size={13} /> Featured Master Guide
              </div>
            </div>
            <div className="hero-article-info">
              <div className="article-meta">
                <span className="category-pill">{heroGuide.category}</span>
                <span className="read-time">
                  <Clock size={13} /> {heroGuide.readTime}
                </span>
              </div>
              <h2>{heroGuide.title}</h2>
              <p>{heroGuide.excerpt}</p>
              <div className="hero-action">
                <span>Read Full Article</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>
        </section>

        {/* Filter Bar */}
        <section className="guide-filter-section">
          <div className="filter-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="articles-section">
          {filteredGuides.length > 0 ? (
            <div className="articles-grid">
              {filteredGuides.map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <Link
                    key={item.id}
                    to={`/guide/${item.id}`}
                    className="article-card"
                  >
                    <div className="card-thumb">
                      <img src={item.image} alt={item.title} />
                      <button
                        className={`save-btn ${isSaved ? "saved" : ""}`}
                        onClick={(e) => toggleSave(e, item.id)}
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
                        <span className="card-date">{item.date}</span>
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
              <p>We couldn't find any guides matching your criteria.</p>
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
