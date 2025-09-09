"use client";

import React from "react";
import {
  Linkedin,
  Goal,
  Target,
  Briefcase,
  Users,
  GalleryVertical,
  PanelsTopLeft,
} from "lucide-react";

type IconName =
  | "Goal"
  | "Target"
  | "Briefcase"
  | "Users"
  | "GalleryVertical"
  | "PanelsTopLeft";

const ICONS: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> =
  {
    Goal,
    Target,
    Briefcase,
    Users,
    GalleryVertical,
    PanelsTopLeft,
  };

export interface AboutStat {
  label: string;
  value: string;
  icon?: IconName;
  srLabel?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
  linkedinUrl?: string;
}

export interface AboutSectionProps {
  className?: string;
  style?: React.CSSProperties;
  eyebrow?: string;
  title?: string;
  tagline?: string;
  description?: string;
  secondaryDescription?: string;
  stats?: AboutStat[];
  team?: TeamMember[];
  layout?: "full" | "compact";
}

const defaultStats: AboutStat[] = [
  { label: "Projects delivered", value: "120+", icon: "Briefcase" },
  { label: "Average NPS", value: "72", icon: "Target" },
  { label: "Client retention", value: "93%", icon: "Goal" },
  { label: "Experts on team", value: "18", icon: "Users" },
];

const defaultTeam: TeamMember[] = [
  {
    name: "Elena Moretti",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Portrait of Elena Moretti",
  },
  {
    name: "Marcus Chen",
    role: "Head of Product Design",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Portrait of Marcus Chen",
  },
  {
    name: "Priya Kapoor",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Portrait of Priya Kapoor",
  },
  {
    name: "Diego Martínez",
    role: "Brand Strategist",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Portrait of Diego Martínez",
  },
];

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AboutSection({
  className,
  style,
  layout = "full",
  eyebrow = "About Endora Creatives",
  title = "Where bold creativity meets purposeful execution",
  tagline = "Design that inspires. Systems that scale.",
  description = "We're a multidisciplinary team crafting premium brand, web, and product experiences. Our philosophy is simple: creative excellence is only meaningful when it drives real outcomes. We combine strategic rigor with an obsessive attention to detail, shipping work that looks beautiful, works flawlessly, and moves metrics.",
  secondaryDescription = "From early-stage startups to global brands, we partner deeply, measure what matters, and iterate with intention—transforming complex challenges into elegant, intuitive solutions.",
  stats = defaultStats,
  team = defaultTeam,
}: AboutSectionProps) {
  return (
    <section
      className={classNames(
        "w-full max-w-full bg-card rounded-[var(--radius)] border border-[var(--border)]",
        "p-6 sm:p-8 md:p-10",
        "shadow-sm",
        className
      )}
      style={style}
      aria-labelledby="about-section-title"
    >
      {/* Intro + Stats */}
      <div className="w-full max-w-full">
        <div className={classNames("grid gap-8 md:gap-12 items-start", layout === "full" ? "md:grid-cols-2" : "md:grid-cols-[1.2fr_1fr]")}>
          {/* Copy */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium">
              <PanelsTopLeft className="h-4 w-4" aria-hidden="true" />
              <span className="truncate">{eyebrow}</span>
            </div>

            <h2
              id="about-section-title"
              className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight break-words"
            >
              {title}
            </h2>

            <p className="mt-3 text-lg sm:text-xl font-semibold">{tagline}</p>

            <p className="mt-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
              {description}
            </p>
            <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
              {secondaryDescription}
            </p>
          </div>

          {/* Stats */}
          <div className="min-w-0">
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              role="list"
              aria-label="Key achievements and metrics"
            >
              {stats.slice(0, 6).map((s, idx) => {
                const Icon = s.icon ? ICONS[s.icon] : GalleryVertical;
                return (
                  <div
                    key={`${s.label}-${idx}`}
                    role="listitem"
                    className="group relative overflow-hidden rounded-lg bg-secondary p-4 sm:p-5 border border-[var(--border)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-card border border-[var(--border)] transition-colors">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                          {s.value}
                        </div>
                        <div className="text-sm text-foreground/70 mt-0.5 break-words">
                          <span className="sr-only">{s.srLabel}</span>
                          {s.label}
                        </div>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-accent" aria-hidden="true" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm text-foreground/70">
              <Goal className="h-4 w-4" aria-hidden="true" />
              <span className="min-w-0">
                We measure impact, not just aesthetics—every engagement is tied to clear outcomes.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 md:my-12 h-px w-full bg-[var(--border)]" role="separator" aria-hidden="true" />

      {/* Team */}
      <div className="w-full max-w-full">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Our leadership</h3>
            <p className="mt-2 text-sm sm:text-base text-foreground/70">
              A seasoned, cross-disciplinary team dedicated to client success.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-foreground/70">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            <span>Based in NYC • Working worldwide</span>
          </div>
        </div>

        <ul
          className="mt-6 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4"
          role="list"
          aria-label="Team members"
        >
          {team.slice(0, 8).map((member, idx) => (
            <li key={`${member.name}-${idx}`} role="listitem" className="min-w-0">
              <article className="group rounded-lg border border-[var(--border)] bg-card overflow-hidden h-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.imageAlt || member.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-base sm:text-lg leading-tight truncate">
                        {member.name}
                      </h4>
                      <p className="text-sm text-muted mt-0.5 truncate">{member.role}</p>
                    </div>
                    {member.linkedinUrl ? (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${member.name} on LinkedIn`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-secondary text-foreground hover:bg-accent transition-colors"
                      >
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-label="LinkedIn profile not available"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-secondary text-foreground opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
          <Users className="h-4 w-4" aria-hidden="true" />
          <span className="break-words">
            We build small, senior teams around each engagement to move fast and ship with quality.
          </span>
        </div>
      </div>
    </section>
  );
}