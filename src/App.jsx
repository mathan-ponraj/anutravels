import { useRef, useState } from "react";
import { BUSINESS as B, CATEGORIES, PACKAGES, REASONS } from "./data";

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const ALL = { id: "all", name: "All Packages", image: "/images/all.svg", g: "linear-gradient(135deg,#2c3f35,#0b1612)" };
const MAXP = Math.max(...PACKAGES.map((p) => p.price));

// Photo with gradient fallback: if the file is missing the image hides itself.
function Photo({ src, g, className, children }) {
  return (
    <div className={className} style={{ backgroundImage: g }}>
      <img src={src} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
      {children}
    </div>
  );
}

function Pines() {
  const row = (fill, gap, base, seed) =>
    Array.from({ length: 40 }, (_, i) => {
      const x = i * gap - 20, h = base + ((i * seed) % 70);
      return <path key={i} fill={fill} d={`M${x} 220 L${x + 26} ${220 - h} L${x + 52} 220Z M${x + 6} 220 L${x + 26} ${220 - h * 0.7} L${x + 46} 220Z`} />;
    });
  return (
    <svg className="pines" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {row("#12301f", 46, 80, 37)}{row("#0a1f15", 38, 55, 53)}<rect y="205" width="1440" height="15" fill="#08140e" />
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
  if (state === "done") return <div className="done"><h3>Enquiry sent</h3><p>Thank you. We will reply within 24 hours.</p></div>;
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
  const [cat, setCat] = useState("all");
  const [destDraft, setDestDraft] = useState("all");
  const [sort, setSort] = useState("choice");
  const [maxPrice, setMaxPrice] = useState(MAXP);
  const [durs, setDurs] = useState([]);
  const [cats, setCats] = useState([]);
  const [pick, setPick] = useState("");
  const [copied, setCopied] = useState(false);
  const rail = useRef(null);
  const active = CATEGORIES.find((c) => c.id === cat);

  let list = PACKAGES.filter((p) =>
    (cat === "all" || p.cat === cat) && p.price <= maxPrice &&
    (!durs.length || durs.includes(p.days)) && (!cats.length || cats.includes(p.cat)));
  if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "duration") list = [...list].sort((a, b) => a.days - b.days);

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const clear = () => { setMaxPrice(MAXP); setDurs([]); setCats([]); setCat("all"); setDestDraft("all"); };
  const scroll = (n) => rail.current.scrollBy({ left: n * 520, behavior: "smooth" });
  const share = async () => {
    try { if (navigator.share) await navigator.share({ title: B.name, url: location.href }); else { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } } catch {}
  };

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
        <div className="mist" aria-hidden="true" />
        <div className="wrap">
          <h1>Munnar in the monsoon, planned by locals.</h1>
          <p>{B.tagline}</p>
          <a className="btn" href="#packages">View packages</a>
        </div>
        <Pines />
      </section>

      <main className="wrap" id="packages">
        <p className="crumb"><a href="#top">Home</a> › <b>Munnar Tour Packages</b></p>

        <div className="summary">
          <div className="srow">
            <label><span>Destination</span>
              <select value={destDraft} onChange={(e) => setDestDraft(e.target.value)}>
                <option value="all">All Munnar packages</option>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label><span>Start date</span><input type="month" /></label>
            <button className="share" onClick={share} aria-label="Share this page">{copied ? "Copied" : "Share"}</button>
            <button className="btn" onClick={() => setCat(destDraft)}>Modify search</button>
          </div>
          <h2>Munnar Tour Packages</h2>
          <p className="quote">“Travel is the only thing you buy that makes you richer.”</p>
          <p className="blurb">Short paragraph about the packages, the hills and what makes a trip with {B.name} different. Replace this text later.</p>
        </div>

        <div className="railwrap">
          <button className="arrow l" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
          <div className="rail" ref={rail}>
            {[ALL, ...CATEGORIES].map((c) => (
              <button key={c.id} className={"tile" + (cat === c.id ? " on" : "")} onClick={() => { setCat(c.id); setDestDraft(c.id); }}>
                <Photo src={c.image} g={c.g} className="tphoto"><span>{c.name}</span></Photo>
              </button>
            ))}
          </div>
          <button className="arrow r" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
        </div>

        <div className="layout">
          <aside className="filter">
            <div className="fhead"><h3>Filter</h3><button onClick={clear}>Clear</button></div>
            <div className="fblock">
              <div className="fhead"><b>Budget</b><button onClick={() => setMaxPrice(MAXP)}>Reset</button></div>
              <input type="range" min="1000" max={MAXP} step="500" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
              <small>Up to {inr(maxPrice)}</small>
            </div>
            <div className="fblock">
              <div className="fhead"><b>Duration</b><button onClick={() => setDurs([])}>Reset</button></div>
              {[1, 2, 3].map((d) => <label key={d} className="chk"><input type="checkbox" checked={durs.includes(d)} onChange={() => toggle(durs, setDurs, d)} />{d} {d === 1 ? "Day" : "Days"}</label>)}
            </div>
            <div className="fblock">
              <div className="fhead"><b>Category</b><button onClick={() => setCats([])}>Reset</button></div>
              {CATEGORIES.map((c) => <label key={c.id} className="chk"><input type="checkbox" checked={cats.includes(c.id)} onChange={() => toggle(cats, setCats, c.id)} />{c.name}</label>)}
            </div>
          </aside>

          <section>
            <div className="sortbar">
              <b>Sort by</b>
              {[["choice", `${B.name} Choice`], ["duration", "Duration"], ["price", "Price"]].map(([k, l]) => (
                <button key={k} className={sort === k ? "on" : ""} onClick={() => setSort(k)}>{l}</button>
              ))}
              <a className="promo" href={`https://wa.me/${B.whatsapp}`}>Custom plan? Chat on WhatsApp</a>
            </div>
            <p className="count">{active ? `${active.name}: ${active.blurb} ` : ""}Showing {list.length} trips</p>

            {list.length === 0 && <p className="empty">No trips match these filters. Click Clear to start again.</p>}
            {list.map((p) => {
              const c = CATEGORIES.find((x) => x.id === p.cat);
              return (
                <article className="card" key={p.id}>
                  <Photo src={c.image} g={c.g} className="img" />
                  <div className="body">
                    <span className="tag">{c.name}</span>
                    <h3>{p.title} <small>{p.nights} {p.nights === 1 ? "Night" : "Nights"} · {p.days} {p.days === 1 ? "Day" : "Days"}</small></h3>
                    <p className="inc">{p.includes.join("   ·   ")}</p>
                    <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                  </div>
                  <div className="buy">
                    <span className="off">Upto 10% Off</span>
                    <span className="per">Per Person</span>
                    <strong>{inr(p.price)} <s>{inr(p.oldPrice)}</s></strong>
                    <a className="btn" href="#contact" onClick={() => setPick(p.title)}>Enquire now</a>
                    <a className="ghost" href={`https://wa.me/${B.whatsapp}?text=${encodeURIComponent("Hi, I am interested in " + p.title)}`}>WhatsApp</a>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </main>

      <section className="why" id="why">
        <div className="wrap sec">
          <h2>Why travel with {B.name}</h2>
          <div className="grid">{REASONS.map((r) => <div key={r.t}><h3>{r.t}</h3><p>{r.d}</p></div>)}</div>
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
