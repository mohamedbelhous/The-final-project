import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Trash2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import "./MyTrips.css";

function MyTrips() {
  const { bookings, cancelBooking } = useBooking();

  return (
    <div className="my-trips-page">
      <div className="trips-container">
        <header className="trips-header">
          <h1>
            My Booked <span>Trips & Adventures</span>
          </h1>
          <p>
            Manage your upcoming travel itineraries and booking details in one
            place.
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="empty-trips">
            <Ticket size={48} color="#94a3b8" />
            <h3>No Active Bookings Yet</h3>
            <p>
              Explore our latest deals and plan your next destination across
              Algeria.
            </p>
            <Link to="/deals" className="explore-btn">
              Explore Deals <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="trips-grid">
            {bookings.map((trip) => (
              <div key={trip.bookingId} className="trip-card">
                <div className="trip-card-header">
                  <span className="booking-ref">
                    <Ticket size={14} /> Ref: {trip.bookingId}
                  </span>
                  <span className="status-badge confirmed">
                    <ShieldCheck size={13} /> {trip.status}
                  </span>
                </div>

                <div className="trip-card-body">
                  <h3>{trip.title}</h3>
                  <p className="trip-location">
                    <MapPin size={14} /> {trip.location}
                  </p>

                  <div className="trip-details-row">
                    <div>
                      <Calendar size={14} />
                      <span>{trip.date}</span>
                    </div>
                    <div>
                      <Users size={14} />
                      <span>{trip.guests} Guest(s)</span>
                    </div>
                  </div>

                  <div className="trip-footer">
                    <div className="trip-price">
                      <small>Total Paid</small>
                      <strong>${trip.totalPrice}</strong>
                    </div>

                    <button
                      className="cancel-btn"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to cancel this booking?",
                          )
                        ) {
                          cancelBooking(trip.bookingId);
                        }
                      }}
                    >
                      <Trash2 size={15} /> Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
