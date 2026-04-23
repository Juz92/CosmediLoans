import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the CosmediLoans financial services disclaimer. CosmediLoans is a lead generation service, not a credit provider or financial adviser.",
  alternates: { canonical: "/disclaimer" },
};

const sections = [
  "Not a Credit Provider",
  "Not Financial Advice",
  "Indicative Rates",
  "Calculator Disclaimer",
  "No Guarantee of Approval",
  "Third-Party Content",
  "Testimonials",
  "Changes to Information",
  "Regulatory Compliance",
  "Contact",
];

export default function DisclaimerPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Disclaimer
          </h1>
          <p className="text-sm text-text-muted">Last updated: March 2026</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">

          {/* Important notice callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-card p-5 mb-10">
            <p className="text-sm font-semibold text-amber-900 mb-1">Important Notice</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Please read this disclaimer carefully before using the CosmediLoans website at
              cosmediloans.com.au. CosmediLoans is a lead generation service — not a lender,
              credit provider, or financial adviser.
            </p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-border">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#d-${i + 1}`}
                className="text-xs font-medium text-primary bg-primary-wash px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>

          <div className="space-y-10">

            <div id="d-1" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Not a Credit Provider
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  CosmediLoans ABN 14 693 894 558 is{" "}
                  <strong className="text-text-dark">not a credit provider, lender, or credit assistance provider</strong>.
                  We do not hold an Australian Credit Licence (ACL) and we do not provide credit,
                  arrange credit, or act as an intermediary in any credit transaction.
                </p>
                <p>
                  CosmediLoans operates as a lead generation service. We collect enquiry
                  information from users of the Website and pass that information to licensed
                  finance brokers who hold Australian Credit Licences or operate as authorised
                  credit representatives. Any credit assistance, credit assessment, or loan
                  arrangement is provided by the broker and/or lender directly, not by
                  CosmediLoans.
                </p>
              </div>
            </div>

            <div id="d-2" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Not Financial Advice
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  The information provided on the Website is general in nature and does not
                  constitute personal financial advice, credit advice, tax advice, or any other
                  form of professional advice. The content on this Website does not take into
                  account your individual objectives, financial situation, or needs.
                </p>
                <p>
                  Before making any financial decisions, you should consider seeking independent
                  financial advice from a qualified professional. You should read the terms and
                  conditions, product disclosure statement (PDS), and target market determination
                  (TMD) of any financial product before committing to it.
                </p>
              </div>
            </div>

            <div id="d-3" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Indicative Rates and Figures
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  All interest rates, repayment amounts, loan terms, and financial figures
                  displayed on the Website are <strong className="text-text-dark">indicative only</strong> and
                  are provided for general informational and comparison purposes. They do not
                  constitute an offer, quote, or guarantee of any specific rate or term.
                </p>
                <p>
                  Actual interest rates, fees, charges, and loan terms are determined by the
                  lender based on your individual credit profile, financial situation, loan amount,
                  and term length. Rates and product availability may change without notice.
                </p>
              </div>
            </div>

            <div id="d-4" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Calculator Disclaimer
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                The loan calculator on this Website provides estimates for illustrative purposes
                only. The calculator assumes a fixed interest rate and constant repayments, and
                does not account for fees, charges, or other costs that may apply to your loan.
                Actual repayment amounts may differ. Do not rely on calculator results as a
                guarantee of repayment amounts.
              </p>
            </div>

            <div id="d-5" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                No Guarantee of Approval
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                Submitting an enquiry through the Website does not guarantee approval for any
                loan product. Loan approval is subject to the lender&apos;s assessment criteria,
                including credit checks, income verification, and responsible lending assessments.
                CosmediLoans has no influence over any lender&apos;s approval decision.
              </p>
            </div>

            <div id="d-6" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Third-Party Content
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                The Website may contain references to, or links to, third-party websites,
                products, and services. These references are provided for convenience only and do
                not constitute an endorsement or recommendation by CosmediLoans. We are not
                responsible for the content, accuracy, or practices of any third-party website.
              </p>
            </div>

            <div id="d-7" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Testimonials and Reviews
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                Any testimonials, reviews, or case studies displayed on the Website represent
                individual experiences and may not be representative of all users. Individual
                results may vary significantly depending on personal circumstances, credit
                profile, and market conditions at the time of application.
              </p>
            </div>

            <div id="d-8" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Changes to Information
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                We make reasonable efforts to ensure the information on the Website is accurate
                and up to date. However, we do not warrant the accuracy, completeness, or
                currency of any information and reserve the right to make changes at any time
                without notice.
              </p>
            </div>

            <div id="d-9" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Regulatory Compliance
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                All brokers in the CosmediLoans network are required to hold appropriate
                Australian Credit Licences (ACL) or operate as authorised credit representatives
                under the <em>National Consumer Credit Protection Act 2009</em> (Cth). They are
                bound by responsible lending obligations under the National Credit Code and are
                members of the Australian Financial Complaints Authority (AFCA) for external
                dispute resolution.
              </p>
            </div>

            {/* Contact card */}
            <div id="d-10" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                Contact
              </h2>
              <div className="bg-primary-wash rounded-card p-6 space-y-2 text-sm">
                <p className="font-semibold text-text-dark mb-3">
                  Questions about this disclaimer?
                </p>
                <p><span className="text-text-muted w-20 inline-block">Business</span> CosmediLoans</p>
                <p><span className="text-text-muted w-20 inline-block">ABN</span> 14 693 894 558</p>
                <p>
                  <span className="text-text-muted w-20 inline-block">Email</span>
                  <a href="mailto:cosmediloans@gmail.com" className="text-primary hover:underline">
                    cosmediloans@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-text-muted w-20 inline-block">Phone</span>
                  <a href="tel:0422676073" className="text-primary hover:underline">
                    0422 676 073
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
