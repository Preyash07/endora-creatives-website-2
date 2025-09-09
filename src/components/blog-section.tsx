"use client"

import * as React from "react"
import Link from "next/link"
import { Newspaper } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type BlogAuthor = {
  name: string
  avatarUrl?: string
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  author: BlogAuthor
  categories: string[]
  imageUrl: string
}

export type BlogSectionProps = {
  className?: string
  style?: React.CSSProperties
  title?: string
  description?: string
  posts?: BlogPost[]
  viewAllHref?: string
}

const placeholderPosts: BlogPost[] = [
  {
    id: "design-systems-01",
    title: "Design Systems That Scale: Principles for Consistency and Speed",
    excerpt:
      "How we craft modular design systems that empower teams to ship faster while protecting brand quality across complex products.",
    date: "Aug 22, 2025",
    author: { name: "Ava Mitchell" },
    categories: ["Design", "Process"],
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "performance-ux-02",
    title: "Performance Is UX: Building Lightning-Fast Interfaces in 2025",
    excerpt:
      "Techniques we use in Next.js to keep experiences smooth—streaming UI, partial rendering, and smart asset strategy.",
    date: "Aug 15, 2025",
    author: { name: "Liam Carter" },
    categories: ["Development", "Next.js"],
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "brand-narratives-03",
    title: "From Brief to Brand: Turning Strategy into Visual Narratives",
    excerpt:
      "A behind-the-scenes look at how we translate insights into identity systems that resonate across channels.",
    date: "Aug 05, 2025",
    author: { name: "Maya Patel" },
    categories: ["Branding", "Industry"],
    imageUrl:
      "https://images.unsplash.com/photo-1529336953121-a9a197d96cdf?q=80&w=1600&auto=format&fit=crop",
  },
]

export default function BlogSection({
  className,
  style,
  title = "Insights & Expertise",
  description = "Perspectives on design, development, and the creative industry—curated by the Endora team.",
  posts = placeholderPosts,
  viewAllHref = "/blog",
}: BlogSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-background",
        className
      )}
      style={style}
      aria-labelledby="blog-section-heading"
    >
      <div className="w-full max-w-full">
        <header className="mb-8 flex w-full items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 text-muted-foreground">
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium">Endora Creatives Blog</span>
            </div>
            <h2
              id="blog-section-heading"
              className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="shrink-0">
            <Button asChild aria-label="View all blog posts">
              <Link href={viewAllHref}>View All Posts</Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Card
      className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-lg focus-within:shadow-lg"
      role="article"
      aria-labelledby={`${post.id}-title`}
    >
      <div className="relative overflow-hidden">
        <a
          href="/blog"
          aria-label={`Read ${post.title}`}
          className="block"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
            <img
              src={post.imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </a>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/0 via-background/0 to-background/0" />
      </div>

      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="bg-accent text-foreground"
            >
              {cat}
            </Badge>
          ))}
        </div>

        <h3
          id={`${post.id}-title`}
          className="mb-2 line-clamp-2 text-base sm:text-lg font-semibold tracking-[-0.01em]"
        >
          <a
            href="/blog"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {post.title}
          </a>
        </h3>

        <p className="mb-4 text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="min-w-0 flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
              {post.author.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt={`${post.author.name} avatar`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground">
                  {getInitials(post.author.name)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{post.author.name}</p>
              <p className="truncate text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>

          <Link
            href="/blog"
            aria-label={`Read more: ${post.title}`}
            className="text-sm font-medium underline decoration-foreground/20 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Read More
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return (first + last).toUpperCase()
}