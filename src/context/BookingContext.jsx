import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("rahla_bookings");
    return saved
      ? JSON.parse(saved)
      : [
          {
            bookingId: "RHL-8921",
            dealId: "flash-1",
            title: "Sahara Desert Luxury Camp Experience",
            location: "Taghit, Bechar",
            date: "2026-10-15",
            guests: 2,
            totalPrice: 378,
            status: "Confirmed",
            bookedAt: new Date().toLocaleDateString(),
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("rahla_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) => {
    const bookingEntry = {
      ...newBooking,
      bookingId: `RHL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString(),
    };
    setBookings((prev) => [bookingEntry, ...prev]);
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((item) => item.bookingId !== bookingId));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
