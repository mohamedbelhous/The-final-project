import jijelImage from "../assets/images/jijel.jpg";
import oranImage from "../assets/images/oran.jpg";
import timgadImage from "../assets/images/tmgad.jpg";
import tarfImage from "../assets/images/tarf.jpg";

export const categories = [
  "All Articles",
  "Itineraries",
  "Culture & Tips",
  "Food & Dining",
  "Transportation",
];

export const heroGuide = {
  id: "hero-1",
  title: "The Ultimate First-Timer's Guide to Algeria",
  category: "Itineraries",
  readTime: "10 min read",
  image: oranImage,
  excerpt:
    "Everything you need to know before visiting Algiers, the Sahara, and coastal towns. Practical tips, local customs, and secret spots.",
};

export const guidesList = [
  {
    id: 1,
    title: "10 Essential Things to Know Before Visiting Algeria",
    category: "Culture & Tips",
    readTime: "5 min read",
    date: "Aug 2026",
    image: jijelImage,
    excerpt:
      "Currency tips, SIM cards, local etiquette, and safety guidelines for international travelers.",
  },
  {
    id: 2,
    title: "A Culinary Journey Through Algerian Street Food",
    category: "Food & Dining",
    readTime: "4 min read",
    date: "Aug 2026",
    image: timgadImage,
    excerpt:
      "From Mahjouba to authentic Rechta: discover what and where to eat in Algiers and Constantine.",
  },
  {
    id: 3,
    title: "How to Travel Between Cities: Trains, Buses & Flights",
    category: "Transportation",
    readTime: "7 min read",
    date: "Jul 2026",
    image: tarfImage,
    excerpt:
      "Complete transport guide covering domestic Air Algérie flights, SNTF train networks, and taxis.",
  },
  {
    id: 4,
    title: "Exploring the Ancient Roman Ruins of Timgad & Djemila",
    category: "Itineraries",
    readTime: "6 min read",
    date: "Jul 2026",
    image: timgadImage,
    excerpt:
      "Step back in time to explore two of the Mediterranean region's most pristine Roman archeological treasures.",
  },
  {
    id: 5,
    title: "Coastal Escape: The Hidden Gems of Jijel & El Tarf",
    category: "Itineraries",
    readTime: "5 min read",
    date: "Jun 2026",
    image: jijelImage,
    excerpt:
      "Unspoiled Mediterranean beaches, lush national parks, and peaceful coastal retreats.",
  },
  {
    id: 6,
    title: "Respecting Local Culture & Customs in Algeria",
    category: "Culture & Tips",
    readTime: "4 min read",
    date: "Jun 2026",
    image: oranImage,
    excerpt:
      "Important social etiquette, photography rules, and hospitality norms to make your trip smooth.",
  },
];
