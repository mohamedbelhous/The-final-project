import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { AuthContext } from "./AuthContext";
import { isAdminUser } from "../utils/auth";

const BookingContext = createContext();

const STORAGE_KEY = "rahla_bookings_v2";

const loadBookings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Could not read bookings.", error);
    return [];
  }
};

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

export function BookingProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [allBookings, setAllBookings] = useState(loadBookings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allBookings));
    } catch (error) {
      console.warn("Could not save bookings.", error);
    }
  }, [allBookings]);

  const bookings = useMemo(() => {
    if (!user) return [];

    if (isAdminUser(user)) return allBookings;

    return allBookings.filter(
      (booking) =>
        normalizeEmail(booking.userEmail) === normalizeEmail(user.email),
    );
  }, [allBookings, user]);

  const addBooking = (newBooking) => {
    const bookingEntry = {
      ...newBooking,
      guests: Number(newBooking.guests) || 1,
      totalPrice: Number(newBooking.totalPrice) || 0,
      userEmail: newBooking.userEmail || user?.email || "",
      fullName: newBooking.fullName || user?.name || "",
      email: newBooking.email || user?.email || "",
      bookingId: `RHL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString(),
    };

    setAllBookings((prev) => [bookingEntry, ...prev]);

    return bookingEntry;
  };

  const cancelBooking = (bookingId) => {
    setAllBookings((prev) =>
      prev.filter((item) => item.bookingId !== bookingId),
    );
  };

  return (
    <BookingContext.Provider
      value={{ bookings, allBookings, addBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
