"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Clock, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { submitLead } from "@/lib/lead-client";

/* ── Metadata is exported from a separate file for client components ─ */
// For client components, we set metadata via a parallel route or head.tsx
// In this case we use generateMetadata in a wrapper, but the simplest
// Next.js 14 pattern is to keep this as a server component with a client child.
// We will restructure below.

export default function ContactPage() {
  return <ContactPageInner />;
}

function ContactPageInner() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    try {
      await submitLead({
        source: "contact-form",
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        pageOrigin: typeof window !== "undefined" ? window.location.pathname : "",
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary-mist to-primary-sky section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Get in Touch
          </h1>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            Have a question about medical financing? Our team is here to help.
            Reach out via the form below or contact us directly.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT ───────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left, Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Send Us a Message
              </h2>
              {submitted ? (
                <div className="bg-surface rounded-card p-8 shadow-form text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-dark mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-text-body">
                    Thank you for reaching out. We typically respond within 2
                    business hours during office hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface rounded-card p-8 shadow-form space-y-4"
                >
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="you@email.com"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                  <Input
                    label="Phone"
                    placeholder="04XX XXX XXX"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                  />
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-text-dark"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="How can we help you?"
                      autoComplete="off"
                      className="w-full px-4 py-3 border border-border rounded-button bg-background text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all resize-y"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  {submitError && (
                    <p role="alert" className="text-sm text-red-500 text-center">{submitError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Right, Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Contact Details
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <Clock
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark">
                      Response Time
                    </h3>
                    <p className="text-sm text-text-body">
                      We typically respond within 2 business hours during office
                      hours (Mon-Fri, 9am-5pm AEST).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <Mail
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark">Email</h3>
                    <p className="text-sm text-text-body">
                      <a
                        href="mailto:cosmediloans@gmail.com"
                        className="text-primary hover:underline"
                      >
                        cosmediloans@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <Phone
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark">Phone</h3>
                    <p className="text-sm text-text-body">
                      <a
                        href="tel:0422676073"
                        className="text-primary hover:underline"
                      >
                        0422 676 073
                      </a>{" "}
                      <span className="text-text-muted">
                        (Mon-Fri, 9am-5pm AEST)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <MapPin
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark">Location</h3>
                    <p className="text-sm text-text-body">
                      We operate Australia-wide. Our service is 100% online,
                      meaning you can access competitive medical financing from
                      anywhere in Australia.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-10 p-6 bg-surface rounded-card border border-border">
                <h3 className="font-semibold text-text-dark mb-2">
                  Looking for Quick Answers?
                </h3>
                <p className="text-sm text-text-body mb-4">
                  Check our comprehensive FAQ page for instant answers to common
                  questions about medical financing.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  View FAQ <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
