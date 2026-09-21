import jijelImage from "../assets/images/jijel.jpg";
import oranImage from "../assets/images/oran.jpg";
import tmgadImage from "../assets/images/tmgad.jpg";
import tarfImage from "../assets/images/tarf.jpg";

import {
  Waves,
  Trees,
  Footprints,
  Landmark,
  Flower2,
  Activity,
  Sparkles,
} from "lucide-react";

export const destinationDetailsData = {
  jijel: {
    slug: "jijel",
    title: "Jijel, Algeria",
    subtitle: "Coastal City",
    description:
      "A stunning coastal gem where mountains meet the Mediterranean. Crystal-clear waters, lush forests, and rich culture await you.",
    rating: "4.8",
    ratingText: "Excellent",
    reviewsCount: "1,256 reviews",
    pricePerDay: 42,
    totalTripPrice: 126,
    tripDays: 3,
    heroImage: jijelImage,
    galleryImages: [jijelImage, oranImage, tmgadImage, tarfImage],
    totalPhotos: "+28 Photos",
    aboutText:
      "Jijel is one of Algeria's most beautiful coastal destinations, known for its turquoise beaches, dramatic cliffs, green mountains, and charming old town. Perfect for nature lovers, adventure seekers, and anyone looking to relax by the sea.",
    vibes: [
      { icon: Waves, label: "Beaches", sub: "Stunning coastline" },
      { icon: Trees, label: "Nature", sub: "Mountains & forests" },
      { icon: Footprints, label: "Adventure", sub: "Hiking & exploring" },
      { icon: Landmark, label: "Culture", sub: "History & tradition" },
      { icon: Flower2, label: "Relaxation", sub: "Peace & serenity" },
    ],
    whyVisit: [
      "Breathtaking beaches with crystal-clear waters",
      "Rich natural landscapes and national parks",
      "Delicious local cuisine and fresh seafood",
      "Warm and welcoming local culture",
      "Great value for money",
    ],
    quickFacts: {
      location: "Northeastern Algeria",
      bestTime: "May - October",
      weather: "18°C - 30°C",
      timeZone: "GMT +1",
      language: "Arabic, Tamazight",
      currency: "Algerian Dinar (DZD)",
    },
    attractions: [
      {
        title: "El Aouana Beach",
        subtitle: "Beautiful sandy beach",
        rating: "4.7",
        image: jijelImage,
      },
      {
        title: "Taza National Park",
        subtitle: "Hiking & nature",
        rating: "4.8",
        image: oranImage,
      },
      {
        title: "Ziama Mansouriah Caves",
        subtitle: "Natural caves",
        rating: "4.6",
        image: tmgadImage,
      },
      {
        title: "Cape Bougaroun",
        subtitle: "Stunning views",
        rating: "4.7",
        image: tarfImage,
      },
    ],
    suggestedActivities: [
      {
        title: "Hiking in Taza Park",
        duration: "4-6 hours",
        price: "$18 / person",
        icon: Footprints,
      },
      {
        title: "Kayaking & Sea Tour",
        duration: "2-3 hours",
        price: "$25 / person",
        icon: Waves,
      },
      {
        title: "Scuba Diving",
        duration: "3-4 hours",
        price: "$45 / person",
        icon: Activity,
      },
      {
        title: "Boat Trip",
        duration: "1-2 hours",
        price: "$20 / person",
        icon: Sparkles,
      },
    ],
    accommodations: [
      {
        name: "Hôtel El Aurassi Jijel",
        rating: "4.5",
        price: "From $62 / night",
        image: jijelImage,
      },
      {
        name: "Le Crystal Hotel",
        rating: "4.4",
        price: "From $50 / night",
        image: oranImage,
      },
      {
        name: "Dar El Bhar",
        rating: "4.6",
        price: "From $40 / night",
        image: tmgadImage,
      },
      {
        name: "Bungalow Sea View",
        rating: "4.3",
        price: "From $35 / night",
        image: tarfImage,
      },
    ],
  },
};
