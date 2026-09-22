import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Gift,
  Image as ImageIcon,
  Menu,
  Minus,
  Package,
  Palette,
  PawPrint,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  UploadCloud,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Konfigurator figurki 3D | prezent3d.com" },
      { name: "description", content: "Skonfiguruj własną, personalizowaną figurkę 3D na podstawie zdjęć." },
      { property: "og:title", content: "Stwórz swoją figurkę 3D | prezent3d.com" },
      { property: "og:description", content: "Wybierz liczbę postaci, rozmiar, wykończenie i dodatki do swojej figurki 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OfferPage,
});

type IconType = ComponentType<{ className?: string }>;
type ImageSide = "left" | "right";

const progressSteps = ["Liczba osób / zwierząt", "Rozmiar", "Wykończenie", "Podstawka", "Dodatki", "Zdjęcia i zamówienie"];

const subjectOptions: { id: string; title: string; text: string; icon: IconType; priceLabel: string; imageSide: ImageSide; recommended?: boolean }[] = [
  { id: "person", title: "Osoba", text: "Figurka jednej lub więcej osób.", icon: UserRound, priceLabel: "220 zł za 1. osobę\nkażda kolejna + 80 zł", imageSide: "right", recommended: true },
  { id: "animal", title: "Zwierzę", text: "Figurka zwierzęcia lub więcej zwierząt.", icon: PawPrint, priceLabel: "80 zł za zwierzę", imageSide: "right" },
  { id: "custom", title: "Dodaj własny\nelement", text: "Przedmiot, pojazd lub inny element.", icon: Plus, priceLabel: "+ 40 zł", imageSide: "right" },
];

const sizes: { id: string; title: string; text: string; price: number; imageSide: ImageSide; recommended?: boolean }[] = [
  { id: "15", title: "15 cm", text: "Mała figurka", price: 0, imageSide: "left" },
  { id: "20", title: "20 cm", text: "Większa forma", price: 60, imageSide: "left", recommended: true },
  { id: "25", title: "25 cm", text: "Najbardziej efektowny", price: 100, imageSide: "left" },
];

const finishes: { id: string; title: string; text: string; price: number; imageSide: ImageSide; recommended?: boolean }[] = [
  { id: "single", title: "Figurka jednokolorowa", text: "Jeden kolor materiału lub wykończenia.", price: 0, imageSide: "left" },
  { id: "painted", title: "Figurka ręcznie malowana", text: "Ręczne malowanie detali.", price: 120, imageSide: "left", recommended: true },
];

const bases: { id: string; title: string; text: string; price: number; imageSide: ImageSide; recommended?: boolean }[] = [
  { id: "standard", title: "Standardowa", text: "Wliczona w cenę", price: 0, imageSide: "left", recommended: true },
  { id: "personalized", title: "Personalizowana", text: "Imię, data lub napis.", price: 40, imageSide: "left" },
  { id: "none", title: "Bez podstawki", text: "Bez dodatkowych kosztów", price: 0, imageSide: "left" },
];

const packages: { id: string; title: string; text: string; price: number; imageSide: ImageSide; recommended?: boolean }[] = [
  { id: "standard", title: "Standardowe", text: "Wliczone w cenę", price: 0, imageSide: "left" },
  { id: "gift", title: "Pudełko prezentowe", text: "Eleganckie opakowanie gotowe do wręczenia.", price: 25, imageSide: "left", recommended: true },
];

const navLinkHover = "transition-colors duration-200 hover:text-primary/70 focus-visible:text-primary/70 focus-visible:outline-none";

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="prezent3d.com — strona główna">
      <img src={logoAsset.url} alt="prezent3d.com" className="h-9 w-auto" />
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card">
      <div className="section-shell grid h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5">
        <Logo />
        <nav className="hidden items-center justify-center gap-6 text-[12px] font-semibold text-foreground lg:flex" aria-label="Główna nawigacja">
          <Link to="/" className={navLinkHover}>Strona główna</Link>
          <Link to="/oferta" className="border-b-2 border-primary py-6 text-primary">Oferta⌄</Link>
          <Link to="/" hash="realizacje" className={navLinkHover}>Galeria</Link>
          <Link to="/" hash="proces" className={navLinkHover}>Jak to działa?</Link>
          <a href="#podsumowanie" className={navLinkHover}>Cennik</a>
          <a href="#" className={navLinkHover}>FAQ</a>
          <Link to="/" hash="kontakt" className={navLinkHover}>Kontakt</Link>
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Search className="size-4" aria-hidden="true" />
          <UserRound className="size-4" aria-hidden="true" />
          <ShoppingCart className="size-4" aria-hidden="true" />
          <Button variant="hero" size="default">Stwórz swoją figurkę <ArrowRight /></Button>
        </div>
        <Menu className="size-6 lg:hidden" aria-label="Otwórz menu" />
      </div>
    </header>
  );
}

function StepHeading({ number, title, subtitle, active }: { number: number; title: string; subtitle: string; active: boolean }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-extrabold transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"}`}>{number}</span>
      <div><h2 className="text-base font-extrabold">{title}</h2><p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p></div>
    </div>
  );
}

function ImageSlot({ image, side, className = "" }: { image?: string | undefined; side: ImageSide; className?: string }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-md bg-muted ${className}`}
      style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: side === "left" ? "center left" : "center right" } : undefined}
      aria-hidden="true"
    >
      {!image && <ImageIcon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/50" />}
    </span>
  );
}

function RecommendedBadge({ className }: { className: string }) {
  return (
    <span className={`absolute left-[5px] top-[3px] z-10 inline-flex h-5 min-w-[76px] items-center justify-center gap-1.5 rounded-full px-2.5 text-[10px] font-extrabold uppercase leading-none tracking-wider ${className}`}>
      <Star className="!size-3 shrink-0 fill-current" />
      <span>Polecam</span>
    </span>
  );
}

function ChoiceCard({ selected, stepActive, locked, onClick, icon: Icon, title, text, price, priceLabel, priceViolet, counter, minCount, onIncrement, onDecrement, image, imageSide, imageClassName, recommended, recommendedTone, textInput }: {
  selected: boolean;
  stepActive: boolean;
  locked?: boolean;
  onClick: () => void;
  icon?: IconType;
  title: string;
  text: string;
  price?: number;
  priceLabel?: string;
  priceViolet?: boolean;
  counter?: number | undefined;
  minCount?: number | undefined;
  onIncrement?: (() => void) | undefined;
  onDecrement?: (() => void) | undefined;
  image?: string | undefined;
  imageSide: ImageSide;
  imageClassName?: string | undefined;
  recommended?: boolean;
  recommendedTone?: "light-gray" | "dark-gray" | "purple" | undefined;
  textInput?: { value: string; placeholder: string; onChange: (value: string) => void; onCommit: () => void; onEdit: () => void; onCancel: () => void; committed: boolean; buttonLabel: string } | undefined;
}) {
  const recommendedClasses =
    recommendedTone === "light-gray" ? "bg-muted/60 text-muted-foreground/70" :
    recommendedTone === "dark-gray" ? "bg-muted-foreground/45 text-card" :
    recommendedTone === "purple" ? "bg-primary text-primary-foreground" :
    selected ? "bg-primary text-primary-foreground" :
    "bg-muted-foreground/30 text-muted-foreground";
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleCommit = () => {
    if (textInput?.value.trim()) {
      textInput.onCommit();
    }
  };
  const slot = <ImageSlot image={image} side={imageSide} className={`h-full min-h-[108px] ${imageClassName ?? "w-[38%]"}`} />;
  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onClick(); } }}
      className={`group relative flex min-h-[144px] w-full flex-row items-stretch justify-start gap-4 overflow-hidden whitespace-normal rounded-md border p-3.5 text-left text-sm font-medium shadow-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${locked ? "cursor-default" : "cursor-pointer"} ${selected ? "border-primary bg-card ring-1 ring-primary" : stepActive ? "border-border bg-card" : "border-border/60 bg-muted/50 text-muted-foreground"}`}
    >
      {recommended && <RecommendedBadge className={recommendedClasses} />}
      {imageSide === "left" && slot}
      <div className={`relative flex min-w-0 flex-1 flex-col items-start pr-5 ${recommended ? "pb-1 pt-[10px]" : "py-1"}`}>
        <div className="flex items-start gap-2 text-sm font-extrabold leading-tight">{Icon && <Icon className="size-4 shrink-0 text-primary" />}<span className="whitespace-pre-line">{title}</span></div>
        <p className="mt-2 text-xs font-normal leading-5 text-muted-foreground">{text}</p>
        <span className={`mt-auto pt-3 text-xs font-bold ${priceViolet ? "text-primary" : ""} ${textInput ? "w-full text-center" : ""}`}>{(priceLabel ?? (price ? `+ ${price} zł` : "Cena podstawowa")).split("\n").map((line, index) => (
          <span key={index} className="block whitespace-nowrap">{line}</span>
        ))}</span>
        {counter !== undefined && onIncrement !== undefined && onDecrement !== undefined && (
          <span className="mt-3 inline-flex h-7 items-center overflow-hidden rounded border border-border bg-card">
            <button
              type="button"
              aria-label={`Zmniejsz liczbę: ${title}`}
              disabled={counter <= (minCount ?? 1)}
              onClick={(event) => { event.stopPropagation(); onDecrement(); }}
              className="grid h-full w-8 place-items-center text-primary transition-opacity disabled:opacity-40"
            >
              <Minus className="size-3" />
            </button>
            <span className="grid h-full w-8 place-items-center border-x border-border text-xs" aria-live="polite">{counter}</span>
            <button
              type="button"
              aria-label={`Zwiększ liczbę: ${title}`}
              onClick={(event) => { event.stopPropagation(); onIncrement(); }}
              className="grid h-full w-8 place-items-center text-primary"
            >
              <Plus className="size-3" />
            </button>
          </span>
        )}
        {textInput && !textInput.committed && !selected && (
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onClick(); }}
            className="mt-3 inline-flex h-7 w-full items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="size-3.5 shrink-0" />
            <span className="text-center leading-none">{textInput.buttonLabel}</span>
          </button>
        )}
        {textInput && !textInput.committed && selected && (
          <div className="mt-3 flex h-7 w-full gap-1">
            <input
              ref={inputRef}
              type="text"
              maxLength={40}
              autoFocus
              value={textInput.value}
              placeholder={textInput.placeholder}
              onChange={(event) => textInput.onChange(event.currentTarget.value)}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => {
                if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); handleCommit(); }
                else if (event.key === " ") { event.stopPropagation(); }
                else if (event.key === "Escape") { event.stopPropagation(); inputRef.current?.blur(); }
              }}
              onBlur={(event) => {
                if (textInput.committed) return;
                if (event.relatedTarget && containerRef.current?.contains(event.relatedTarget as Node)) return;
                if (textInput.value.trim()) textInput.onCommit();
                else textInput.onCancel();
              }}
              className="h-7 min-w-0 flex-1 rounded border border-border bg-card px-2 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="button"
              aria-label="Zatwierdź element"
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => { event.stopPropagation(); handleCommit(); }}
              className="grid h-7 w-7 shrink-0 place-items-center rounded border border-primary/30 bg-primary/10 text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
        {textInput && textInput.committed && (
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); textInput.onEdit(); }}
            className="mt-3 flex h-7 w-full items-center justify-between gap-1.5 rounded border border-primary/40 bg-primary/5 px-2 text-[11px] font-semibold text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="truncate text-left">{textInput.value}</span>
            <Check className="size-3.5 shrink-0 text-primary" />
          </button>
        )}
      </div>
      {imageSide === "right" && slot}
      <span className={`absolute right-3 top-3 size-4 rounded-full border ${selected ? "border-primary bg-primary ring-2 ring-card" : "border-border bg-card"}`} />
    </div>
  );
}

function CompactChoice({ selected, stepActive, onClick, title, text, price, image, imageSide, recommended, recommendedTone }: {
  selected: boolean; stepActive: boolean; onClick: () => void; title: string; text: string; price: number; image?: string | undefined; imageSide: ImageSide; recommended?: boolean; recommendedTone?: "light-gray" | "dark-gray" | "purple" | undefined;
}) {
  const recommendedClasses =
    recommendedTone === "light-gray" ? "bg-muted/60 text-muted-foreground/70" :
    recommendedTone === "dark-gray" ? "bg-muted-foreground/45 text-card" :
    recommendedTone === "purple" ? "bg-primary text-primary-foreground" :
    selected ? "bg-primary text-primary-foreground" :
    "bg-muted-foreground/30 text-muted-foreground";
  const slot = <ImageSlot image={image} side={imageSide} className="h-full w-[32%]" />;
  return (
    <Button type="button" variant="outline" onClick={onClick} className={`relative h-[100px] w-full flex-row items-stretch justify-start gap-3 overflow-hidden whitespace-normal rounded-md p-2.5 text-left shadow-none transition-colors ${selected ? "border-primary bg-card ring-1 ring-primary" : stepActive ? "border-border bg-card" : "border-border/60 bg-muted/50 text-muted-foreground"}`}>
      {recommended && <RecommendedBadge className={recommendedClasses} />}
      {imageSide === "left" && slot}
      <div className={`relative flex min-w-0 flex-1 flex-col justify-center pr-4 ${recommended ? "pb-1 pt-[10px]" : "py-1"}`}>
        <strong className="block text-xs text-primary">{title}</strong>
        <span className="mt-1 block text-[11px] text-muted-foreground">{text}</span>
        {price > 0 && <span className="mt-1 block text-[11px] font-bold">+ {price} zł</span>}
      </div>
      {imageSide === "right" && slot}
      <span className={`absolute right-3 top-3 size-4 rounded-full border ${selected ? "border-primary bg-primary ring-2 ring-card" : "border-border bg-card"}`} />
    </Button>
  );
}

function OfferPage() {
  const [subjects, setSubjects] = useState<string[]>(["person"]);
  const [personCount, setPersonCount] = useState(1);
  const [animalCount, setAnimalCount] = useState(0);
  const [customText, setCustomText] = useState("");
  const [customCommitted, setCustomCommitted] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [finish, setFinish] = useState<string | null>(null);
  const [base, setBase] = useState<string | null>(null);
  const [pack, setPack] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState(0);

  const selected = useMemo(() => ({
    size: sizes.find((item) => item.id === size),
    finish: finishes.find((item) => item.id === finish),
    base: bases.find((item) => item.id === base),
    pack: packages.find((item) => item.id === pack),
  }), [size, finish, base, pack]);

  const activeSteps: [boolean, boolean, boolean, boolean, boolean, boolean] = [subjects.length > 0, Boolean(size), Boolean(finish), Boolean(base), Boolean(pack), photoCount > 0];
  // A step lights up only once the previous one has been answered; until then it stays dimmed and unclickable.
  const readySteps: [boolean, boolean, boolean, boolean, boolean, boolean] = [true, subjects.length > 0, Boolean(size), Boolean(finish), Boolean(base), Boolean(pack)];

  const peoplePrice = 220 + 80 * (personCount - 1);
  const animalPrice = 80 * animalCount;
  const subjectPrice =
    (subjects.includes("person") ? peoplePrice : 0)
    + (subjects.includes("animal") ? animalPrice : 0)
    + (subjects.includes("custom") ? 40 : 0);
  const total = subjectPrice
    + (selected.size?.price ?? 0)
    + (selected.finish?.price ?? 0)
    + (selected.base?.price ?? 0)
    + (selected.pack?.price ?? 0);

  const subjectItems: { key: string; label: string; onRemove?: () => void }[] = [
    subjects.includes("person") ? { key: "person", label: `${personCount} ${personCount === 1 ? "osoba" : personCount < 5 ? "osoby" : "osób"}` } : null,
    subjects.includes("animal") && animalCount > 0
      ? { key: "animal", label: `${animalCount} ${animalCount === 1 ? "zwierzę" : "zwierzęta"}`, onRemove: () => { setAnimalCount(0); setSubjects((current) => current.filter((id) => id !== "animal")); } }
      : null,
    subjects.includes("custom") ? { key: "custom", label: customCommitted && customText.trim() ? customText.trim() : "Własny element", onRemove: () => { setCustomCommitted(false); setCustomText(""); setSubjects((current) => current.filter((id) => id !== "custom")); } } : null,
  ].filter(Boolean) as { key: string; label: string; onRemove?: () => void }[];

  // Only the deepest completed step can be cleared, so the step sequence stays intact.
  const lastFilledStep = pack ? 4 : base ? 3 : finish ? 2 : size ? 1 : 0;

  // Clearing a step also resets all later choices so the configuration stays consistent.
  const clearSize = () => { setSize(null); setFinish(null); setBase(null); setPack(null); };
  const clearFinish = () => { setFinish(null); setBase(null); setPack(null); };
  const clearBase = () => { setBase(null); setPack(null); };
  const clearPack = () => { setPack(null); };


  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section id="konfigurator" className="section-shell-wide py-7 lg:py-9">
        <p className="text-xs font-extrabold uppercase tracking-wide text-primary">Konfigurator</p>
        <h1 className="mt-2 text-[2rem] font-extrabold leading-tight lg:text-[2.7rem]">Stwórz swoją figurkę 3D</h1>
        <p className="mt-3 text-sm text-muted-foreground">Wybierz parametry swojej personalizowanej figurki. Każdy detal ma znaczenie.</p>

        <div className="mt-5 grid grid-cols-2 gap-y-3.5 border-b border-border pb-4 sm:grid-cols-3 lg:grid-cols-6">
          {progressSteps.map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full border text-[11px] font-bold transition-colors ${activeSteps[index] ? "border-primary bg-primary text-primary-foreground shadow" : "border-border bg-card text-foreground"}`}>{index + 1}</span>
              <span className={`shrink-0 text-[11px] font-semibold transition-colors ${activeSteps[index] ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              {index < progressSteps.length - 1 && (
                <span
                  className={`ml-px mr-px block h-px flex-1 bg-border ${index === 1 || index === 3 ? "hidden sm:block" : ""} ${index === 2 ? "sm:hidden lg:block" : ""}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(380px,1fr)]">
          <div className="overflow-hidden rounded-md border border-border bg-card">
            <section className="p-5">
              <StepHeading number={1} title="Kogo ma przedstawiać figurka?" subtitle="Wybierz, kto znajdzie się na figurce." active={activeSteps[0]} />
              <div className="grid gap-3.5 md:grid-cols-3">
                {subjectOptions.map((item) => (
                  <ChoiceCard
                    key={item.id}
                    {...item}
                    priceViolet={item.id === "person"}
                    stepActive={activeSteps[0]}
                    selected={item.id === "animal" ? subjects.includes("animal") && animalCount > 0 : subjects.includes(item.id)}
                    locked={item.id === "person"}
                    imageClassName={item.id === "custom" ? "w-[22%]" : undefined}
                    counter={item.id === "person" ? personCount : item.id === "animal" ? animalCount : undefined}
                    textInput={item.id === "custom" ? {
                      value: customText,
                      placeholder: "Wpisz element",
                      onChange: setCustomText,
                      committed: customCommitted,
                      onCommit: () => { if (customText.trim()) { setCustomCommitted(true); setSubjects((current) => current.includes("custom") ? current : [...current, "custom"]); } },
                      onEdit: () => setCustomCommitted(false),
                      onCancel: () => { setCustomText(""); setCustomCommitted(false); setSubjects((current) => current.filter((id) => id !== "custom")); },
                      buttonLabel: "Dodaj własny element",
                    } : undefined}
                    minCount={item.id === "animal" ? 0 : undefined}
                    onIncrement={
                      item.id === "person"
                        ? () => { setPersonCount((current) => current + 1); setSubjects((current) => current.includes("person") ? current : [...current, "person"]); }
                        : item.id === "animal"
                          ? () => { setAnimalCount((current) => current + 1); setSubjects((current) => current.includes("animal") ? current : [...current, "animal"]); }
                          : undefined
                    }
                    onDecrement={
                      item.id === "person"
                        ? () => setPersonCount((current) => Math.max(1, current - 1))
                        : item.id === "animal"
                          ? () => {
                              if (animalCount <= 1) {
                                setAnimalCount(0);
                                setSubjects((current) => current.filter((id) => id !== "animal"));
                              } else {
                                setAnimalCount((current) => current - 1);
                              }
                            }
                          : undefined
                    }
                    onClick={() => setSubjects((current) => {
                      if (item.id === "person") return current.includes("person") ? current : [...current, "person"];
                      if (item.id === "animal") {
                        if (animalCount === 0) { setAnimalCount(1); return current.includes("animal") ? current : [...current, "animal"]; }
                        if (current.includes("animal")) { setAnimalCount(0); return current.filter((id) => id !== "animal"); }
                        return [...current, "animal"];
                      }
                      if (item.id === "custom") {
                        if (customCommitted) { setCustomCommitted(false); return current; }
                        if (current.includes("custom")) { setCustomText(""); return current.filter((id) => id !== "custom"); }
                        return [...current, "custom"];
                      }
                      return current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id];
                    })}
                  />
                ))}
              </div>
            </section>

            <section className={`border-t border-border p-5 transition-all duration-300 ${readySteps[1] ? "bg-card" : "bg-muted/40 opacity-60 saturate-50 pointer-events-none select-none"}`}>
              <StepHeading number={2} title="Rozmiar figurki" subtitle="Wybierz wysokość całej figurki (z podstawką)." active={activeSteps[1] && readySteps[1]} />
              <div className="grid gap-3.5 sm:grid-cols-3">
                {sizes.map((item) => (
                  <ChoiceCard
                    key={item.id}
                    {...item}
                    stepActive={activeSteps[1] && readySteps[1]}
                    selected={size === item.id}
                    onClick={() => size === item.id ? (lastFilledStep === 1 ? clearSize() : undefined) : setSize(item.id)}
                  />
                ))}
              </div>
            </section>

            <section className={`border-t border-border p-5 transition-all duration-300 ${readySteps[2] ? "bg-card" : "bg-muted/40 opacity-60 saturate-50 pointer-events-none select-none"}`}>
              <StepHeading number={3} title="Wykończenie" subtitle="Wybierz sposób wykończenia swojej figurki." active={activeSteps[2] && readySteps[2]} />
              <div className="grid gap-3.5 sm:grid-cols-2">
                {finishes.map((item) => {
                  const finishRecommendedTone = lastFilledStep === 0 ? "light-gray" : lastFilledStep === 1 ? "dark-gray" : "purple";
                  return (
                    <ChoiceCard
                      key={item.id}
                      {...item}
                      stepActive={activeSteps[2] && readySteps[2]}
                      selected={finish === item.id}
                      recommendedTone={item.id === "painted" ? finishRecommendedTone : undefined}
                      onClick={() => finish === item.id ? (lastFilledStep === 2 ? clearFinish() : undefined) : setFinish(item.id)}
                    />
                  );
                })}
              </div>
            </section>

            <section className={`border-t border-border p-5 transition-all duration-300 ${readySteps[3] ? "bg-card" : "bg-muted/40 opacity-60 saturate-50 pointer-events-none select-none"}`}>
              <StepHeading number={4} title="Podstawka" subtitle="Wybierz rodzaj podstawki." active={activeSteps[3] && readySteps[3]} />
              <div className="grid gap-3.5 sm:grid-cols-3">
                {bases.map((item) => {
                  const baseRecommendedTone = lastFilledStep < 2 ? "light-gray" : lastFilledStep === 2 ? "dark-gray" : "purple";
                  return (
                    <CompactChoice
                      key={item.id}
                      {...item}
                      stepActive={activeSteps[3] && readySteps[3]}
                      selected={base === item.id}
                      recommendedTone={item.id === "standard" ? baseRecommendedTone : undefined}
                      onClick={() => base === item.id ? (lastFilledStep === 3 ? clearBase() : undefined) : setBase(item.id)}
                    />
                  );
                })}
              </div>
            </section>

            <section className={`border-t border-border p-5 transition-all duration-300 ${readySteps[4] ? "bg-card" : "bg-muted/40 opacity-60 saturate-50 pointer-events-none select-none"}`}>
              <StepHeading number={5} title="Opakowanie" subtitle="Wybierz sposób zapakowania figurki." active={activeSteps[4] && readySteps[4]} />
              <div className="grid gap-3.5 sm:grid-cols-2">
                {packages.map((item) => {
                  const packRecommendedTone = lastFilledStep < 3 ? "light-gray" : lastFilledStep === 3 ? "dark-gray" : "purple";
                  return (
                    <CompactChoice
                      key={item.id}
                      {...item}
                      stepActive={activeSteps[4] && readySteps[4]}
                      selected={pack === item.id}
                      recommendedTone={item.id === "gift" ? packRecommendedTone : undefined}
                      onClick={() => pack === item.id ? (lastFilledStep === 4 ? clearPack() : undefined) : setPack(item.id)}
                    />
                  );
                })}
              </div>
            </section>

            <section id="zdjecia" className={`border-t border-border p-5 transition-all duration-300 ${readySteps[5] ? "bg-card" : "bg-muted/40 opacity-60 saturate-50 pointer-events-none select-none"}`}>
              <StepHeading number={6} title="Zdjęcia" subtitle="Prześlij zdjęcia, na podstawie których wykonamy model 3D." active={activeSteps[5] && readySteps[5]} />
              <div className="grid gap-3.5 md:grid-cols-[1.45fr_.8fr]">
                <label className={`flex min-h-[126px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-center transition-colors ${activeSteps[5] && readySteps[5] ? "border-primary/50 bg-secondary/30" : "border-border bg-muted/50"}`}>
                  <input type="file" accept="image/jpeg,image/png" multiple className="sr-only" onChange={(event) => setPhotoCount(event.currentTarget.files?.length ?? 0)} />
                  <UploadCloud className="size-7 text-primary" />
                  <span className="mt-2 text-xs font-semibold">Przeciągnij i upuść zdjęcia lub <span className="text-primary">wybierz pliki</span></span>
                  <span className="mt-1 text-[11px] text-muted-foreground">JPG, PNG (maks. 10 MB)</span>
                </label>
                <div className="rounded-md bg-muted/60 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold"><Sparkles className="size-4 text-primary" /> Wskazówki:</p>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-muted-foreground">
                    {["Zdjęcia z różnych stron", "Dobre oświetlenie", "Bez filtrów i efektów"].map((tip) => <li key={tip} className="flex items-center gap-2"><Check className="size-3 text-primary" />{tip}</li>)}
                  </ul>
                  <a href="#zdjecia" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">Zobacz przykłady zdjęć <ArrowRight className="size-3" /></a>
                </div>
              </div>
            </section>
          </div>

          <aside className="rounded-md border border-border bg-card p-5 xl:sticky xl:top-4">
            <div className="grid grid-cols-[1fr_58px] gap-3">
              <div className="aspect-[1.12] rounded-md bg-muted" aria-label="Miejsce na podgląd figurki" />
              <div className="grid grid-rows-4 gap-2">
                {[1, 2, 3, 4].map((item) => <Button key={item} type="button" variant="outline" className={`h-auto min-h-0 w-full rounded-md bg-muted p-0 shadow-none ${item === 1 ? "border-primary ring-1 ring-primary" : "border-transparent"}`} aria-label={`Widok figurki ${item}`} />)}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 rounded-md bg-muted p-1 text-[11px] font-semibold">
              <Button type="button" variant="outline" className="h-8 bg-card px-2 text-[11px] text-primary shadow-none">Widok z przodu</Button>
              <Button type="button" variant="ghost" className="h-8 px-2 text-[11px]">Widok z boku</Button>
              <Button type="button" variant="ghost" className="h-8 px-2 text-[11px]">Widok z tyłu</Button>
            </div>
            <Button type="button" variant="outline" size="sm" className="mx-auto mt-3 flex border-border text-[11px] text-primary shadow-none"><Search className="size-3" /> Powiększ</Button>

            <div id="podsumowanie" className="mt-4 overflow-hidden rounded-md border border-border">
              <h2 className="px-4 pb-2 pt-4 text-sm font-extrabold">Podsumowanie konfiguracji</h2>
              <SummaryRow icon={UsersRound} label="Liczba osób / zwierząt" items={subjectItems} removable={lastFilledStep === 0} price={subjectPrice > 0 ? subjectPrice : undefined} />
              <SummaryRow icon={Clock3} label="Rozmiar" value={selected.size?.title} price={selected.size?.price} removable={lastFilledStep === 1} onRemove={clearSize} />
              <SummaryRow icon={Palette} label="Wykończenie" value={selected.finish?.title} price={selected.finish?.price} removable={lastFilledStep === 2} onRemove={clearFinish} />
              <SummaryRow icon={CircleCheck} label="Podstawka" value={selected.base?.title} price={selected.base?.price} removable={lastFilledStep === 3} onRemove={clearBase} />
              <SummaryRow icon={Gift} label="Dodatki" value={selected.pack?.title} price={selected.pack?.price} removable={lastFilledStep === 4} onRemove={clearPack} />
              <div className="mt-1 flex items-end justify-between bg-secondary/70 px-4 py-4">
                <div><strong className="text-sm">Łączna cena</strong><p className="mt-1 text-[10px] text-muted-foreground">Cena może ulec zmianie po weryfikacji zdjęć.</p></div>
                <strong className="text-[2rem] font-extrabold text-primary">{total} zł</strong>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary"><Package className="size-4" /> Darmowa wysyłka od 299 zł</p>
            <Button type="button" className="mt-3 h-12 w-full text-sm">Przejdź dalej <ArrowRight /></Button>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({ icon: Icon, label, value, price, items, removable, onRemove }: {
  icon: IconType;
  label: string;
  value?: string | undefined;
  price?: number | undefined;
  items?: { key: string; label: string; onRemove?: (() => void) | undefined }[] | undefined;
  removable?: boolean;
  onRemove?: (() => void) | undefined;
}) {
  const chipClass = "inline-flex items-center gap-1 rounded-full border border-primary/40 bg-secondary/60 px-2 py-0.5 font-bold text-foreground transition-colors hover:border-primary hover:bg-secondary";
  return (
    <div className="flex min-h-11 items-center gap-2 border-t border-border/70 px-4 text-[11px]">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="w-32 shrink-0 whitespace-nowrap text-muted-foreground">{label}</span>
      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1 gap-y-0.5 leading-snug">
        {items ? (
          <>
            {items.length === 0 && <strong className="text-muted-foreground">Nie wybrano</strong>}
            {items.map((item) => (
              removable && item.onRemove ? (
                <button key={item.key} type="button" onClick={item.onRemove} aria-label={`Usuń: ${item.label}`} className={`${chipClass} max-w-full min-w-0 cursor-pointer`}>
                  <span className="min-w-0 truncate">{item.label}</span><X className="size-3 shrink-0" />
                </button>
              ) : (
                <strong key={item.key} className="max-w-full min-w-0 truncate">{item.label}</strong>
              )
            ))}
          </>
        ) : removable && value && onRemove ? (
          <button type="button" onClick={onRemove} aria-label={`Usuń: ${value}`} className={`${chipClass} max-w-full min-w-0 cursor-pointer`}>
            <span className="min-w-0 truncate">{value}</span><X className="size-3 shrink-0" />
          </button>
        ) : (
          <strong className={`min-w-0 truncate ${value ? "" : "text-muted-foreground"}`}>{value ?? "Nie wybrano"}</strong>
        )}
      </span>
      <span className={`shrink-0 whitespace-nowrap ${price !== undefined && price > 0 ? "font-bold text-primary" : "text-muted-foreground"}`}>{price === undefined ? "—" : price > 0 ? `+ ${price} zł` : "Cena podstawowa"}</span>
    </div>
  );
}
