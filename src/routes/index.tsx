import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import francis from "@/assets/francis-standing.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Francis Anto — Full Stack Developer" },
      { name: "description", content: "Portfolio of Francis Anto, full stack developer from Thrissur building with React, Python, blockchain and AI." },
      { property: "og:title", content: "Francis Anto — Full Stack Developer" },
      { property: "og:description", content: "React, Python, blockchain and AI projects by Francis Anto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Cat = "Languages" | "Frontend" | "Backend" | "Databases" | "Tools";
const skills: { s: string; n: string; c: Cat }[] = [
  { s: "C", n: "C", c: "Languages" },
  { s: "Py", n: "Python", c: "Languages" },
  { s: "Js", n: "JavaScript", c: "Languages" },
  { s: "Sq", n: "SQL", c: "Languages" },
  { s: "Re", n: "React", c: "Frontend" },
  { s: "Rn", n: "React Native", c: "Frontend" },
  { s: "Ht", n: "HTML", c: "Frontend" },
  { s: "Cs", n: "CSS", c: "Frontend" },
  { s: "No", n: "Node.js", c: "Backend" },
  { s: "Ns", n: "NestJS", c: "Backend" },
  { s: "Ra", n: "REST API", c: "Backend" },
  { s: "Mg", n: "MongoDB", c: "Databases" },
  { s: "My", n: "MySQL", c: "Databases" },
  { s: "Gt", n: "Git", c: "Tools" },
  { s: "Gh", n: "GitHub", c: "Tools" },
  { s: "Pm", n: "Postman", c: "Tools" },
  { s: "Sw", n: "Swagger", c: "Tools" },
  { s: "Lx", n: "Linux", c: "Tools" },
];
const cats: Cat[] = ["Languages", "Frontend", "Backend", "Databases", "Tools"];
const tone: Record<Cat, string> = {
  Languages: "bg-tile text-tile-foreground",
  Frontend: "bg-primary text-primary-foreground",
  Backend: "bg-tile-warm text-foreground",
  Databases: "bg-tile-soft text-foreground",
  Tools: "bg-card text-foreground border",
};

const projects = [
  { t: "Concordia", d: "Jul – Sep 2024", tag: "Blockchain", p: "Collaboration platform for goal tracking, team coordination and shared fund management with smart contracts on opBNB Testnet via MetaMask. Recognized at BNB Hack." },
  { t: "PA System", d: "Oct – Nov 2025", tag: "Speech AI", p: "Real-time voice announcement classifier for emergency alerts using WhisperX, deployed over a Linux hotspot and captive portal for noisy institutions." },
  { t: "Emotion & Relationship Classifier", d: "Sep 2025 – Feb 2026", tag: "NLP", p: "BERT-based models classify emotions and relationship patterns from conversations, backed by MySQL with multimodal text preprocessing." },
];

const nav = ["About", "Skills", "Work", "Experience", "Education", "Contact"];

function Index() {
  const [active, setActive] = useState<Cat | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display font-bold">Francis Anto</a>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-foreground">{n}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero / About with developer ID card */}
      <section id="top" className="relative overflow-hidden pt-24">
        <span id="about" className="absolute top-0" />
        <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-12 px-6 pb-16 md:grid-cols-[1.1fr_auto_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
            <h1 className="font-display text-5xl font-bold leading-none md:text-6xl">
              Hi, I'm <span className="font-normal italic text-primary">Francis.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              I build scalable web apps with <span className="font-medium text-foreground">React, Python, MongoDB and SQL</span>, and love weaving in blockchain and machine learning. Active in tech communities and event leadership — currently exploring AI system security and Linux.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Speaks English, Hindi & Malayalam.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90">
                Explore work <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/francisanto" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub ↗</a>
              <a href="https://linkedin.com/in/francisantothottungal" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">LinkedIn ↗</a>
            </div>
          </div>

          {/* Lanyard ID card */}
          <div className="mx-auto flex flex-col items-center animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="h-24 w-3 rounded-b bg-primary" />
            <div className="-mt-1 h-4 w-8 rounded-md border-2 border-muted-foreground/40 bg-card" />
            <div className="mt-1 w-64 origin-top rotate-[-3deg] overflow-hidden rounded-2xl border bg-card shadow-2xl transition duration-500 hover:rotate-0">
              <div className="flex items-center gap-2 bg-primary px-4 py-3 text-primary-foreground">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-foreground/15 text-[10px] font-bold">FA</span>
                <div>
                  <p className="font-display text-xs font-bold tracking-wider">DEVELOPER ID</p>
                  <p className="text-[10px] opacity-70">Portfolio · 2026</p>
                </div>
              </div>
              <div className="p-4">
                <div className="mx-auto h-40 w-32 overflow-hidden rounded-xl border bg-tile-soft">
                  <img src={francis} alt="Francis Anto" className="h-[300%] w-full object-cover object-top" />
                </div>
                <p className="mt-3 text-center font-display font-bold tracking-wide">FRANCIS ANTO</p>
                <p className="text-center text-xs text-muted-foreground">Full Stack Developer</p>
                <div className="mt-4 grid grid-cols-3 gap-1 text-[10px]">
                  <div><p className="text-muted-foreground">ID</p><p className="font-medium">FA-0001</p></div>
                  <div><p className="text-muted-foreground">Dept</p><p className="font-medium">CSE</p></div>
                  <div className="text-right"><p className="text-muted-foreground">Batch</p><p className="font-medium">2027</p></div>
                </div>
                <div className="mt-3 h-6 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_2px,transparent_2px_4px,var(--foreground)_4px_5px,transparent_5px_8px)] opacity-80" />
              </div>
            </div>
          </div>

          <div className="text-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Quick facts</p>
            <dl className="divide-y border-y">
              {[
                ["Based in", "Thrissur, Kerala"],
                ["Studying", "B.Tech, CSE"],
                ["Batch", "2023 – 2027"],
                ["Interned at", "Ofside · Mindenius"],
                ["Focus", "Full stack · AI · Web3"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-display italic text-muted-foreground">"From the database to the last pixel."</p>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">The periodic table of me</h2>
        <p className="mt-2 text-muted-foreground">Hover a group to light it up.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onMouseEnter={() => setActive(c)} onMouseLeave={() => setActive(null)} onClick={() => setActive(active === c ? null : c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${active === c ? "bg-foreground text-background" : "bg-card"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {skills.map((k, i) => (
            <div key={k.n} className={`aspect-square rounded-xl p-3 shadow-sm transition duration-300 hover:-translate-y-1 ${tone[k.c]} ${active && active !== k.c ? "opacity-20" : ""}`}>
              <div className="text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-3xl font-bold">{k.s}</div>
              <div className="truncate text-xs opacity-75">{k.n}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Selected work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.t} className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-full bg-tile-soft px-3 py-1 text-xs">{p.tag}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{p.t}</h3>
              <p className="text-xs text-muted-foreground">{p.d}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.p}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Experience</h2>
        <div className="mt-10 space-y-10 border-l pl-8">
          <div>
            <p className="text-xs text-muted-foreground">May 2026 – Aug 2026</p>
            <h3 className="font-display text-2xl font-bold">React Developer Intern · Ofside, Delhi</h3>
            <p className="mt-2 text-muted-foreground">Sports management platform with match scoring, tournaments, auth and subscriptions (React Native, NestJS, Node.js). Resolved 250+ issues; shipped to Google Play and the App Store.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">May 2025 – Jun 2025</p>
            <h3 className="font-display text-2xl font-bold">Digital Marketing Intern · Mindenius, Bangalore</h3>
            <p className="mt-2 text-muted-foreground">Designed posters and webinar content, coordinated meetings and handled student enquiries.</p>
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Education</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-tile p-6 text-tile-foreground">
            <p className="text-xs opacity-70">2023 – 2027</p>
            <h3 className="mt-2 font-display text-xl font-bold">B.Tech, Computer Science & Engineering</h3>
            <p className="mt-1 text-sm opacity-80">Christ College of Engineering, Thrissur · 72.30%</p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-xs text-muted-foreground">2020 – 2022</p>
            <h3 className="mt-2 font-display text-xl font-bold">Higher Secondary (Class XII)</h3>
            <p className="mt-1 text-sm text-muted-foreground">Bharatiya Vidya Bhavan's Vidya Mandir, Thrissur · 87.6%</p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-tile py-24 text-tile-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-5xl font-bold md:text-7xl">Let's talk.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            {[
              { i: Mail, l: "francisanto2022@gmail.com", h: "mailto:francisanto2022@gmail.com" },
              { i: Phone, l: "+91 82898 72466", h: "tel:+918289872466" },
              { i: Github, l: "GitHub", h: "https://github.com/francisanto" },
              { i: Linkedin, l: "LinkedIn", h: "https://linkedin.com/in/francisantothottungal" },
            ].map(({ i: I, l, h }) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-tile-foreground/20 px-5 py-3 hover:bg-tile-foreground/10">
                <I className="h-4 w-4" /> {l}
              </a>
            ))}
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-sm opacity-60"><MapPin className="h-4 w-4" /> Thrissur, Kerala · francisanto.me</p>
        </div>
      </section>
    </div>
  );
}
