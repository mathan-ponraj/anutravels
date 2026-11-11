import { useEffect, useState } from "react";
import { BUSINESS as B, CABS, CATEGORIES, FAQS, PACKAGES, REASONS } from "./data";

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const routeOf = () => location.hash.replace(/^#\/?/, "");
const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const HOME_TITLE = document.title;
const tel = (p) => "tel:" + p.replace(/\s/g, "");

// Simple hash routing: "#/" is home, "#/adventure" is the Adventure packages page.
function useRoute() {
  const [route, setRoute] = useState(routeOf);
  useEffect(() => {
    const onChange = () => { setRoute(routeOf()); window.scrollTo({ top: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

// Jump to a section; if it is not on this page, go home first.
function goSection(e, id) {
  e.preventDefault();
  if (document.getElementById(id)) return scrollToId(id);
  location.hash = "#/";
  setTimeout(() => scrollToId(id), 150);
}

// Photo with gradient fallback: if the file is missing, the image hides itself.
function Photo({ src, g, alt, className = "", children }) {
  return (
    <div className={"ph " + className} style={{ backgroundImage: g }}>
      <span className="soon">Photo coming soon</span>
      <img src={src} alt={alt || ""} loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
      {children}
    </div>
  );
}

const ICONS = {
  phone: "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1z",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7L4 7v1.5l8 5 8-5V7z",
  pin: "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
};
const Ico = ({ d, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d={d} />
  </svg>
);

// Transparent over the photo, solid olive once you scroll.
function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => (e) => { setOpen(false); goSection(e, id); };

  return (
    <header className={"nav" + (solid || open ? " solid" : "") + (open ? " open" : "")}>
      <div className="nav-in">
        <a href="#/" className="logo" aria-label={B.name} onClick={() => setOpen(false)}>
          <b>{B.logoMain}</b>
          <small>{B.logoSub}</small>
        </a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav>
          <a href="#/" onClick={go("trips")}>Trips</a>
          <a href="#/" onClick={go("about")}>About</a>
          <a href="#/" onClick={go("cabs")}>Cab booking</a>
          <a href="#/" onClick={go("faq")}>FAQ</a>
          <a href="#/" onClick={go("contact")}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-img"
          src={B.hero}
          fetchpriority="high"
          alt={`Misty tea hills of Munnar, Kerala, with ${B.name}`}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="wrap hero-in">
          <p className="hero-kicker">{B.heroKicker}</p>
          <h1>
            {B.heroTitle}
            <span className="sr"> with {B.name}: Munnar tour packages and cab booking</span>
          </h1>
          <p className="hero-text">{B.tagline}</p>
          <div className="hero-acts">
            <a className="pill" href="#/" onClick={(e) => goSection(e, "trips")}>Our trips</a>
            <a className="pill solid" href={tel(B.phones[0])}>Call now</a>
          </div>
        </div>
      </section>

      <section className="info" aria-label="Contact details">
        <div className="wrap info-in">
          <div className="info-item">
            <Ico d={ICONS.phone} />
            <span>
              <small>Call us</small>
              {B.phones.map((p) => <a key={p} href={tel(p)}>{p}</a>)}
            </span>
          </div>
          <div className="info-item">
            <Ico d={ICONS.mail} />
            <span>
              <small>Email</small>
              <a href={"mailto:" + B.email}>{B.email}</a>
            </span>
          </div>
          <div className="info-item">
            <Ico d={ICONS.pin} />
            <span>
              <small>Visit us</small>
              <em>{B.address}</em>
            </span>
          </div>
        </div>
      </section>

      <section className="sec sage" id="trips">
        <div className="wrap">
          <h2 className="center">Pick your kind of trip</h2>
          <p className="lead center">Choose a style and see the Munnar packages we plan for it.</p>
          <div className="cats">
            {CATEGORIES.map((c) => (
              <a key={c.id} className="cat" href={`#/${c.id}`} aria-label={`${c.name} packages`}>
                <Photo src={c.image} g={c.g} alt={`${c.name} in Munnar`} />
                <h3>{c.name}</h3>
                <p>{c.tag}</p>
                <span className="pill dark sm">Explore</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec pale" id="about">
        <div className="wrap split">
          <Photo src={B.aboutImage} g="linear-gradient(160deg,#6f8062,#313d2a)" alt={`${B.name} tempo traveller at a resort in Munnar`} className="split-img" />
          <div className="split-txt">
            <h2>{B.aboutTitle}</h2>
            {B.about.map((t) => <p key={t}>{t}</p>)}
            <ul className="svc">{B.services.map((s) => <li key={s}>{s}</li>)}</ul>
            <a className="pill dark" href="#/" onClick={(e) => goSection(e, "contact")}>Plan your trip</a>
          </div>
        </div>
      </section>

      <section className="sec olive">
        <div className="wrap">
          <h2 className="center">Why travel with {B.name}</h2>
          <div className="grid">
            {REASONS.map((r) => (
              <div key={r.t}><h3>{r.t}</h3><p>{r.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sage" id="cabs">
        <div className="wrap">
          <h2 className="center">Munnar cab booking</h2>
          <p className="lead center">Airport transfers from Kochi, local sightseeing taxis and group travel across Munnar. Replace this text with the owner’s own words.</p>
          <div className="cablist">
            {CABS.map((c) => (
              <div className="cab" key={c.route}>
                <h3>{c.route}</h3>
                <span>{c.vehicle}<small>{c.note}</small></span>
                <strong>From {inr(c.price)}</strong>
                <a className="pill dark sm" href={`https://wa.me/${B.whatsapp}?text=${encodeURIComponent("Hi, I want to book a cab: " + c.route)}`}>Book on WhatsApp</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec pale" id="faq">
        <div className="wrap narrow">
          <h2 className="center">Munnar travel questions</h2>
          {FAQS.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function CategoryPage({ cat, onEnquire }) {
  const [dur, setDur] = useState(0);
  const [sort, setSort] = useState("rec");
  const all = PACKAGES.filter((p) => p.cat === cat.id);
  const durations = [...new Set(all.map((p) => p.days))].sort((a, b) => a - b);
  let list = all.filter((p) => !dur || p.days === dur);
  if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "duration") list = [...list].sort((a, b) => a.days - b.days);

  return (
    <>
      <section className="banner">
        <Photo src={cat.image} g={cat.g} alt={`${cat.name} in Munnar`} />
        <div className="wrap">
          <a className="back" href="#/">‹ All trip types</a>
          <h1>{cat.name}</h1>
          <p>{cat.blurb}</p>
        </div>
      </section>

      <main className="sec pale" id="packages">
        <div className="wrap">
          <div className="tools">
            <div className="pills" role="group" aria-label="Trip length">
              <button className={!dur ? "on" : ""} onClick={() => setDur(0)}>All</button>
              {durations.map((d) => (
                <button key={d} className={dur === d ? "on" : ""} onClick={() => setDur(d)}>{d} Days</button>
              ))}
            </div>
            <label className="sort">Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="rec">Recommended</option>
                <option value="price">Price, low to high</option>
                <option value="duration">Duration</option>
              </select>
            </label>
          </div>

          <div className="pkgs">
            {list.map((p) => (
              <article className="pkg" key={p.id}>
                <Photo src={cat.image} g={cat.g} alt={`${p.title} in Munnar`}>
                  <span className="badge">{p.nights} {p.nights === 1 ? "Night" : "Nights"}, {p.days} Days</span>
                </Photo>
                <div className="pkg-body">
                  <h3>{p.title}</h3>
                  <ul className="chips">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                  <ul className="hl">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                </div>
                <div className="pkg-foot">
                  <div className="price"><strong>{inr(p.price)}</strong><s>{inr(p.oldPrice)}</s><small>per person</small></div>
                  <div className="acts">
                    <button className="pill sm solid" onClick={() => onEnquire(p.title)}>Enquire now</button>
                    <a className="pill sm" href={`https://wa.me/${B.whatsapp}?text=${encodeURIComponent("Hi, I am interested in " + p.title)}`}>WhatsApp</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <h3 className="morehead">Other trip types</h3>
          <div className="pills">
            {CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
              <a key={c.id} href={`#/${c.id}`}>{c.name}</a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function useSend() {
  const [state, setState] = useState("idle");
  async function send(e) {
    e.preventDefault();
    const form = e.target;
    setState("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: B.web3formsKey, subject: `New enquiry – ${data.name}`, from_name: `${B.name} Website`, ...data }),
      });
      const json = await res.json();
      if (json.success) { setState("done"); form.reset(); } else setState("error");
    } catch {
      setState("error");
    }
  }
  return [state, send];
}

function EnquiryForm({ selected }) {
  const [state, send] = useSend();
  if (state === "done") {
    return (
      <div className="done">
        <h3>Enquiry sent</h3>
        <p>Thank you. We will reply within 24 hours.</p>
      </div>
    );
  }
  return (
    <form onSubmit={send} className="form">
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
      <button className="pill solid wide" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
      {state === "error" && <p className="err">Could not send. Please call or WhatsApp us instead.</p>}
    </form>
  );
}

export default function App() {
  const route = useRoute();
  const [pick, setPick] = useState("");
  const cat = CATEGORIES.find((c) => c.id === route);

  useEffect(() => {
    document.title = cat ? `${cat.name} Munnar packages | ${B.name}` : HOME_TITLE;
  }, [cat]);

  const enquire = (title) => { setPick(title); scrollToId("contact"); };

  return (
    <>
      <Header />
      {cat ? <CategoryPage key={cat.id} cat={cat} onEnquire={enquire} /> : <Home />}

      <section className="sec olive dark" id="contact">
        <div className="wrap contact">
          <div>
            <h2>Plan your trip</h2>
            <p className="lead">Send your dates and we will reply with a quote.</p>
            <p className="cdet">
              <b>Phone</b>
              {B.phones.map((p) => <a key={p} href={tel(p)}>{p}</a>)}
              <b>Email</b>
              <a href={"mailto:" + B.email}>{B.email}</a>
              <b>Office</b>
              <span>{B.address}</span>
            </p>
          </div>
          <EnquiryForm selected={pick} />
        </div>
      </section>

      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <b>{B.logoMain}</b>
            <small>{B.logoSub}</small>
          </div>
          <ul>
            <li><a href="#/" onClick={(e) => goSection(e, "trips")}>Trips</a></li>
            <li><a href="#/" onClick={(e) => goSection(e, "about")}>About</a></li>
            <li><a href="#/" onClick={(e) => goSection(e, "cabs")}>Cab booking</a></li>
            <li><a href="#/" onClick={(e) => goSection(e, "faq")}>FAQ</a></li>
            <li><a href="#/" onClick={(e) => goSection(e, "contact")}>Contact</a></li>
          </ul>
          <ul>
            <li><a href={"mailto:" + B.email}>{B.email}</a></li>
            {B.phones.map((p) => <li key={p}><a href={tel(p)}>{p}</a></li>)}
            <li>{B.address}</li>
          </ul>
        </div>
        <p className="copy">© {new Date().getFullYear()} {B.name}</p>
      </footer>
    </>
  );
}
