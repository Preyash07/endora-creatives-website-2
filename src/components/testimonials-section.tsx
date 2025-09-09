"use client";

import * as React from "react";
import { ArrowBigRight, MessageSquareQuote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  company: string;
  project: string;
  avatarUrl?: string;
};

type LogoItem = {
  name: string;
};

export interface TestimonialsSectionProps {
  className?: string;
  style?: React.CSSProperties;
  testimonials?: Testimonial[];
  logos?: LogoItem[];
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Endora Creatives guided us through a deeply collaborative process. Their design system brought coherence to our entire product suite and accelerated our roadmap.",
    name: "Sofia Nguyen",
    company: "Atlas Analytics",
    project: "Design System & Web App",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote:
      "From early discovery to final launch, the team pushed our ideas further. The new brand and website have meaningfully elevated our story and conversion.",
    name: "Marcus Lee",
    company: "Northpeak Labs",
    project: "Brand & Website",
    avatarUrl:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote:
      "Their development craft is outstanding. Performance, accessibility, and maintainability were treated as first-class. It feels like a true long-term partnership.",
    name: "Emily Carter",
    company: "Horizon Collective",
    project: "Web App Development",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
  },
];

const DEFAULT_LOGOS: LogoItem[] = [
  { name: "Stripe" },
  { name: "Airbnb" },
  { name: "Notion" },
  { name: "Shopify" },
  { name: "Figma" },
  { name: "Slack" },
  { name: "Linear" },
  { name: "Intercom" },
];

export default function TestimonialsSection({
  className,
  style,
  testimonials = DEFAULT_TESTIMONIALS,
  logos = DEFAULT_LOGOS,
  autoPlay = true,
  autoPlayIntervalMs = 7000,
}: TestimonialsSectionProps) {
  const [index, setIndex] = React.useState(0);
  const count = testimonials.length;
  const hasMany = count > 1;

  const next = React.useCallback(() => {
    if (!hasMany) return;
    setIndex((i) => (i + 1) % count);
  }, [count, hasMany]);

  const prev = React.useCallback(() => {
    if (!hasMany) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count, hasMany]);

  React.useEffect(() => {
    if (!autoPlay || !hasMany) return;
    const id = window.setInterval(next, Math.max(3000, autoPlayIntervalMs));
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayIntervalMs, next, hasMany]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMany) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const active = testimonials[index];

  return (
    <section
      className={["w-full", className].filter(Boolean).join(" ")}
      style={style}
      aria-label="Client testimonials"
    >
      <div className="w-full rounded-2xl bg-secondary p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground/80">
            What clients say
          </div>
          <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Trusted by teams who care about craft and outcomes
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Real results from collaborative partnerships—spanning brand, web, and product.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Testimonials carousel"
        >
          <div className="relative overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border">
            <div
              className="grid transition-[transform,opacity] duration-500 ease-out"
              style={{
                gridTemplateColumns: "100%",
              }}
              aria-live="polite"
            >
              <article className="min-w-0 p-6 sm:p-8 md:p-10">
                <MessageSquareQuote
                  aria-hidden
                  className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground"
                />
                <blockquote className="mt-4 sm:mt-5">
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-8 break-words">
                    “{active.quote}”
                  </p>
                </blockquote>
                <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full bg-secondary ring-1 ring-border shrink-0">
                    {active.avatarUrl ? (
                      // Decorative image; info is provided in text
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={active.avatarUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold leading-6 truncate">
                      {active.name}
                    </div>
                    <div className="text-sm text-muted-foreground leading-5 truncate">
                      {active.company} • {active.project}
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Controls */}
            {hasMany && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden sm:flex items-center justify-between px-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/90 ring-1 ring-border shadow-sm transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowBigRight className="h-5 w-5 -scale-x-100" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/90 ring-1 ring-border shadow-sm transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowBigRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                {/* Mobile controls */}
                <div className="sm:hidden flex items-center justify-center gap-4 px-2 pb-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card ring-1 ring-border shadow-sm transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowBigRight className="h-5 w-5 -scale-x-100" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card ring-1 ring-border shadow-sm transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowBigRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Dots */}
          {hasMany && (
            <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonials navigation">
              {testimonials.map((_, i) => {
                const activeDot = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activeDot}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={[
                      "h-2.5 w-2.5 rounded-full transition",
                      activeDot ? "bg-foreground" : "bg-muted hover:bg-muted-foreground/40",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Logo grid */}
        {logos.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4 sm:mb-6">
              In good company
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {logos.map((logo) => (
                <li key={logo.name} className="min-w-0">
                  <div className="flex h-14 sm:h-16 items-center justify-center rounded-lg bg-card ring-1 ring-border shadow-sm">
                    <span className="font-semibold text-sm sm:text-base text-foreground/80 truncate">
                      {logo.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}