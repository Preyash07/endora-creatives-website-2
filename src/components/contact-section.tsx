"use client";

import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPinned, Linkedin, Figma, ContactRound } from "lucide-react";

const projectTypes = [
  { label: "Website Design", value: "website-design" },
  { label: "Brand Identity", value: "brand-identity" },
  { label: "Web Development", value: "web-development" },
  { label: "Product Design (UI/UX)", value: "product-design" },
  { label: "Consulting / Strategy", value: "consulting" },
];

const budgetRanges = [
  { label: "$5k – $10k", value: "5-10k" },
  { label: "$10k – $25k", value: "10-25k" },
  { label: "$25k – $50k", value: "25-50k" },
  { label: "$50k – $100k", value: "50-100k" },
  { label: "$100k+", value: "100k-plus" },
];

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().max(120, "Company name is too long.").optional().or(z.literal("")),
  projectType: z.enum(projectTypes.map((p) => p.value) as [string, ...string[]], {
    required_error: "Select a project type.",
  }),
  budget: z.enum(budgetRanges.map((b) => b.value) as [string, ...string[]], {
    required_error: "Select a budget range.",
  }),
  description: z
    .string()
    .min(20, "Please share a few details (at least 20 characters).")
    .max(2000, "Please keep it under 2000 characters."),
});

export type ContactFormValues = z.infer<typeof formSchema>;

export type ContactSectionProps = {
  className?: string;
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
};

export default function ContactSection({ className, onSubmit }: ContactSectionProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: undefined as unknown as ContactFormValues["projectType"],
      budget: undefined as unknown as ContactFormValues["budget"],
      description: "",
    },
  });

  async function handleSubmit(values: ContactFormValues) {
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Simulate async submission
        await new Promise((r) => setTimeout(r, 1200));
      }
      toast.success("Thanks! We’ll be in touch shortly.");
      form.reset();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className={cn(
        "w-full bg-card text-foreground rounded-lg border border-border shadow-sm",
        "p-6 sm:p-8",
        className
      )}
      aria-labelledby="contact-heading"
    >
      <header className="mb-8 sm:mb-10">
        <div className="flex items-start gap-3">
          <div className="inline-flex size-10 items-center justify-center rounded-md bg-accent text-foreground">
            <ContactRound className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2
              id="contact-heading"
              className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              Let’s talk about your project
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              Share a few details and we’ll respond within 1–2 business days.
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:gap-10 md:grid-cols-5">
        {/* Form */}
        <div className="md:col-span-3">
          <div className="rounded-lg border border-border bg-card">
            <div className="p-4 sm:p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              autoComplete="name"
                              disabled={submitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              autoComplete="email"
                              inputMode="email"
                              disabled={submitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Company or organization"
                              autoComplete="organization"
                              disabled={submitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project type</FormLabel>
                          <Select
                            disabled={submitting}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger aria-label="Select a project type">
                                <SelectValue placeholder="Choose one" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectTypes.map((pt) => (
                                <SelectItem key={pt.value} value={pt.value}>
                                  {pt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-destructive text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget range</FormLabel>
                        <Select
                          disabled={submitting}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger aria-label="Select a budget range">
                              <SelectValue placeholder="Choose an estimated budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {budgetRanges.map((b) => (
                              <SelectItem key={b.value} value={b.value}>
                                {b.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          This helps us tailor our approach—final estimates follow discovery.
                        </p>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-3">
                          <FormLabel>Project details</FormLabel>
                          <span className="text-xs text-muted-foreground">
                            {field.value?.length ?? 0}/2000
                          </span>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your goals, scope, timeline, and any links we should review."
                            rows={6}
                            className="resize-y"
                            disabled={submitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? "Sending..." : "Send inquiry"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      By sending, you agree to be contacted about your project.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div
            aria-live="polite"
            className="sr-only"
          >
            {submitting ? "Submitting form" : "Form idle"}
          </div>
        </div>

        {/* Contact info */}
        <aside className="md:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Direct contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@endoracreatives.com"
                className="group flex items-center gap-3 rounded-md p-3 bg-secondary hover:bg-accent transition-colors"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-card">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">hello@endoracreatives.com</p>
                  <p className="text-xs text-muted-foreground">Email us any time</p>
                </div>
              </a>
              <a
                href="tel:+1234567890"
                className="group flex items-center gap-3 rounded-md p-3 bg-secondary hover:bg-accent transition-colors"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-card">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">+1 (234) 567-890</p>
                  <p className="text-xs text-muted-foreground">Mon–Fri, 9am–6pm</p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Office</h3>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                <MapPinned className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 break-words">
                <p className="text-sm font-medium">Endora Creatives</p>
                <p className="text-sm">
                  2100 Market Street, Suite 300
                  <br />
                  San Francisco, CA 94114
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Visits by appointment</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Connect</h3>
            <div className="flex flex-wrap gap-2">
              <SocialButton
                label="LinkedIn"
                Icon={Linkedin}
                onClick={() => toast.message("Opening LinkedIn", { description: "Profile link coming soon." })}
              />
              <SocialButton
                label="Figma Community"
                Icon={Figma}
                onClick={() => toast.message("Opening Figma Community", { description: "Profile link coming soon." })}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

type SocialButtonProps = {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

function SocialButton({ label, Icon, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border",
        "bg-secondary hover:bg-accent transition-colors",
        "px-3 py-2 text-sm"
      )}
      aria-label={label}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="font-medium">{label}</span>
    </button>
  );
}