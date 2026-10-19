import React, { useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import "./Booking.css";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // استخراج البيانات القادمة عبر الـ state أولاً
  const destinationState = location.state?.destination || {};

  const destinationName =
    location.state?.destinationName ||
    destinationState.name ||
    destinationState.title ||
    searchParams.get("destination") ||
    "Selected Destination";

  const pricePerPerson = Number(
    destinationState.pricePerDay ||
      destinationState.price ||
      searchParams.get("price") ||
      150,
  );

  // Booking form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    guests: 1,
    specialRequests: "",
    paymentMethod: "card",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Price calculations
  const totalPrice = formData.guests * pricePerPerson;
  const tax = totalPrice * 0.1; // 10% tax fee
  const grandTotal = totalPrice + tax;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="booking-success-container">
        <div className="booking-success-card">
          <CheckCircle2 size={64} className="success-icon" />
          <h2>Booking Confirmed!</h2>
          <p>
            Thank you, <strong>{formData.fullName}</strong>. We have sent your
            booking details to your email.
          </p>

          <div className="booking-summary-box">
            <p>
              <strong>Destination:</strong> {destinationName}
            </p>
            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Guests:</strong> {formData.guests}
            </p>
            <p>
              <strong>Total Amount:</strong> ${grandTotal.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => navigate("/destinations")}
            className="back-home-btn"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="booking-title">Confirm Your Booking</h1>

        <div className="booking-grid">
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="booking-form">
            {/* Personal Details Section */}
            <div className="form-section">
              <h3>
                <User size={20} /> Personal Information
              </h3>

              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details Section */}
            <div className="form-section">
              <h3>
                <Calendar size={20} /> Trip Details
              </h3>

              <div className="form-row">
                <div className="input-group">
                  <label>Travel Date</label>
                  <div className="input-wrapper">
                    <Calendar size={18} className="input-icon" />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Number of Guests</label>
                  <div className="input-wrapper">
                    <Users size={18} className="input-icon" />
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      max="10"
                      required
                      value={formData.guests}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  rows="3"
                  placeholder="Any additional details or special needs..."
                  value={formData.specialRequests}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h3>
                <CreditCard size={20} /> Payment Method
              </h3>
              <div className="payment-options">
                <label
                  className={`payment-card ${
                    formData.paymentMethod === "card" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  Credit / Debit Card
                </label>
                <label
                  className={`payment-card ${
                    formData.paymentMethod === "arrival" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="arrival"
                    checked={formData.paymentMethod === "arrival"}
                    onChange={handleChange}
                  />
                  Pay on Arrival
                </label>
              </div>
            </div>

            <button type="submit" className="submit-booking-btn">
              Complete Booking
            </button>
          </form>

          {/* Booking Summary Sidebar */}
          <div className="booking-summary-card">
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span>Destination:</span>
                <strong>{destinationName}</strong>
              </div>
              <div className="summary-item">
                <span>Price per guest:</span>
                <span>${pricePerPerson}</span>
              </div>
              <div className="summary-item">
                <span>Guests:</span>
                <span>x {formData.guests}</span>
              </div>
              <hr />
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Taxes & Fees (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-item total">
                <span>Total Amount:</span>
                <strong>${grandTotal.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
