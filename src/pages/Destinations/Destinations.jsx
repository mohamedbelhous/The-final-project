import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Pagination, Stack } from "@mui/material";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
  Heart,
  X,
  RotateCcw,
} from "lucide-react";

import { categories } from "../../data/destinations";
import { useContent } from "../../context/ContentContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./Destinations.css";

const MAX_BUDGET = 200;
const ITEMS_PER_PAGE = 8;

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
  const { destinations } = useContent();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(() =>
    ["category", "region", "budget"].some((key) => searchParams.get(key)),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const resultsRef = useRef(null);

  const activeCategory = searchParams.get("category") || "All";
  const searchTerm = searchParams.get("search") || "";
  const selectedRegion = searchParams.get("region") || "All";
  const requestedBudget = Number(searchParams.get("budget"));
  const maxPrice =
    Number.isFinite(requestedBudget) && requestedBudget > 0
      ? Math.min(requestedBudget, MAX_BUDGET)
      : MAX_BUDGET;

  const updateFilter = (updates) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      const shouldRemove =
        value === "" ||
        value == null ||
        value === "All" ||
        (key === "budget" && Number(value) >= MAX_BUDGET);

      if (shouldRemove) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next, { replace: true });
    setCurrentPage(1);
  };

  const regions = useMemo(() => {
    const list = destinations
      .map((destination) => destination.region || destination.location)
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

      const price = Number(
        destination.pricePerDay ?? destination.price ?? 0,
      );
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

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginatedDestinations = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredDestinations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDestinations, safePage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    updateFilter({ category });
  };

  const toggleDestinationFavorite = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite("destinations", id);
  };

  const resetAllFilters = () => {
    setSearchParams({}, { replace: true });
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

          <form className="destinations-search" onSubmit={handleSearchSubmit}>
            <Search size={20} strokeWidth={1.8} />

            <input
              type="text"
              placeholder={t("destinationsPage.searchPlaceholder")}
              value={searchTerm}
              onChange={(event) =>
                updateFilter({ search: event.target.value })
              }
            />

            {searchTerm && (
              <button
                type="button"
                className="search-clear"
                onClick={() => updateFilter({ search: "" })}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

            <button type="submit" className="search-submit">
              {t("destinationsPage.searchBtn")}
            </button>
          </form>
        </div>
      </section>

      {/* Content Section */}
      <section className="destinations-content" ref={resultsRef}>
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
                  onChange={(e) => updateFilter({ region: e.target.value })}
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
                  min="20"
                  max={MAX_BUDGET}
                  step="5"
                  value={maxPrice}
                  onChange={(e) => updateFilter({ budget: e.target.value })}
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
              maxPrice < MAX_BUDGET ||
              searchTerm) && (
              <button onClick={resetAllFilters}>
                {t("destinationsPage.clearAllFilters")}
              </button>
            )}
          </div>

          {paginatedDestinations.length > 0 ? (
            <>
              <div className="destinations-grid">
                {paginatedDestinations.map((destination, index) => {
                  const destId = destination.slug || destination.id;
                  const favorite = isFavorite("destinations", destId);
                  const displayImage =
                    destination.heroImage ||
                    destination.imageUrl ||
                    destination.image ||
                    "";
                  const displayPrice =
                    destination.pricePerDay || destination.price;

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
                            favorite ? "active" : ""
                          }`}
                          onClick={(e) =>
                            toggleDestinationFavorite(e, destId)
                          }
                          aria-label={
                            favorite
                              ? `Remove ${destination.name} from favorites`
                              : `Save ${destination.name} to favorites`
                          }
                        >
                          <Heart
                            size={17}
                            fill={favorite ? "currentColor" : "none"}
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
                          {displayPrice ? (
                            <span className="destination-price-tag">
                              ${displayPrice} / day
                            </span>
                          ) : null}
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
                    page={safePage}
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
