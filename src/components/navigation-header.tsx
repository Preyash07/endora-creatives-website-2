"use client";

import * as React from "react";
import { Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type NavItem = {
  id: string; // section id on the page
  label: string;
};

interface NavigationHeaderProps {
  className?: string;
  items?: NavItem[];
  onGetStarted?: () => void;
  ctaHref?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function NavigationHeader({
  className,
  items = DEFAULT_ITEMS,
  onGetStarted,
  ctaHref,
}: NavigationHeaderProps) {
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Track current section in view
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionEls = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        } else {
          // Fallback: find the section closest to top
          let closest: { id: string; top: number } | null = null;
          for (const el of sectionEls) {
            const rect = el.getBoundingClientRect();
            const top = Math.abs(rect.top);
            if (!closest || top < closest.top) {
              closest = { id: el.id, top };
            }
          }
          if (closest) setActiveId(closest.id);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "0px 0px -40% 0px", // bias toward section top
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleSmoothScroll = React.useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (typeof window === "undefined") return;
      const el = document.getElementById(id);
      if (!el) return;

      const headerH = headerRef.current
        ? headerRef.current.getBoundingClientRect().height
        : 0;

      const top =
        window.scrollY +
        el.getBoundingClientRect().top -
        Math.max(8, Math.round(headerH)); // slight extra offset

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    },
    []
  );

  const Logo = (
    <a
      href="/"
      aria-label="Endora Creatives Home"
      className="inline-flex items-center gap-2"
    >
      <div className="h-8 w-8 rounded-md bg-foreground text-background grid place-items-center font-bold tracking-tight">
        EC
      </div>
      <span className="font-display font-extrabold tracking-tight leading-none text-base sm:text-lg">
        Endora Creatives
      </span>
    </a>
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border",
        className
      )}
      role="banner"
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Left: Logo */}
          <div className="min-w-0">{Logo}</div>

          {/* Right: Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Primary"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleSmoothScroll(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center rounded-md px-3 lg:px-4 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "text-foreground"
                      : "hover:bg-secondary/80 active:bg-secondary"
                  )}
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-2 -bottom-[2px] h-[2px] rounded-full transition-opacity",
                      isActive ? "opacity-100 bg-foreground" : "opacity-0"
                    )}
                  />
                </a>
              );
            })}
            <div className="ml-1 lg:ml-2">
              {ctaHref ? (
                <Button
                  asChild
                  className="group bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-ring/60"
                >
                  <a href={ctaHref} aria-label="Get Started">
                    Get Started
                    <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
              ) : (
                <Button
                  onClick={onGetStarted}
                  className="group bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-ring/60"
                >
                  Get Started
                  <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile: Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="text-foreground hover:bg-secondary"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background"
                aria-label="Mobile navigation"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-1">
                  {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <SheetClose asChild key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={handleSmoothScroll(item.id)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-md px-3 py-2 text-base transition-colors",
                            isActive
                              ? "bg-secondary text-foreground"
                              : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <span className="min-w-0 truncate">{item.label}</span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform",
                              isActive ? "translate-x-0.5" : ""
                            )}
                            aria-hidden
                          />
                        </a>
                      </SheetClose>
                    );
                  })}
                  <div className="pt-2">
                    {ctaHref ? (
                      <SheetClose asChild>
                        <Button
                          asChild
                          className="w-full bg-foreground text-background hover:bg-foreground/90"
                        >
                          <a href={ctaHref} aria-label="Get Started">
                            Get Started
                            <ChevronRight className="ml-1.5 h-4 w-4" />
                          </a>
                        </Button>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild>
                        <Button
                          onClick={onGetStarted}
                          className="w-full bg-foreground text-background hover:bg-foreground/90"
                        >
                          Get Started
                          <ChevronRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      </SheetClose>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}