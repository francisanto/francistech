import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Network, Play, Square, Download, Award, Rocket, Trophy } from "lucide-react";
import francis from "@/assets/francis-formal.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Francis Anto — Full Stack Developer" },
      { name: "description", content: "Portfolio of Francis Anto, full stack developer from Thrissur building with MERN, AI and web development." },
      { property: "og:title", content: "Francis Anto — Full Stack Developer" },
      { property: "og:description", content: "MERN, AI and web development projects by Francis Anto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
type Cat = "Frontend" | "Backend" | "Databases" | "Tools";
const skills: { s: string; n: string; c: Cat; logo: string | null }[] = [
  { s: "Py", n: "Python", c: "Backend", logo: `${D}/python/python-original.svg` },
  { s: "Js", n: "JavaScript", c: "Frontend", logo: `${D}/javascript/javascript-original.svg` },
  { s: "Re", n: "React", c: "Frontend", logo: `${D}/react/react-original.svg` },
  { s: "Rn", n: "React Native", c: "Frontend", logo: `${D}/react/react-original.svg` },
  { s: "Ht", n: "HTML", c: "Frontend", logo: `${D}/html5/html5-original.svg` },
  { s: "Cs", n: "CSS", c: "Frontend", logo: `${D}/css3/css3-original.svg` },
  { s: "No", n: "Node.js", c: "Backend", logo: `${D}/nodejs/nodejs-original.svg` },
  { s: "Ns", n: "NestJS", c: "Backend", logo: `${D}/nestjs/nestjs-original.svg` },
  { s: "Ra", n: "REST API", c: "Backend", logo: null },
  { s: "Mg", n: "MongoDB", c: "Databases", logo: `${D}/mongodb/mongodb-original.svg` },
  { s: "My", n: "MySQL", c: "Databases", logo: `${D}/mysql/mysql-original.svg` },
  { s: "Gt", n: "Git", c: "Tools", logo: `${D}/git/git-original.svg` },
  { s: "Gh", n: "GitHub", c: "Tools", logo: `${D}/github/github-original.svg` },
  { s: "Pm", n: "Postman", c: "Tools", logo: `${D}/postman/postman-original.svg` },
  { s: "Sw", n: "Swagger", c: "Tools", logo: `${D}/swagger/swagger-original.svg` },
  { s: "Lx", n: "Linux", c: "Tools", logo: `${D}/linux/linux-original.svg` },
];
const cats: Cat[] = ["Frontend", "Backend", "Databases", "Tools"];
const tone: Record<Cat, string> = {
  Frontend: "bg-primary text-primary-foreground",
  Backend: "bg-tile-warm text-foreground",
  Databases: "bg-tile-soft text-foreground",
  Tools: "bg-card text-foreground border",
};

const projects = [
  { t: "Repa", h: "https://github.com/francisanto/Repa", tag: "AI · EdTech", p: "AI-driven class management and event platform — automated student verification, event registration with secure Razorpay payments, OCR-based timetable extraction with live updates, and printable leave/permission letters." },
  { t: "Emotion Detection", h: "https://github.com/francisanto/Emotion_detection", tag: "Multimodal AI", p: "BERT + speech features + multimodal fusion to detect emotion, stress and social intent from chat text, voice clips and chat screenshots, with history-aware relationship analytics." },
  { t: "InANOut", h: "https://github.com/francisanto/inanout", tag: "FinTech", p: "Fund management system with lending and borrowing across people groups — a GPay-style split — plus expense and income tracking including salary and other incomes." },
  { t: "CoinCordia", h: "https://github.com/francisanto/coincordia", tag: "Blockchain", p: "A decentralized application that lets friends save money together using blockchain technology." },
  { t: "CaptaNet", h: "https://github.com/francisanto/CaptaNet", tag: "Linux · Networking", p: "A Linux hostapd-based hotspot with a captive portal, connectable through a companion app and website. Currently in development." },
];

const nav = ["About", "Skills", "Work", "Experience", "Education", "Contact"];

const INTRO =
  "Hi, I am Francis, a full stack developer from Thrissur, Kerala. I build scalable web apps with React, Python, MongoDB and SQL, and I love weaving in blockchain and machine learning. Currently I am exploring AI system security and Linux.";

function speakIntro(onEnd: () => void) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(INTRO);
  const voices = synth.getVoices();
  const male =
    voices.find((v) => /en/i.test(v.lang) && /male|david|daniel|george|alex|fred|james|rishi/i.test(v.name) && !/female|zira|samantha|victoria/i.test(v.name)) ??
    voices.find((v) => /^en[-_]IN/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang));
  if (male) utter.voice = male;
  utter.pitch = 0.9;
  utter.rate = 1;
  utter.onend = onEnd;
  utter.onerror = onEnd;
  synth.speak(utter);
}

const milestones = [
  { i: Award, t: "BeachHack EXCOM", p: "Core team leadership and event coordination" },
  { i: Rocket, t: "BNB Hack Builders", p: "Featured among Web3 builders and projects" },
  { i: Trophy, t: "Idea Fest Funding", p: "Team White Tie secured ₹35,000 in funding" },
];

function Index() {
  const [active, setActive] = useState<Cat | null>(null);
  const [selected, setSelected] = useState<(typeof skills)[number] | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const speakingRef = useRef(false);
  const toggleVoice = () => {
    if (speakingRef.current) {
      window.speechSynthesis.cancel();
      speakingRef.current = false;
      setSpeaking(false);
      return;
    }
    speakingRef.current = true;
    setSpeaking(true);
    speakIntro(() => {
      speakingRef.current = false;
      setSpeaking(false);
    });
  };
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

      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-20">
        <h1 aria-hidden className="pointer-events-none absolute inset-x-0 top-24 select-none text-center font-display text-[22vw] font-bold leading-none tracking-tighter text-foreground/[0.05]">
          FRANCIS
        </h1>
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-end gap-6 px-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="pb-16 md:pb-24">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Francis Anto</p>
            <h2 className="font-display text-5xl font-bold leading-[0.95] text-primary md:text-7xl">
              Full Stack<br />Developer.
            </h2>
            <p className="mt-4 text-muted-foreground">MERN · AI · Web Development</p>
            <button type="button" onClick={toggleVoice} className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className={`grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground ${speaking ? "animate-pulse" : ""}`}>
                {speaking ? <Square className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
              </span>
              {speaking ? "Stop intro" : "Hear my intro"}
            </button>
            <div className="mt-8 flex flex-wrap gap-10">
              {[["1", "Year developer experience"], ["13+", "Projects completed"], ["2+", "Event leads"]].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold text-primary">{v}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <img src={francis} alt="Francis Anto standing" className="mx-auto h-[70vh] max-h-[760px] w-auto object-contain md:h-[85vh] animate-in fade-in slide-in-from-bottom-6 duration-700" />
          <div className="hidden pb-24 text-right md:block">
            <p className="text-sm text-muted-foreground">Based in Thrissur, Kerala</p>
            <a href="#work" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
              Explore work <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* About with developer ID card */}
      <section id="about" className="relative overflow-hidden border-t pt-16">
        <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-12 px-6 pb-16 md:grid-cols-[1.1fr_auto_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
            <h2 className="font-display text-5xl font-bold leading-none md:text-6xl">
              Hi, I'm <span className="font-normal italic text-primary">Francis.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              I build scalable web apps with <span className="font-medium text-foreground">React, Python, MongoDB and SQL</span>, and love weaving in blockchain and machine learning. Active in tech communities and event leadership — currently exploring AI system security and Linux.
            </p>
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
                <div className="mt-4 grid grid-cols-2 gap-1 text-[10px]">
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
                ["Focus", "MERN · AI · Web Development"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">The periodic table of me</h2>
        <p className="mt-2 text-muted-foreground">Hover a group to light it up. Click a tile to see its logo.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onMouseEnter={() => setActive(c)} onMouseLeave={() => setActive(null)} onClick={() => setActive(active === c ? null : c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${active === c ? "bg-foreground text-background" : "bg-card"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {skills.map((k, i) => (
              <button key={k.n} type="button" onClick={() => setSelected(selected?.n === k.n ? null : k)}
                className={`aspect-square rounded-xl p-3 text-left shadow-sm transition duration-300 hover:-translate-y-1 ${tone[k.c]} ${active && active !== k.c ? "opacity-20" : ""} ${selected?.n === k.n ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}>
                <div className="text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display text-3xl font-bold">{k.s}</div>
                <div className="truncate text-xs opacity-75">{k.n}</div>
              </button>
            ))}
          </div>
          <div className="hidden h-fit rounded-2xl border bg-card p-6 text-center lg:block">
            {selected ? (
              <>
                {selected.logo ? (
                  <img src={selected.logo} alt={`${selected.n} logo`} className="mx-auto h-32 w-32" />
                ) : (
                  <Network className="mx-auto h-32 w-32 text-primary" />
                )}
                <p className="mt-4 font-display text-xl font-bold">{selected.n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{selected.c}</p>
              </>
            ) : (
              <>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-tile-soft font-display text-2xl font-bold text-muted-foreground">?</div>
                <p className="mt-4 text-sm text-muted-foreground">Click any skill to see its logo</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Selected work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a key={p.t} href={p.h} target="_blank" rel="noreferrer" className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-full bg-tile-soft px-3 py-1 text-xs">{p.tag}</span>
              <h3 className="mt-4 flex items-center gap-2 font-display text-2xl font-bold">{p.t} <ArrowUpRight className="h-4 w-4 text-muted-foreground" /></h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.p}</p>
            </a>
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
            <p className="mt-1 text-sm opacity-80">Christ College of Engineering, Thrissur · 72.5%</p>
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
