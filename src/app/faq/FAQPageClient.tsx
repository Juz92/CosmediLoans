"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { Search, ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui";
import { Input, Button } from "@/components/ui";
import { submitLead } from "@/lib/lead-client";
import type { FAQItem } from "./faq-data";

interface FAQPageClientProps {
  items: FAQItem[];
}

const categories = [
  { value: "general", label: "General" },
  { value: "loans", label: "Loans & Rates" },
  { value: "eligibility", label: "Eligibility" },
  { value: "procedures", label: "Procedures" },
  { value: "process", label: "Process & Payment" },
] as const;

export function FAQPageClient({ items }: FAQPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    question: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSearching = searchQuery.trim().length > 0;

  const filteredItems = useMemo(() => {
    if (!isSearching) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [items, searchQuery, isSearching]);

  const itemsByCategory = useMemo(() => {
    const map: Record<string, FAQItem[]> = {};
    for (const cat of categories) {
      map[cat.value] = filteredItems.filter((i) => i.category === cat.value);
    }
    return map;
  }, [filteredItems]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitLead({
        source: "faq-question",
        fullName: contactForm.name,
        email: contactForm.email,
        message: contactForm.question,
        pageOrigin: typeof window !== "undefined" ? window.location.pathname : "",
      });
      setContactSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── SEARCH BAR ────────────────────────────────────────────── */}
      <section className="bg-background pt-8 pb-0">
        <div className="container-narrow max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search all questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-border rounded-button bg-surface text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all text-base"
            />
          </div>
          {isSearching && (
            <p className="text-sm text-text-muted mt-3">
              {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}{" "}
              for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* ── TABBED FAQ ────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">
          {isSearching ? (
            /* Search results, flat list across all categories */
            filteredItems.length > 0 ? (
              <Accordion
                items={filteredItems.map((i) => ({
                  question: i.question,
                  answer: i.answer,
                }))}
                type="single"
              />
            ) : (
              <p className="text-center text-text-muted py-12">
                No questions matched your search. Try different keywords or{" "}
                <button
                  className="text-primary font-semibold hover:underline"
                  onClick={() => setSearchQuery("")}
                >
                  clear the search
                </button>
                .
              </p>
            )
          ) : (
            /* Tabbed categories */
            <Tabs.Root defaultValue="general">
              <Tabs.List className="flex gap-1 overflow-x-auto border-b border-border mb-8 pb-0">
                {categories.map((cat) => (
                  <Tabs.Trigger
                    key={cat.value}
                    value={cat.value}
                    className="px-4 py-3 text-sm font-semibold text-text-muted whitespace-nowrap border-b-2 border-transparent transition-colors hover:text-text-dark data-[state=active]:text-primary data-[state=active]:border-primary"
                  >
                    {cat.label}
                    <span className="ml-1.5 text-xs text-text-muted">
                      ({itemsByCategory[cat.value]?.length || 0})
                    </span>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {categories.map((cat) => (
                <Tabs.Content key={cat.value} value={cat.value}>
                  <Accordion
                    items={(itemsByCategory[cat.value] || []).map((i) => ({
                      question: i.question,
                      answer: i.answer,
                    }))}
                    type="single"
                  />
                </Tabs.Content>
              ))}
            </Tabs.Root>
          )}
        </div>
      </section>

      {/* ── DIDN'T FIND YOUR ANSWER ───────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-section-h2 text-text-dark mb-3">
              Didn&apos;t Find Your Answer?
            </h2>
            <p className="text-body text-text-body">
              Send us your question and we will get back to you within 2 business
              hours.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="bg-background rounded-card p-8 shadow-form text-center">
              <p className="text-lg font-bold text-text-dark mb-2">
                Question Submitted!
              </p>
              <p className="text-text-body">
                We will get back to you shortly. In the meantime, you can also{" "}
                <Link
                  href="/contact"
                  className="text-primary font-semibold hover:underline"
                >
                  contact us directly
                </Link>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              className="bg-background rounded-card p-8 shadow-form space-y-4"
            >
              <Input
                label="Your Name"
                placeholder="Full name"
                required
                autoComplete="name"
                value={contactForm.name}
                onChange={(event) =>
                  setContactForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
              <Input
                label="Email"
                placeholder="you@email.com"
                type="email"
                required
                autoComplete="email"
                value={contactForm.email}
                onChange={(event) =>
                  setContactForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
              <div className="space-y-1.5">
                <label
                  htmlFor="faq-question"
                  className="block text-sm font-semibold text-text-dark"
                >
                  Your Question
                </label>
                <textarea
                  id="faq-question"
                  rows={4}
                  required
                  placeholder="What would you like to know?"
                  className="w-full px-4 py-3 border border-border rounded-button bg-background text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all resize-y"
                  value={contactForm.question}
                  onChange={(event) =>
                    setContactForm((current) => ({
                      ...current,
                      question: event.target.value,
                    }))
                  }
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Question"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {submitError && (
                <p role="alert" className="text-sm text-red-500 text-center">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
