"use client";

import * as React from "react";
import { X, ChevronRight } from "lucide-react";
import NavigationHeader from "@/components/navigation-header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection, { PortfolioItem } from "@/components/portfolio-section";
import AboutSection from "@/components/about-section";
import BlogSection from "@/components/blog-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page() {
  const [selectedWork, setSelectedWork] = React.useState<PortfolioItem | null>(null);

  const handleGetStarted = React.useCallback(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleViewCaseStudy = React.useCallback((item: PortfolioItem) => {
    setSelectedWork(item);
  }, []);

  const closeWorkDialog = React.useCallback(() => {
    setSelectedWork(null);
  }, []);

  const jumpToContact = React.useCallback(() => {
    closeWorkDialog();
    handleGetStarted();
  }, [closeWorkDialog, handleGetStarted]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <NavigationHeader onGetStarted={handleGetStarted} />

      <main id="top" className="relative">
        <HeroSection className="border-b border-border" />

        <section id="services" className="scroll-mt-24">
          <div className="container py-16 sm:py-20">
            <ServicesSection />
          </div>
        </section>

        <section id="work" className="scroll-mt-24">
          <div className="container py-16 sm:py-20">
            <PortfolioSection onViewCaseStudy={handleViewCaseStudy} />
          </div>
        </section>

        <section id="about" className="scroll-mt-24">
          <div className="container py-16 sm:py-20">
            <AboutSection />
          </div>
        </section>

        <section className="scroll-mt-24">
          <div className="container py-16 sm:py-20">
            <TestimonialsSection />
          </div>
        </section>

        <section id="blog" className="scroll-mt-24">
          <div className="container py-16 sm:py-20">
            <BlogSection />
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <div className="container py-16 sm:py-20">
            <ContactSection />
          </div>
        </section>
      </main>

      <Footer
        links={{
          services: "#services",
          work: "#work",
          about: "#about",
          blog: "#blog",
          contact: "#contact",
        }}
      />

      {/* Lightweight Work Modal */}
      {selectedWork && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedWork.title} – Case Study`}
          className="fixed inset-0 z-[60] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={closeWorkDialog}
          />
          <div className="relative z-[61] w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {selectedWork.category} • {selectedWork.client}
                </p>
                <h3 className="truncate text-lg font-semibold">{selectedWork.title}</h3>
              </div>
              <button
                type="button"
                onClick={closeWorkDialog}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary hover:bg-accent transition"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-[16/10] w-full overflow-hidden bg-secondary">
                <img
                  src={selectedWork.imageUrl}
                  alt={`${selectedWork.title} preview`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 px-5 py-5">
              <p className="text-sm text-muted-foreground">
                This is a highlight from our portfolio. Interested in a deeper dive or similar results?
                We'll walk you through goals, process, and outcomes.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={jumpToContact} className="group">
                  Get in touch
                  <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button variant="outline" onClick={closeWorkDialog}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}