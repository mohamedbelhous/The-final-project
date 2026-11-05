import { useMemo, useRef, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Heart,
  Star,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Headphones,
  CheckCircle2,
  X,
} from "lucide-react";
import { activitiesData, categoriesList } from "../../data/activitiesData";
import { useFavorites } from "../../context/FavoritesContext";
import "./Activities.css";

const PAGE_SIZE = 6;

function Activities() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const resultsRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizInterest, setQuizInterest] = useState("outdoor");
  const [quizBudget, setQuizBudget] = useState(100);

  const locations = useMemo(
    () => Array.from(new Set(activitiesData.map((act) => act.location))),
    [],
  );

  const filteredActivities = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = activitiesData.filter((act) => {
      const matchesCategory =
        selectedCategory === "all" || act.category === selectedCategory;
      const matchesSearch =
        !term ||
        act.title.toLowerCase().includes(term) ||
        act.location.toLowerCase().includes(term);
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        act.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesLocation =
        selectedLocation === "all" || act.location === selectedLocation;
      const matchesPrice = act.price <= maxPrice;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesDifficulty &&
        matchesLocation &&
        matchesPrice
      );
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [
    selectedCategory,
    searchTerm,
    selectedDifficulty,
    selectedLocation,
    maxPrice,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredActivities.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginatedActivities = filteredActivities.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setSelectedDifficulty("all");
    setSelectedLocation("all");
    setMaxPrice(200);
    setSortBy("recommended");
    setCurrentPage(1);
  };

  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const applyQuiz = () => {
    setSelectedCategory(quizInterest);
    setMaxPrice(Number(quizBudget));
    setSelectedDifficulty("all");
    setSelectedLocation("all");
    setSearchTerm("");
    setSortBy("recommended");
    setCurrentPage(1);
    setQuizOpen(false);
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
          <form className="activities-search-bar" onSubmit={handleSearchSubmit}>
            <div className="search-field">
              <Search size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={updateFilter(setSearchTerm)}
              />
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <MapPin size={18} className="field-icon" />
              <div>
                <span className="field-label">Where</span>
                <select
                  className="field-select"
                  value={selectedLocation}
                  onChange={updateFilter(setSelectedLocation)}
                >
                  <option value="all">Any location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <Calendar size={18} className="field-icon" />
              <div>
                <span className="field-label">Availability</span>
                <span className="field-value">Book any date</span>
              </div>
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <Users size={18} className="field-icon" />
              <div>
                <span className="field-label">Group size</span>
                <span className="field-value">Up to 10</span>
              </div>
            </div>
            <button type="submit" className="search-btn">
              <Search size={16} /> Search
            </button>
          </form>
        </div>
      </header>

      {/* Category Pills Bar */}
      <div className="categories-pills-container">
        <div className="categories-pills">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              className={`pill-btn ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
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
            <button className="reset-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="filter-group">
            <h4>Location</h4>
            <select
              className="filter-select"
              value={selectedLocation}
              onChange={updateFilter(setSelectedLocation)}
            >
              <option value="all">Any location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
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
                    onChange={() => {
                      setSelectedCategory(
                        selectedCategory === c.id ? "all" : c.id,
                      );
                      setCurrentPage(1);
                    }}
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
              onChange={(event) => {
                setMaxPrice(Number(event.target.value));
                setCurrentPage(1);
              }}
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
                  onChange={updateFilter(setSelectedDifficulty)}
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
              Answer two quick questions and we'll suggest the perfect
              experiences for you!
            </p>
            <button className="quiz-btn" onClick={() => setQuizOpen(true)}>
              Take the Quiz →
            </button>
          </div>
        </aside>

        {/* Activities Listing Column */}
        <section className="activities-content" ref={resultsRef}>
          <div className="content-top-bar">
            <span>{filteredActivities.length} experiences found</span>
            <div className="sort-wrapper">
              <label>Sort by</label>
              <select
                className="sort-select"
                value={sortBy}
                onChange={updateFilter(setSortBy)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {paginatedActivities.length > 0 ? (
            <div className="activities-grid">
              {paginatedActivities.map((act) => {
                const favorite = isFavorite("activities", act.id);
                return (
                  <div key={act.id} className="activity-card">
                    <div className="card-image-box">
                      <img src={act.image} alt={act.title} />
                      {act.badge && (
                        <span className="card-badge">{act.badge}</span>
                      )}
                      <button
                        className={`fav-btn ${favorite ? "active" : ""}`}
                        onClick={() => toggleFavorite("activities", act.id)}
                        aria-label={
                          favorite
                            ? `Remove ${act.title} from favorites`
                            : `Save ${act.title} to favorites`
                        }
                        aria-pressed={favorite}
                      >
                        <Heart
                          size={16}
                          fill={favorite ? "#fff" : "none"}
                        />
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
          ) : (
            <div className="activities-empty">
              <Search size={36} />
              <h3>No experiences match your filters</h3>
              <p>Try a different category, location, or budget.</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-arrow"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`page-num ${
                      safePage === page ? "active" : ""
                    }`}
                    onClick={() => goToPage(page)}
                    aria-current={safePage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className="page-arrow"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
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

      {/* Recommendation Quiz */}
      {quizOpen && (
        <div
          className="quiz-modal-overlay"
          onClick={() => setQuizOpen(false)}
          role="presentation"
        >
          <div
            className="quiz-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="quiz-modal-close"
              onClick={() => setQuizOpen(false)}
              aria-label="Close quiz"
            >
              <X size={18} />
            </button>

            <h3 id="quiz-title">Find your perfect experience</h3>
            <p className="quiz-modal-subtitle">
              Two quick questions and we'll filter the list for you.
            </p>

            <label className="quiz-field">
              <span>What kind of experience are you looking for?</span>
              <select
                value={quizInterest}
                onChange={(event) => setQuizInterest(event.target.value)}
              >
                {categoriesList
                  .filter((category) => category.id !== "all")
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
              </select>
            </label>

            <label className="quiz-field">
              <span>Budget per person: ${quizBudget}</span>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={quizBudget}
                onChange={(event) =>
                  setQuizBudget(Number(event.target.value))
                }
              />
            </label>

            <button className="quiz-apply-btn" onClick={applyQuiz}>
              Show my matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
