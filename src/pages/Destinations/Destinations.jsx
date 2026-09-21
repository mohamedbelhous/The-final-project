import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
  Heart,
  X,
  RotateCcw,
} from "lucide-react";

import { destinations, categories } from "../../data/destinations";
import "./Destinations.css";

function Destinations() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const regions = useMemo(() => {
    const list = destinations.map((d) => d.region).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesCategory =
        activeCategory === "All" || destination.category === activeCategory;

      const matchesRegion =
        selectedRegion === "All" ||
        destination.region?.toLowerCase() === selectedRegion.toLowerCase();

      const matchesPrice = !destination.price || destination.price <= maxPrice;

      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        destination.name.toLowerCase().includes(search) ||
        destination.region.toLowerCase().includes(search) ||
        destination.category.toLowerCase().includes(search) ||
        destination.tags?.some((tag) => tag.toLowerCase().includes(search));

      return matchesCategory && matchesRegion && matchesPrice && matchesSearch;
    });
  }, [activeCategory, selectedRegion, maxPrice, searchTerm]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  const resetAllFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setSelectedRegion("All");
    setMaxPrice(1000);
  };

  return (
    <main className="destinations-page">
      {/* Hero Section */}
      <section className="destinations-hero">
        <div className="destinations-hero-background" />
        <div className="destinations-hero-overlay" />

        <div className="destinations-hero-content">
          <span className="destinations-eyebrow">
            <MapPin size={14} />
            {t("destinationsPage.eyebrow")}
          </span>

          <h1>
            {t("destinationsPage.titlePart1")}
            <br />
            <span>{t("destinationsPage.titlePart2")}</span>
          </h1>

          <p>{t("destinationsPage.subtitle")}</p>

          <div className="destinations-search">
            <Search size={20} strokeWidth={1.8} />

            <input
              type="text"
              placeholder={t("destinationsPage.searchPlaceholder")}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

            <button className="search-submit">
              {t("destinationsPage.searchBtn")}
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="destinations-content">
        <div className="destinations-container">
          <div className="destinations-heading">
            <div>
              <span className="destinations-label">
                {t("destinationsPage.label")}
              </span>
              <h2>{t("destinationsPage.heading")}</h2>
              <p>{t("destinationsPage.subheading")}</p>
            </div>

            <button
              className={`filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters((value) => !value)}
            >
              <SlidersHorizontal size={16} />
              {t("destinationsPage.filtersBtn")}
            </button>
          </div>

          {/* Advanced Filter Panel */}
          <div
            className={`destinations-filters ${showFilters ? "visible" : ""}`}
          >
            {/* Category Filter */}
            <div className="filter-block">
              <span className="filter-block-title">
                {t("destinationsPage.categoryTitle")}
              </span>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Region & Price Panel */}
            <div className="advanced-filters-row">
              {/* Region Selector */}
              <div className="filter-control-group">
                <label className="filter-label">
                  {t("destinationsPage.regionLabel")}
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="filter-select"
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg === "All" ? t("destinationsPage.allRegions") : reg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="filter-control-group">
                <div className="filter-label-row">
                  <label className="filter-label">
                    {t("destinationsPage.maxBudget")}
                  </label>
                  <span className="price-display">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider-input"
                />
              </div>

              {/* Reset Button */}
              <button onClick={resetAllFilters} className="reset-filters-btn">
                <RotateCcw size={14} /> {t("destinationsPage.resetFilters")}
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="destinations-result-info">
            <span>
              {filteredDestinations.length}{" "}
              {filteredDestinations.length === 1
                ? t("destinationsPage.foundSingle")
                : t("destinationsPage.foundPlural")}
            </span>

            {(activeCategory !== "All" ||
              selectedRegion !== "All" ||
              maxPrice < 1000 ||
              searchTerm) && (
              <button onClick={resetAllFilters}>
                {t("destinationsPage.clearAllFilters")}
              </button>
            )}
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="destinations-grid">
              {filteredDestinations.map((destination, index) => {
                const isFavorite = favorites.includes(destination.id);

                return (
                  <Link
                    to={`/destinations/${destination.slug || destination.id}`}
                    className="destination-card"
                    key={destination.id}
                    style={{
                      "--card-delay": `${index * 70}ms`,
                    }}
                  >
                    <div className="destination-image">
                      <img src={destination.image} alt={destination.name} />
                      <div className="destination-image-overlay" />

                      <button
                        className={`destination-favorite ${
                          isFavorite ? "active" : ""
                        }`}
                        onClick={(e) => toggleFavorite(e, destination.id)}
                        aria-label="Toggle Favorite"
                      >
                        <Heart
                          size={17}
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>

                      <span className="destination-category">
                        {destination.category}
                      </span>

                      <div className="destination-image-location">
                        <MapPin size={13} />
                        <span>{destination.region}</span>
                      </div>
                    </div>

                    <div className="destination-card-content">
                      <div className="destination-card-title">
                        <div>
                          <h3>{destination.name}</h3>
                          <div className="destination-tags">
                            {destination.tags?.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>

                        <span className="destination-arrow-wrapper">
                          <ArrowRight className="destination-arrow" size={18} />
                        </span>
                      </div>

                      <p>{destination.description}</p>

                      <div className="destination-card-footer">
                        <span className="destination-explore">
                          {t("destinationsPage.exploreDestination")}
                          <ArrowRight size={15} />
                        </span>
                        {destination.price && (
                          <span className="destination-price-tag">
                            ${destination.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="destinations-empty">
              <div className="empty-icon">
                <Search size={25} />
              </div>
              <h3>{t("destinationsPage.noDestinationsTitle")}</h3>
              <p>{t("destinationsPage.noDestinationsDesc")}</p>

              <button onClick={resetAllFilters}>
                {t("destinationsPage.clearAllFilters")}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Destinations;
