// ✏️ EDIT THIS FILE ONLY: change names, prices, text and images when you get the details.
export const BUSINESS = {
  name: "Ani & Aji Tour & Travels",
  logoMain: "Ani & Aji", // big line in the header logo
  logoSub: "Tour & Travels · Munnar", // small line under it
  heroKicker: "It’s time to", // small line above the big title on the front photo
  heroTitle: "Visit Munnar", // big title on the front photo
  tagline: "Mist, tea hills and mountain roads, planned by locals in Munnar.", // paragraph on the front photo
  phone: "+91 94479 15274 / +91 90619 35274",
  phones: ["+91 94479 15274", "+91 90619 35274"],
  whatsapp: "919447915274", // country code + number, no + or spaces
  email: "aniajitravels2793@gmail.com",
  address: "Munnar, Idukki district, Kerala, India",
  services: ["Rooms", "House boat booking", "All types of tourist vehicles"],
  web3formsKey: "PASTE_WEB3FORMS_ACCESS_KEY_HERE",
  hero: "/munnar-hero.jpg", // front page photo: public/munnar-hero.jpg
  aboutImage: "/Hero.jpeg", // photo in the about section: public/Hero.jpeg (capital H, like your file)
  aboutTitle: "Munnar, your way",
  about: [
    "Ani & Aji Tour & Travels is a Munnar based travel company. We arrange tour packages, rooms, house boat booking and every kind of tourist vehicle, from cars to tempo travellers.",
    "Write the owner’s own story here: how long the business has been running, why guests keep coming back, and what makes a trip with Ani & Aji different.",
  ],
};

// The five cards on the front page. Each opens its own packages page.
// Photos load from public/images/<id>.jpg (adventure.jpg, hills.jpg, chill.jpg, party.jpg, campfire.jpg).
// Until a photo exists, the card shows a green gradient with "Photo coming soon".
export const CATEGORIES = [
  {
    id: "adventure",
    name: "Adventure",
    tag: "Jeep safaris, treks and viewpoints",
    blurb: "For people who want to be outdoors from sunrise: off-road jeeps, hill trails and the best viewpoints around Munnar.",
    price: 3000,
    highlights: ["Kolukkumalai jeep safari", "Trekking trail", "Sunrise viewpoint"],
    g: "linear-gradient(160deg,#5d6b52,#2b3425)",
  },
  {
    id: "hills",
    name: "Hill Station",
    tag: "Tea gardens, lakes and cool air",
    blurb: "The classic Munnar: tea estates, Mattupetty, Kundala Dam, Echo Point and slow drives through the mist.",
    price: 3200,
    highlights: ["Tea garden walk", "Mattupetty and Echo Point", "Misty viewpoints"],
    g: "linear-gradient(160deg,#6f8062,#313d2a)",
  },
  {
    id: "chill",
    name: "Chill Vibes",
    tag: "Slow days in a resort with a view",
    blurb: "No alarm clocks. Resort stays, quiet valley views, boating and long breakfasts.",
    price: 4500,
    highlights: ["Resort stay with valley view", "Boating at Kundala", "Relaxed schedule"],
    g: "linear-gradient(160deg,#6a7f78,#2a3a35)",
  },
  {
    id: "party",
    name: "Party Nights",
    tag: "Music, dinner and a lively evening",
    blurb: "Trips built around the evening: music, dinner, bonfire and friends, with comfortable stays and safe transfers.",
    price: 4000,
    highlights: ["Music and DJ night", "Dinner and bonfire", "Late checkout"],
    g: "linear-gradient(160deg,#7b8a6e,#323c2b)",
  },
  {
    id: "campfire",
    name: "Campfire",
    tag: "Tents, bonfire and a starry sky",
    blurb: "Camp under the stars in the hills with a bonfire, barbecue and music.",
    price: 3500,
    highlights: ["Campfire with music", "Tent or cottage stay", "Barbecue dinner"],
    g: "linear-gradient(160deg,#8a7a55,#3a3220)",
  },
].map((c) => ({ image: `/images/${c.id}.jpg`, ...c }));

// Auto-built: every category gets a 2 day and a 3 day plan (10 packages). Edit any value below.
export const PACKAGES = CATEGORIES.flatMap((c) =>
  [2, 3].map((d) => {
    const price = c.price + (d - 2) * 2500; // per person, ₹ (placeholder)
    return {
      id: `${c.id}-${d}`,
      cat: c.id,
      title: `${c.name} — ${d} Days`,
      days: d,
      nights: d - 1,
      price,
      oldPrice: price + 1000,
      includes: ["Hotel", "Sightseeing", "Meals", "Transfer"],
      highlights: c.highlights, // placeholder, replace per package
    };
  })
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

// FAQ shown on the page. Replace answers with the owner's real information.
export const FAQS = [
  { q: "What is the best time to visit Munnar?", a: "Write the owner's advice here: for example, September to March for cool weather, and June to August for the monsoon mist." },
  { q: "How far is Munnar from Kochi airport?", a: "Write the distance and travel time here, and mention that Ani & Aji Tour & Travels arranges airport pickup." },
  { q: "Do you arrange trips for international guests?", a: "Yes. Write about pickup, English-speaking drivers, payment methods and anything else foreign guests ask." },
  { q: "How do I book a Munnar cab or tour package?", a: "Send an enquiry from this page or message us on WhatsApp. We reply with a quote, usually within 24 hours." },
  { q: "Can the packages be customised?", a: "Yes. Tell us your dates, group size and budget and we will adjust the plan." },
];
