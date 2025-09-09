"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Linkedin, Facebook, Youtube, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" {...props}>
      <path d="M12 2C6.48 2 2 6.03 2 10.77c0 3.02 1.88 5.62 4.56 6.68.04-.57.09-1.45.02-2.08-.09-.66-.57-4.2-.57-4.2s-.14-.29-.14-.73c0-.68.39-1.19.88-1.19.41 0 .6.31.6.68 0 .41-.26 1.02-.39 1.59-.11.48.24.87.71.87 1.36 0 2.28-1.75 2.28-3.83 0-1.58-1.06-2.77-2.99-2.77-2.18 0-3.54 1.63-3.54 3.45 0 .63.19 1.08.49 1.43.14.16.16.22.11.4-.04.13-.12.45-.16.58-.05.19-.2.26-.37.19-1.04-.43-1.52-1.58-1.52-2.87 0-2.14 1.81-4.7 5.41-4.7 2.89 0 4.79 2.09 4.79 4.34 0 2.97-1.65 5.19-4.08 5.19-.82 0-1.59-.44-1.86-.94l-.51 1.96c-.18.7-.67 1.57-1 2.11.75.23 1.55.35 2.37.35 5.52 0 10-4.03 10-8.77C22 6.03 17.52 2 12 2z"/>
    </svg>
  )
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.38 0 .01 5.37.01 12c0 2.11.55 4.13 1.6 5.94L0 24l6.2-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 21.5c-1.87 0-3.67-.5-5.25-1.46l-.38-.23-3.69.97.99-3.6-.24-.37A9.5 9.5 0 1 1 12 21.5zm5.35-6.61c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.14-.67.14-.2.29-.77.94-.94 1.13-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.36-.02-.5-.07-.14-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.5.07-.77.36-.27.29-1.02 1-1.02 2.44 0 1.43 1.04 2.81 1.18 3 .14.2 2.05 3.13 4.97 4.38.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.38-.07-.11-.26-.18-.55-.33z"/>
    </svg>
  )
}

function BehanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" {...props}>
      <path d="M4.5 7H9c1.88 0 3.25 1.06 3.25 2.73 0 1.16-.7 1.98-1.7 2.27v.04c1.33.24 2.18 1.2 2.18 2.55 0 1.88-1.53 3.41-3.93 3.41H4.5V7zm3.97 4.3c.96 0 1.56-.5 1.56-1.28 0-.84-.6-1.28-1.6-1.28H6.66v2.56h1.81zm.2 4.43c1.12 0 1.8-.54 1.8-1.45 0-.93-.68-1.45-1.9-1.45H6.66v2.9h2.01zM14.5 15.56c.37.52 1.05.98 2.07.98 1.2 0 2.02-.62 2.2-1.5h-2.2c-1.87 0-3.3-1.17-3.3-3.14 0-1.95 1.44-3.28 3.36-3.28 1.9 0 3.23 1.22 3.23 3.65v.54h-4.66c.06.8.73 1.6 1.97 1.6.83 0 1.4-.33 1.67-.87h1.9c-.39 1.82-1.86 3.18-3.77 3.18-1.72 0-3.08-.79-3.47-2.16h1.8zM14.5 9.5h4V8h-4v1.5z"/>
    </svg>
  )
}

export interface FooterProps {
  className?: string
  style?: React.CSSProperties
  links?: {
    services?: string
    work?: string
    about?: string
    blog?: string
    contact?: string
  }
  socials?: {
    linkedin?: string
    facebook?: string
    youtube?: string
    x?: string
    behance?: string
    pinterest?: string
    instagram?: string
    whatsapp?: string
  }
  onSubscribe?: (email: string) => Promise<void> | void
}

export default function Footer({
  className,
  style,
  links,
  socials,
  onSubscribe,
}: FooterProps) {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = email.trim()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!isValid) {
      toast.error("Please enter a valid email address.")
      return
    }
    try {
      setLoading(true)
      if (onSubscribe) {
        await onSubscribe(trimmed)
      } else {
        // Simulate async subscription
        await new Promise((r) => setTimeout(r, 900))
      }
      toast.success("Subscribed! Welcome to Endora Creatives.")
      setEmail("")
    } catch (_err) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const year = new Date().getFullYear()

  function LinkOrText({
    href,
    children,
  }: {
    href?: string
    children: React.ReactNode
  }) {
    if (href) {
      return (
        <Link
          href={href}
          className="text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          {children}
        </Link>
      )
    }
    return (
      <span
        aria-disabled="true"
        className="text-sm text-muted-foreground cursor-default"
      >
        {children}
      </span>
    )
  }

  return (
    <footer
      className={[
        "w-full bg-secondary border-t border-border",
        "text-foreground",
        className || "",
      ].join(" ")}
      style={style}
      aria-label="Footer"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="flex items-start gap-3">
              <div className="relative h-10 w-10 shrink-0 rounded-xl bg-foreground text-background flex items-center justify-center shadow-sm ring-1 ring-black/5">
                <span className="font-display font-extrabold">EC</span>
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold leading-tight">
                  Endora Creatives
                </p>
                <p className="text-sm text-muted-foreground">
                  Premium design, branding, and development for ambitious teams.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-prose text-sm text-foreground/80">
              We help brands craft refined digital experiences that convert. From
              strategy to launch, our team brings clarity, craft, and care to
              every engagement.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex w-full max-w-md items-center gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card text-foreground placeholder:text-muted-foreground/70"
                aria-invalid={email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              />
              <Button
                type="submit"
                disabled={loading}
                className="whitespace-nowrap"
              >
                {loading ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialButton
                label="YouTube"
                href={socials?.youtube}
                icon={<Youtube className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="X"
                href={socials?.x}
                icon={<Twitter className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="Behance"
                href={socials?.behance}
                icon={<BehanceIcon className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="Pinterest"
                href={socials?.pinterest}
                icon={<PinterestIcon className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="LinkedIn"
                href={socials?.linkedin}
                icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="Facebook"
                href={socials?.facebook}
                icon={<Facebook className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="Instagram"
                href={socials?.instagram}
                icon={<Instagram className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialButton
                label="WhatsApp"
                href={socials?.whatsapp}
                icon={<WhatsappIcon className="h-4 w-4" aria-hidden="true" />}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-sm uppercase tracking-wide text-foreground/70">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <LinkOrText href={links?.services}>Services</LinkOrText>
              </li>
              <li>
                <LinkOrText href={links?.work}>Work</LinkOrText>
              </li>
              <li>
                <LinkOrText href={links?.about}>About</LinkOrText>
              </li>
              <li>
                <LinkOrText href={links?.blog}>Blog</LinkOrText>
              </li>
              <li>
                <LinkOrText href={links?.contact}>Contact</LinkOrText>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-medium text-sm uppercase tracking-wide text-foreground/70">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-foreground/80">Web Design</li>
              <li className="text-sm text-foreground/80">Brand Identity</li>
              <li className="text-sm text-foreground/80">Front-end Development</li>
              <li className="text-sm text-foreground/80">UX Consulting</li>
              <li className="text-sm text-foreground/80">Content Strategy</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-sm uppercase tracking-wide text-foreground/70">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-foreground/80 break-words">
                hello@endoracreatives.com
              </li>
              <li className="text-sm text-foreground/80">+1 (555) 012-3456</li>
              <li className="text-sm text-foreground/80">
                220 Market Street, Suite 500
                <br />
                San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {year} Endora Creatives. All rights reserved.
            </p>
            <div className="flex gap-6">
              <FooterLinkSmall href={links?.services} label="Services" />
              <FooterLinkSmall href={links?.work} label="Work" />
              <FooterLinkSmall href={links?.about} label="About" />
              <FooterLinkSmall href={links?.blog} label="Blog" />
              <FooterLinkSmall href={links?.contact} label="Contact" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialButton({
  label,
  icon,
  href,
}: {
  label: string
  icon: React.ReactNode
  href?: string
}) {
  const content = (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {icon}
      <span className="sr-only">{label}</span>
    </span>
  )
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {content}
      </a>
    )
  }
  return (
    <button
      type="button"
      aria-label={label}
      title={`${label} link unavailable`}
      className="cursor-not-allowed opacity-60"
      disabled
    >
      {content}
    </button>
  )
}

function FooterLinkSmall({
  href,
  label,
}: {
  href?: string
  label: string
}) {
  if (href) {
    return (
      <Link
        href={href}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
      </Link>
    )
  }
  return (
    <span className="text-xs text-muted-foreground cursor-default" aria-disabled="true">
      {label}
    </span>
  )
}