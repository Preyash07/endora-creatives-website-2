"use client";

import * as React from "react";
import { LayoutTemplate, Heading, LayoutGrid, Section } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface ServicesSectionProps {
  className?: string;
  style?: React.CSSProperties;
  heading?: string;
  intro?: string;
  services?: Service[];
  layout?: "default" | "compact";
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Design & Development",
    description:
      "High-performing, accessible websites crafted with precision. From concept to launch, we design and build experiences that convert.",
    features: [
      "Modern, responsive design systems",
      "Next.js + TypeScript engineering",
      "Accessibility and performance first",
      "CMS & e‑commerce integration",
    ],
    icon: LayoutTemplate,
  },
  {
    id: "brand",
    title: "Brand Identity & Strategy",
    description:
      "Cohesive brand identities that tell your story clearly. We align strategy and visual language to create lasting recognition.",
    features: [
      "Naming, voice & positioning",
      "Logo and visual identity suites",
      "Guidelines and component libraries",
      "Collateral and launch assets",
    ],
    icon: Heading,
  },
  {
    id: "marketing",
    title: "Digital Marketing & SEO",
    description:
      "Full-funnel growth with ethical SEO and content strategy. We optimize discoverability and drive meaningful engagement.",
    features: [
      "Technical & on‑page SEO",
      "Content, blog, and editorial systems",
      "Analytics, reporting & insights",
      "Email, social & campaign creative",
    ],
    icon: LayoutGrid,
  },
  {
    id: "consulting",
    title: "Creative Consulting",
    description:
      "Senior creative guidance for teams and founders. We partner as your thought‑partner to navigate complex brand challenges.",
    features: [
      "Product and UX advisory",
      "Design ops & process refinement",
      "Workshops and stakeholder alignment",
      "Roadmapping & prioritization",
    ],
    icon: Section,
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[var(--radius)] bg-card p-6 shadow-sm ring-1 ring-border transition-all duration-300",
        "hover:-translate-y-[2px] hover:shadow-md",
        "focus-within:-translate-y-[2px] focus-within:shadow-md"
      )}
      role="listitem"
      aria-label={service.title}
      style={{
        transitionDelay: `${Math.min(index, 6) * 40}ms`,
      }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[var(--radius)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="absolute -top-24 right-[-20%] h-56 w-56 rounded-full bg-accent blur-3xl" />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-xl",
            "bg-accent text-foreground ring-1 ring-border",
            "transition-colors duration-300 group-hover:bg-secondary"
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">
            <span className="block truncate">{service.title}</span>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {service.description}
          </p>
        </div>
      </div>

      <ul className="mt-5 grid gap-2 text-sm text-foreground/90">
        {service.features.map((feat, i) => (
          <li
            key={i}
            className={cn(
              "relative flex items-start gap-3 rounded-md px-0.5 py-1",
              "transition-colors duration-200 group-hover:bg-secondary/40"
            )}
          >
            <span
              aria-hidden="true"
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/70"
            />
            <span className="min-w-0 break-words">{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          Endora Creatives • Premium service
        </div>
        <div
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-foreground/70 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </div>
    </article>
  );
}

export default function ServicesSection({
  className,
  style,
  heading = "Creative services engineered for impact",
  intro = "At Endora, we combine design clarity with technical excellence to help brands move faster and communicate better. Every engagement is crafted to be usable, scalable, and undeniably beautiful.",
  services = DEFAULT_SERVICES,
  layout = "default",
}: ServicesSectionProps) {
  const titleSize =
    layout === "compact"
      ? "text-xl sm:text-2xl"
      : "text-2xl sm:text-3xl md:text-4xl";
  const introSize =
    layout === "compact" ? "text-sm" : "text-base md:text-lg";

  return (
    <section
      className={cn(
        "w-full bg-background text-foreground",
        "rounded-none",
        className
      )}
      style={style}
      aria-labelledby="services-title"
    >
      <div className="w-full max-w-full">
        <header className="max-w-3xl">
          <h2
            id="services-title"
            className={cn(
              "font-display font-extrabold tracking-tight",
              titleSize
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "mt-3 text-muted-foreground",
              introSize
            )}
          >
            {intro}
          </p>
        </header>

        <div
          role="list"
          className={cn(
            "mt-8 grid w-full gap-4",
            "sm:gap-5 md:gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {services.map((svc, idx) => (
            <ServiceCard key={svc.id} service={svc} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}