import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "rahla_favorites_v1";

const emptyFavorites = { destinations: [], activities: [], guides: [] };

const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;

    return {
      destinations: Array.isArray(parsed?.destinations)
        ? parsed.destinations
        : [],
      activities: Array.isArray(parsed?.activities) ? parsed.activities : [],
      guides: Array.isArray(parsed?.guides) ? parsed.guides : [],
    };
  } catch (error) {
    console.warn("Could not read favorites.", error);
    return emptyFavorites;
  }
};

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn("Could not save favorites.", error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((kind, id) => {
    if (!["destinations", "activities", "guides"].includes(kind) || id == null)
      return;

    const key = String(id);

    setFavorites((current) => {
      const list = current[kind];
      const exists = list.includes(key);

      return {
        ...current,
        [kind]: exists ? list.filter((item) => item !== key) : [...list, key],
      };
    });
  }, []);

  const isFavorite = useCallback(
    (kind, id) =>
      Boolean(favorites[kind]?.includes(String(id))),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      destinationFavorites: favorites.destinations,
      activityFavorites: favorites.activities,
      savedGuides: favorites.guides,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
