import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui";

// PLACEHOLDER: These testimonials are placeholders. Replace with real customer reviews.
const testimonials = [
  {
    name: "Sarah M.",
    procedure: "Dental Implants",
    rating: 5,
    avatar: "/Images/Dental.png",
    quote:
      "I'd been putting off my dental implants for two years because I thought I couldn't afford them. CosmediLoans connected me with a broker who found a repayment plan that actually fit my budget. Booked within the week.",
  },
  {
    name: "James T.",
    procedure: "IVF Treatment",
    rating: 5,
    avatar: "/Images/IVF & Fertility.png",
    quote:
      "Financing IVF felt overwhelming until we spoke with CosmediLoans. Our broker explained every option and secured a rate that made our next cycle affordable.",
  },
  {
    name: "Michelle L.",
    procedure: "Breast Augmentation",
    rating: 5,
    avatar: "/Images/Breast Augmentation.png",
    quote:
      "No credit impact, no obligation, and genuinely the lowest rate I found anywhere. My broker was professional and made the entire experience stress-free.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-border"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialGrid() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-section-h2 text-text-dark mb-4">
            What Our Patients Say
          </h2>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            Thousands of Australians have trusted CosmediLoans to finance their medical procedures.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col">
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-4 flex-1 text-text-body text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-text-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-muted">{testimonial.procedure}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
