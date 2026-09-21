import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import {
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  Users,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { getDealById } from "../../data/dealsData";
import "./DealDetails.css";

function DealDetails() {
  const { id } = useParams();
  const deal = getDealById(id) || getDealById("flash-1");

  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const { addBooking } = useBooking();

  const pricePerPerson = deal.discountedPrice || deal.price || 120;
  const totalPrice = pricePerPerson * guests;

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a tour date first.");
      return;
    }

    addBooking({
      dealId: deal.id,
      title: deal.title,
      location: deal.location,
      date: selectedDate,
      guests: guests,
      totalPrice: totalPrice,
      image: deal.image,
    });

    setIsBooked(true);
  };

  return (
    <div className="deal-details-page">
      {/* Top Navigation Bar */}
      <div className="details-nav">
        <Link to="/deals" className="back-link">
          <ArrowLeft size={18} /> Back to Deals
        </Link>
        <span className="nav-tag">
          <Flame size={14} color="#f97316" /> Exclusive Deal
        </span>
      </div>

      <main className="details-container">
        {/* Main Info Header */}
        <section className="details-header">
          <div className="header-meta">
            <span className="location-badge">
              <MapPin size={14} /> {deal.location}
            </span>
            <div className="rating-badge">
              <Star size={14} fill="#eab308" color="#eab308" />
              <span>
                {deal.rating || 4.9} ({deal.reviews || 120}+ reviews)
              </span>
            </div>
          </div>
          <h1>{deal.title}</h1>
        </section>

        <div className="details-grid-layout">
          {/* Content Left Column */}
          <div className="details-main-content">
            {/* Image Gallery Showcase */}
            <div className="main-image-card">
              <img src={deal.image} alt={deal.title} />
              {deal.discountPercentage && (
                <span className="discount-tag">{deal.discountPercentage}</span>
              )}
            </div>

            {/* Overview */}
            <div className="content-block">
              <h3>About This Tour</h3>
              <p>
                {deal.description ||
                  "Enjoy an authentic travel experience combining leisure and adventure across Algeria's top destinations with professional local guides."}
              </p>
            </div>

            {/* Included / Not Included */}
            <div className="content-block">
              <h3>What's Included & Excluded</h3>
              <div className="features-two-col">
                <ul className="inc-list">
                  {deal.included?.map((inc, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} color="#10b981" /> {inc}
                    </li>
                  ))}
                </ul>
                <ul className="not-inc-list">
                  {deal.notIncluded?.map((not, index) => (
                    <li key={index}>
                      <XCircle size={16} color="#ef4444" /> {not}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="content-block">
              <h3>Trip Itinerary</h3>
              <div className="timeline-wrapper">
                {deal.itinerary?.map((item) => (
                  <div key={item.day} className="timeline-item">
                    <div className="timeline-day">Day {item.day}</div>
                    <div className="timeline-info">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar Right Column */}
          <aside className="booking-sidebar">
            <div className="booking-card">
              <div className="booking-price-header">
                <div>
                  <span className="old-p">${deal.originalPrice || 200}</span>
                  <span className="main-p">${pricePerPerson}</span>
                  <span className="per-person">/ person</span>
                </div>
                <div className="urgent-badge">
                  <Clock size={12} /> Limited Slots
                </div>
              </div>

              {!isBooked ? (
                <form onSubmit={handleBooking} className="booking-form">
                  <div className="form-group">
                    <label>
                      <Calendar size={15} /> Tour Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Users size={15} /> Number of Guests
                    </label>
                    <div className="guests-counter">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        -
                      </button>
                      <span>{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="price-calculation">
                    <div className="calc-row">
                      <span>
                        ${pricePerPerson} × {guests} guests
                      </span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="calc-row total">
                      <span>Total Amount</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>

                  <button type="submit" className="submit-booking-btn">
                    Confirm Booking
                  </button>

                  <div className="guarantee-text">
                    <ShieldCheck size={16} /> Free cancellation up to 48h before
                  </div>
                </form>
              ) : (
                <div className="booking-success-state">
                  <CheckCircle2 size={48} color="#10b981" />
                  <h3>Booking Confirmed!</h3>
                  <p>
                    Your trip has been added to your account. You can track it
                    inside your personal dashboard.
                  </p>
                  <Link
                    to="/trips"
                    className="submit-booking-btn"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                      display: "block",
                      marginTop: "12px",
                    }}
                  >
                    View My Trips
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DealDetails;
