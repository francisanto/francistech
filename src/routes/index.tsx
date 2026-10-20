import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Network,
  Play,
  Square,
  Download,
  Award,
  Rocket,
  Trophy,
  FileText,
  ExternalLink,
  Maximize2,
  X,
  Volume2,
  Send,
  CheckCircle,
  MessageSquareQuote,
  Plus,
} from "lucide-react";
import { getReviews, addReview, type ReviewItem } from "@/lib/supabase";
import francis from "@/assets/francis-formal.png";
import francisPortrait from "@/assets/francis-portrait.jpg";
import bnbSpotlight from "@/assets/achievements/bnb-hack-spotlight.jpg";
import codeExcom from "@/assets/achievements/code-excom-2024.jpg";
import ideaFest from "@/assets/achievements/ksum-idea-fest-funding.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Francis Anto — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Francis Anto, full stack developer from Thrissur building with MERN, AI, and blockchain technologies.",
      },
      { property: "og:title", content: "Francis Anto — Full Stack Developer" },
      {
        property: "og:description",
        content: "MERN, AI and Web3 development projects and achievements by Francis Anto.",
      },
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
  {
    t: "Concordia",
    h: "https://github.com/francisanto/coincordia",
    tag: "Blockchain · opBNB",
    p: "Collaborative decentralized platform for goal tracking, team coordination, and shared fund management. Integrated smart contracts on the opBNB Testnet with MetaMask — recognized during the BNB Hack.",
  },
  {
    t: "PA System Classifier",
    h: "https://github.com/francisanto/CaptaNet",
    tag: "AI · Linux Hotspot",
    p: "Real-time voice announcement classification system for emergency alerts and public announcements using WhisperX. Deployed via Linux hostapd hotspot and captive portal infrastructure.",
  },
  {
    t: "Emotion & Relationship Classifier",
    h: "https://github.com/francisanto/Emotion_detection",
    tag: "Multimodal AI",
    p: "BERT-based NLP models + speech features to classify human emotions and identify relationship patterns from chat conversations, with MySQL database storage and multimodal analytics.",
  },
  {
    t: "Repa",
    h: "https://github.com/francisanto/Repa",
    tag: "AI · EdTech",
    p: "AI-driven class management platform with student verification, Razorpay payments, OCR-based timetable extraction, and printable leave/permission letters.",
  },
  {
    t: "InANOut",
    h: "https://github.com/francisanto/inanout",
    tag: "FinTech",
    p: "Fund management system with lending and borrowing across groups, GPay-style expense splitting, plus income tracking.",
  },
];

const nav = [
  "About",
  "Skills",
  "Work",
  "Experience",
  "Education",
  "Milestones",
  "Reviews",
  "Contact",
];

const INTRO =
  "Hi, I am Francis, a full stack developer from Thrissur, Kerala. I build scalable web apps with React, Python, MongoDB, and SQL, and I love weaving in blockchain and machine learning. Currently I am exploring AI system security and Linux.";

interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  description: string;
  image: string;
  aspect: string;
  icon: typeof Rocket;
  stats: string;
}

const milestones: Milestone[] = [
  {
    id: "bnb-hack",
    title: "BNB Hack Builders Spotlight",
    subtitle: "Key Milestones of Past Awardees · Concordia",
    tag: "Web3 · opBNB",
    tagColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    description:
      "Concordia (user-friendly group savings dApp built on opBNB) was officially selected and featured in the BNB Hack Builders Spotlight celebrating key milestones of past awardees.",
    image: bnbSpotlight,
    aspect: "aspect-[16/10]",
    icon: Rocket,
    stats: "opBNB Spotlight",
  },
  {
    id: "idea-fest",
    title: "₹35,000 IDEA FEST Grant",
    subtitle: "Team White Tie · Kerala Startup Mission (KSUM)",
    tag: "Govt of Kerala Grant",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    description:
      "Congratulations to Team White Tie (Francis Anto, S4 CSE-A) for securing ₹35,000 in prototype grant funding under IDEA FEST by the Kerala Startup Mission (KSUM) at Christ College of Engineering.",
    image: ideaFest,
    aspect: "aspect-[16/10]",
    icon: Trophy,
    stats: "₹35,000 Grant",
  },
  {
    id: "code-excom",
    title: "CODE EXCOM 2024–25",
    subtitle: "Event Co-ordinator · Department of CSE, CCE",
    tag: "Leadership · Student Body",
    tagColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    description:
      "Elected Event Co-ordinator for the Department of Computer Science & Engineering association (CODE) Executive Committee 2024–25 at Christ College of Engineering, orchestrating tech fests and coding events.",
    image: codeExcom,
    aspect: "aspect-[16/10]",
    icon: Award,
    stats: "Event Co-ordinator",
  },
];

function Index() {
  const [active, setActive] = useState<Cat | null>(null);
  const [selected, setSelected] = useState<(typeof skills)[number] | null>(skills[0] || null);
  const [speaking, setSpeaking] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  // Reviews & Feedback state (empty initially, connects to Supabase)
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveTimer = useRef<number | null>(null);

  // Fetch reviews on mount
  useEffect(() => {
    getReviews().then((items) => {
      setReviewsList(items);
    });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    setSubmittingReview(true);
    const res = await addReview({
      name: reviewName.trim(),
      email: reviewEmail.trim(),
      review: reviewText.trim(),
    });
    setSubmittingReview(false);
    if (res.success) {
      setReviewSuccess(true);
      const updated = await getReviews();
      setReviewsList(updated);
      setReviewName("");
      setReviewEmail("");
      setReviewText("");
      setTimeout(() => {
        setReviewSuccess(false);
        setShowReviewModal(false);
      }, 1500);
    }
  };

  // Close modals with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMilestone(null);
        setShowReviewModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (keepAliveTimer.current) {
        clearInterval(keepAliveTimer.current);
      }
    };
  }, []);

  const stopVoice = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (keepAliveTimer.current) {
      clearInterval(keepAliveTimer.current);
      keepAliveTimer.current = null;
    }
    utteranceRef.current = null;
    setSpeaking(false);
  };

  const toggleVoice = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on your browser.");
      return;
    }

    if (speaking) {
      stopVoice();
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(INTRO);
    utteranceRef.current = utter; // Retain reference to prevent garbage collection

    const voices = synth.getVoices();

    const isFemale = (name: string) =>
      /female|woman|zira|samantha|victoria|karen|moira|fiona|tessa|veena|neerja|heera|sangeeta|hazel|susan|catherine|linda|stephanie|alice|alva|amelie|anna|ellen|helena|ioana|joana|katja|kyoko|lekha|luciana|milena|monica|nora|paulina|sara|satu|sin-ji|ting-ting|yuna|yuri|zoe/i.test(
        name,
      );

    const isExplicitMale = (name: string) =>
      /male|man|rishi|ravi|prabhat|aarav|david|daniel|george|alex|fred|james|oliver|arthur|guy|tom|aaron|mark|brian|john|paul|richard|charles|edward/i.test(
        name,
      );

    // Prioritize natural male voice only
    const indianMale = voices.find(
      (v) => /^en[-_]IN/i.test(v.lang) && isExplicitMale(v.name) && !isFemale(v.name),
    );
    const englishMale = voices.find(
      (v) => /^en/i.test(v.lang) && isExplicitMale(v.name) && !isFemale(v.name),
    );
    const fallbackMale = voices.find((v) => /^en/i.test(v.lang) && !isFemale(v.name));

    const selectedVoice = indianMale || englishMale || fallbackMale;
    if (selectedVoice) {
      utter.voice = selectedVoice;
    }

    utter.pitch = 0.88; // Confident male tone
    utter.rate = 0.96;

    utter.onstart = () => {
      setSpeaking(true);
    };

    utter.onend = () => {
      setSpeaking(false);
      utteranceRef.current = null;
      if (keepAliveTimer.current) {
        clearInterval(keepAliveTimer.current);
        keepAliveTimer.current = null;
      }
    };

    utter.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("Speech synthesis notice:", e);
      }
      setSpeaking(false);
      utteranceRef.current = null;
      if (keepAliveTimer.current) {
        clearInterval(keepAliveTimer.current);
        keepAliveTimer.current = null;
      }
    };

    // Chromium keepalive workaround for long utterances (>15s)
    if (keepAliveTimer.current) clearInterval(keepAliveTimer.current);
    keepAliveTimer.current = window.setInterval(() => {
      if (!synth.speaking) {
        clearInterval(keepAliveTimer.current!);
        keepAliveTimer.current = null;
      } else {
        synth.pause();
        synth.resume();
      }
    }, 10000);

    synth.speak(utter);
    synth.resume();
    setSpeaking(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display font-bold tracking-tight">
            Francis Anto
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
              {nav.map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  className="transition hover:text-foreground"
                >
                  {n}
                </a>
              ))}
            </nav>
            <a
              href="/downloads/francis-anto-resume.pdf"
              download="Francis-Anto-Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 hover:shadow-md hover:scale-105"
              title="Download Francis Anto's Resume PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden pt-20">
        <h1
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-24 select-none text-center font-display text-[22vw] font-bold leading-none tracking-tighter text-foreground/[0.05]"
        >
          FRANCIS
        </h1>
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-end gap-6 px-6 md:grid-cols-[1.1fr_auto_1fr]">
          <div className="pb-16 md:pb-24">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Francis Anto · Portfolio
            </p>
            <h2 className="font-display text-5xl font-bold leading-[0.95] text-primary md:text-7xl">
              Full Stack
              <br />
              Developer.
            </h2>
            <p className="mt-4 text-muted-foreground">
              MERN · AI & Machine Learning · Web3 / Blockchain
            </p>

            {/* Hero Action Group */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleVoice}
                className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 ${
                  speaking
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse"
                    : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
                }`}
                aria-label={speaking ? "Stop voice intro" : "Play voice intro"}
                title={speaking ? "Stop voice intro" : "Play voice intro"}
              >
                {speaking ? (
                  <Square className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                )}
              </button>

              <a
                href="/downloads/francis-anto-resume.pdf"
                download="Francis-Anto-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <Download className="h-4 w-4 text-primary" />
                <span>Download Resume</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-10">
              {[
                ["1+", "Year developer experience"],
                ["13+", "Projects completed"],
                ["2", "KSUM Idea Fest funding"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold text-primary">{v}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Model Centerpiece */}
          <div className="relative flex flex-col items-center justify-end">
            {speaking && (
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-[85%] w-[85%] animate-ping rounded-full bg-primary/10 duration-1000" />
                <div className="h-[95%] w-[95%] animate-pulse rounded-full bg-primary/15" />
              </div>
            )}
            <img
              src={francis}
              alt="Francis Anto AI Model"
              className={`mx-auto h-[70vh] max-h-[760px] w-auto object-contain transition-all duration-500 md:h-[85vh] animate-in fade-in slide-in-from-bottom-6 duration-700 ${
                speaking
                  ? "scale-[1.02] drop-shadow-[0_20px_50px_rgba(48,27,160,0.3)]"
                  : "drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              }`}
            />
          </div>

          <div className="hidden pb-24 text-right md:block">
            <p className="text-sm text-muted-foreground">Based in Thrissur, Kerala</p>
            <p className="text-xs text-muted-foreground/80 mt-1">Christ College of Engineering</p>
            <div className="mt-4 flex flex-col items-end gap-2.5">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Explore work <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#milestones"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
              >
                View verified milestones ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Subtitle Bar when AI Voice is Speaking */}
      {speaking && (
        <div className="fixed bottom-6 inset-x-4 z-50 mx-auto max-w-2xl animate-in slide-in-from-bottom-6 fade-in duration-300">
          <div className="rounded-2xl border bg-card/95 p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 pb-2 border-b">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Francis's Voice Introduction
                </p>
              </div>
              <button
                type="button"
                onClick={stopVoice}
                className="text-xs font-medium text-muted-foreground hover:text-foreground underline"
              >
                Stop intro
              </button>
            </div>
            <p className="mt-2.5 text-sm text-foreground/90 leading-relaxed font-sans italic">
              "{INTRO}"
            </p>
          </div>
        </div>
      )}

      {/* About with Developer ID Card */}
      <section id="about" className="relative overflow-hidden border-t pt-16">
        <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-12 px-6 pb-16 md:grid-cols-[1.1fr_auto_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
            <h2 className="font-display text-5xl font-bold leading-none md:text-6xl">
              Hi, I'm <span className="font-normal italic text-primary">Francis.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              I build scalable web apps with{" "}
              <span className="font-medium text-foreground">React, Python, MongoDB, and SQL</span>,
              and love weaving in blockchain and machine learning. Active in tech communities and
              event leadership — currently exploring AI system security and Linux.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90"
              >
                Explore work <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/downloads/francis-anto-resume.pdf"
                download="Francis-Anto-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 font-medium shadow-sm transition hover:border-primary"
              >
                <Download className="h-4 w-4 text-primary" /> Resume PDF
              </a>
              <a
                href="https://github.com/francisanto"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/francisantothottungal"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Lanyard Developer ID card with Real Photo */}
          <div className="mx-auto flex flex-col items-center animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="h-24 w-3 rounded-b bg-primary" />
            <div className="-mt-1 h-4 w-8 rounded-md border-2 border-muted-foreground/40 bg-card" />
            <div className="mt-1 w-64 origin-top rotate-[-3deg] overflow-hidden rounded-2xl border bg-card shadow-2xl transition duration-500 hover:rotate-0">
              <div className="flex items-center gap-2 bg-primary px-4 py-3 text-primary-foreground">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-foreground/15 text-[10px] font-bold">
                  FA
                </span>
                <div>
                  <p className="font-display text-xs font-bold tracking-wider">DEVELOPER ID</p>
                  <p className="text-[10px] opacity-70">Christ College of Engineering · 2026</p>
                </div>
              </div>
              <div className="p-4">
                <div className="mx-auto h-44 w-36 overflow-hidden rounded-xl border bg-tile-soft shadow-inner">
                  <img
                    src={francisPortrait}
                    alt="Francis Anto"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-center font-display font-bold tracking-wide">
                  FRANCIS ANTO
                </p>
                <p className="text-center text-xs text-muted-foreground">Full Stack Developer</p>
                <div className="mt-4 grid grid-cols-2 gap-1 text-[10px]">
                  <div>
                    <p className="text-muted-foreground">Dept</p>
                    <p className="font-medium">CSE (B.Tech)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Batch</p>
                    <p className="font-medium">2023 – 2027</p>
                  </div>
                </div>
                <div className="mt-3 h-6 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_2px,transparent_2px_4px,var(--foreground)_4px_5px,transparent_5px_8px)] opacity-80" />
              </div>
            </div>
          </div>

          <div className="text-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Quick facts
            </p>
            <dl className="divide-y border-y">
              {[
                ["Based in", "Thrissur, Kerala"],
                ["College", "Christ College of Engineering"],
                ["Studying", "B.Tech, CSE"],
                ["Batch", "2023 – 2027"],
                ["Focus", "MERN · AI & ML · Web3"],
                ["Email", "francisanto2022@gmail.com"],
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

      {/* Skills Periodic Table */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">The periodic table of me</h2>
        <p className="mt-2 text-muted-foreground">
          Hover a group to light it up. Click a tile to see its logo.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onMouseEnter={() => setActive(c)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === c ? null : c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active === c ? "bg-foreground text-background" : "bg-card"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {skills.map((k, i) => (
              <button
                key={k.n}
                type="button"
                onClick={() => setSelected(selected?.n === k.n ? null : k)}
                className={`aspect-square rounded-xl p-3 text-left shadow-sm transition duration-300 hover:-translate-y-1 ${
                  tone[k.c]
                } ${active && active !== k.c ? "opacity-20" : ""} ${
                  selected?.n === k.n
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : ""
                }`}
              >
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
                  <img
                    src={selected.logo}
                    alt={`${selected.n} logo`}
                    className="mx-auto h-32 w-32"
                  />
                ) : (
                  <Network className="mx-auto h-32 w-32 text-primary" />
                )}
                <p className="mt-4 font-display text-xl font-bold">{selected.n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {selected.c}
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-tile-soft font-display text-2xl font-bold text-muted-foreground">
                  ?
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Click any skill to see its logo
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-6xl">Selected work</h2>
            <p className="mt-2 text-muted-foreground">
              Production projects spanning Web3, Machine Learning, and Full Stack Platforms.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.t}
              href={p.h}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col justify-between rounded-2xl border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <span className="rounded-full bg-tile-soft px-3 py-1 text-xs font-medium">
                  {p.tag}
                </span>
                <h3 className="mt-4 flex items-center gap-2 font-display text-2xl font-bold">
                  {p.t} <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.p}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>View on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Experience</h2>
        <div className="mt-10 space-y-10 border-l pl-8">
          <div>
            <p className="text-xs text-muted-foreground">May 2026 – Aug 2026</p>
            <h3 className="font-display text-2xl font-bold">
              React Developer Intern · Ofside, Delhi
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Contributed to a sports management platform with match scoring, tournament management,
              authentication, and subscription functionality using React Native, NestJS, Node.js,
              and REST APIs. Debugged and resolved 250+ application issues; released on Google Play
              Store and Apple App Store.
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">May 2025 – Jun 2025</p>
            <h3 className="font-display text-2xl font-bold">
              Digital Marketing Intern · Mindenius, Bangalore
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Designed promotional posters, marketing materials, and webinar content to boost
              audience engagement. Handled student enquiries, coordinated meetings, and resolved
              queries.
            </p>
          </div>
        </div>
      </section>

      {/* Education & Resume Showcase */}
      <section id="education" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Education</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-tile p-6 text-tile-foreground shadow-sm">
            <p className="text-xs opacity-70">2023 – 2027</p>
            <h3 className="mt-2 font-display text-xl font-bold">
              B.Tech, Computer Science & Engineering
            </h3>
            <p className="mt-1 text-sm opacity-80">
              Christ College of Engineering, Thrissur · CGPA: 72.30%
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-xs text-muted-foreground">2020 – 2022</p>
            <h3 className="mt-2 font-display text-xl font-bold">Higher Secondary (Class XII)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Bharatiya Vidya Bhavan's Vidya Mandir, Thrissur · 87.6%
            </p>
          </div>
        </div>
      </section>

      {/* Milestones & Achievements with Photos */}
      <section id="milestones" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Recognition & Leadership
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              Achievements & Milestones
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified milestones, official recognitions, and funded initiatives. Click any card to
              view the full certificate and poster.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {milestones.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Milestone Image Container with zoom overlay */}
                <div
                  className={`relative w-full ${m.aspect} cursor-pointer overflow-hidden bg-muted`}
                  onClick={() => setSelectedMilestone(m)}
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition duration-300 group-hover:opacity-80" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md bg-background/85 ${m.tagColor}`}
                    >
                      <Icon className="h-3 w-3" />
                      {m.tag}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMilestone(m);
                    }}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/90"
                    title="Expand photo"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Expand Photo</span>
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {m.stats}
                    </p>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-bold tracking-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">{m.subtitle}</p>
                  <p className="mt-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedMilestone(m)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View full photo & verification</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievement Lightbox Modal */}
      {selectedMilestone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border bg-card shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <selectedMilestone.icon className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-foreground">
                    {selectedMilestone.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{selectedMilestone.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMilestone(null)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 max-h-[calc(92vh-130px)] flex flex-col items-center">
              <div className="w-full overflow-hidden rounded-xl border bg-black/5 shadow-inner flex items-center justify-center">
                <img
                  src={selectedMilestone.image}
                  alt={selectedMilestone.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="mt-4 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${selectedMilestone.tagColor}`}
                  >
                    {selectedMilestone.tag}
                  </span>
                  <a
                    href={selectedMilestone.image}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open full image in new tab
                  </a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {selectedMilestone.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews & Feedback Section */}
      <section id="reviews" className="mx-auto max-w-6xl px-6 py-16 border-t">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
              Reviews & Feedback
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Share Your Experience
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Have you collaborated with me? Leave a review and let others know about your
              experience working together.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Reviews Showcase */}
        {reviewsList.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 py-12 px-6 text-center backdrop-blur-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-3">
              <MessageSquareQuote className="h-6 w-6" />
            </div>
            <h4 className="font-display text-base font-bold text-foreground">No reviews yet</h4>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Be the first to share your experience collaborating with Francis. Ready to sync with
              your Supabase database.
            </p>
            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviewsList.map((item) => (
              <div
                key={item.id || item.created_at}
                className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm transition hover:border-primary/40 hover:-translate-y-0.5"
              >
                <p className="text-sm leading-relaxed text-foreground/90 italic">
                  “{item.review || item.message}”
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-3 text-xs">
                  <span className="font-semibold text-foreground">{item.name || item.author}</span>
                  <span className="text-muted-foreground">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recent"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Share Your Experience
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Leave a testimonial or feedback working with Francis
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/60 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/60 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience working with me..."
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/60 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-md transition hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{submittingReview ? "Submitting..." : "Submit Review"}</span>
                </button>
              </div>

              {reviewSuccess && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>
                    Thank you! Your review has been saved and will sync with your Supabase database.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Contact Section */}
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
              <a
                key={l}
                href={h}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-tile-foreground/20 px-5 py-3 hover:bg-tile-foreground/10 transition"
              >
                <I className="h-4 w-4" /> {l}
              </a>
            ))}
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-sm opacity-60">
            <MapPin className="h-4 w-4" /> Thrissur, Kerala · francisanto.me
          </p>
        </div>
      </section>
    </div>
  );
}
