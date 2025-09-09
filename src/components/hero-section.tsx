"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Palette, Ampersand, Brush } from "lucide-react"

export interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  primaryCtaHref?: string
  primaryCtaLabel?: string
  secondaryCtaHref?: string
  secondaryCtaLabel?: string
}

export default function HeroSection({
  className,
  title = "Endora Creatives",
  subtitle = "Balancing artistic expression with uncompromising usability.",
  description = "We are a premium full‑stack creative agency crafting brand systems, high-performance websites, and product experiences that feel as good as they look. Strategy-led, design-obsessed, and engineering-backed.",
  primaryCtaHref = "#contact",
  primaryCtaLabel = "Get in touch",
  secondaryCtaHref = "/work",
  secondaryCtaLabel = "View Our Work",
}: HeroSectionProps) {
  return (
    <section className={className}>
      <div className="relative isolate bg-background">
        {/* Subtle background accents */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -left-24 h-64 w-64 rounded-full bg-accent blur-3xl opacity-60"></div>
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary blur-3xl opacity-70"></div>
          <Ampersand
            className="absolute right-4 top-6 h-28 w-28 text-[color:var(--color-brand-soft)] opacity-60"
            aria-hidden="true"
          />
        </div>

        <div className="container relative z-10 mx-auto w-full max-w-5xl py-16 sm:py-20 md:py-24">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-card px-3 py-1 text-sm leading-none shadow-sm">
            <Palette className="h-4 w-4 text-[color:var(--color-muted-foreground)]" aria-hidden="true" />
            <span className="text-[color:var(--color-muted-foreground)]">Premium full‑stack creative agency</span>
          </div>

          {/* Headline */}
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-3 text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg md:text-xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="group">
              <Link
                href={primaryCtaHref}
                aria-label={primaryCtaLabel}
                title={primaryCtaLabel}
                onClick={(e) => {
                  if (primaryCtaHref.startsWith("#")) {
                    e.preventDefault()
                    const id = primaryCtaHref.replace('#','')
                    const el = document.getElementById(id)
                    if (el) {
                      const rect = el.getBoundingClientRect()
                      const top = window.scrollY + rect.top - 72
                      window.scrollTo({ top, behavior: 'smooth' })
                    }
                  }
                }}
              >
                <Brush className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-rotate-6" aria-hidden="true" />
                {primaryCtaLabel}
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-card">
              <Link href={secondaryCtaHref} aria-label={secondaryCtaLabel} title={secondaryCtaLabel}>
                {secondaryCtaLabel}
              </Link>
            </Button>
          </div>

          {/* Subtext / assurance */}
          <div className="mt-6 text-sm text-[color:var(--color-muted-foreground)]">
            Strategy • Design • Development • Consulting
          </div>
        </div>
      </div>
    </section>
  )
}