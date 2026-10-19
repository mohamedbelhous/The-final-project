import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Pagination, Stack, CircularProgress } from "@mui/material";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
  Heart,
  X,
  RotateCcw,
} from "lucide-react";

import API from "../../services/api";
import { categories } from "../../data/destinations";
import "./Destinations.css";

const categoryMap = {
  beaches: ["beach", "beaches", "coastal", "sea"],
  nature: ["nature", "forest", "mountains", "outdoors"],
  "history & culture": [
    "history",
    "culture",
    "historical",
    "heritage",
    "history & culture",
  ],
  adventure: ["adventure", "hiking", "sports", "safari"],
  family: ["family", "family-friendly", "kids", "theme park"],
  relaxation: ["relaxation", "spa", "resort", "wellness"],
  "city life": ["city", "city life", "urban", "shopping"],
  "food & cuisine": ["food", "food & cuisine", "culinary", "dining"],
};

function Destinations() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    API.get("/destinations")
      .then((res) => {
        const data = res.data?.data || res.data || [];
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching destinations from API:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
      setShowFilters(true);
    }
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedRegion, maxPrice, searchTerm]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const regions = useMemo(() => {
    const list = destinations
      .map((d) => d.region || d.location)
      .filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const destCategory = (destination.category || "").toLowerCase();
      const selectedCat = activeCategory.toLowerCase();

      let matchesCategory = activeCategory === "All";

      if (!matchesCategory) {
        if (destCategory === selectedCat) {
          matchesCategory = true;
        } else if (categoryMap[selectedCat]) {
          matchesCategory = categoryMap[selectedCat].some((alias) =>
            destCategory.includes(alias),
          );
        } else {
          matchesCategory = destCategory.includes(selectedCat);
        }
      }

      const destRegion = destination.region || destination.location || "";
      const matchesRegion =
        selectedRegion === "All" ||
        destRegion.toLowerCase() === selectedRegion.toLowerCase();

      const price = destination.price || destination.pricePerDay || 0;
      const matchesPrice = !price || price <= maxPrice;

      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        destination.name?.toLowerCase().includes(search) ||
        destRegion.toLowerCase().includes(search) ||
        destination.category?.toLowerCase().includes(search) ||
        destination.tags?.some((tag) => tag.toLowerCase().includes(search));

      return matchesCategory && matchesRegion && matchesPrice && matchesSearch;
    });
  }, [destinations, activeCategory, selectedRegion, maxPrice, searchTerm]);

  const paginatedDestinations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDestinations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDestinations, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

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
    setSearchParams({});
    setCurrentPage(1);
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
            <div className="filter-block">
              <span className="filter-block-title">
                {t("destinationsPage.categoryTitle")}
              </span>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      activeCategory.toLowerCase() === category.toLowerCase()
                        ? "active"
                        : ""
                    }
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="advanced-filters-row">
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

          {/* Loading Indicator */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <CircularProgress color="primary" />
              <p style={{ marginTop: "15px", color: "#666" }}>
                Loading all destinations...
              </p>
            </div>
          ) : paginatedDestinations.length > 0 ? (
            <>
              <div className="destinations-grid">
                {paginatedDestinations.map((destination, index) => {
                  const destId =
                    destination.slug || destination.id || destination._id;

                  const isFavorite = favorites.includes(destId);

                  const displayImage =
                    destination.heroImage ||
                    destination.imageUrl ||
                    destination.image ||
                    "";

                  const displayPrice =
                    destination.price || destination.pricePerDay;

                  return (
                    <Link
                      to={`/destinations/${destId}`}
                      className="destination-card"
                      key={destId || index}
                      style={{
                        "--card-delay": `${index * 70}ms`,
                      }}
                    >
                      <div className="destination-image">
                        {displayImage ? (
                          <img
                            src={displayImage}
                            alt={destination.name}
                            className="destination-card-image"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="destination-image-placeholder">
                            No image available
                          </div>
                        )}
                        <div className="destination-image-overlay" />

                        <button
                          className={`destination-favorite ${
                            isFavorite ? "active" : ""
                          }`}
                          onClick={(e) => toggleFavorite(e, destId)}
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
                          <span>
                            {destination.region || destination.location}
                          </span>
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
                            <ArrowRight
                              className="destination-arrow"
                              size={18}
                            />
                          </span>
                        </div>

                        <p>{destination.description}</p>

                        <div className="destination-card-footer">
                          <span className="destination-explore">
                            {t("destinationsPage.exploreDestination")}
                            <ArrowRight size={15} />
                          </span>
                          {displayPrice && (
                            <span className="destination-price-tag">
                              ${displayPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* MUI Pagination */}
              {totalPages > 1 && (
                <Stack
                  spacing={2}
                  sx={{
                    marginTop: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    size="large"
                    siblingCount={1}
                    boundaryCount={1}
                  />
                </Stack>
              )}
            </>
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
