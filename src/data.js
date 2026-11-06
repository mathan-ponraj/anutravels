// ✏️ EDIT THIS FILE ONLY — change text, prices, images when you get the details.
export const BUSINESS = {
  name: "Anu Travels",
  tagline: "Tea hills, mist and mountain roads — planned by locals in Munnar.",
  phone: "+91 00000 00000",
  whatsapp: "910000000000", // country code + number, no + or spaces
  email: "owner@example.com",
  address: "Munnar, Kerala, India",
  web3formsKey: "PASTE_WEB3FORMS_ACCESS_KEY_HERE",
};

// Put photos in /public/images and set image: "/images/munnar1.jpg". Leave "" for a colour placeholder.
export const PACKAGES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Package Name ${i + 1}`,
  category: ["Family", "Honeymoon", "Adventure", "Wellness"][i % 4],
  nights: (i % 4) + 1,
  days: (i % 4) + 2,
  price: 5000 + i * 1500, // per person, ₹
  oldPrice: 6000 + i * 1500,
  image: "",
  includes: ["Hotel", "Sightseeing", "Meals", "Transfer"],
  highlights: ["Highlight one", "Highlight two", "Highlight three"],
}));

export const REASONS = [
  { t: "Local to Munnar", d: "Short description about being based in the hills." },
  { t: "International guests welcome", d: "Airport pickup, English-speaking drivers and guides." },
  { t: "Custom plans", d: "Change days, hotels or activities to fit your group." },
  { t: "One-call support", d: "Reach the owner directly on call or WhatsApp." },
];