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

export const guidesList = [
  {
    id: 1,
    slug: "essential-things-to-know-before-visiting-algeria",
    title: "10 Essential Things to Know Before Visiting Algeria",
    category: "Culture & Tips",
    readTime: "5 min read",
    publishedAt: "2026-08-18",
    image: jijelImage,
    excerpt:
      "Currency tips, SIM cards, local etiquette, and safety guidelines for international travelers.",
    content: [
      {
        title: "Plan around the practical details",
        text: "Algeria rewards travelers who prepare a little before arriving. Carry some Algerian dinars in cash, keep a copy of your passport, and download offline maps before heading to remote areas.",
        items: [
          "The local currency is the Algerian dinar (DZD).",
          "SIM cards are available at the airport and from local operators.",
          "French and Arabic are the most widely used languages in daily life.",
        ],
      },
      {
        title: "Respect local customs",
        text: "Hospitality is central to Algerian culture. Returning a greeting, accepting mint tea when offered, and dressing modestly in rural areas will make your trip smoother and more welcoming.",
      },
      {
        title: "Move at a comfortable pace",
        text: "Distances between regions are long. Rather than rushing across the country, pick a region and give yourself time to explore it properly.",
      },
    ],
  },
  {
    id: 2,
    slug: "algerian-street-food-journey",
    title: "A Culinary Journey Through Algerian Street Food",
    category: "Food & Dining",
    readTime: "4 min read",
    publishedAt: "2026-08-05",
    image: timgadImage,
    excerpt:
      "From Mahjouba to authentic Rechta: discover what and where to eat in Algiers and Constantine.",
    content: [
      {
        title: "Start with the classics",
        text: "Algerian street food is built around fresh bread, vegetables, and slow-cooked flavors. Start your day with a warm mahjouba, a thin semolina flatbread folded around a spicy tomato and onion filling.",
      },
      {
        title: "What to try next",
        text: "Work your way through the country's regional specialties. In the east, look for rechta and tajine; along the coast, fresh sardines are a must.",
        items: [
          "Karantika: a savory chickpea bake, often eaten on the go.",
          "Bourek: crisp pastry rolls filled with meat or cheese.",
          "Mhalbi: a simple, fragrant rice pudding for dessert.",
        ],
      },
      {
        title: "Eat where the locals eat",
        text: "The best street food is usually found where there is a steady queue, a short menu, and food being prepared in front of you. Small neighborhood spots are often far better than tourist-oriented restaurants.",
      },
    ],
  },
  {
    id: 3,
    slug: "travel-between-algerian-cities",
    title: "How to Travel Between Cities: Trains, Buses & Flights",
    category: "Transportation",
    readTime: "7 min read",
    publishedAt: "2026-07-22",
    image: tarfImage,
    excerpt:
      "Complete transport guide covering domestic Air Algérie flights, SNTF train networks, and taxis.",
    content: [
      {
        title: "Choose the right mode for the distance",
        text: "For long distances, domestic flights save days of travel. Along the northern coast, trains and intercity coaches are comfortable and affordable alternatives.",
      },
      {
        title: "Book trains and coaches early",
        text: "Popular weekend services can fill up, especially around holidays. Buy tickets in advance where possible and arrive early at the station.",
        items: [
          "SNTF trains connect Algiers with Oran, Constantine, Annaba, and other northern cities.",
          "Intercity coaches reach most towns that are not served by rail.",
          "Shared taxis are useful for short regional hops.",
        ],
      },
      {
        title: "Allow extra time in the south",
        text: "Travel in the Sahara is slower and more dependent on local operators. Distances are large and roads can be affected by weather, so build buffer time into any desert itinerary.",
      },
    ],
  },
  {
    id: 4,
    slug: "roman-ruins-timgad-djemila",
    title: "Exploring the Ancient Roman Ruins of Timgad & Djemila",
    category: "Itineraries",
    readTime: "6 min read",
    publishedAt: "2026-07-10",
    image: timgadImage,
    excerpt:
      "Step back in time to explore two of the Mediterranean region's most pristine Roman archeological treasures.",
    content: [
      {
        title: "A two-site itinerary",
        text: "Timgad and Djemila are both UNESCO World Heritage sites, yet they feel very different. Give each one at least half a day, and start early to avoid the midday heat.",
      },
      {
        title: "What you will see",
        text: "Timgad is famous for its grid plan and the Arch of Trajan, while Djemila sits dramatically on a mountain ridge with a well-preserved forum and temples.",
        items: [
          "Bring water, sun protection, and comfortable shoes.",
          "Hire a local guide to understand the inscriptions and mosaics.",
          "Visit the site museums for artifacts found during excavations.",
        ],
      },
      {
        title: "Getting there",
        text: "Timgad is close to Batna, and Djemila is a short drive from Sétif. Both can be reached by coach or taxi from nearby cities, making them easy to combine with a wider northern itinerary.",
      },
    ],
  },
  {
    id: 5,
    slug: "coastal-hidden-gems-jijel-el-tarf",
    title: "Coastal Escape: The Hidden Gems of Jijel & El Tarf",
    category: "Itineraries",
    readTime: "5 min read",
    publishedAt: "2026-06-28",
    image: jijelImage,
    excerpt:
      "Unspoiled Mediterranean beaches, lush national parks, and peaceful coastal retreats.",
    content: [
      {
        title: "Why the east coast is special",
        text: "The coastline between Jijel and El Tarf combines turquoise water with forested mountains. It is one of the most scenic parts of Algeria and remains pleasantly uncrowded outside peak summer weeks.",
      },
      {
        title: "Suggested stops",
        text: "Base yourself in Jijel for beaches and boat trips, then move east toward El Tarf for national park walks and quieter lakes.",
        items: [
          "Taza National Park for coastal hiking.",
          "El Aouana for sandy beaches and seafood.",
          "El Kala National Park for wetlands and birdlife.",
        ],
      },
      {
        title: "When to go",
        text: "Late spring and early autumn offer warm water with fewer visitors. Summer is livelier, but book accommodation well ahead.",
      },
    ],
  },
  {
    id: 6,
    slug: "respecting-local-culture-algeria",
    title: "Respecting Local Culture & Customs in Algeria",
    category: "Culture & Tips",
    readTime: "4 min read",
    publishedAt: "2026-06-12",
    image: oranImage,
    excerpt:
      "Important social etiquette, photography rules, and hospitality norms to make your trip smooth.",
    content: [
      {
        title: "Greetings matter",
        text: "A simple salam or bonjour goes a long way. Take time to greet shopkeepers and hosts before asking questions or making a request.",
      },
      {
        title: "Ask before taking photos",
        text: "People are often happy to be photographed, but always ask first. Avoid photographing military installations, checkpoints, and other sensitive sites.",
      },
      {
        title: "Be a thoughtful guest",
        text: "Dress modestly in rural areas and religious sites, remove your shoes when appropriate, and accept hospitality graciously. Small gestures of respect are noticed and appreciated.",
      },
    ],
  },
];

export const getGuideBySlug = (slug) => {
  const value = String(slug || "").toLowerCase();
  return (
    guidesList.find(
      (guide) =>
        guide.slug === value ||
        String(guide.id) === value ||
        guide.title.toLowerCase() === value,
    ) || null
  );
};
