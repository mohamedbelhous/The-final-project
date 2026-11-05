import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Heart,
  Check,
  ChevronRight,
  Share2,
  Sparkles,
  Maximize2,
  Sun,
  Clock,
  Globe2,
  DollarSign,
  Compass,
} from "lucide-react";

import { getDestinationDetail } from "../../data/destinationsDetails";
import { useContent } from "../../context/ContentContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations } = useContent();
  const { isFavorite, toggleFavorite } = useFavorites();

  const details = getDestinationDetail(destinations, id);

  const [activeTab, setActiveTab] = useState("Overview");
  const [imageChoice, setImageChoice] = useState({ id: null, image: "" });
  const [favHotels, setFavHotels] = useState([]);

  const currentHeroImage =
    imageChoice.id === id && imageChoice.image
      ? imageChoice.image
      : details?.heroImage || "";

  const savedAsFavorite = details
    ? isFavorite("destinations", details.slug)
    : false;

  const navTabs = [
    { name: "Overview", id: "sec-overview" },
    { name: "Things to Do", id: "sec-activities" },
    { name: "Places to Visit", id: "sec-attractions" },
    { name: "Stay", id: "sec-stay" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);

    setTimeout(() => {
      const element = document.getElementById(tab.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const toggleHotelFav = (index) => {
    setFavHotels((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(
      details?.name || details?.title || "Algeria",
    );
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: details?.name || "Rahla destination",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } else {
        alert(window.location.href);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.warn("Could not share this destination.", error);
      }
    }
  };

  const handlePlanTrip = () => {
    // Router state must stay serializable: never pass icon components.
    navigate("/booking", {
      state: {
        destinationId: details.slug || details.id,
        destinationName: details.name || details.title,
        destination: {
          id: details.id,
          slug: details.slug,
          name: details.name,
          title: details.title,
          region: details.region,
          location: details.location,
          pricePerDay: details.pricePerDay,
          image: details.image,
          heroImage: details.heroImage,
        },
      },
    });
  };

  if (!details) {
    return (
      <div className="dest-not-found">
        <h2>Destination not found</h2>
        <p>We couldn't find that destination. It may have been removed.</p>
        <Link to="/destinations">Back to Destinations</Link>
      </div>
    );
  }

  const activitiesList =
    details.suggestedActivities ||
    details.activities ||
    details.thingsToDo ||
    [];
  const attractionsList = details.attractions || details.placesToVisit || [];
  const hotelsList =
    details.accommodations || details.hotels || details.stay || [];

  return (
    <div className="dest-details-page">
      <div className="dest-details-container">
        {/* Hero Banner */}
        <div
          className="dest-hero-banner"
          style={{ backgroundImage: `url(${currentHeroImage})` }}
        >
          <div className="dest-hero-overlay"></div>

          <div className="dest-hero-top">
            <nav className="dest-breadcrumb">
              <Link to="/">Home</Link> <ChevronRight size={12} />
              <Link to="/destinations">Destinations</Link>{" "}
              <ChevronRight size={12} />
              <span>{details.name || details.title}</span>
            </nav>

            <div className="dest-recommended-badge">
              <Sparkles size={14} />
              <span>Highly Recommended</span>
            </div>
          </div>

          <div className="dest-hero-content">
            <h1 className="dest-hero-title">{details.name || details.title}</h1>
            <p className="dest-hero-sub">
              <MapPin size={16} /> {details.location || details.subtitle}
            </p>
            <p className="dest-hero-desc">{details.description}</p>

            <div className="dest-hero-actions">
              <div className="dest-rating-pill">
                <span className="rating-num">
                  <Star size={13} fill="#176b50" color="#176b50" />{" "}
                  {details.rating || "4.8"}
                </span>
                <span className="rating-text">
                  {details.ratingText || "Excellent"}
                </span>
                <span className="rating-count">
                  ({details.reviewsCount || 120}
                  {typeof details.reviewsCount === "number" ? " reviews" : ""})
                </span>
              </div>

              <button
                className={`dest-fav-btn ${savedAsFavorite ? "active" : ""}`}
                onClick={() => toggleFavorite("destinations", details.slug)}
                aria-pressed={savedAsFavorite}
              >
                <span>{savedAsFavorite ? "Saved" : "Add to Favorites"}</span>
                <Heart size={16} fill={savedAsFavorite ? "#fff" : "none"} />
              </button>
            </div>
          </div>

          {/* Hero Gallery */}
          {details.galleryImages && details.galleryImages.length > 0 && (
            <div className="dest-hero-gallery">
              {details.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`gallery-thumb ${
                    currentHeroImage === img ? "active-thumb" : ""
                  }`}
                  onClick={() => setImageChoice({ id, image: img })}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx}`}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sub Navigation Tabs */}
        <div className="dest-subnav">
          {navTabs.map((tab) => (
            <button
              key={tab.name}
              className={`subnav-item ${
                activeTab === tab.name ? "active" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="dest-layout">
          <div className="dest-main-column">
            {/* Overview Section */}
            <section id="sec-overview" className="dest-section">
              <h2 className="section-heading">About {details.name}</h2>
              <p className="section-paragraph">
                {details.aboutText || details.description}
              </p>

              {details.whyVisit && details.whyVisit.length > 0 && (
                <div className="why-visit-card">
                  <div className="why-visit-info">
                    <h3>Why visit {details.name}?</h3>
                    <ul>
                      {details.whyVisit.map((item, idx) => (
                        <li key={idx}>
                          <Check size={16} className="check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="why-visit-image">
                    <img
                      src={currentHeroImage}
                      alt={details.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Things to Do Section */}
            <section id="sec-activities" className="dest-section">
              <h2 className="section-heading">Things to Do</h2>
              {activitiesList.length > 0 ? (
                <div className="activities-grid">
                  {activitiesList.map((act, idx) => {
                    const activityTitle =
                      typeof act === "string" ? act : act.title;

                    const activityImage =
                      typeof act === "object" ? act.image : null;

                    return (
                      <div key={idx} className="activity-card">
                        {activityImage ? (
                          <div className="activity-img-wrapper">
                            <img
                              src={activityImage}
                              alt={activityTitle}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="activity-icon-wrapper">
                            <Compass size={20} />
                          </div>
                        )}

                        <div className="activity-details">
                          <h4>{activityTitle}</h4>

                          {typeof act === "object" && act.duration && (
                            <span className="activity-duration">
                              {act.duration}
                            </span>
                          )}

                          {typeof act === "object" && act.price && (
                            <span className="activity-price">{act.price}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="no-data-msg">
                  No specific activities listed yet.
                </p>
              )}
            </section>

            {/* Places to Visit Section */}
            <section id="sec-attractions" className="dest-section">
              <h2 className="section-heading">Top Attractions</h2>
              {attractionsList.length > 0 ? (
                <div className="attractions-grid">
                  {attractionsList.map((attraction, idx) => (
                    <div key={idx} className="attraction-card">
                      {attraction.image && (
                        <div className="attraction-img-wrapper">
                          <img
                            src={attraction.image}
                            alt={attraction.title}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="attraction-details">
                        <h4>{attraction.title || attraction.name}</h4>
                        <p>{attraction.subtitle || attraction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data-msg">No attractions listed yet.</p>
              )}
            </section>

            {/* Stay Section */}
            <section id="sec-stay" className="dest-section">
              <h2 className="section-heading">Where to Stay</h2>
              {hotelsList.length > 0 ? (
                <div className="hotels-grid">
                  {hotelsList.map((hotel, idx) => (
                    <div key={idx} className="hotel-card">
                      <div className="hotel-img-wrapper">
                        <img
                          src={hotel.image || hotel.img}
                          alt={hotel.name}
                          referrerPolicy="no-referrer"
                        />
                        <button
                          className={`hotel-fav-btn ${
                            favHotels.includes(idx) ? "active-hotel-fav" : ""
                          }`}
                          onClick={() => toggleHotelFav(idx)}
                        >
                          <Heart
                            size={16}
                            fill={favHotels.includes(idx) ? "#e11d48" : "none"}
                          />
                        </button>
                      </div>
                      <div className="hotel-details">
                        <h4>{hotel.name || hotel.title}</h4>
                        <span className="hotel-price">{hotel.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data-msg">
                  No accommodation details available.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="dest-sidebar">
            <div className="cost-card">
              <small className="cost-title">Estimated Trip Cost</small>
              <div className="cost-header">
                <div>
                  <span className="cost-label">From </span>
                  <span className="cost-amount">
                    ${details.pricePerDay || details.price || 100}
                  </span>
                  <span className="cost-unit">/ day</span>
                </div>
              </div>

              <button className="btn-plan-trip" onClick={handlePlanTrip}>
                <Sparkles size={16} /> Plan Your Trip
              </button>
              <button className="btn-share-trip" onClick={handleShare}>
                <Share2 size={15} /> Share
              </button>
            </div>

            {/* Quick Facts */}
            <div className="facts-card">
              <h3>Quick Facts</h3>
              <ul>
                <li>
                  <span className="fact-label">
                    <MapPin size={14} /> Location
                  </span>
                  <span className="fact-value">
                    {details.location || details.quickFacts?.location || "N/A"}
                  </span>
                </li>
                <li>
                  <span className="fact-label">
                    <Clock size={14} /> Best Time
                  </span>
                  <span className="fact-value">
                    {details.quickFacts?.bestTime || "All Year"}
                  </span>
                </li>
                <li>
                  <span className="fact-label">
                    <Sun size={14} /> Weather
                  </span>
                  <span className="fact-value">
                    {details.quickFacts?.weather || "Sunny"}
                  </span>
                </li>
                <li>
                  <span className="fact-label">
                    <Globe2 size={14} /> Language
                  </span>
                  <span className="fact-value">
                    {details.quickFacts?.language || "Arabic, French"}
                  </span>
                </li>
                <li>
                  <span className="fact-label">
                    <DollarSign size={14} /> Currency
                  </span>
                  <span className="fact-value">
                    {details.quickFacts?.currency || "DZD"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Map Card */}
            <div className="map-card">
              <div className="map-card-header">
                <h3>Explore on Map</h3>
                <Maximize2
                  size={14}
                  className="map-expand-icon"
                  onClick={openGoogleMaps}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="map-box">
                <button className="btn-open-maps" onClick={openGoogleMaps}>
                  Open in Google Maps
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;
