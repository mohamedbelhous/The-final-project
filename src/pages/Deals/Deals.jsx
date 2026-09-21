import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  Clock,
  Copy,
  Check,
  Flame,
  Star,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  dealCategories,
  featuredFlashDeal,
  dealsList,
} from "../../data/dealsData";
import "./Deals.css";

function Deals() {
  const [activeCategory, setActiveCategory] = useState("All Deals");
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopyCode = (e, code) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  const filteredDeals = useMemo(() => {
    return dealsList.filter((deal) => {
      return activeCategory === "All Deals" || deal.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="deals-page">
      {/* Deals Hero Banner */}
      <header className="deals-hero">
        <div className="deals-hero-content">
          <div className="deals-badge">
            <Flame size={15} color="#f97316" />
            <span>Exclusive Promo Offers</span>
          </div>
          <h1>
            Unbeatable Deals on <span>Algerian Adventures</span>
          </h1>
          <p>
            Save up to 40% on handpicked destinations, tours, and luxury stays.
            Limited slots available!
          </p>
        </div>
      </header>

      <main className="deals-layout">
        {/* Flash Sale Banner */}
        <section className="flash-deal-section">
          <div className="flash-card">
            <div className="flash-image-wrapper">
              <img
                src={featuredFlashDeal.image}
                alt={featuredFlashDeal.title}
              />
              <div className="flash-tag">
                <Sparkles size={14} /> Flash Deal
              </div>
            </div>

            <div className="flash-details">
              <div className="flash-timer">
                <Clock size={15} />
                <span>
                  Expires in: <strong>{featuredFlashDeal.expiresIn}</strong>
                </span>
              </div>

              <h2>{featuredFlashDeal.title}</h2>
              <p className="flash-location">
                <MapPin size={14} /> {featuredFlashDeal.location}
              </p>
              <p className="flash-desc">{featuredFlashDeal.description}</p>

              <div className="flash-pricing">
                <div className="price-box">
                  <span className="old-price">
                    ${featuredFlashDeal.originalPrice}
                  </span>
                  <span className="new-price">
                    ${featuredFlashDeal.discountedPrice}
                  </span>
                  <span className="save-badge">
                    {featuredFlashDeal.discountPercentage}
                  </span>
                </div>

                <div className="flash-actions">
                  <div className="promo-copy-box">
                    <span className="code-text">{featuredFlashDeal.code}</span>
                    <button
                      className="copy-btn"
                      onClick={(e) => handleCopyCode(e, featuredFlashDeal.code)}
                    >
                      {copiedCode === featuredFlashDeal.code ? (
                        <>
                          <Check size={14} /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  <Link
                    to={`/deal/${featuredFlashDeal.id}`}
                    className="view-deal-btn"
                  >
                    Book Now <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <div className="deals-category-bar">
          {dealCategories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Deals Cards Grid */}
        <section className="deals-grid-section">
          <div className="deals-grid">
            {filteredDeals.map((deal) => {
              const isCopied = copiedCode === deal.code;
              return (
                <div key={deal.id} className="deal-card">
                  <Link to={`/deal/${deal.id}`} className="deal-card-link">
                    <div className="deal-thumb">
                      <img src={deal.image} alt={deal.title} />
                      <span className="discount-pill">
                        {deal.discountPercentage}
                      </span>
                    </div>

                    <div className="deal-body">
                      <div className="deal-meta">
                        <span className="deal-location">
                          <MapPin size={13} /> {deal.location}
                        </span>
                        <div className="deal-rating">
                          <Star size={12} fill="#eab308" color="#eab308" />
                          <span>{deal.rating}</span>
                        </div>
                      </div>

                      <h3>{deal.title}</h3>

                      <div className="deal-pricing-row">
                        <div>
                          <span className="original-val">
                            ${deal.originalPrice}
                          </span>
                          <span className="current-val">
                            ${deal.discountedPrice}
                          </span>
                        </div>
                        <span className="validity">{deal.validTill}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Voucher Ticket Cutout Box */}
                  <div className="voucher-container">
                    <div className="voucher-box">
                      <div className="voucher-code">
                        <Tag size={13} />
                        <span>{deal.code}</span>
                      </div>
                      <button
                        className={`voucher-btn ${isCopied ? "copied" : ""}`}
                        onClick={(e) => handleCopyCode(e, deal.code)}
                      >
                        {isCopied ? "Copied!" : "Get Coupon"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Deals;
