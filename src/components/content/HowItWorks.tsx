import Image from "next/image";

const steps = [
  {
    number: "1",
    title: "Tell Us What You Need",
    description:
      "Fill out our 60-second form with your procedure type and estimated amount. No credit impact, no obligation.",
    image: "/Images/Tell Us What You Need.png",
  },
  {
    number: "2",
    title: "We Shop 20+ Lenders",
    description:
      "Your dedicated broker compares rates across our lender network to find the most competitive deal for your situation.",
    image: "/Images/We Shop 20+ Lenders.png",
  },
  {
    number: "3",
    title: "Get Funded & Book In",
    description:
      "Accept your personalised offer, receive funds (often same-day), and book your procedure with confidence.",
    image: "/Images/Get Funded & Book In.png",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-section-h2 text-text-dark mb-4">
            How It Works
          </h2>
          <p className="text-body text-text-body max-w-2xl mx-auto">
            From enquiry to funded in as little as 24 hours. Our streamlined process makes medical financing simple.
          </p>
        </div>
        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connector line (desktop only) */}
          <div className="absolute top-14 left-[16.67%] right-[16.67%] h-0.5 bg-border hidden md:block" aria-hidden="true" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="mb-4 relative w-24 h-24">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-body leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
