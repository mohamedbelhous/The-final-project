import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Heart,
  Star,
  Clock,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { activitiesData, categoriesList } from "../../data/activitiesData";
import "./Activities.css";

function Activities() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [maxPrice, setMaxPrice] = useState(200);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const filteredActivities = useMemo(() => {
    return activitiesData.filter((act) => {
      const matchesCategory =
        selectedCategory === "all" || act.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        act.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesPrice = act.price <= maxPrice;

      return (
        matchesCategory && matchesSearch && matchesDifficulty && matchesPrice
      );
    });
  }, [selectedCategory, searchTerm, selectedDifficulty, maxPrice]);

  return (
    <div className="activities-page">
      {/* Hero Header */}
      <header className="activities-hero">
        <div className="activities-hero-bg"></div>
        <div className="activities-hero-content">
          <h1>Unforgettable Experiences</h1>
          <p>
            Explore exciting activities and unique experiences across Algeria.
          </p>

          {/* Global Search Bar */}
          <div className="activities-search-bar">
            <div className="search-field">
              <Search size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <MapPin size={18} className="field-icon" />
              <div>
                <span className="field-label">Where</span>
                <span className="field-value">Any location</span>
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <Calendar size={18} className="field-icon" />
              <div>
                <span className="field-label">Dates</span>
                <span className="field-value">Any dates</span>
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <Users size={18} className="field-icon" />
              <div>
                <span className="field-label">Travelers</span>
                <span className="field-value">Any</span>
              </div>
            </div>
            <button className="search-btn">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </header>

      {/* Category Pills Bar */}
      <div className="categories-pills-container">
        <div className="categories-pills">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              className={`pill-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <main className="activities-main-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button
              className="reset-btn"
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
                setSelectedDifficulty("all");
                setMaxPrice(200);
              }}
            >
              Reset
            </button>
          </div>

          <div className="filter-group">
            <h4>Location</h4>
            <select className="filter-select">
              <option value="">Any location</option>
              <option value="jijel">Jijel</option>
              <option value="tlemcen">Tlemcen</option>
              <option value="oran">Oran</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {categoriesList
              .filter((c) => c.id !== "all")
              .map((c) => (
                <label key={c.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategory === c.id}
                    onChange={() =>
                      setSelectedCategory(
                        selectedCategory === c.id ? "all" : c.id,
                      )
                    }
                  />
                  <span>{c.label}</span>
                </label>
              ))}
          </div>

          <div className="filter-group">
            <h4>Price (per person)</h4>
            <div className="price-range">
              <span>$0</span>
              <span>${maxPrice}+</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          <div className="filter-group">
            <h4>Difficulty Level</h4>
            {["all", "easy", "moderate", "challenging"].map((level) => (
              <label key={level} className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={selectedDifficulty === level}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                />
                <span className={`difficulty-indicator ${level}`}></span>
                <span className="capitalize">{level}</span>
              </label>
            ))}
          </div>

          {/* Quiz Promo Box */}
          <div className="quiz-promo-box">
            <div className="quiz-icon">
              <Sparkles size={18} />
            </div>
            <h4>Not sure what to choose?</h4>
            <p>
              Take our quick quiz and we'll suggest the perfect experiences for
              you!
            </p>
            <button className="quiz-btn">Take the Quiz →</button>
          </div>
        </aside>

        {/* Activities Listing Column */}
        <section className="activities-content">
          <div className="content-top-bar">
            <span>{filteredActivities.length} experiences found</span>
            <div className="sort-wrapper">
              <label>Sort by</label>
              <select className="sort-select">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="activities-grid">
            {filteredActivities.map((act) => {
              const isFav = favorites.includes(act.id);
              return (
                <div key={act.id} className="activity-card">
                  <div className="card-image-box">
                    <img src={act.image} alt={act.title} />
                    {act.badge && (
                      <span className="card-badge">{act.badge}</span>
                    )}
                    <button
                      className={`fav-btn ${isFav ? "active" : ""}`}
                      onClick={(e) => toggleFavorite(e, act.id)}
                    >
                      <Heart size={16} fill={isFav ? "#fff" : "none"} />
                    </button>
                  </div>

                  <div className="card-body">
                    <h3>{act.title}</h3>
                    <p className="card-location">
                      <MapPin size={13} /> {act.location}
                    </p>

                    <div className="card-meta">
                      <span>
                        <Clock size={13} /> {act.duration}
                      </span>
                      <span
                        className={`difficulty-tag ${act.difficulty.toLowerCase()}`}
                      >
                        • {act.difficulty}
                      </span>
                    </div>

                    <div className="card-footer">
                      <div className="card-rating">
                        <Star size={13} fill="#ffb800" color="#ffb800" />
                        <strong>{act.rating}</strong>
                        <span>({act.reviews})</span>
                      </div>
                      <div className="card-price">
                        <strong>${act.price}</strong> / person
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-arrow">
              <ChevronLeft size={16} />
            </button>
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <button className="page-num">4</button>
            <button className="page-num">5</button>
            <button className="page-arrow">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </main>

      {/* Value Badges Banner */}
      <section className="features-banner">
        <div className="feature-item">
          <Award className="feat-icon" />
          <div>
            <h4>Authentic Experiences</h4>
            <p>Handpicked by locals for your best moments.</p>
          </div>
        </div>
        <div className="feature-item">
          <CheckCircle2 className="feat-icon" />
          <div>
            <h4>Best Price Guarantee</h4>
            <p>We offer the best prices for unforgettable memories.</p>
          </div>
        </div>
        <div className="feature-item">
          <ShieldCheck className="feat-icon" />
          <div>
            <h4>Trusted & Safe</h4>
            <p>Your safety is our top priority.</p>
          </div>
        </div>
        <div className="feature-item">
          <Headphones className="feat-icon" />
          <div>
            <h4>24/7 Support</h4>
            <p>We're here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Activities;
