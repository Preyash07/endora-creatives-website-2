"use client";

import * as React from "react";
import { LayoutGrid, Grid2x2, Columns4, Section } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Category = "All" | "Branding" | "Web Design" | "Development";

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, "All">;
  imageUrl: string;
  slug?: string;
}

interface PortfolioSectionProps {
  items?: PortfolioItem[];
  initialFilter?: Category;
  className?: string;
  onViewCaseStudy?: (item: PortfolioItem) => void;
  layout?: "compact" | "comfortable";
}

const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: "1",
    title: "Organic Skincare Rebrand",
    client: "Aurelia Naturals",
    category: "Branding",
    imageUrl:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Luxury Hotel Website",
    client: "Maison Verdant",
    category: "Web Design",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "E‑commerce Platform",
    client: "Arcadia Home",
    category: "Development",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Artisanal Coffee Identity",
    client: "Harbor & Co.",
    category: "Branding",
    imageUrl:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Portfolio Experience",
    client: "Endora Creatives",
    category: "Web Design",
    imageUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "SaaS Dashboard Build",
    client: "Nimbus Labs",
    category: "Development",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
  },
];

const CATEGORIES: { key: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] =
  [
    { key: "All", label: "All", icon: LayoutGrid },
    { key: "Branding", label: "Branding", icon: Grid2x2 },
    { key: "Web Design", label: "Web Design", icon: Columns4 },
    { key: "Development", label: "Development", icon: Section },
  ];

export default function PortfolioSection({
  items = DEFAULT_ITEMS,
  initialFilter = "All",
  className,
  onViewCaseStudy,
  layout = "comfortable",
}: PortfolioSectionProps) {
  const [active, setActive] = React.useState<Category>(initialFilter);
  const [announce, setAnnounce] = React.useState<string>("");

  const filtered = React.useMemo(() => {
    const list =
      active === "All" ? items : items.filter((it) => it.category === active);
    return list;
  }, [active, items]);

  React.useEffect(() => {
    setAnnounce(`${filtered.length} project${filtered.length === 1 ? "" : "s"} shown`);
  }, [filtered.length]);

  const dense = layout === "compact";

  return (
    <section
      aria-label="Portfolio gallery"
      className={cn(
        "w-full bg-background",
        className
      )}
    >
      <div className="w-full max-w-full">
        {/* Header */}
        <div className={cn("flex w-full flex-col gap-4", dense ? "mb-6" : "mb-8")}>
          <div className="flex w-full flex-col gap-3">
            <h2 className={cn("font-display text-2xl sm:text-3xl md:text-4xl", "tracking-tight")}>
              Showcasing innovative work, crafted for ambitious brands
            </h2>
            <p className={cn("text-sm sm:text-base text-muted-foreground max-w-prose")}>
              A curated selection of recent client projects across branding, web design, and development.
              Explore the work and dive into full case studies.
            </p>
          </div>

          {/* Filters */}
          <div
            role="toolbar"
            aria-label="Filter projects by category"
            className={cn(
              "flex w-full items-center gap-2",
              "rounded-[calc(theme(--radius)-6px)] bg-secondary p-1.5"
            )}
          >
            {CATEGORIES.map(({ key, label, icon: Icon }) => {
              const pressed = active === key;
              return (
                <Button
                  key={key}
                  type="button"
                  variant={pressed ? "default" : "ghost"}
                  onClick={() => setActive(key)}
                  aria-pressed={pressed}
                  className={cn(
                    "flex items-center gap-2",
                    "text-sm",
                    "transition-colors",
                    pressed
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-foreground hover:bg-card",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden xs:inline">{label}</span>
                  <span className="xs:hidden">{label}</span>
                </Button>
              );
            })}
            <span className="sr-only" role="status" aria-live="polite">
              {announce}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div
          className={cn(
            "grid w-full",
            dense ? "gap-4" : "gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {filtered.map((item) => (
            <article
              key={item.id}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius)]",
                "bg-card ring-1 ring-border",
                "transition-shadow",
                "focus-within:ring-2 focus-within:ring-ring"
              )}
            >
              <figure className="relative isolate">
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    dense ? "aspect-[4/3]" : "aspect-[16/12]"
                  )}
                >
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} for ${item.client}`}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    )}
                  />
                  {/* Soft gradient overlay for readability */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      "bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent",
                      "opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                    )}
                  />
                </div>

                {/* Overlay content */}
                <figcaption
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0",
                    "p-4 sm:p-5"
                  )}
                >
                  <div className="flex min-w-0 flex-col gap-2 text-card">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-card/80">
                        {item.category} • {item.client}
                      </p>
                      <h3 className="mt-0.5 min-w-0 truncate text-base sm:text-lg font-semibold text-card-foreground">
                        <span className="text-card">{item.title}</span>
                      </h3>
                    </div>

                    <div
                      className={cn(
                        "pointer-events-auto",
                        "opacity-0 translate-y-1 transition-all duration-300 ease-out",
                        "group-hover:opacity-100 group-hover:translate-y-0"
                      )}
                    >
                      <Button
                        type="button"
                        onClick={onViewCaseStudy ? () => onViewCaseStudy(item) : undefined}
                        variant="secondary"
                        className={cn(
                          "h-9 px-3 text-sm",
                          "bg-card/95 text-foreground hover:bg-card shadow-sm backdrop-blur",
                          "ring-1 ring-border"
                        )}
                      >
                        View Case Study
                      </Button>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className={cn(
              "mt-10 flex w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border bg-secondary/50 p-8 text-center"
            )}
          >
            <div className="max-w-md">
              <p className="font-medium">No projects found</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Try a different filter to explore more of our work.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}