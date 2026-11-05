import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { destinations as seedDestinations } from "../data/destinations";
import { guidesList as seedGuides } from "../data/travelGuideData";

const STORAGE_KEY = "rahla_content_v1";

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const withUniqueSlug = (wanted, items, currentId) => {
  const base = slugify(wanted) || `item-${Date.now()}`;
  let candidate = base;
  let counter = 2;

  while (
    items.some(
      (item) => item.slug === candidate && String(item.id) !== String(currentId),
    )
  ) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  return candidate;
};

const loadContent = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed.destinations) && Array.isArray(parsed.guides)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read saved content, using defaults.", error);
  }

  return { destinations: seedDestinations, guides: seedGuides };
};

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      console.warn("Could not save content.", error);
    }
  }, [content]);

  const nextId = useCallback(
    (items) =>
      items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
    [],
  );

  const addDestination = useCallback(
    (data) => {
      setContent((current) => {
        const id = nextId(current.destinations);
        const destination = {
          ...data,
          id,
          slug: withUniqueSlug(data.slug || data.name, current.destinations),
          pricePerDay: Number(data.pricePerDay) || 0,
          rating: Number(data.rating) || 4.5,
          reviewsCount: 0,
          tags: data.tags || [],
        };

        return {
          ...current,
          destinations: [...current.destinations, destination],
        };
      });
    },
    [nextId],
  );

  const updateDestination = useCallback((id, data) => {
    setContent((current) => ({
      ...current,
      destinations: current.destinations.map((destination) =>
        String(destination.id) === String(id)
          ? {
              ...destination,
              ...data,
              id: destination.id,
              slug: withUniqueSlug(
                data.slug || data.name,
                current.destinations,
                destination.id,
              ),
              pricePerDay: Number(data.pricePerDay) || 0,
              rating: Number(data.rating) || 4.5,
              tags: data.tags || [],
            }
          : destination,
      ),
    }));
  }, []);

  const deleteDestination = useCallback((id) => {
    setContent((current) => ({
      ...current,
      destinations: current.destinations.filter(
        (destination) => String(destination.id) !== String(id),
      ),
    }));
  }, []);

  const addGuide = useCallback(
    (data) => {
      setContent((current) => {
        const id = nextId(current.guides);

        return {
          ...current,
          guides: [
            {
              ...data,
              id,
              _id: String(id),
              slug: withUniqueSlug(data.slug || data.title, current.guides),
              publishedAt:
                data.status === "published"
                  ? new Date().toISOString()
                  : data.publishedAt || null,
            },
            ...current.guides,
          ],
        };
      });
    },
    [nextId],
  );

  const updateGuide = useCallback((id, data) => {
    setContent((current) => ({
      ...current,
      guides: current.guides.map((guide) =>
        String(guide.id) === String(id) || String(guide._id) === String(id)
          ? {
              ...guide,
              ...data,
              id: guide.id,
              _id: guide._id ?? String(guide.id),
              slug: withUniqueSlug(
                data.slug || data.title,
                current.guides,
                guide.id,
              ),
              publishedAt:
                data.status === "published"
                  ? guide.publishedAt || new Date().toISOString()
                  : guide.publishedAt,
            }
          : guide,
      ),
    }));
  }, []);

  const deleteGuide = useCallback((id) => {
    setContent((current) => ({
      ...current,
      guides: current.guides.filter(
        (guide) =>
          String(guide.id) !== String(id) && String(guide._id) !== String(id),
      ),
    }));
  }, []);

  const publishedGuides = useMemo(
    () =>
      content.guides.filter(
        (guide) => !guide.status || guide.status === "published",
      ),
    [content.guides],
  );

  const value = useMemo(
    () => ({
      destinations: content.destinations,
      guides: content.guides,
      publishedGuides,
      addDestination,
      updateDestination,
      deleteDestination,
      addGuide,
      updateGuide,
      deleteGuide,
    }),
    [
      content.destinations,
      content.guides,
      publishedGuides,
      addDestination,
      updateDestination,
      deleteDestination,
      addGuide,
      updateGuide,
      deleteGuide,
    ],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
