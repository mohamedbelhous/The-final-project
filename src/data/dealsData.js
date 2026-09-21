import jijelImage from "../assets/images/jijel.jpg";
import oranImage from "../assets/images/oran.jpg";
import timgadImage from "../assets/images/tmgad.jpg";
import tarfImage from "../assets/images/tarf.jpg";

export const dealCategories = [
  "All Deals",
  "Early Bird",
  "Last Minute",
  "Weekend Escapes",
  "Cultural Tours",
];

export const featuredFlashDeal = {
  id: "flash-1",
  title: "Sahara Desert Luxury Camp Experience",
  location: "Taghit, Bechar",
  category: "Weekend Escapes",
  originalPrice: 280,
  discountedPrice: 189,
  discountPercentage: "32% OFF",
  expiresIn: "02d : 14h : 45m",
  rating: 4.9,
  reviews: 154,
  image: timgadImage,
  code: "SAHARA32",
  description:
    "All-inclusive 3-day desert getaway featuring camel trekking, sunset dunes, and traditional music under the stars.",
};

export const dealsList = [
  {
    id: 1,
    title: "Mediterranean Coastal Escape in Jijel",
    location: "Jijel Coast",
    category: "Weekend Escapes",
    originalPrice: 150,
    discountedPrice: 99,
    discountPercentage: "34% OFF",
    rating: 4.9,
    reviews: 128,
    image: jijelImage,
    code: "JIJELSUMMER",
    validTill: "Valid until Sep 15",
    description:
      "Enjoy relaxing days at crystal-clear beaches, scenic coastal hikes, and authentic local seafood.",
  },
  {
    id: 2,
    title: "Oran Cultural & Heritage Discovery Tour",
    location: "Oran City",
    category: "Cultural Tours",
    originalPrice: 110,
    discountedPrice: 75,
    discountPercentage: "31% OFF",
    rating: 4.8,
    reviews: 94,
    image: oranImage,
    code: "ORAN2026",
    validTill: "Valid until Sep 30",
    description:
      "Discover Santa Cruz Fort, historic Andalusian architecture, and the vibrant music culture of Oran.",
  },
  {
    id: 3,
    title: "Roman Ruins & Historical Walking Pass",
    location: "Timgad & Batna",
    category: "Cultural Tours",
    originalPrice: 60,
    discountedPrice: 39,
    discountPercentage: "35% OFF",
    rating: 4.7,
    reviews: 210,
    image: timgadImage,
    code: "TIMGAD35",
    validTill: "Limited availability",
    description:
      "Walk through UNESCO world heritage sites with experienced local historians and archaeologists.",
  },
  {
    id: 4,
    title: "El Tarf Nature Reserve Kayaking Special",
    location: "El Tarf National Park",
    category: "Last Minute",
    originalPrice: 90,
    discountedPrice: 59,
    discountPercentage: "34% OFF",
    rating: 4.9,
    reviews: 86,
    image: tarfImage,
    code: "TARFVALLEY",
    validTill: "Ends in 3 days",
    description:
      "Navigate through lush wetlands and tranquil lakes on an unforgettable eco-adventure.",
  },
];

export const getDealById = (id) => {
  const all = [featuredFlashDeal, ...dealsList];
  const found = all.find((item) => String(item.id) === String(id));

  return found
    ? {
        ...found,
        included: [
          "Hotel / Desert Camp Stay",
          "Breakfast & Dinner Included",
          "4x4 / Bus Guided Transfers",
          "Certified Local Tour Guide",
        ],
        notIncluded: ["Flight Tickets", "Personal Expenses", "Lunch Meals"],
        itinerary: [
          {
            day: 1,
            title: "Arrival & Traditional Welcome",
            desc: "Airport reception, check-in at accommodation, and sunset mint tea session on the sand dunes.",
          },
          {
            day: 2,
            title: "Guided Adventure & Exploration",
            desc: "4x4 dune bashing excursion, visiting ancient rock art sites, followed by a traditional dinner under the stars.",
          },
          {
            day: 3,
            title: "Souk Tour & Departure",
            desc: "Explore local artisan markets for souvenirs before transferring back to the airport for departure.",
          },
        ],
      }
    : null;
};
