import { useState } from "react";
import { BUSINESS as B, PACKAGES, REASONS } from "./data";

const inr = (n) => "₹" + n.toLocaleString("en-IN");

function Hills() {
  return (
    <svg className="hills" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#3E7C4F" d="M0 190 C220 110 380 230 620 160 S1040 90 1440 180 V320 H0Z" />
      <path fill="#2A6040" d="M0 235 C260 170 460 280 720 215 S1160 150 1440 235 V320 H0Z" />
      <path fill="#EEF3EF" d="M0 285 C300 240 520 320 800 275 S1250 240 1440 290 V320 H0Z" />
    </svg>
  );
}

function EnquiryForm({ selected }) {
  const [state, setState] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: B.web3formsKey, subject: `New enquiry – ${data.name}`, from_name: "Anu Travels Website", ...data }),
      });
      const json = await res.json();
      if (json.success) { setState("done"); e.target.reset(); } else setState("error");
    } catch { setState("error"); }
  }
  if (state === "done")
    return <div className="done"><h3>Enquiry sent</h3><p>Thank you. We will reply within 24 hours.</p></div>;
  return (
    <form onSubmit={onSubmit} className="form">
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex="-1" />
      <label>Full name<input name="name" required /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label>Phone / WhatsApp (with country code)<input name="phone" required /></label>
      <label>Country<input name="country" /></label>
      <label>Package
        <select name="package" defaultValue={selected || "Not sure yet"} key={selected}>
          <option>Not sure yet</option>
          {PACKAGES.map((p) => <option key={p.id}>{p.title}</option>)}
        </select>
      </label>
      <label>Travel date<input name="travel_date" type="date" /></label>
      <label>Adults<input name="adults" type="number" min="1" defaultValue="2" /></label>
      <label>Children<input name="children" type="number" min="0" defaultValue="0" /></label>
      <label className="wide">Message<textarea name="message" rows="3" placeholder="Tell us what you have in mind" /></label>
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
      {state === "error" && <p className="err">Could not send. Please call or WhatsApp us instead.</p>}
    </form>
  );
}

export default function App() {
  const cats = ["All", ...new Set(PACKAGES.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("popular");
  const [pick, setPick] = useState("");
  let list = PACKAGES.filter((p) => cat === "All" || p.category === cat);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">{B.name}</a>
        <nav>
          <a href="#packages">Packages</a><a href="#why">Why us</a><a href="#contact">Contact</a>
          <a className="btn sm" href={`https://wa.me/${B.whatsapp}`}>WhatsApp</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="wrap">
          <h1>Munnar, planned by the people who live here.</h1>
          <p>{B.tagline}</p>
          <a className="btn" href="#packages">See our 10 packages</a>
        </div>
        <Hills />
      </section>

      <section className="wrap sec" id="packages">
        <h2>Holiday packages</h2>
        <div className="bar">
          <div className="chips">
            {cats.map((c) => <button key={c} className={c === cat ? "chip on" : "chip"} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort packages">
            <option value="popular">Sort: Our choice</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
        <p className="count">Showing {list.length} trips</p>

        {list.map((p) => (
          <article className="card" key={p.id}>
            <div className="img" style={p.image ? { backgroundImage: `url(${p.image})` } : {}}>{!p.image && <span>Photo</span>}</div>
            <div className="body">
              <span className="tag">{p.category}</span>
              <h3>{p.title} <small>{p.nights} Nights · {p.days} Days</small></h3>
              <p className="inc">{p.includes.join("  |  ")}</p>
              <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
            <div className="buy">
              <span className="per">Per person</span>
              <strong>{inr(p.price)} <s>{inr(p.oldPrice)}</s></strong>
              <a className="btn" href="#contact" onClick={() => setPick(p.title)}>Enquire now</a>
            </div>
          </article>
        ))}
      </section>

      <section className="why" id="why">
        <div className="wrap sec">
          <h2>Why travel with {B.name}</h2>
          <div className="grid">
            {REASONS.map((r) => <div key={r.t}><h3>{r.t}</h3><p>{r.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="wrap sec contact" id="contact">
        <div>
          <h2>Plan your trip</h2>
          <p>Send your dates and we will reply with a quote.</p>
          <p><b>Phone:</b> {B.phone}<br /><b>Email:</b> {B.email}<br /><b>Office:</b> {B.address}</p>
        </div>
        <EnquiryForm selected={pick} />
      </section>

      <footer>© {new Date().getFullYear()} {B.name}, {B.address}</footer>
    </>
  );
}