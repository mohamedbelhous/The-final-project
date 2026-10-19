import jijelImage from "../assets/images/jijel.jpg";
import oranImage from "../assets/images/oran.jpg";
import timgadImage from "../assets/images/tmgad.jpg";
import tarfImage from "../assets/images/tarf.jpg";

export const destinations = [
  {
    id: 1,
    name: "Jijel",
    slug: "jijel",
    region: "East Algeria",
    category: "Beaches",
    description:
      "Crystal-clear waters, dramatic cliffs and peaceful Mediterranean beaches.",
    image: jijelImage,
    tags: ["Beach", "Nature"],
  },
  {
    id: 2,
    name: "Oran",
    slug: "oran",
    region: "West Algeria",
    category: "City Life",
    description:
      "A lively Mediterranean city filled with culture, music, architecture and sea views.",
    image: oranImage,
    tags: ["Culture", "City"],
  },
  {
    id: 3,
    name: "Timgad",
    slug: "timgad",
    region: "Batna",
    category: "History & Culture",
    description:
      "Walk through one of Algeria's most impressive Roman archaeological sites.",
    image: timgadImage,
    tags: ["Roman", "History"],
  },
  {
    id: 4,
    name: "El Tarf",
    slug: "el-tarf",
    region: "East Algeria",
    category: "Nature",
    description:
      "Discover forests, lakes and untouched landscapes close to the Mediterranean.",
    image: tarfImage,
    tags: ["Nature", "Wildlife"],
  },
  {
    id: 5,
    name: "Algiers",
    slug: "algiers",
    region: "Central Algeria",
    category: "City Life",
    description:
      "Explore the White City, its historic Casbah and beautiful Mediterranean coastline.",
    image: oranImage,
    tags: ["City", "Culture"],
  },
  {
    id: 6,
    name: "Ghardaïa",
    slug: "ghardaia",
    region: "M'zab Valley",
    category: "History & Culture",
    description:
      "Experience unique architecture, ancient traditions and the beauty of the Sahara.",
    image: timgadImage,
    tags: ["Desert", "Culture"],
  },
  {
    id: 7,
    name: "Béjaïa",
    slug: "bejaia",
    region: "Kabylie",
    category: "Beaches",
    description:
      "A beautiful meeting point between mountains, forests and the Mediterranean Sea.",
    image: jijelImage,
    tags: ["Beach", "Mountain"],
  },
  {
    id: 8,
    name: "Tlemcen",
    slug: "tlemcen",
    region: "West Algeria",
    category: "History & Culture",
    description:
      "Discover Andalusian heritage, historic monuments and beautiful mountain scenery.",
    image: tarfImage,
    tags: ["History", "Culture"],
  },
];

// المصفوفة المحدثة لتشمل جميع اهتمامات الصفحة الرئيسية
export const categories = [
  "All",
  "Beaches",
  "Nature",
  "History & Culture",
  "Adventure",
  "Family",
  "Relaxation",
  "City Life",
  "Food & Cuisine",
];
