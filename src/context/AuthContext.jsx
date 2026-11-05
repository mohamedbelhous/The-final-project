import { createContext, useState } from "react";

export const AuthContext = createContext();

const USERS_KEY = "rahla_users";
const SESSION_KEY = "user";

// The project ships without a backend, so accounts are stored locally.
// This keeps registration, login, and the admin area usable in the demo.
const DEMO_USERS = [
  {
    id: "demo-admin",
    name: "Rahla Admin",
    email: "admin@rahla.dz",
    password: "admin123",
    role: "admin",
  },
  {
    id: "demo-traveler",
    name: "Demo Traveler",
    email: "traveler@rahla.dz",
    password: "traveler123",
    role: "Traveler",
  },
];

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from storage.`, error);
    return fallback;
  }
};

const loadUsers = () => {
  const stored = readJson(USERS_KEY, []);
  const users = Array.isArray(stored) ? stored : [];

  return [
    ...DEMO_USERS.filter(
      (demo) =>
        !users.some(
          (user) => user.email?.toLowerCase() === demo.email.toLowerCase(),
        ),
    ),
    ...users,
  ];
};

const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.warn("Could not save users.", error);
  }
};

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `user-${Date.now()}`;

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = readJson(SESSION_KEY, null);
    return stored && stored.email ? stored : null;
  });

  const persistSession = (userData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  // Login handler
  const login = async ({ email, password }) => {
    const users = loadUsers();
    const account = users.find(
      (item) =>
        normalizeEmail(item.email) === normalizeEmail(email) &&
        item.password === password,
    );

    if (!account) {
      throw new Error("Incorrect email or password. Please try again.");
    }

    const { password: _password, ...userData } = account;
    saveUsers(users);
    persistSession(userData);

    return userData;
  };

  // Register handler
  const register = async ({ name, email, password }) => {
    const users = loadUsers();
    const cleanEmail = normalizeEmail(email);

    if (users.some((item) => normalizeEmail(item.email) === cleanEmail)) {
      throw new Error(
        "An account with this email already exists. Please sign in instead.",
      );
    }

    const account = {
      id: createId(),
      name: String(name).trim(),
      email: cleanEmail,
      password,
      role: "Traveler",
    };

    saveUsers([account, ...users]);

    const { password: _password, ...userData } = account;
    persistSession(userData);

    return userData;
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
