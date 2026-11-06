// ✏️ EDIT THIS FILE ONLY — change names, prices, text and images when you get the details.
export const BUSINESS = {
  name: "Anu Travels",
  tagline: "Mist, tea hills and mountain roads, planned by locals in Munnar.",
  phone: "+91 00000 00000",
  whatsapp: "910000000000", // country code + number, no + or spaces
  email: "owner@example.com",
  address: "Munnar, Kerala, India",
  web3formsKey: "PASTE_WEB3FORMS_ACCESS_KEY_HERE",
};

// Tiles in the scroll row. Photos load from /public/images/<id>.svg (e.g. adventure.svg). Missing photo = green gradient.
export const CATEGORIES = [
  { id: "adventure", name: "Adventure", blurb: "Trekking, jeep rides and viewpoints.", price: 3000, g: "linear-gradient(135deg,#1d4b3a,#0b1f18)" },
  { id: "kolukkumalai", name: "Kolukkumalai", blurb: "Sunrise at the highest tea estate.", price: 3200, g: "linear-gradient(135deg,#7a5a2a,#1a1409)" },
  { id: "kundala", name: "Kundala Dam", blurb: "Lake views and boating.", price: 3100, g: "linear-gradient(135deg,#1f5560,#09191d)" },
  { id: "mattupetty", name: "Mattupetty", blurb: "Dam, boating and echo point.", price: 3300, g: "linear-gradient(135deg,#2f5d3a,#0c1a10)" },
  { id: "vattavada", name: "Vattavada", blurb: "Terraced farms and valley views.", price: 3400, g: "linear-gradient(135deg,#5b4a22,#15110a)" },
  { id: "offroad", name: "Off-road", blurb: "4x4 jeep trails through the hills.", price: 3600, g: "linear-gradient(135deg,#4a2f1f,#120b07)" },
  { id: "resorts", name: "Resorts", blurb: "Stay in the middle of the plantations.", price: 5500, g: "linear-gradient(135deg,#27483b,#08140f)" },
  { id: "luxury", name: "Luxury Pool Stay", blurb: "Private pool villas with valley views.", price: 8500, g: "linear-gradient(135deg,#2a5a66,#0a1a1f)" },
].map((c) => ({ image: `/images/${c.id}.svg`, ...c }));

// Auto-built: every category gets a 1-day, 2-day and 3-day plan. Edit any value below.
export const PACKAGES = CATEGORIES.flatMap((c) =>
  [1, 2, 3].map((d) => ({
    id: `${c.id}-${d}`,
    cat: c.id,
    title: `${c.name} — ${d} ${d === 1 ? "Day" : "Days"}`,
    days: d,
    nights: d - 1,
    price: c.price + (d - 1) * 2500, // per person, ₹ (placeholder)
    oldPrice: c.price + (d - 1) * 2500 + 1000,
    includes: ["Hotel", "Sightseeing", "Meals", "Transfer"],
    highlights: ["Highlight one", "Highlight two", "Highlight three"],
  }))
);

export const REASONS = [
  { t: "Local to Munnar", d: "Short description about being based in the hills." },
  { t: "International guests welcome", d: "Airport pickup, English-speaking drivers and guides." },
  { t: "Custom plans", d: "Change days, hotels or activities to fit your group." },
  { t: "One-call support", d: "Reach the owner directly on call or WhatsApp." },
];

// Cab booking rates (placeholders). Edit freely.
export const CABS = [
  { route: "Kochi Airport (COK) to Munnar", vehicle: "Sedan / SUV", price: 4500, note: "About 4 to 5 hours, one way" },
  { route: "Munnar local sightseeing (full day)", vehicle: "Sedan / SUV", price: 3500, note: "8 hours, up to 80 km" },
  { route: "Munnar to Thekkady", vehicle: "SUV", price: 4000, note: "One way" },
  { route: "Group transfer", vehicle: "Tempo Traveller (12 seats)", price: 7500, note: "Per day, fuel extra" },
];

// FAQ shown on the page and read by Google. Replace answers with the owner's real information.
export const FAQS = [
  { q: "What is the best time to visit Munnar?", a: "Write the owner's advice here: for example, September to March for cool weather, and June to August for the monsoon mist." },
  { q: "How far is Munnar from Kochi airport?", a: "Write the distance and travel time here, and mention that Anu Travels arranges airport pickup." },
  { q: "Do you arrange trips for international guests?", a: "Yes. Write about pickup, English-speaking drivers, payment methods and anything else foreign guests ask." },
  { q: "How do I book a Munnar cab or tour package?", a: "Send an enquiry from this page or message us on WhatsApp. We reply with a quote, usually within 24 hours." },
  { q: "Can the packages be customised?", a: "Yes. Tell us your dates, group size and budget and we will adjust the plan." },
];